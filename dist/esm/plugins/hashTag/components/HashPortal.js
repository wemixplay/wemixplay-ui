import e from"@babel/runtime/helpers/slicedToArray";import{useState as r,useEffect as t}from"react";import{createPortal as o}from"react-dom";var n=function(n){var d=n.children,a=r(null),i=e(a,2),l=i[0],m=i[1];return t((function(){var e=!1,r=document.getElementById("wp-editor-hash-portal");if(!r){e=!0;var t=document.createElement("div");t.setAttribute("id","wp-editor-hash-portal"),document.body.appendChild(t),r=t}return m(r),function(){e&&(null==r?void 0:r.parentNode)&&r.parentNode.removeChild(r)}}),[]),l&&o(d,l)};export{n as default};