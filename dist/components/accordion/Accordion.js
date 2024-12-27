"use strict";var e=require("react"),r=require("../../utils/forReactUtils.js"),t=require("../../assets/svgs/ico-accordion.svg.js"),c=require("../ripple/Ripple.js"),a=require("./Accordion.module.scss.js");const l=r.makeCxFunc(a);var s=r=>{let{className:a="",name:s,title:n,ripple:o={disabled:!0},icon:i=e.createElement(t,null),borderColor:u,open:d,initialOpen:m,children:f,disabled:p,handleOpenChange:b}=r;const h=e.useRef(null),g=e.useRef(null),v=e.useId(),E=e.useMemo((()=>{if("undefined"==typeof window)return;let e=0;return new ResizeObserver((r=>{for(const t of r){const r=t.target;r.scrollHeight!==e&&h.current&&(e=Number(h.current.style.maxHeight.replace("px","")),h.current.style.maxHeight="".concat(r.scrollHeight,"px"))}}))}),[]),x=e.useCallback((e=>{const r=e.target;if(r&&h.current){if(s){const e=document.querySelectorAll('input[name="'.concat(s,'"]'));Array.from(e).filter((e=>e.id!==r.id)).forEach((e=>{e.checked=!1}))}b&&b(r.checked,e)}}),[b,s]);return e.useEffect((()=>{const e=h.current;if(e)return e.style.maxHeight="".concat(e.scrollHeight,"px"),E&&E.observe(e),()=>{E&&E.unobserve(e)}}),[E,f]),e.createElement("div",{className:l("accordion",a,{open:"boolean"==typeof d?d:m,disabled:p}),style:{"--accor-border-color":u}},e.createElement("input",{ref:g,tabIndex:-1,type:"checkbox",name:s,id:v,value:v,disabled:p,defaultChecked:m,checked:d,onChange:x}),e.createElement("label",{htmlFor:v},e.createElement(c.default,Object.assign({},o),e.createElement("div",{className:l("accor-hd")},e.createElement("span",{className:l("subject")},n),e.createElement("i",{className:l("ico-subject")},i)))),e.createElement("div",{ref:h,className:l("accor-bd")},e.createElement("div",{className:l("accor-bd-inner")},f)))};module.exports=s;
