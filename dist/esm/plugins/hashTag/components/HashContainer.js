import e,{useState as t,useEffect as r}from"react";import a from"./HashPortal.js";const o=o=>{let{hash:n,children:s}=o;const[l,c]=t(n.hashId),[h,i]=t(n.config);return r((()=>{(null==n?void 0:n.observe)&&n.observe({setTargetHashId:c,setConfig:i})}),[n]),l?e.createElement(a,null,s({config:h,targetHashId:l})):e.createElement(e.Fragment,null)};export{o as default};
