"use strict";var e=require('./../../../ext/lodash/lowerCase.js'),a=require("react"),l=require("../../../utils/forReactUtils.js"),t=require("./Option.module.scss.js"),s=l.makeCxFunc(t),o=function(l){var t=l.className,o=void 0===t?"":t,u=l.text,n=l.value,r=l.label,i=l.children,d=l.selectedValue,c=void 0===d?"":d,m=l.searchText,v=void 0===m?"":m,b=l.disabled,h=l.handleChange,p=a.useMemo((function(){return!!v&&e(u).includes(e(v))}),[u,v]),x=a.useCallback((function(e){2===e.button||b||h&&h({label:null!=r?r:i,value:n})}),[i,b,h,n,r]);return a.createElement("div",{className:s(o,"option",{active:c===n,match:p,disabled:b}),role:"button",tabIndex:-1,onMouseDown:x},i)};o.displayName="Option";var u=o;module.exports=u;
