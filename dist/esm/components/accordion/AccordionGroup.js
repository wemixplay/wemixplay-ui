import e,{useId as o}from"react";import{makeCxFunc as c}from"../../utils/forReactUtils.js";import a from"./Accordion.js";import i from"./AccordionGroup.module.scss.js";const t=c(i);var n=c=>{let{className:i,list:n,ripple:r,icon:l,isToggle:s,initialOpen:p=!1,handleClickAccordion:m}=c;const d=o(),u="accordion-group-".concat(d);return e.createElement("div",{className:t(i,"accordion-group")},(null!=n?n:[]).map(((o,c)=>e.createElement(a,Object.assign({key:"".concat(o.title,"-").concat(c)},o,{icon:l,className:t("accordion",o.className),ripple:null!=r?r:o.ripple,handleOpenChange:(e,c)=>m({status:e,key:o.key,e:c}),initialOpen:p,name:s?u:void 0})))))};export{n as default};