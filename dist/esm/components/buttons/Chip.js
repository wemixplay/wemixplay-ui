import{__rest as e}from"../../_virtual/_tslib.js";import t from"react";import{makeCxFunc as s}from"../../utils/forReactUtils.js";import l from"./Chip.module.scss.js";import a from"../../assets/svgs/ico-close-black.svg.js";var c=s(l),i=function(s){var l=s.className,i=void 0===l?"":l,o=s.closeElement,m=void 0===o?t.createElement(a,null):o,r=s.disabled,n=s.handleClickClose,d=e(s,["className","closeElement","disabled","handleClickClose"]);return t.createElement("button",{type:"button",disabled:r,className:c(i,"chip",{disabled:r}),onClick:n&&n},t.createElement("span",{className:c("text")},"text"in d?d.text:d.children),!!n&&t.createElement("span",{className:c("delete-btn")},t.createElement("span",{className:c("blind")},"delete"),m))};export{i as default};