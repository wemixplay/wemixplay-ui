import{__require as r}from"./_ListCache.js";import{__require as e}from"./_stackClear.js";import{__require as t}from"./_stackDelete.js";import{__require as s}from"./_stackGet.js";import{__require as o}from"./_stackHas.js";import{__require as _}from"./_stackSet.js";var a,i;function p(){if(i)return a;i=1;var p=r(),m=e(),u=t(),c=s(),f=o(),n=_();function q(r){var e=this.__data__=new p(r);this.size=e.size}return q.prototype.clear=m,q.prototype.delete=u,q.prototype.get=c,q.prototype.has=f,q.prototype.set=n,a=q}export{p as __require};