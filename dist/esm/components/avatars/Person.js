'use client';
import e,{useRef as a,useState as r,useMemo as t,useCallback as s,useEffect as l}from"react";import i from"./Person.module.scss.js";import o from"../../assets/svgs/ico-king-mark.svg.js";import{makeCxFunc as m}from"../../utils/forReactUtils.js";import{commaWithValue as c}from"../../utils/valueParserUtils.js";const n=m(i),d="/assets/imgs/svgs/default-profile.svg",v=i=>{let{className:m="",level:v,src:u,uid:g,name:f,size:p="medium",customSize:E,bedgeElement:k,onClick:N}=i;const h=a(),[j,b]=r(""),[z,C]=r(u||d),P=t((()=>!k&&void 0!==v),[k,v]),U=s((()=>{b("loaded")}),[]),W=s((()=>{C(d),b("error")}),[]);return l((()=>{var e,a,r,t;b((null===(e=h.current)||void 0===e?void 0:e.complete)?(null===(a=h.current)||void 0===a?void 0:a.naturalWidth)?"loaded":"error":"loading"),(null===(r=h.current)||void 0===r?void 0:r.complete)&&!(null===(t=h.current)||void 0===t?void 0:t.naturalWidth)?C(d):C(u||d)}),[u]),e.createElement("div",{className:n(m,"avatar",p,{"no-image":z===d,"has-click-event":N}),style:{width:E,height:E},onClick:N},e.createElement("div",{className:n("avtr-img-area")},e.createElement("div",{className:n("avtr-bedge-area")},P?e.createElement("span",{className:n("avtr-bedge")},v>7&&e.createElement(o,{className:n("king-mark")}),c(v)):k),e.createElement("div",{className:n("avtr-img",j)},e.createElement("img",{ref:h,src:z,alt:f||"user-avatar",onLoad:U,onError:W}))))};export{v as default};
