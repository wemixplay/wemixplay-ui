import e from'./../../../ext/lodash/lowerCase.js';import o,{useMemo as t,useCallback as a}from"react";import{makeCxFunc as l}from"../../../utils/forReactUtils.js";import n from"./Option.module.scss.js";var r=l(n),s=function(l){var n=l.className,s=void 0===n?"":n,i=l.text,d=l.value,u=l.label,c=l.children,m=l.selectedValue,v=void 0===m?"":m,f=l.searchText,p=void 0===f?"":f,b=l.disabled,h=l.handleChange,x=t((function(){return!!p&&e(i).includes(e(p))}),[i,p]),j=a((function(e){2===e.button||b||h&&h({label:null!=u?u:c,value:d})}),[c,b,h,d,u]);return o.createElement("div",{className:r(s,"option",{active:v===d,match:x,disabled:b}),role:"button",tabIndex:-1,onMouseDown:j},c)};s.displayName="Option";var i=s;export{i as default};
