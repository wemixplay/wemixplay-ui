import{useEffect as t}from"react";var n=function(n,e,o){t((function(){var t=function(t){var o=n&&"current"in n?null==n?void 0:n.current:n;o&&!o.contains(t.target)&&e(t)};return document.addEventListener((null==o?void 0:o.event)||"click",t),(null==o?void 0:o.offTouchEvent)||document.addEventListener("touchstart",t),function(){document.removeEventListener((null==o?void 0:o.event)||"click",t),document.removeEventListener("touchstart",t)}}),[n,e,o])};export{n as default};
