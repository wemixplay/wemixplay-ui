import{__require as r}from"./_hashClear.js";import{__require as e}from"./_hashDelete.js";import{__require as t}from"./_hashGet.js";import{__require as o}from"./_hashHas.js";import{__require as s}from"./_hashSet.js";var a,_;function i(){if(_)return a;_=1;var i=r(),p=e(),h=t(),u=o(),m=s();function f(r){var e=-1,t=null==r?0:r.length;for(this.clear();++e<t;){var o=r[e];this.set(o[0],o[1])}}return f.prototype.clear=i,f.prototype.delete=p,f.prototype.get=h,f.prototype.has=u,f.prototype.set=m,a=f}export{i as __require};
