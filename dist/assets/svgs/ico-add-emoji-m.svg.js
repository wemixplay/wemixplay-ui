"use strict";function e(e){var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var t,r=e(require("react")),n=["title","titleId"];function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},l.apply(null,arguments)}module.exports=function(e){var i=e.title,u=e.titleId,a=function(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.includes(n))continue;r[n]=e[n]}return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.includes(r)||{}.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}(e,n);return r.createElement("svg",l({xmlns:"http://www.w3.org/2000/svg",width:22,height:23,viewBox:"0 0 22 23",fill:"none","aria-labelledby":u},a),i?r.createElement("title",{id:u},i):null,t||(t=r.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M16.9643 9.57859V9.5787H18.4443V7.02256H21.0006V5.54269H18.4443V3H16.9643V5.54269H15.0892C15.0892 5.54265 15.0891 5.54261 15.0891 5.54257H14.4194V7.02244H14.4214V7.02256H16.9643V7.83581C16.9636 7.83458 16.9629 7.83336 16.9622 7.83213V9.57859H16.9643ZM16.4992 12.0003C16.4992 11.7641 16.4875 11.5307 16.4646 11.3006H18.0209C18.0396 11.5314 18.0492 11.7647 18.0492 12.0003C18.0492 16.708 14.2326 20.5244 9.52458 20.5244C4.81658 20.5244 1 16.708 1 12.0003C1 7.29259 4.81658 3.47624 9.52458 3.47624C10.6459 3.47624 11.7166 3.69272 12.6972 4.08616V5.78773C11.7455 5.30077 10.6671 5.02607 9.52458 5.02607C5.67258 5.02607 2.54992 8.14854 2.54992 12.0003C2.54992 15.8521 5.67258 18.9745 9.52458 18.9745C13.3766 18.9745 16.4992 15.8521 16.4992 12.0003ZM7.80244 10.2783C7.80244 10.7538 7.41693 11.1393 6.94138 11.1393C6.46582 11.1393 6.08031 10.7538 6.08031 10.2783C6.08031 9.80274 6.46582 9.41725 6.94138 9.41725C7.41693 9.41725 7.80244 9.80274 7.80244 10.2783ZM12.9689 10.2783C12.9689 10.7538 12.5833 11.1393 12.1078 11.1393C11.6322 11.1393 11.2467 10.7538 11.2467 10.2783C11.2467 9.80274 11.6322 9.41725 12.1078 9.41725C12.5833 9.41725 12.9689 9.80274 12.9689 10.2783ZM7.61146 13.1609C7.39647 12.7908 6.92216 12.6651 6.55208 12.8801C6.182 13.0951 6.05629 13.5694 6.27129 13.9394C6.92895 15.0714 8.15982 15.8405 9.56763 15.8405C10.9754 15.8405 12.2063 15.0714 12.864 13.9394C13.079 13.5694 12.9533 13.0951 12.5832 12.8801C12.2131 12.6651 11.7388 12.7908 11.5238 13.1609C11.131 13.8371 10.3986 14.2906 9.56763 14.2906C8.73667 14.2906 8.0043 13.8371 7.61146 13.1609Z",fill:"#F7F7F8"})))};
