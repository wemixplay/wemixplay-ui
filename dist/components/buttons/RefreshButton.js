"use client";
"use strict";var e=require("react"),r=require("../../utils/forReactUtils.js"),t=require("../../assets/svgs/ico-refresh.svg.js"),n=require("./RefreshButton.module.scss.js");const c=r.makeCxFunc(n);var s=r=>{let{className:n="",duration:s=5,showCount:u=!0,iconElement:a=e.createElement(t,null),disabled:l=!1,onClick:o,onRefresh:f}=r;const i=e.useRef(null),m=e.useRef(s||!1),d=e.useRef(),[E,b]=e.useState(!1),h=e.useCallback((()=>{window.clearInterval(i.current),i.current=null}),[]),C=e.useCallback((()=>{i.current&&h(),s&&d.current&&(m.current=s,d.current.innerHTML="".concat(m.current),i.current=window.setInterval((()=>{"number"==typeof m.current&&m.current>0?m.current-=1:m.current=s,b(0===m.current),d.current.innerHTML="".concat(m.current>0?m.current:"")}),1e3))}),[s,h]),k=e.useCallback((e=>{E||(b(!0),C(),o&&o(e))}),[E,o,C]);return e.useEffect((()=>{E&&0===m.current&&(m.current=-1,f&&f())}),[f,E]),e.useEffect((()=>{C()}),[C]),e.useEffect((()=>{l?h():C()}),[l,C,h]),e.useEffect((()=>()=>{i.current&&h()}),[h]),e.createElement("span",{className:c("refresh",n)},e.createElement("button",{className:c("btn-refresh"),onClick:k,disabled:l},e.createElement("i",{className:c("btn-refresh-ico",{refreshed:E}),onAnimationEnd:()=>b(!1)},a),u&&!!s&&e.createElement("span",{ref:d,className:c("btn-refresh-count")})))};module.exports=s;
