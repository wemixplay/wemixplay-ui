"use strict";var e=require("@babel/runtime/regenerator"),r=require("../_virtual/_tslib.js"),t=require("../_virtual/get.js"),n=function(t){return new Promise((function(n,a){var i=new FileReader;i.onload=function(){return r.__awaiter(void 0,void 0,void 0,e.mark((function r(){var t;return e.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:"string"==typeof i.result?n(i.result):(t=new TextDecoder,n(t.decode(i.result)));case 1:case"end":return e.stop()}}),r)})))},i.onerror=a,i.readAsDataURL(t)}))},a=function(e,r){return new Promise((function(t,n){/\.(jpg|jpeg|png|gif|webp)$/i.test(e.name)?t(!0):(r&&(r.target.value=""),n(new Error("onlyImage")))}))};exports.imageFileUpload=function(i){return r.__awaiter(void 0,void 0,void 0,e.mark((function r(){var o,u;return e.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(o=t(i,"target.files[0]",null))){e.next=8;break}return e.next=4,a(o,i);case 4:return e.next=6,n(o);case 6:return u=e.sent,e.abrupt("return",{file:o,dataUrl:u||""});case 8:throw new Error("uploadFailed");case 9:case"end":return e.stop()}}),r)})))},exports.readAsDataURLAsync=n;