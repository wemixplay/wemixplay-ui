"use strict";var r=require("../../_virtual/_commonjsHelpers.js"),t=require("./isObject.js"),i=require("./toNumber.js"),e=require("./now.js"),n=t.isObject_1,o=e.now_1,u=i.toNumber_1,a=Math.max,c=Math.min;var f=function(r,t,i){var e,f,s,v,m,d,l=0,j=!1,p=!1,T=!0;if("function"!=typeof r)throw new TypeError("Expected a function");function x(t){var i=e,n=f;return e=f=void 0,l=t,v=r.apply(n,i)}function h(r){var i=r-d;return void 0===d||i>=t||i<0||p&&r-l>=s}function _(){var r=o();if(h(r))return b(r);m=setTimeout(_,function(r){var i=t-(r-d);return p?c(i,s-(r-l)):i}(r))}function b(r){return m=void 0,T&&e?x(r):(e=f=void 0,v)}function g(){var r=o(),i=h(r);if(e=arguments,f=this,d=r,i){if(void 0===m)return function(r){return l=r,m=setTimeout(_,t),j?x(r):v}(d);if(p)return clearTimeout(m),m=setTimeout(_,t),x(d)}return void 0===m&&(m=setTimeout(_,t)),v}return t=u(t)||0,n(i)&&(j=!!i.leading,s=(p="maxWait"in i)?a(u(i.maxWait)||0,t):s,T="trailing"in i?!!i.trailing:T),g.cancel=function(){void 0!==m&&clearTimeout(m),l=0,e=d=f=m=void 0},g.flush=function(){return void 0===m?v:b(o())},g},s=r.getDefaultExportFromCjs(f);module.exports=s;