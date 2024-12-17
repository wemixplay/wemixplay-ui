import e,{useRef as r,useId as t,useMemo as n,useCallback as o,useEffect as a}from"react";import{makeCxFunc as c}from"../../utils/forReactUtils.js";import i from"../../assets/svgs/ico-accordion.svg.js";import l from"../ripple/Ripple.js";import s from"./Accordion.module.scss.js";function u(e,r){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=function(e,r){if(e){if("string"==typeof e)return f(e,r);var t={}.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?f(e,r):void 0}}(e))||r){t&&(e=t);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,i=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return c=e.done,e},e:function(e){i=!0,a=e},f:function(){try{c||null==t.return||t.return()}finally{if(i)throw a}}}}function f(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=Array(r);t<r;t++)n[t]=e[t];return n}var d=c(s),m=function(c){var s=c.className,f=void 0===s?"":s,m=c.name,p=c.title,v=c.ripple,b=void 0===v?{disabled:!0}:v,h=c.icon,y=void 0===h?e.createElement(i,null):h,g=c.borderColor,E=c.open,x=c.initialOpen,j=c.children,A=c.disabled,N=c.handleOpenChange,w=r(null),H=r(null),S=t(),k=n((function(){if("undefined"!=typeof window){var e=0;return new ResizeObserver((function(r){var t,n=u(r);try{for(n.s();!(t=n.n()).done;){var o=t.value.target;o.scrollHeight!==e&&w.current&&(e=Number(w.current.style.maxHeight.replace("px","")),w.current.style.maxHeight="".concat(o.scrollHeight,"px"))}}catch(e){n.e(e)}finally{n.f()}}))}}),[]),C=o((function(e){var r=e.target;if(r&&w.current){if(m){var t=document.querySelectorAll('input[name="'.concat(m,'"]'));Array.from(t).filter((function(e){return e.id!==r.id})).forEach((function(e){e.checked=!1}))}N&&N(r.checked,e)}}),[N,m]);return a((function(){var e=w.current;if(e)return e.style.maxHeight="".concat(e.scrollHeight,"px"),k&&k.observe(e),function(){k&&k.unobserve(e)}}),[k,j]),e.createElement("div",{className:d("accordion",f,{open:"boolean"==typeof E?E:x,disabled:A}),style:{"--accor-border-color":g}},e.createElement("input",{ref:H,tabIndex:-1,type:"checkbox",name:m,id:S,value:S,disabled:A,defaultChecked:x,checked:E,onChange:C}),e.createElement("label",{htmlFor:S},e.createElement(l,Object.assign({},b),e.createElement("div",{className:d("accor-hd")},e.createElement("span",{className:d("subject")},p),e.createElement("i",{className:d("ico-subject")},y)))),e.createElement("div",{ref:w,className:d("accor-bd")},e.createElement("div",{className:d("accor-bd-inner")},j)))};export{m as default};