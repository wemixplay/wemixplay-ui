"use strict";var e=require("./_getRawTag.js"),t=require("./_objectToString.js"),r=require("./_Symbol.js")._Symbol,o=e._getRawTag,i=t._objectToString,n=r?r.toStringTag:void 0;var a=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":n&&n in Object(e)?o(e):i(e)};exports._baseGetTag=a;
