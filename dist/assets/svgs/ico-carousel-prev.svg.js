"use strict";function e(e){var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var t,r=e(require("react")),n=["title","titleId"];function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},l.apply(null,arguments)}module.exports=function(e){var i=e.title,a=e.titleId,u=function(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||{}.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}(e,n);return r.createElement("svg",l({width:26,height:26,viewBox:"0 0 26 26",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-labelledby":a},u),i?r.createElement("title",{id:a},i):null,t||(t=r.createElement("path",{d:"M17.7868 3.33632C18.3367 3.8863 18.3367 4.77801 17.7868 5.32799L10.116 12.9988L17.7868 20.6696C18.3367 21.2196 18.3367 22.1113 17.7868 22.6613C17.2368 23.2112 16.3451 23.2112 15.7951 22.6613L7.12846 13.9946C6.57847 13.4446 6.57847 12.5529 7.12846 12.003L15.7951 3.33632C16.3451 2.78633 17.2368 2.78633 17.7868 3.33632Z",fill:"#171719"})))};
