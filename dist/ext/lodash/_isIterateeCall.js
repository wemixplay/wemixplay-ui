"use strict";var e=require("./eq.js"),r=require("./isArrayLike.js"),i=require("./_isIndex.js"),s=require("./isObject.js"),t=e.eq_1,n=r.isArrayLike_1,u=i._isIndex,a=s.isObject_1;var j=function(e,r,i){if(!a(i))return!1;var s=typeof r;return!!("number"==s?n(i)&&u(r,i.length):"string"==s&&r in i)&&t(i[r],e)};exports._isIterateeCall=j;
