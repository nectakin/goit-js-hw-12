import{a as H,S as T,i as d}from"./assets/vendor-eded45c0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const M="https://pixabay.com/api/",O="43356072-8dcb25da9aa802a65c4e2a4ec";async function y(s,e){const a=new URLSearchParams({key:O,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15});return(await H(`${M}?${a}`)).data}function L(s){return s.map(({webformatURL:e,largeImageURL:a,tags:r,likes:t,views:o,comments:i,downloads:w})=>`<li class="gallery-item">
        <div class="thumb">
            <a class="gallery-link" href="${a}">
              <img
                class="gallery-image"
                src="${e}"
                alt="${r}"
              />
            </a>
              <ul class="description-list">
                <li class="description-items"><span class="accent">Likes </span>${t}</li>
                <li class="description-items"><span class="accent">Views </span>${o}</li>
                <li class="description-items"><span class="accent">Comments </span>${i}</li>
                <li class="description-items"><span class="accent">Downloads </span>${w}</li>
              </ul>
        </div>
      </li>`).join("")}const v=document.querySelector(".js-search-form "),h=document.querySelector(".search-input"),m=document.querySelector("ul.gallery"),q=document.querySelector(".loader"),c=document.querySelector(".load-more");function l(){q.classList.toggle("hidden")}function p(){c.classList.add("hidden")}function b(){c.classList.remove("hidden")}function $(s){const e=s.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}let f="",g=0;const S=new T(".gallery a",{captionsData:"alt",captionDelay:250});let n=1,u;v.addEventListener("submit",P);c.addEventListener("click",E);window.addEventListener("scroll",function(){const{scrollTop:s,scrollHeight:e,clientHeight:a}=document.documentElement;if(s+a>=e-5){const r=new Date().getTime();c.classList.contains("hidden")&&r-g>15e3&&(g=r,d.info({title:"",message:"We're sorry, but you've reached the end of search results!",position:"bottomRight",timeout:3e3,pauseOnHover:!1}))}});async function P(s){if(s.preventDefault(),m.innerHTML="",n=1,c.classList.contains("hidden")||p(),h.value.trim()==="")return d.error({title:"",message:"The field can not be empty!!!",position:"topCenter",timeout:3e3,pauseOnHover:!1});f=h.value,l();try{const e=await y(f,n);e.hits.length===0?d.error({title:"",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3,pauseOnHover:!1}):(m.insertAdjacentHTML("beforeend",L(e.hits)),S.refresh(),u=Math.ceil(e.totalHits/e.hits.length),n<u&&b())}catch(e){alert(e.message)}finally{v.reset()}l()}async function E(){n+=1,l();try{const s=await y(f,n);if(console.log("Loaded page:",n),console.log("Total pages:",u),m.insertAdjacentHTML("beforeend",L(s.hits)),S.refresh(),n>=u)console.log("Last page reached"),d.info({title:"",message:"We're sorry, but you've reached the end of search results!",position:"bottomRight",timeout:3e3,pauseOnHover:!1}),l(),p();else{const e=document.querySelector(".gallery-item");$(e),b()}}catch(s){alert(s.message),p()}finally{l()}}
//# sourceMappingURL=commonHelpers.js.map
