import{lowerCase as e}from"lodash-es";import t,{useMemo as o,useCallback as a}from"react";import{makeCxFunc as l}from"../../../utils/forReactUtils.js";import i from"./Option.module.scss.js";var n=l(i),r=function(l){var i=l.className,r=void 0===i?"":i,s=l.text,d=l.value,u=l.label,c=l.children,m=l.selectedValue,f=void 0===m?"":m,p=l.searchText,v=void 0===p?"":p,b=l.disabled,h=l.handleChange,x=o((function(){return!!v&&e(s).includes(e(v))}),[s,v]),N=a((function(e){2===e.button||b||h&&h({label:null!=u?u:c,value:d})}),[c,b,h,d,u]);return t.createElement("div",{className:n(r,"option",{active:f===d,match:x,disabled:b}),role:"button",tabIndex:-1,onMouseDown:N},c)};r.displayName="Option";export{r as default};
