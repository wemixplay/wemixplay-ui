import{getDefaultExportFromCjs as t}from"../../_virtual/_commonjsHelpers.js";import{i}from"./isObject.js";import{t as r}from"./toNumber.js";import{n}from"./now.js";var o=i,e=n,u=r,a=Math.max,f=Math.min;var m=t((function(t,i,r){var n,m,c,v,s,d,l=0,p=!1,T=!1,j=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function h(i){var r=n,o=m;return n=m=void 0,l=i,v=t.apply(o,r)}function x(t){var r=t-d;return void 0===d||r>=i||r<0||T&&t-l>=c}function g(){var t=e();if(x(t))return w(t);s=setTimeout(g,function(t){var r=i-(t-d);return T?f(r,c-(t-l)):r}(t))}function w(t){return s=void 0,j&&n?h(t):(n=m=void 0,v)}function y(){var t=e(),r=x(t);if(n=arguments,m=this,d=t,r){if(void 0===s)return function(t){return l=t,s=setTimeout(g,i),p?h(t):v}(d);if(T)return clearTimeout(s),s=setTimeout(g,i),h(d)}return void 0===s&&(s=setTimeout(g,i)),v}return i=u(i)||0,o(r)&&(p=!!r.leading,c=(T="maxWait"in r)?a(u(r.maxWait)||0,i):c,j="trailing"in r?!!r.trailing:j),y.cancel=function(){void 0!==s&&clearTimeout(s),l=0,n=d=m=s=void 0},y.flush=function(){return void 0===s?v:w(e())},y}));export{m as default};
