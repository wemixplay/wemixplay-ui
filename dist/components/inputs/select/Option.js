"use strict";var e=require("../../../node_modules/lodash/lowerCase.js"),l=require("react"),a=require("../../../utils/forReactUtils.js"),s=require("./Option.module.scss.js");const t=a.makeCxFunc(s),o=a=>{let{className:s="",text:o,value:r,label:u,children:n,selectedValue:c="",searchText:i="",disabled:d,handleChange:m}=a;const b=l.useMemo((()=>!!i&&e(o).includes(e(i))),[o,i]),h=l.useCallback((e=>{2===e.button||d||m&&m({label:null!=u?u:n,value:r})}),[n,d,m,r,u]);return l.createElement("div",{className:t(s,"option",{active:c===r,match:b,disabled:d}),role:"button",tabIndex:-1,onMouseDown:h},n)};o.displayName="Option";var r=o;module.exports=r;
