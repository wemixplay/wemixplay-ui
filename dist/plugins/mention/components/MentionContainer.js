"use client";
"use strict";var e=require("react"),t=require("./MentionPortal.js");module.exports=n=>{let{mention:r,children:o}=n;const[i,l]=e.useState(r.mentionId),[s,u]=e.useState(r.config);return e.useEffect((()=>{(null==r?void 0:r.observe)&&r.observe({setTargetMentionId:l,setConfig:u})}),[r]),i?e.createElement(t,null,o({config:s,targetMentionId:i})):e.createElement(e.Fragment,null)};
