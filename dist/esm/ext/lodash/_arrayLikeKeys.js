import{_ as r}from"./_baseTimes.js";import{i as s}from"./isArguments.js";import{i as t}from"./isBuffer.js";import{_ as e}from"./_isIndex.js";import{i}from"./isTypedArray.js";import{i as o}from"./isArray.js";var a=r,f=s,m=o,n=t,p=e,j=i,y=Object.prototype.hasOwnProperty;var g=function(r,s){var t=m(r),e=!t&&f(r),i=!t&&!e&&n(r),o=!t&&!e&&!i&&j(r),g=t||e||i||o,h=g?a(r.length,String):[],u=h.length;for(var b in r)!s&&!y.call(r,b)||g&&("length"==b||i&&("offset"==b||"parent"==b)||o&&("buffer"==b||"byteLength"==b||"byteOffset"==b)||p(b,u))||h.push(b);return h};export{g as _};