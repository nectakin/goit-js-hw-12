import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getData } from './js/pixabay-api.js';
import { createMarkup } from './js/render-functions.js';
import { form, input, gallery, loadMoreBtn } from './js/refs.js';
import { loaderShow } from './js/loader.js';
import { addLoadMoreBtn, removeLoadMoreBtn } from './js/load-more-btn.js';
import { scrollScreen } from './js/scroll-screen';

let searchQuery = '';
let lastToastTime = 0;  

const photosGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let page = 1;
let totalPages;

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', loadMoreHandle);

window.addEventListener('scroll', function() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    const currentTime = new Date().getTime();

    if (loadMoreBtn.classList.contains('hidden') && currentTime - lastToastTime > 7000) {
      lastToastTime = currentTime;  
      iziToast.info({
        title: '',
        message: "We're sorry, but you've reached the end of search results!",
        position: 'bottomRight',
        timeout: 3000,
        pauseOnHover: false,
      });
    }
  }
});

async function onFormSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  page = 1;

  if (!loadMoreBtn.classList.contains('hidden')) {
    removeLoadMoreBtn();
  }

  if (input.value.trim() === '') {
    return iziToast.error({
      title: '',
      message: 'The field can not be empty!!!',
      position: 'topCenter',
      timeout: 3000,
      pauseOnHover: false,
    });
  }

  searchQuery = input.value;
  loaderShow();

  try {
    const data = await getData(searchQuery, page);
    if (data.hits.length === 0) {
      iziToast.error({
        title: '',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 3000,
        pauseOnHover: false,
      });
    } else {
      gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
      photosGallery.refresh();
      totalPages = Math.ceil(data.totalHits / data.hits.length);

      if (page < totalPages) {
        addLoadMoreBtn();
      }
    }
  } catch (error) {
    alert(error.message);
  } finally {
    form.reset();
  }
  loaderShow();
}

async function loadMoreHandle() {
  page += 1;
  loaderShow();
  try {
    const data = await getData(searchQuery, page);
    console.log('Loaded page:', page);
    console.log('Total pages:', totalPages);

    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    photosGallery.refresh();

    if (page >= totalPages) {
      console.log('Last page reached');
      iziToast.info({
        title: '',
        message: "We're sorry, but you've reached the end of search results!",
        position: 'bottomRight',
        timeout: 3000,
        pauseOnHover: false,
      });
      loaderShow();
      removeLoadMoreBtn();
    } else {
      const galleryItem = document.querySelector('.gallery-item');
      scrollScreen(galleryItem);
      addLoadMoreBtn();
    }
  } catch (error) {
    alert(error.message);
    removeLoadMoreBtn();
  } finally {
    loaderShow();
  }
}