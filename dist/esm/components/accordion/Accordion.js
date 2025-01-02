import e,{useRef as t,useId as r,useMemo as c,useCallback as a,useEffect as l}from"react";import{makeCxFunc as n}from"../../utils/forReactUtils.js";import o from"../../assets/svgs/ico-accordion.svg.js";import s from"../ripple/Ripple.js";import i from"./Accordion.module.scss.js";const m=n(i);var d=n=>{let{className:i="",name:d,title:p,ripple:u={disabled:!0},icon:f=e.createElement(o,null),borderColor:b,open:h,initialOpen:g,children:v,disabled:E,handleOpenChange:x}=n;const y=t(null),N=t(null),j=r(),H=c((()=>{if("undefined"==typeof window)return;let e=0;return new ResizeObserver((t=>{for(const r of t){const t=r.target;t.scrollHeight!==e&&y.current&&(e=Number(y.current.style.maxHeight.replace("px","")),y.current.style.maxHeight="".concat(t.scrollHeight,"px"))}}))}),[]),k=a((e=>{const t=e.target;if(t&&y.current){if(d){const e=document.querySelectorAll('input[name="'.concat(d,'"]'));Array.from(e).filter((e=>e.id!==t.id)).forEach((e=>{e.checked=!1}))}x&&x(t.checked,e)}}),[x,d]);return l((()=>{const e=y.current;if(e)return e.style.maxHeight="".concat(e.scrollHeight,"px"),H&&H.observe(e),()=>{H&&H.unobserve(e)}}),[H,v]),e.createElement("div",{className:m("accordion",i,{open:"boolean"==typeof h?h:g,disabled:E}),style:{"--accor-border-color":b}},e.createElement("input",{ref:N,tabIndex:-1,type:"checkbox",name:d,id:j,value:j,disabled:E,defaultChecked:g,checked:h,onChange:k}),e.createElement("label",{htmlFor:j},e.createElement(s,Object.assign({},u),e.createElement("div",{className:m("accor-hd")},e.createElement("span",{className:m("subject")},p),e.createElement("i",{className:m("ico-subject")},f)))),e.createElement("div",{ref:y,className:m("accor-bd")},e.createElement("div",{className:m("accor-bd-inner")},v)))};export{d as default};