import{_ as r}from"./_assignMergeValue.js";import{_ as s}from"./_cloneBuffer.js";import{_ as i}from"./_cloneTypedArray.js";import{_ as o}from"./_copyArray.js";import{_ as a}from"./_initCloneObject.js";import{i as m}from"./isArguments.js";import{i as t}from"./isArray.js";import{i as e}from"./isArrayLikeObject.js";import{i as f}from"./isBuffer.js";import{i as j}from"./isFunction.js";import{i as p}from"./isObject.js";import{i as _}from"./isPlainObject.js";import{i as n}from"./isTypedArray.js";import{t as c}from"./toPlainObject.js";import{_ as l}from"./_safeGet.js";var y=r,v=s,u=i,A=o,b=a,d=m,O=t,g=e,B=f,P=j,T=p,k=_,x=n,C=l,F=c;var G=function(r,s,i,o,a,m,t){var e=C(r,i),f=C(s,i),j=t.get(f);if(j)y(r,i,j);else{var p=m?m(e,f,i+"",r,s,t):void 0,_=void 0===p;if(_){var n=O(f),c=!n&&B(f),l=!n&&!c&&x(f);p=f,n||c||l?O(e)?p=e:g(e)?p=A(e):c?(_=!1,p=v(f,!0)):l?(_=!1,p=u(f,!0)):p=[]:k(f)||d(f)?(p=e,d(e)?p=F(e):T(e)&&!P(e)||(p=b(f))):_=!1}_&&(t.set(f,p),a(p,f,o,m,t),t.delete(f)),y(r,i,p)}};export{G as _};
