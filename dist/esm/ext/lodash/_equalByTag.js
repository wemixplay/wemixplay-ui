import{__require as e}from"./_Symbol.js";import{__require as r}from"./_Uint8Array.js";import{__require as t}from"./eq.js";import{__require as a}from"./_equalArrays.js";import{__require as o}from"./_mapToArray.js";import{__require as s}from"./_setToArray.js";var i,c;function n(){if(c)return i;c=1;var n=e(),u=r(),f=t(),b=a(),m=o(),_=s(),j=n?n.prototype:void 0,y=j?j.valueOf:void 0;return i=function(e,r,t,a,o,s,i){switch(t){case"[object DataView]":if(e.byteLength!=r.byteLength||e.byteOffset!=r.byteOffset)return!1;e=e.buffer,r=r.buffer;case"[object ArrayBuffer]":return!(e.byteLength!=r.byteLength||!s(new u(e),new u(r)));case"[object Boolean]":case"[object Date]":case"[object Number]":return f(+e,+r);case"[object Error]":return e.name==r.name&&e.message==r.message;case"[object RegExp]":case"[object String]":return e==r+"";case"[object Map]":var c=m;case"[object Set]":var n=1&a;if(c||(c=_),e.size!=r.size&&!n)return!1;var j=i.get(e);if(j)return j==r;a|=2,i.set(e,r);var p=b(c(e),c(r),a,o,s,i);return i.delete(e),p;case"[object Symbol]":if(y)return y.call(e)==y.call(r)}return!1}}export{n as __require};
