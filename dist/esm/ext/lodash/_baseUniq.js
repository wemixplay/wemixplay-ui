import{_ as r}from"./_SetCache.js";import{_ as s}from"./_createSet.js";import{_ as a}from"./_setToArray.js";import{_ as e}from"./_arrayIncludes.js";import{_ as o}from"./_arrayIncludesWith.js";import{_ as t}from"./_cacheHas.js";var f=r,i=e,_=o,m=t,n=s,p=a;var u=function(r,s,a){var e=-1,o=i,t=r.length,u=!0,h=[],l=h;if(a)u=!1,o=_;else if(t>=200){var c=s?null:n(r);if(c)return p(c);u=!1,o=m,l=new f}else l=s?[]:h;r:for(;++e<t;){var j=r[e],v=s?s(j):j;if(j=a||0!==j?j:0,u&&v==v){for(var y=l.length;y--;)if(l[y]===v)continue r;s&&l.push(v),h.push(j)}else o(l,v,a)||(l!==h&&l.push(v),h.push(j))}return h};export{u as _};
