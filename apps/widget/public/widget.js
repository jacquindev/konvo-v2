(function(){"use strict";const u="https://konvo-v2-widget.vercel.app",l={DEFAULT_POSITION:"bottom-right"},h=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
</svg>`,b=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="18" y1="6" x2="6" y2="18"></line>
  <line x1="6" y1="6" x2="18" y2="18"></line>
</svg>`;(function(){let t=null,e=null,n=null,s=!1,o=null,r=l.DEFAULT_POSITION;const c=document.currentScript;if(c)o=c.getAttribute("data-organization-id"),r=c.getAttribute("data-position")||l.DEFAULT_POSITION;else{const i=document.querySelectorAll('script[src*="index"]'),a=Array.from(i).find(d=>d.hasAttribute("data-organization-id"));a&&(o=a.getAttribute("data-organization-id"),r=a.getAttribute("data-position")||l.DEFAULT_POSITION)}if(!o){console.error("Konvo Widget: data-organization-id attribute is required.");return}function g(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",f):f()}function f(){t=document.createElement("button"),t.id="konvo-widget-button",t.innerHTML=h,t.style.cssText=`
      position: fixed;
      ${r==="bottom-right"?"right: 20px":"left: 20px"};
      bottom: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #6e56cf;
      color: white;
      border: none;
      cursor: pointer;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 24px rgba(110, 86, 207, 0.35);
      transition: all 0.2s ease;
    `,t.addEventListener("click",y),t.addEventListener("mouseenter",()=>{t&&(t.style.transform="scale(1.05)")}),t.addEventListener("mouseleave",()=>{t&&(t.style.transform="scale(1)")}),document.body.appendChild(t),e=document.createElement("div"),e.id="konvo-widget-container",e.style.cssText=`
      position: fixed;
      ${r==="bottom-right"?"right: 20px":"left: 20px"};
      bottom: 90px;
      width: 400px;
      height: 600px;
      max-width: calc(100vw - 40px);
      max-height: calc(100vh - 110px);
      z-index: 999998;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
      display: none;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s ease;
    `,n=document.createElement("iframe"),n.src=v(),n.style.cssText=`
      width: 100%;
      height: 100%;
      border: none;
    `,n.allow="microphone; clipboard-read; clipboard-write",e.appendChild(n),document.body.appendChild(e),window.addEventListener("message",x)}function y(){s?p():m()}function p(){e&&t&&(s=!1,e.style.opacity="0",e.style.transform="translateY(10px)",setTimeout(()=>{e&&(e.style.display="none")},300),t.innerHTML=h,t.style.background="#6e56cf")}function m(){e&&t&&(s=!0,e.style.display="block",setTimeout(()=>{e&&(e.style.opacity="1",e.style.transform="translateY(0)")},10),t.innerHTML=b)}function v(){const i=new URLSearchParams;return i.append("organizationId",o),`${u}?${i.toString()}`}function x(i){if(i.origin!==new URL(u).origin)return;const{type:a,payload:d}=i.data;switch(a){case"close":p();break;case"resize":d.height&&e&&(e.style.height=`${d.height}px`);break}}function w(){window.removeEventListener("message",x),e&&(e.remove(),e=null,n=null),t&&(t.remove(),t=null),s=!1}function k(i){w(),i.organizationId&&(o=i.organizationId),i.position&&(r=i.position),g()}window.KonvoWidget={init:k,show:m,hide:p,destroy:w},g()})()})();
