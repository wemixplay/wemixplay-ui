"use strict";var r=require("./_arrayMap.js"),i=require("./isArray.js"),e=require("./isSymbol.js"),t=require("./_Symbol.js")._Symbol,a=r._arrayMap,o=i.isArray_1,s=e.isSymbol_1,u=t?t.prototype:void 0,y=u?u.toString:void 0;var n=function r(i){if("string"==typeof i)return i;if(o(i))return a(i,r)+"";if(s(i))return y?y.call(i):"";var e=i+"";return"0"==e&&1/i==-1/0?"-0":e};exports._baseToString=n;
