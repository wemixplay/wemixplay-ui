"use strict";var r=require("./_Stack.js"),e=require("./_baseIsEqual.js"),a=r._Stack,i=e._baseIsEqual;var t=function(r,e,t,n){var s=t.length,u=s,f=!n;if(null==r)return!u;for(r=Object(r);s--;){var v=t[s];if(f&&v[2]?v[1]!==r[v[0]]:!(v[0]in r))return!1}for(;++s<u;){var c=(v=t[s])[0],l=r[c],o=v[1];if(f&&v[2]){if(void 0===l&&!(c in r))return!1}else{var _=new a;if(n)var b=n(l,o,c,r,e,_);if(!(void 0===b?i(o,l,3,n,_):b))return!1}}return!0};exports._baseIsMatch=t;
