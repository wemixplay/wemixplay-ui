"use strict";function e(e){var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var t,r=e(require("react")),n=["title","titleId"];function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},l.apply(null,arguments)}module.exports=function(e){var i=e.title,a=e.titleId,u=function(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.includes(n))continue;r[n]=e[n]}return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.includes(r)||{}.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}(e,n);return r.createElement("svg",l({width:16,height:16,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-labelledby":a},u),i?r.createElement("title",{id:a},i):null,t||(t=r.createElement("path",{d:"M13.1132 4.38729C13.4516 4.72575 13.4516 5.27449 13.1132 5.61295L7.11316 11.6129C6.77471 11.9514 6.22596 11.9514 5.88751 11.6129L2.88751 8.61295C2.54905 8.27449 2.54905 7.72575 2.88751 7.38729C3.22596 7.04884 3.77471 7.04884 4.11316 7.38729L6.50034 9.77447L11.8875 4.38729C12.226 4.04884 12.7747 4.04884 13.1132 4.38729Z",fill:"white"})))};