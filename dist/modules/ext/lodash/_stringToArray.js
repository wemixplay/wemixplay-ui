"use strict";var r=require("./_asciiToArray.js"),i=require("./_hasUnicode.js"),e=require("./_unicodeToArray.js"),a=r._asciiToArray,o=i._hasUnicode,s=e._unicodeToArray;var c=function(r){return o(r)?s(r):a(r)};exports._stringToArray=c;
