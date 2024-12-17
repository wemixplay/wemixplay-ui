"use strict";var e=require("@babel/runtime/helpers/slicedToArray"),a=require("react"),r=require("./Person.module.scss.js"),t=require("../../assets/svgs/ico-king-mark.svg.js"),s=require("../../utils/forReactUtils.js"),i=require("../../utils/valueParserUtils.js"),l=s.makeCxFunc(r),n="/assets/imgs/svgs/default-profile.svg";module.exports=function(r){var s=r.className,c=void 0===s?"":s,u=r.level,o=r.src,m=r.name,d=r.size,v=void 0===d?"medium":d,g=r.customSize,f=r.bedgeElement,k=r.onClick,E=a.useRef(),h=a.useState(""),b=e(h,2),N=b[0],p=b[1],q=a.useState(o||n),C=e(q,2),j=C[0],S=C[1],W=a.useMemo((function(){return!f&&void 0!==u}),[f,u]),x=a.useCallback((function(){p("loaded")}),[]),y=a.useCallback((function(){S(n),p("error")}),[]);return a.useEffect((function(){var e,a,r,t;p((null===(e=E.current)||void 0===e?void 0:e.complete)?(null===(a=E.current)||void 0===a?void 0:a.naturalWidth)?"loaded":"error":"loading"),(null===(r=E.current)||void 0===r?void 0:r.complete)&&!(null===(t=E.current)||void 0===t?void 0:t.naturalWidth)?S(n):S(o||n)}),[o]),a.createElement("div",{className:l(c,"avatar",v,{"no-image":j===n,"has-click-event":k}),style:{width:g,height:g},onClick:k},a.createElement("div",{className:l("avtr-img-area")},a.createElement("div",{className:l("avtr-bedge-area")},W?a.createElement("span",{className:l("avtr-bedge")},u>7&&a.createElement(t,{className:l("king-mark")}),i.commaWithValue(u)):f),a.createElement("div",{className:l("avtr-img",N)},a.createElement("img",{ref:E,src:j,alt:m||"user-avatar",onLoad:x,onError:y}))))};