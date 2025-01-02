"use strict";var e=require("react"),t=require("../../utils/forReactUtils.js"),r=require("./Drawer.module.scss.js");const n=t.makeCxFunc(r);var c=t=>{let{className:r="",direction:c,disabled:s,children:l,breakRatioPoint:o,enableOverDrawer:a,onTouchMove:i,onClose:u}=t;const h=e.useRef(null),d=e.useRef({x:0,y:0,originTargetHeight:0,targetHeight:0}),f=e.useRef(null),g=e.useRef(!1),v=e.useCallback((e=>{for(const t of e.children){const e=window.getComputedStyle(t);if(("auto"===e.overflow||"scroll"===e.overflow||"auto"===e.overflowX||"scroll"===e.overflowX||"auto"===e.overflowY||"scroll"===e.overflowY)&&(t.scrollTop>0||t.scrollLeft>0))return t;const r=v(t);if(r)return r}return null}),[]);e.useCallback((e=>{const t=h.current.scrollTop,r=h.current.scrollHeight-h.current.clientHeight;t>0&&t<r&&e.stopPropagation()}),[]);const y=e.useCallback((()=>{const e=f.current;e.style.transition="transform cubic-bezier(0.25, 0.1, 0.25, 1.0) 0.2s, height cubic-bezier(0.25, 0.1, 0.25, 1.0) 0.2s","top"===c?e.style.transform="translateY(100%)":"left"===c?e.style.transform="translateX(-100%)":"right"===c&&(e.style.transform="translateX(100%)"),setTimeout((()=>{e.style.visibility="hidden",u&&u()}),200)}),[c,u]),m=e.useCallback((e=>{const t=f.current;h.current=v(t),t&&!s&&(t.style.transition="transform linear 0.2s, height linear 0.2s","top"===c?g.current=e.changedTouches[0].clientY-f.current.offsetTop<20:"left"===c?g.current=window.innerWidth-e.changedTouches[0].clientX<20:"right"===c&&(g.current=e.changedTouches[0].clientX<20),(!h.current||h.current.scrollTop<=0&&h.current.scrollLeft<=0||g.current)&&(d.current={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY,originTargetHeight:t.dataset.full?d.current.originTargetHeight:t.offsetHeight,targetHeight:t.offsetHeight}))}),[c,s,v]),T=e.useCallback((e=>{var t,r,n,l,o,u;const v=f.current,y=null!==(r=null===(t=h.current)||void 0===t?void 0:t.scrollHeight)&&void 0!==r?r:0,m=null!==(l=null===(n=h.current)||void 0===n?void 0:n.clientHeight)&&void 0!==l?l:0,T=null!==(u=null===(o=h.current)||void 0===o?void 0:o.scrollTop)&&void 0!==u?u:0;if("top"===c)if(a&&!v.dataset.full)g.current=d.current.y>e.changedTouches[0].clientY?y<=T+m:T<=0;else if(a&&v.dataset.full){if(g.current=d.current.y<e.changedTouches[0].clientY&&T<=0,d.current.y>e.changedTouches[0].clientY&&y<=T+m)return e.preventDefault()}else!a&&d.current.y<e.changedTouches[0].clientY?g.current=T<=0:!a&&d.current.y>e.changedTouches[0].clientY&&(g.current=!1);if(v&&g.current&&!h.current&&!s){if(i&&i({target:v,startPoint:d.current},e),"top"===c){const t=e.changedTouches[0].clientY<d.current.y&&!a?0:e.changedTouches[0].clientY-d.current.y;e.changedTouches[0].clientY<d.current.y&&a||v.dataset.full&&a?v.style.height="".concat(-1*t+d.current.targetHeight,"px"):v.style.transform="translateY(".concat(t,"px)")}else if("left"===c){const t=d.current.x-e.changedTouches[0].clientX<0?0:e.changedTouches[0].clientX-d.current.x;v.style.transform="translateX(".concat(t,"px)")}else if("right"===c){const t=window.innerWidth-e.changedTouches[0].clientX<0?0:e.changedTouches[0].clientX-d.current.x;v.style.transform="translateX(".concat(t,"px)")}g.current&&e.preventDefault()}}),[c,s,a,i]),w=e.useCallback((e=>{if("BUTTON"===e.target.tagName)return;const t=f.current,r=window.visualViewport?window.visualViewport.height:window.innerHeight;t&&g.current&&!h.current&&!s&&("top"===c?a?t.dataset.full?(t.style.transition=" height 0.3s",t.style.height=e.changedTouches[0].clientY-d.current.y>r/6?"".concat(d.current.originTargetHeight,"px"):"100vh",t.style.transform="",t.dataset.full=e.changedTouches[0].clientY-d.current.y>r/6?"":"1"):!t.dataset.full&&d.current.y-e.changedTouches[0].clientY>r/6?(t.style.transition=" height 0.3s",t.style.height="100vh",t.style.transform="",t.dataset.full=d.current.y-e.changedTouches[0].clientY>r/6?"1":""):e.changedTouches[0].clientY-d.current.y>r/6&&!t.dataset.full?y():(t.style.transition="transform 0.3s",t.style.transform="translateY(0px)",t.style.height="",t.dataset.full=""):e.changedTouches[0].clientY-d.current.y>r/6?y():(t.style.transition="transform 0.3s",t.style.transform="translateY(0px)",t.style.height="",t.dataset.full=""):"left"===c?d.current.x-e.changedTouches[0].clientX>100?y():(t.style.transition="transform 0.3s",t.style.transform="translateX(0px)"):"right"===c&&(d.current.x-e.changedTouches[0].clientX>100?y():(t.style.transition="transform 0.3s",t.style.transform="translateX(100%)")),g.current&&e.preventDefault())}),[c,s,a,y]);return e.useEffect((()=>{let e=0;const t=t=>{e=t.touches[0].clientX},r=t=>{(e<10||window.innerWidth-10<e)&&t.preventDefault()};return s||(window.addEventListener("touchstart",t,{passive:!1}),window.addEventListener("touchmove",r,{passive:!1})),()=>{window.removeEventListener("touchstart",t),window.removeEventListener("touchmove",r)}}),[s]),e.useEffect((()=>{if(f.current&&f.current.children.length>1)throw Error("A Drawer component's children always receive a single element!");{const e=f.current;return h.current=v(e),s||(e.addEventListener("touchstart",m),e.addEventListener("touchmove",T),e.addEventListener("touchend",w)),()=>{e.removeEventListener("touchstart",m),e.removeEventListener("touchmove",T),e.removeEventListener("touchend",w)}}}),[s,w,T,m,v]),e.createElement("div",{ref:f,className:n("drawer","".concat(r),"".concat(c),{disabled:s})},l)};module.exports=c;
