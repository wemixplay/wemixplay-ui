import{__require as r}from"./_SetCache.js";import{__require as e}from"./_arraySome.js";import{__require as i}from"./_cacheHas.js";var t,a;function f(){if(a)return t;a=1;var f=r(),n=e(),o=i();return t=function(r,e,i,t,a,u){var s=1&i,_=r.length,v=e.length;if(_!=v&&!(s&&v>_))return!1;var c=u.get(r),m=u.get(e);if(c&&m)return c==e&&m==r;var h=-1,l=!0,p=2&i?new f:void 0;for(u.set(r,e),u.set(e,r);++h<_;){var d=r[h],g=e[h];if(t)var q=s?t(g,d,h,e,r,u):t(d,g,h,r,e,u);if(void 0!==q){if(q)continue;l=!1;break}if(p){if(!n(e,(function(r,e){if(!o(p,e)&&(d===r||a(d,r,i,t,u)))return p.push(e)}))){l=!1;break}}else if(d!==g&&!a(d,g,i,t,u)){l=!1;break}}return u.delete(r),u.delete(e),l}}export{f as __require};