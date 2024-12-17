import e from"@babel/runtime/helpers/slicedToArray";import t,{forwardRef as n,useRef as r,useState as c,useCallback as o,useImperativeHandle as i,useEffect as l}from"react";import{isDesktop as a}from"react-device-detect";import s from"./HashList.module.scss.js";import{makeCxFunc as u}from"../../../utils/forReactUtils.js";import m from"../../../hooks/useCheckDevice.js";var f=u(s),d=n((function(n,s){var u=n.className,d=void 0===u?"":u,h=n.contentEditableEl,v=n.targetHashId,p=n.list,g=n.listElement,b=n.selectHashItem,y=n.closeHashList,E=r(),w=r(),L=r({x:0,y:0}),H=c({}),T=e(H,2),x=T[0],N=T[1],k=c(0),j=e(k,2),S=j[0],O=j[1],Y=m().isMobile,q=o((function(){if((null!=p?p:[]).length){var e=0===S?p.length-1:S-1;O(e);var t=w.current.querySelector("li:nth-child(".concat(e+1,")"));w.current.scrollTop=t.offsetTop-20}}),[S,p]),z=o((function(){if((null!=p?p:[]).length){var e=S===p.length-1?0:S+1;O(e);var t=w.current.querySelector("li:nth-child(".concat(e+1,")"));w.current.scrollTop=t.offsetTop-20}}),[p,S]),A=o((function(e){if((null!=p?p:[]).length)return p[null!=e?e:S]}),[S,p]),C=o((function(e){a&&O(e)}),[]),D=o((function(e){O(e),b(e)}),[b]),I=o((function(e){var t,n;if(e){var r=e.offsetHeight,c=e.getBoundingClientRect(),o="fixed"===document.body.style.position&&!!document.body.style.top&&Number(document.body.style.top.replace("px",""))<0?-1*Number(document.body.style.top.replace("px","")):window.scrollY,i=c.left+E.current.offsetWidth-window.innerWidth,l=c.top+o,a=c.bottom+o,s=i>0?c.left-i-10:c.left,u=o,m=o+window.innerHeight,f="bottom",d=null!==(t=E.current.clientHeight)&&void 0!==t?t:0;d>m-a&&(f=l-u>m-a?"top":"bottom"),d>l-u&&d>m-a&&(w.current.style.height="".concat("top"===f?l-u-32:m-a-32,"px")),d=null!==(n=E.current.clientHeight)&&void 0!==n?n:0;var h={position:"absolute",zIndex:"9999999",visibility:"visible"};switch(Y&&(h.maxWidth="95%"),f){case"top":h.top=l-d,h.left=Y?"50%":s;break;case"bottom":h.top=l+r,h.left=Y?"50%":s}return Y&&(h.transform="translateX(-50%)"),h}}),[Y]),W=o((function(e){L.current={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY}}),[]),M=o((function(e){var t=w.current.scrollTop,n=w.current.scrollHeight;(e.cancelable&&t<=0&&e.changedTouches[0].clientY-L.current.y>0||e.cancelable&&t>=n-w.current.clientHeight&&L.current.y-e.changedTouches[0].clientY>0)&&e.preventDefault()}),[]);return i(s,(function(){return E.current.handleArrowUp=q,E.current.handleArrowDown=z,E.current.handleSubmit=A,E.current})),l((function(){if(h.current&&v){var e=h.current.querySelector("#".concat(v)),t=I(e);N(t)}else N({})}),[v,p.length,I]),l((function(){O(0)}),[p]),l((function(){var e=function(e){var t=e.target;!E.current||E.current.contains(t)||t.classList.contains("hash")||y()};return document.addEventListener("click",e),window.addEventListener("resize",y),function(){document.removeEventListener("click",e),window.removeEventListener("resize",y)}}),[y]),l((function(){var e=w.current;return e.addEventListener("touchstart",W),e.addEventListener("touchmove",M),function(){e.removeEventListener("touchstart",W),e.removeEventListener("touchmove",M)}}),[W,M]),t.createElement("div",{ref:E,className:f(d,"hash-list"),contentEditable:!1,style:Object.assign(Object.assign({},x),{display:(null!=p?p:[]).length>0?"block":"none"})},t.createElement("ul",{ref:w,className:f("hash-list-area")},(null!=p?p:[]).map((function(n,r){return t.createElement("li",{ref:function(t){t&&Object.entries(n).map((function(n){var r=e(n,2),c=r[0],o=r[1];t.dataset[c]=String(o)}))},className:f("hash-item",{active:S===r}),key:"".concat(n.name,"-").concat(r),onMouseOver:function(){return C(r)},onClick:function(){return D(r)}},g?g(n):t.createElement(t.Fragment,null,t.createElement("div",{className:f("info-area")},t.createElement("strong",{className:f("title")},t.createElement("span",null,"#"),n.name))))}))))}));d.displayName="HashList";export{d as default};
