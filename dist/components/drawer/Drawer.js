"use strict";var e=require("react"),t=require("../../utils/forReactUtils.js"),r=require("./Drawer.module.scss.js");function n(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return c(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?c(e,t):void 0}}(e))||t){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,l=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return i=e.done,e},e:function(e){l=!0,a=e},f:function(){try{i||null==r.return||r.return()}finally{if(l)throw a}}}}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var o=t.makeCxFunc(r);module.exports=function(t){var r=t.className,c=void 0===r?"":r,a=t.direction,i=t.disabled,l=t.children,s=t.enableOverDrawer,u=t.onTouchMove,h=t.onClose,f=e.useRef(null),d=e.useRef({x:0,y:0,originTargetHeight:0,targetHeight:0}),v=e.useRef(null),g=e.useRef(!1),y=e.useCallback((function(e){var t,r=n(e.children);try{for(r.s();!(t=r.n()).done;){var c=t.value,o=window.getComputedStyle(c);if("auto"===o.overflow||"scroll"===o.overflow||"auto"===o.overflowX||"scroll"===o.overflowX||"auto"===o.overflowY||"scroll"===o.overflowY){if(c.scrollTop>0||c.scrollLeft>0)return c;0}var a=y(c);if(a)return a}}catch(e){r.e(e)}finally{r.f()}return null}),[]);e.useCallback((function(e){var t=f.current.scrollTop,r=f.current.scrollHeight-f.current.clientHeight;t>0&&t<r&&e.stopPropagation()}),[]);var m=e.useCallback((function(){var e=v.current;e.style.transition="transform cubic-bezier(0.25, 0.1, 0.25, 1.0) 0.2s, height cubic-bezier(0.25, 0.1, 0.25, 1.0) 0.2s","top"===a?e.style.transform="translateY(100%)":"left"===a?e.style.transform="translateX(-100%)":"right"===a&&(e.style.transform="translateX(100%)"),setTimeout((function(){e.style.visibility="hidden",h&&h()}),200)}),[a,h]),w=e.useCallback((function(e){var t=v.current;f.current=y(t),t&&!i&&(t.style.transition="transform linear 0.2s, height linear 0.2s","top"===a?g.current=e.changedTouches[0].clientY-v.current.offsetTop<20:"left"===a?g.current=window.innerWidth-e.changedTouches[0].clientX<20:"right"===a&&(g.current=e.changedTouches[0].clientX<20),(!f.current||f.current.scrollTop<=0&&f.current.scrollLeft<=0||g.current)&&(d.current={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY,originTargetHeight:t.dataset.full?d.current.originTargetHeight:t.offsetHeight,targetHeight:t.offsetHeight}))}),[a,i,y]),T=e.useCallback((function(e){var t,r,n,c,o,l,h=v.current,y=null!==(r=null===(t=f.current)||void 0===t?void 0:t.scrollHeight)&&void 0!==r?r:0,m=null!==(c=null===(n=f.current)||void 0===n?void 0:n.clientHeight)&&void 0!==c?c:0,w=null!==(l=null===(o=f.current)||void 0===o?void 0:o.scrollTop)&&void 0!==l?l:0;if("top"===a)if(s&&!h.dataset.full)g.current=d.current.y>e.changedTouches[0].clientY?y<=w+m:w<=0;else if(s&&h.dataset.full){if(g.current=d.current.y<e.changedTouches[0].clientY&&w<=0,d.current.y>e.changedTouches[0].clientY&&y<=w+m)return e.preventDefault()}else!s&&d.current.y<e.changedTouches[0].clientY?g.current=w<=0:!s&&d.current.y>e.changedTouches[0].clientY&&(g.current=!1);if(h&&g.current&&!f.current&&!i){if(u&&u({target:h,startPoint:d.current},e),"top"===a){var T=e.changedTouches[0].clientY<d.current.y&&!s?0:e.changedTouches[0].clientY-d.current.y;e.changedTouches[0].clientY<d.current.y&&s||h.dataset.full&&s?h.style.height="".concat(-1*T+d.current.targetHeight,"px"):h.style.transform="translateY(".concat(T,"px)")}else if("left"===a){var p=d.current.x-e.changedTouches[0].clientX<0?0:e.changedTouches[0].clientX-d.current.x;h.style.transform="translateX(".concat(p,"px)")}else if("right"===a){var b=window.innerWidth-e.changedTouches[0].clientX<0?0:e.changedTouches[0].clientX-d.current.x;h.style.transform="translateX(".concat(b,"px)")}g.current&&e.preventDefault()}}),[a,i,s,u]),p=e.useCallback((function(e){if("BUTTON"!==e.target.tagName){var t=v.current,r=window.visualViewport?window.visualViewport.height:window.innerHeight;t&&g.current&&!f.current&&!i&&("top"===a?s?t.dataset.full?(t.style.transition=" height 0.3s",t.style.height=e.changedTouches[0].clientY-d.current.y>r/6?"".concat(d.current.originTargetHeight,"px"):"100vh",t.style.transform="",t.dataset.full=e.changedTouches[0].clientY-d.current.y>r/6?"":"1"):!t.dataset.full&&d.current.y-e.changedTouches[0].clientY>r/6?(t.style.transition=" height 0.3s",t.style.height="100vh",t.style.transform="",t.dataset.full=d.current.y-e.changedTouches[0].clientY>r/6?"1":""):e.changedTouches[0].clientY-d.current.y>r/6&&!t.dataset.full?m():(t.style.transition="transform 0.3s",t.style.transform="translateY(0px)",t.style.height="",t.dataset.full=""):e.changedTouches[0].clientY-d.current.y>r/6?m():(t.style.transition="transform 0.3s",t.style.transform="translateY(0px)",t.style.height="",t.dataset.full=""):"left"===a?d.current.x-e.changedTouches[0].clientX>100?m():(t.style.transition="transform 0.3s",t.style.transform="translateX(0px)"):"right"===a&&(d.current.x-e.changedTouches[0].clientX>100?m():(t.style.transition="transform 0.3s",t.style.transform="translateX(100%)")),g.current&&e.preventDefault())}}),[a,i,s,m]);return e.useEffect((function(){var e=0,t=function(t){e=t.touches[0].clientX},r=function(t){(e<10||window.innerWidth-10<e)&&t.preventDefault()};return i||(window.addEventListener("touchstart",t,{passive:!1}),window.addEventListener("touchmove",r,{passive:!1})),function(){window.removeEventListener("touchstart",t),window.removeEventListener("touchmove",r)}}),[i]),e.useEffect((function(){if(v.current&&v.current.children.length>1)throw Error("A Drawer component's children always receive a single element!");var e=v.current;return f.current=y(e),i||(e.addEventListener("touchstart",w),e.addEventListener("touchmove",T),e.addEventListener("touchend",p)),function(){e.removeEventListener("touchstart",w),e.removeEventListener("touchmove",T),e.removeEventListener("touchend",p)}}),[i,p,T,w,y]),e.createElement("div",{ref:v,className:o("drawer","".concat(c),"".concat(a),{disabled:i})},l)};