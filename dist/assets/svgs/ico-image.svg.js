"use strict";function e(e){var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var t,r=e(require("react")),n=["title","titleId"];function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},l.apply(null,arguments)}module.exports=function(e){var i=e.title,u=e.titleId,a=function(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.includes(n))continue;r[n]=e[n]}return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.includes(r)||{}.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}(e,n);return r.createElement("svg",l({width:36,height:36,viewBox:"0 0 36 36",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-labelledby":u},a),i?r.createElement("title",{id:u},i):null,t||(t=r.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M11.0718 8.59961C10.8175 8.59959 10.5754 8.59956 10.3715 8.61623C10.1491 8.6344 9.89396 8.67678 9.63898 8.8067C9.28148 8.98886 8.99081 9.27952 8.80865 9.63703C8.67874 9.89201 8.63635 10.1471 8.61818 10.3695C8.60152 10.5735 8.60154 10.8155 8.60156 11.0699V24.9294C8.60154 25.1837 8.60152 25.4257 8.61818 25.6297C8.63635 25.8521 8.67874 26.1072 8.80865 26.3622C8.99081 26.7197 9.28148 27.0104 9.63898 27.1925C9.89396 27.3224 10.1491 27.3648 10.3715 27.383C10.5754 27.3997 10.8174 27.3996 11.0717 27.3996H24.9313C25.1856 27.3996 25.4277 27.3997 25.6317 27.383C25.8541 27.3648 26.1092 27.3224 26.3641 27.1925C26.7217 27.0104 27.0123 26.7197 27.1945 26.3622C27.3244 26.1072 27.3668 25.8521 27.385 25.6297C27.4016 25.4258 27.4016 25.1837 27.4016 24.9294V11.0699C27.4016 10.8156 27.4016 10.5735 27.385 10.3695C27.3668 10.1471 27.3244 9.89201 27.1945 9.63703C27.0123 9.27952 26.7217 8.98886 26.3641 8.8067C26.1092 8.67678 25.8541 8.6344 25.6317 8.61623C25.4277 8.59956 25.1856 8.59959 24.9313 8.59961H11.0718ZM10.4016 10.4996C10.4016 10.4443 10.4463 10.3996 10.5016 10.3996H25.5016C25.5568 10.3996 25.6016 10.4443 25.6016 10.4996V19.8274L23.0014 17.2272L19.5014 20.7272L14.5014 15.7272L10.4016 19.8271V10.4996ZM10.4016 22.3726V25.4996C10.4016 25.5548 10.4463 25.5996 10.5016 25.5996H25.5016C25.5568 25.5996 25.6016 25.5548 25.6016 25.4996V22.373L23.0014 19.7728L19.5014 23.2728L14.5014 18.2728L10.4016 22.3726ZM23.2514 14C23.2514 14.6904 22.6918 15.25 22.0014 15.25C21.3111 15.25 20.7514 14.6904 20.7514 14C20.7514 13.3096 21.3111 12.75 22.0014 12.75C22.6918 12.75 23.2514 13.3096 23.2514 14Z",fill:"#171719"})))};
