"use strict";function e(e){var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var t,r,n=e(require("react")),l=["title","titleId"];function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i.apply(null,arguments)}module.exports=function(e){var a=e.title,c=e.titleId,u=function(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||{}.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}(e,l);return n.createElement("svg",i({width:10,height:12,viewBox:"0 0 10 12",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-labelledby":c},u),a?n.createElement("title",{id:c},a):null,t||(t=n.createElement("path",{d:"M5.70711 11.2929C5.31658 11.6834 4.68342 11.6834 4.29289 11.2929L1.28033 8.28033C0.807857 7.80786 1.14248 7 1.81066 7L8.18934 7C8.85752 7 9.19214 7.80786 8.71967 8.28033L5.70711 11.2929Z",fill:"#171719",className:"inactive"})),r||(r=n.createElement("path",{d:"M4.29289 0.707107C4.68342 0.316583 5.31658 0.316582 5.70711 0.707106L8.71967 3.71967C9.19214 4.19214 8.85752 5 8.18934 5H1.81066C1.14248 5 0.807855 4.19214 1.28033 3.71967L4.29289 0.707107Z",fill:"#37383C",fillOpacity:.16,className:"active"})))};
