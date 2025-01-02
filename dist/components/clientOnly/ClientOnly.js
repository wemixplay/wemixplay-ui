'use client';
"use strict";var e=require("react");module.exports=t=>{let{children:r,fallback:l=""}=t;const[a,c]=e.useState(!1);return e.useEffect((()=>{c(!0)}),[]),e.createElement(e.Fragment,null,a?r:l)};
