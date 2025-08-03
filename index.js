import{a as d,S as m,i}from"./assets/vendor-5YrzWRhu.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const p="https://pixabay.com/api/",y="51594808-2f8a269bf80026fef40a32938";async function g(n,r=1){const o={key:y,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r};return(await d.get(p,{params:o})).data}const c=document.querySelector(".gallery");document.querySelector(".load-more-btn");const l=document.querySelector(".loader"),h=new m(".gallery a");function b(n){const r=n.map(({webformatURL:o,largeImageURL:a,tags:e,likes:t,views:s,comments:u,downloads:f})=>`
    <li class="gallery-item">
      <a href="${a}">
        <img src="${o}" alt="${e}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${t}</p>
        <p><b>Views:</b> ${s}</p>
        <p><b>Comments:</b> ${u}</p>
        <p><b>Downloads:</b> ${f}</p>
      </div>
    </li>`).join("");c.insertAdjacentHTML("beforeend",r),h.refresh()}function L(){c.innerHTML=""}function w(){l.style.display="block"}function S(){l.style.display="none"}const q=document.querySelector(".form");q.addEventListener("submit",async n=>{n.preventDefault();const r=n.target.elements["search-text"].value.trim();if(!r){i.warning({message:"Please enter a search term!"});return}L(),w();try{const o=await g(r);o.hits.length===0?i.info({message:"Sorry, there are no images matching your search query. Please try again!"}):b(o.hits)}catch{i.error({message:"Something went wrong. Try again later."})}finally{S()}});
//# sourceMappingURL=index.js.map
