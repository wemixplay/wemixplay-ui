"use client";
"use strict";var e=require("react"),a=require("./Person.module.scss.js"),r=require("../../assets/svgs/ico-king-mark.svg.js"),s=require("../../utils/forReactUtils.js"),t=require("../../utils/valueParserUtils.js");const l=s.makeCxFunc(a),i="/assets/imgs/svgs/default-profile.svg";module.exports=a=>{let{className:s="",level:c,src:u,uid:o,name:m,size:n="medium",customSize:d,bedgeElement:v,onClick:g}=a;const k=e.useRef(),[E,f]=e.useState(""),[h,N]=e.useState(u||i),b=e.useMemo((()=>!v&&void 0!==c),[v,c]),p=e.useCallback((()=>{f("loaded")}),[]),q=e.useCallback((()=>{N(i),f("error")}),[]);return e.useEffect((()=>{var e,a,r,s;f((null===(e=k.current)||void 0===e?void 0:e.complete)?(null===(a=k.current)||void 0===a?void 0:a.naturalWidth)?"loaded":"error":"loading"),(null===(r=k.current)||void 0===r?void 0:r.complete)&&!(null===(s=k.current)||void 0===s?void 0:s.naturalWidth)?N(i):N(u||i)}),[u]),e.createElement("div",{className:l(s,"avatar",n,{"no-image":h===i,"has-click-event":g}),style:{width:d,height:d},onClick:g},e.createElement("div",{className:l("avtr-img-area")},e.createElement("div",{className:l("avtr-bedge-area")},b?e.createElement("span",{className:l("avtr-bedge")},c>7&&e.createElement(r,{className:l("king-mark")}),t.commaWithValue(c)):v),e.createElement("div",{className:l("avtr-img",E)},e.createElement("img",{ref:k,src:h,alt:m||"user-avatar",onLoad:p,onError:q}))))};
