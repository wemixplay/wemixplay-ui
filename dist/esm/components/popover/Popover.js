import e from"react";import t from"./Popover.module.scss.js";import s from"../../assets/svgs/ico-close-black.svg.js";import{makeCxFunc as o}from"../../utils/forReactUtils.js";const l=o(t);var r=t=>{let{className:o="",children:r,title:a,closeElement:c=e.createElement(s,null),hideCloseBtn:m,hideHeader:i,close:n}=t;return e.createElement("div",{className:l("popover",o)},!m&&e.createElement("button",{type:"button",onClick:n,className:l("btn-close")},c),!i&&e.createElement("div",{className:l("popover-header")},!!a&&e.createElement("h2",{className:l("popover-header-title")},a)),e.createElement("div",{className:l("popover-body")},r))};export{r as default};
