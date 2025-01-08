"use client";
"use strict";var e=require("react"),t=require("./HashPortal.js");module.exports=r=>{let{hash:s,children:a}=r;const[l,n]=e.useState(s.hashId),[u,o]=e.useState(s.config);return e.useEffect((()=>{(null==s?void 0:s.observe)&&s.observe({setTargetHashId:n,setConfig:o})}),[s]),l?e.createElement(t,null,a({config:u,targetHashId:l})):e.createElement(e.Fragment,null)};
