import e from"react";import{makeCxFunc as s}from"../../utils/forReactUtils.js";import a from"./NoImage.module.scss.js";import m from"../image/WpImage.js";const t="/assets/imgs/noimage-placeholder.svg",r=s(a);var o=s=>{let{className:a="",src:o=t,style:l}=s;return e.createElement("div",{className:r("no-image",a),style:l},e.createElement(m,{className:r("img"),src:o,alt:"No Image"}))};export{o as default};
