"use strict";var e,r,i=require("./_SetCache.js"),t=require("./_arraySome.js"),u=require("./_cacheHas.js");exports.__require=function(){if(r)return e;r=1;var n=i.__require(),a=t.__require(),f=u.__require();return e=function(e,r,i,t,u,s){var _=1&i,o=e.length,v=r.length;if(o!=v&&!(_&&v>o))return!1;var c=s.get(e),q=s.get(r);if(c&&q)return c==r&&q==e;var h=-1,l=!0,d=2&i?new n:void 0;for(s.set(e,r),s.set(r,e);++h<o;){var g=e[h],b=r[h];if(t)var j=_?t(b,g,h,r,e,s):t(g,b,h,e,r,s);if(void 0!==j){if(j)continue;l=!1;break}if(d){if(!a(r,(function(e,r){if(!f(d,r)&&(g===e||u(g,e,i,t,s)))return d.push(r)}))){l=!1;break}}else if(g!==b&&!u(g,b,i,t,s)){l=!1;break}}return s.delete(e),s.delete(r),l}};