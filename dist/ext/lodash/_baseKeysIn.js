"use strict";var r=require("./isObject.js"),e=require("./_nativeKeysIn.js"),t=require("./_isPrototype.js"),s=r.isObject_1,i=t._isPrototype,n=e._nativeKeysIn,o=Object.prototype.hasOwnProperty;var a=function(r){if(!s(r))return n(r);var e=i(r),t=[];for(var a in r)("constructor"!=a||!e&&o.call(r,a))&&t.push(a);return t};exports._baseKeysIn=a;
