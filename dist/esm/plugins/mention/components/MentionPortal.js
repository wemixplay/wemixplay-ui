"use client";
import t from"../../../hooks/useWemixplayUI.js";import{useState as e,useEffect as o}from"react";import{createPortal as n}from"react-dom";const r=r=>{let{children:d}=r;const{theme:i}=t(),[m,l]=e(null);return o((()=>{const t=document.getElementById("wp-editor-mention-portal");t&&t.setAttribute("data-theme",i)}),[i]),o((()=>{var t;let e=!1,o=document.getElementById("wp-editor-mention-portal");if(!o){e=!0;const n=document.createElement("div");n.setAttribute("id","wp-editor-mention-portal"),n.setAttribute("class","wemixplay-ui"),n.setAttribute("data-theme",(null===(t=document.getElementById("wemixplay-ui"))||void 0===t?void 0:t.getAttribute("data-theme"))||"light"),document.body.appendChild(n),o=n}return l(o),()=>{e&&(null==o?void 0:o.parentNode)&&1===o.parentNode.childElementCount&&o.parentNode.removeChild(o)}}),[]),m&&n(d,m)};export{r as default};
