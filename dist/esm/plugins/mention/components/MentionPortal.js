import{useState as e,useEffect as t}from"react";import{createPortal as o}from"react-dom";const r=r=>{let{children:n}=r;const[d,i]=e(null);return t((()=>{let e=!1,t=document.getElementById("wp-editor-mention-portal");if(!t){e=!0;const o=document.createElement("div");o.setAttribute("id","wp-editor-mention-portal"),document.body.appendChild(o),t=o}return i(t),()=>{e&&(null==t?void 0:t.parentNode)&&t.parentNode.removeChild(t)}}),[]),d&&o(n,d)};export{r as default};
