'use client';
"use strict";var e=require("react"),c=require("../../utils/forReactUtils.js"),i=require("./Accordion.js"),a=require("./AccordionGroup.module.scss.js");const r=c.makeCxFunc(a);var n=c=>{let{className:a,list:n,ripple:o,icon:s,isToggle:l,initialOpen:t=!1,handleClickAccordion:u}=c;const p=e.useId(),d="accordion-group-".concat(p);return e.createElement("div",{className:r(a,"accordion-group")},(null!=n?n:[]).map(((c,a)=>e.createElement(i,Object.assign({key:"".concat(c.title,"-").concat(a)},c,{icon:s,className:r("accordion",c.className),ripple:null!=o?o:c.ripple,handleOpenChange:(e,i)=>u({status:e,key:c.key,e:i}),initialOpen:t,name:l?d:void 0})))))};module.exports=n;
