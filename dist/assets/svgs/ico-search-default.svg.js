"use strict";function e(e){var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var t,r,n=e(require("react")),l=["title","titleId"];function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i.apply(null,arguments)}module.exports=function(e){var o=e.title,a=e.titleId,u=function(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.includes(n))continue;r[n]=e[n]}return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.includes(r)||{}.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}(e,l);return n.createElement("svg",i({width:20,height:20,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-labelledby":a},u),o?n.createElement("title",{id:a},o):null,t||(t=n.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M4.1665 9.2873C4.16613 6.84465 5.8913 4.74191 8.28694 4.26504C10.6826 3.78817 13.0815 5.06999 14.0165 7.32657C14.9516 9.58316 14.1623 12.186 12.1315 13.5433C10.1007 14.9006 7.3939 14.6343 5.6665 12.9073C4.70619 11.9473 4.16662 10.6451 4.1665 9.2873Z",stroke:"#171719",strokeWidth:1.66667,strokeLinecap:"round",strokeLinejoin:"round",className:"stroke"})),r||(r=n.createElement("path",{d:"M12.9077 12.9082L15.8335 15.834",stroke:"#171719",strokeWidth:1.66667,strokeLinecap:"round",strokeLinejoin:"round",className:"stroke"})))};