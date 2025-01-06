"use client";
import e,{useRef as t,useState as s,useMemo as n,useCallback as i,useLayoutEffect as r}from"react";import l from"./Ellipsis.module.scss.js";import{makeCxFunc as o}from"../../utils/forReactUtils.js";import c from"../../assets/svgs/ico-ellipsis-chevron.svg.js";"undefined"==typeof window&&(e.useLayoutEffect=e.useEffect);const a=o(l);var g=l=>{let{className:o,content:g="",triggerMore:h="more",triggerLess:m="less",lineClamp:u=2,defaultShortened:p=!1,observingEnvs:f=[],onShowMoreLessClick:d}=l;const H=t(null),v=t(!1),y=t([...f]),[E,x]=s(p),[C,b]=s(!0),w=n((()=>{var t,s;const n=E?{lineClamp:u,WebkitLineClamp:u,height:null===(t=H.current)||void 0===t?void 0:t.style.minHeight}:{lineClamp:"unset",WebkitLineClamp:"unset",height:null===(s=H.current)||void 0===s?void 0:s.style.maxHeight};return"string"==typeof g?e.createElement("div",{ref:H,className:a("ellipsis-content"),style:n,dangerouslySetInnerHTML:{__html:g}}):e.createElement("div",{ref:H,className:a("ellipsis-content"),style:n},g)}),[g,u,E]),L=i((e=>{const{current:t}=H;if(t){const{style:s}=t;if(e){const{openHeight:t,closeHeight:n}=e;s.maxHeight="".concat(t,"px"),s.minHeight="".concat(n,"px"),s.height="".concat(n,"px")}else s.maxHeight="",s.minHeight="",s.height=""}}),[]),N=i((()=>{L(null),x(!0),v.current=!0}),[L]),k=i((e=>{let{openHeight:t,closeHeight:s}=e;L({openHeight:t,closeHeight:s}),b(s+10<t),x(p),v.current=!1}),[p,L]),j=i((e=>{e.stopPropagation(),x((e=>!e))}),[]);return r((()=>{const{current:e}=H;e&&N()}),[N]),r((()=>{const{current:e}=H;if(e){!!f.length&&f.some(((e,t)=>e!==y.current[t]))&&(y.current=[...f],N())}}),[f,N,k]),r((()=>{const{current:e}=H;E&&v.current&&e&&k({openHeight:e.scrollHeight,closeHeight:e.offsetHeight})}),[E,g,f,k]),e.createElement("div",{className:a("ellipsis-wrap",o,{shortened:E,"enable-show-more":d})},w,C&&e.createElement("button",{onClick:d||j,className:a("btn-ellipsis-trigger")},E?h:m,e.createElement(c,{width:14,height:14})))};export{g as default};
