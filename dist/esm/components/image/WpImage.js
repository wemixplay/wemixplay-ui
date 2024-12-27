import e,{memo as r,useRef as t,useState as a,useCallback as n,useMemo as s,useLayoutEffect as o}from"react";import c from"./ImageIntersectionObserver.js";import i from"./WpImage.module.scss.js";import{makeCxFunc as l}from"../../utils/forReactUtils.js";"undefined"==typeof window&&(e.useLayoutEffect=e.useEffect);const m=l(i);var u=r((r=>{let{className:i="",src:l="",errorSrc:u="",alt:d="",isBackground:g=!1,isLazy:f=!0,blur:p=!1,width:y,height:h,transitionDuration:b,transitionDelay:w,onImageLoad:v}=r;const I=t(null),E=t(null),[D,N]=a(f?"waiting":"loaded"),W=n((e=>N(e)),[]),j=n(((e,r)=>{e.src=r,g?E.current.style.backgroundImage="url(".concat(r,")"):I.current.src=r}),[g]),k=n((e=>{const r=e.target,t=r.src;t.endsWith(l)?(W("loaded"),null==v||v()):t.endsWith(u)&&W("error-loaded"),r.remove()}),[u,l,W,v]),L=n((e=>{if("string"==typeof e)return;const r=e.target,t=r.src;u&&!t.endsWith(u)?j(r,u):(N("error"),r.remove())}),[u,j]),O=n((()=>{const e=new Image;j(e,l),e.onload=k,e.onerror=L,e.onabort=L}),[j,l,k,L]),z=s((()=>({transitionDuration:"".concat(b,"ms"),transitionDelay:"".concat(w,"ms")})),[b,w]);return o((()=>{const e=g?E.current:I.current;return f?c.startObserving(e,O):O(),()=>{c.quitOberving(e)}}),[l,u,f,g,W,O]),e.createElement("span",{className:m(i,"lazy-img-wrapper",D,{blur:p}),style:{width:y,height:h}},g?e.createElement("span",{ref:E,className:m("target-background"),style:z}):e.createElement("img",{ref:I,className:m("target-image"),alt:d,style:z}))}));export{u as default};
