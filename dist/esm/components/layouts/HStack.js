import{__rest as t}from"../../_virtual/_tslib.js";import{createElement as n}from"react";import{makeCxFunc as a}from"../../utils/forReactUtils.js";import s from"./Stack.module.scss.js";const e=a(s);var i=a=>{var{id:s,className:i,inline:l,justifyContent:c,justifyItems:o,justifySelf:f,alignItems:m,alignSelf:r,alignContent:u,columnGap:g,rowGap:p,gap:j,style:y={},children:d,tag:b="div"}=a,G=t(a,["id","className","inline","justifyContent","justifyItems","justifySelf","alignItems","alignSelf","alignContent","columnGap","rowGap","gap","style","children","tag"]);const S=(t,n)=>t?"number"==typeof t&&t>0&&t<=500:"number"==typeof n&&n>0&&n<=500;return n(b,Object.assign(Object.assign({},G),{id:s,className:e("hstack",i,{"inline-flex":l,flex:!l,["justify-content-".concat(c)]:c,["justify-items-".concat(o)]:o,["justify-self-".concat(f)]:f,["align-items-".concat(m)]:m,["align-self-".concat(r)]:r,["align-content-".concat(u)]:u,["column-gap-".concat(null!=g?g:j)]:S(g,j),["row-gap-".concat(null!=p?p:j)]:S(p,j)}),style:Object.assign(Object.assign({},y),{gap:!S(j)&&j,columnGap:!S(g)&&g,rowGap:!S(p)&&p})}),d)};export{i as default};