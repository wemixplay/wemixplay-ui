import e from"react";import t from"./Popover.module.scss.js";import o from"../../assets/svgs/ico-close-black.svg.js";import{makeCxFunc as s}from"../../utils/forReactUtils.js";var r=s(t),a=function(t){var s=t.className,a=void 0===s?"":s,l=t.children,c=t.title,m=t.closeElement,i=void 0===m?e.createElement(o,null):m,n=t.hideCloseBtn,p=t.hideHeader,d=t.close;return e.createElement("div",{className:r("popover",a)},!n&&e.createElement("button",{type:"button",onClick:d,className:r("btn-close")},i),!p&&e.createElement("div",{className:r("popover-header")},!!c&&e.createElement("h2",{className:r("popover-header-title")},c)),e.createElement("div",{className:r("popover-body")},l))};export{a as default};