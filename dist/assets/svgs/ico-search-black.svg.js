"use strict";function e(e){var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var t,r,n=e(require("react")),l=["title","titleId"];function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i.apply(null,arguments)}module.exports=function(e){var a=e.title,c=e.titleId,u=function(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.includes(n))continue;r[n]=e[n]}return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.includes(r)||{}.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}(e,l);return n.createElement("svg",i({width:32,height:32,viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-labelledby":c},u),a?n.createElement("title",{id:c},a):null,t||(t=n.createElement("path",{d:"M18.7761 17.8906L26.2702 25.3848C26.5306 25.6451 26.5306 26.0672 26.2702 26.3276C26.0099 26.5879 25.5878 26.5879 25.3274 26.3276L17.8333 18.8334L18.7761 17.8906Z",fill:"black"})),r||(r=n.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M13.3333 20C17.0152 20 19.9999 17.0152 19.9999 13.3333C19.9999 9.65141 17.0152 6.66665 13.3333 6.66665C9.65135 6.66665 6.66659 9.65141 6.66659 13.3333C6.66659 17.0152 9.65135 20 13.3333 20ZM13.3333 21.3333C17.7515 21.3333 21.3333 17.7516 21.3333 13.3333C21.3333 8.91504 17.7515 5.33331 13.3333 5.33331C8.91497 5.33331 5.33325 8.91504 5.33325 13.3333C5.33325 17.7516 8.91497 21.3333 13.3333 21.3333Z",fill:"black"})))};