import{_ as t}from"./_mapCacheClear.js";import{_ as e}from"./_mapCacheDelete.js";import{_ as a}from"./_mapCacheGet.js";import{_ as r}from"./_mapCacheHas.js";import{_ as o}from"./_mapCacheSet.js";var p=t,s=e,m=a,_=r,h=o;function c(t){var e=-1,a=null==t?0:t.length;for(this.clear();++e<a;){var r=t[e];this.set(r[0],r[1])}}c.prototype.clear=p,c.prototype.delete=s,c.prototype.get=m,c.prototype.has=_,c.prototype.set=h;var i=c;export{i as _};
