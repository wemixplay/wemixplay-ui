"use strict";var e=require("react"),r=require("../../utils/forReactUtils.js"),t=require("../../assets/svgs/ico-accordion.svg.js"),n=require("../ripple/Ripple.js"),a=require("./Accordion.module.scss.js");function c(e,r){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=function(e,r){if(e){if("string"==typeof e)return o(e,r);var t={}.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?o(e,r):void 0}}(e))||r){t&&(e=t);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,i=!0,l=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return i=e.done,e},e:function(e){l=!0,c=e},f:function(){try{i||null==t.return||t.return()}finally{if(l)throw c}}}}function o(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=Array(r);t<r;t++)n[t]=e[t];return n}var i=r.makeCxFunc(a);module.exports=function(r){var a=r.className,o=void 0===a?"":a,l=r.name,u=r.title,s=r.ripple,d=void 0===s?{disabled:!0}:s,f=r.icon,m=void 0===f?e.createElement(t,null):f,v=r.borderColor,b=r.open,h=r.initialOpen,p=r.children,y=r.disabled,g=r.handleOpenChange,E=e.useRef(null),x=e.useRef(null),j=e.useId(),A=e.useMemo((function(){if("undefined"!=typeof window){var e=0;return new ResizeObserver((function(r){var t,n=c(r);try{for(n.s();!(t=n.n()).done;){var a=t.value.target;a.scrollHeight!==e&&E.current&&(e=Number(E.current.style.maxHeight.replace("px","")),E.current.style.maxHeight="".concat(a.scrollHeight,"px"))}}catch(e){n.e(e)}finally{n.f()}}))}}),[]),N=e.useCallback((function(e){var r=e.target;if(r&&E.current){if(l){var t=document.querySelectorAll('input[name="'.concat(l,'"]'));Array.from(t).filter((function(e){return e.id!==r.id})).forEach((function(e){e.checked=!1}))}g&&g(r.checked,e)}}),[g,l]);return e.useEffect((function(){var e=E.current;if(e)return e.style.maxHeight="".concat(e.scrollHeight,"px"),A&&A.observe(e),function(){A&&A.unobserve(e)}}),[A,p]),e.createElement("div",{className:i("accordion",o,{open:"boolean"==typeof b?b:h,disabled:y}),style:{"--accor-border-color":v}},e.createElement("input",{ref:x,tabIndex:-1,type:"checkbox",name:l,id:j,value:j,disabled:y,defaultChecked:h,checked:b,onChange:N}),e.createElement("label",{htmlFor:j},e.createElement(n.default,Object.assign({},d),e.createElement("div",{className:i("accor-hd")},e.createElement("span",{className:i("subject")},u),e.createElement("i",{className:i("ico-subject")},m)))),e.createElement("div",{ref:E,className:i("accor-bd")},e.createElement("div",{className:i("accor-bd-inner")},p)))};
