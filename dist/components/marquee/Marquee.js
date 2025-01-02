'use client';
"use strict";var e=require("react"),t=require("../../utils/forReactUtils.js"),n=require("./Marquee.module.scss.js");"undefined"==typeof window&&(e.useLayoutEffect=e.useEffect);const a=t.makeCxFunc(n),i=(e,t)=>{const{marqueeItemMarginBlock:n,marqueeItemMarginInline:a}=(e=>{const[t,n]=getComputedStyle(e).margin.replaceAll("px","").split(" ").map(Number).reduce(((e,t,n)=>n%2==0?[e[0]+t,e[1]]:[e[0],e[1]+t]),[0,0]);return{marqueeItemMarginBlock:t,marqueeItemMarginInline:n}})(t),{offsetWidth:i,offsetHeight:r}=t;return{marqueeItemSize:e?i:r,marqueeItemMargin:e?a:n}},r=e=>{let{totalSize:t,containerSize:n,elementLength:a}=e;return Math.ceil(n/t)*a};var m=t=>{let{className:n,direction:m="left",children:u,list:o,off:s=!1,pauseOnMouseEnter:l=!1,minimalAuto:c=!1,minimalCount:f=0,animationIterationCount:g="infinite",animationDuration:p,animationDelay:d,spaceBetween:S,onStart:q,onIteration:h,onFinish:y}=t;const I=e.useRef(null),[M,z]=e.useState(f),E=e.useMemo((()=>e.Children.map(u,((t,n)=>e.createElement("span",{key:n,className:a("marquee-item")},t)))||o.map(((t,n)=>e.createElement("span",{key:n,className:a("marquee-item")},t)))),[u,o]),b=e.useMemo((()=>{let e=[...E];for(;M>e.length;)e=[...e,...E];return[...e,...e].map(((e,t)=>Object.assign(Object.assign({},e),{key:t})))}),[E,M]);return e.useLayoutEffect((()=>{if(c&&I.current){const{current:e}=I,t=Array.from(e.getElementsByClassName("marquee-item")).slice(0,E.length),n=null==t?void 0:t.length;if(n){const a="left"===m||"right"===m,{sizeSum:u,marginSum:o}=t.reduce(((e,t)=>{let{sizeSum:n,marginSum:r}=e;const{marqueeItemSize:m,marqueeItemMargin:u}=i(a,t);return{sizeSum:n+m,marginSum:r+u}}),{sizeSum:0,marginSum:0}),s=r({totalSize:"number"==typeof S?u+S*n:u+o,containerSize:e[a?"offsetWidth":"offsetHeight"],elementLength:n});z(s)}}}),[c,m,S,E]),e.createElement("div",{ref:I,className:a("marquee-wrapper",{paused:l},n)},e.createElement("div",{className:a("marquee-content",m,{off:s,"space-between":"number"==typeof S}),style:{animationDuration:p,animationDelay:d,animationIterationCount:g,"--space-between":"".concat(S,"px")},onAnimationStart:q,onAnimationIteration:h,onAnimationEnd:y},b))};module.exports=m;
