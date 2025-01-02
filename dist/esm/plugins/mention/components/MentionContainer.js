'use client';
import e,{useState as t,useEffect as n}from"react";import o from"./MentionPortal.js";const r=r=>{let{mention:i,children:l}=r;const[a,m]=t(i.mentionId),[c,s]=t(i.config);return n((()=>{(null==i?void 0:i.observe)&&i.observe({setTargetMentionId:m,setConfig:s})}),[i]),a?e.createElement(o,null,l({config:c,targetMentionId:a})):e.createElement(e.Fragment,null)};export{r as default};
