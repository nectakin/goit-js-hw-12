import{a as w,S as H,i as m}from"./assets/vendor-eded45c0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const q="https://pixabay.com/api/",M="43356072-8dcb25da9aa802a65c4e2a4ec";async function y(s,e){const a=new URLSearchParams({key:M,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15});return(await w(`${q}?${a}`)).data}function g(s){return s.map(({webformatURL:e,largeImageURL:a,tags:i,likes:t,views:r,comments:n,downloads:b})=>`<li class="gallery-item">
        <div class="thumb">
            <a class="gallery-link" href="${a}">
              <img
                class="gallery-image"
                src="${e}"
                alt="${i}"
              />
            </a>
              <ul class="description-list">
                <li class="description-items"><span class="accent">Likes </span>${t}</li>
                <li class="description-items"><span class="accent">Views </span>${r}</li>
                <li class="description-items"><span class="accent">Comments </span>${n}</li>
                <li class="description-items"><span class="accent">Downloads </span>${b}</li>
              </ul>
        </div>
      </li>`).join("")}const L=document.querySelector(".js-search-form "),h=document.querySelector(".search-input"),p=document.querySelector("ul.gallery"),O=document.querySelector(".loader"),u=document.querySelector(".load-more");function c(){O.classList.toggle("hidden")}function l(){u.classList.add("hidden")}function $(){u.classList.remove("hidden")}function P(s){const e=s.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}let f="";const v=new H(".gallery a",{captionsData:"alt",captionDelay:250});let o=1,d;L.addEventListener("submit",B);u.addEventListener("click",S);async function B(s){if(s.preventDefault(),p.innerHTML="",o=1,u.classList.contains("hidden")||l(),h.value.trim()==="")return m.error({title:"",message:"The field can not be empty!!!",position:"topCenter",timeout:3e3,pauseOnHover:!1});f=h.value,c();try{const e=await y(f,o);e.hits.length===0?m.error({title:"",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3,pauseOnHover:!1}):(p.insertAdjacentHTML("beforeend",g(e.hits)),v.refresh(),d=e.totalHits/e.hits.length,o<d)}catch(e){alert(e.message)}finally{L.reset()}c()}S();async function S(){o+=1,l(),c();try{const s=await y(f,o);p.insertAdjacentHTML("beforeend",g(s.hits)),v.refresh();const e=document.querySelector(".gallery-item");P(e),(o>=d||s.totalHits<15&&s.totalHits)&&(l(),m.info({title:"",message:"We're sorry, but you've reached the end of search results!",position:"topRight",timeout:3e3,pauseOnHover:!1})),c(),$()}catch(s){alert(s.message),l()}finally{o>=d&&(l(),c())}}
//# sourceMappingURL=commonHelpers.js.map
