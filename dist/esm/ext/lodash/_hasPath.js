import{_ as r}from"./_castPath.js";import{i as s}from"./isArguments.js";import{i as o}from"./isArray.js";import{_ as t}from"./_isIndex.js";import{i as a}from"./isLength.js";import{_ as i}from"./_toKey.js";var m=r,n=s,e=o,f=t,p=a,_=i;var j=function(r,s,o){for(var t=-1,a=(s=m(s,r)).length,i=!1;++t<a;){var j=_(s[t]);if(!(i=null!=r&&o(r,j)))break;r=r[j]}return i||++t!=a?i:!!(a=null==r?0:r.length)&&p(a)&&f(j,a)&&(e(r)||n(r))};export{j as _};