import{_ as r}from"./_Stack.js";import{_ as a}from"./_baseIsEqual.js";var i=r,e=a;var n=function(r,a,n,t){var f=n.length,o=f,v=!t;if(null==r)return!o;for(r=Object(r);f--;){var s=n[f];if(v&&s[2]?s[1]!==r[s[0]]:!(s[0]in r))return!1}for(;++f<o;){var u=(s=n[f])[0],l=r[u],_=s[1];if(v&&s[2]){if(void 0===l&&!(u in r))return!1}else{var m=new i;if(t)var c=t(l,_,u,r,a,m);if(!(void 0===c?e(_,l,3,t,m):c))return!1}}return!0};export{n as _};
