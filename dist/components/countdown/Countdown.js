"use strict";var e=require("../../_virtual/_tslib.js"),t=require("react"),s=require("../../utils/dateUtils.js"),r=require("../../utils/forReactUtils.js"),i=require("../timer/Timer.js"),a=require("./Countdown.module.scss.js");const u=r.makeCxFunc(a),n=e=>{const t=s.getTimestamp(e)-s.dayjs().valueOf();return t>0?t:0};var c=s=>{var{className:r,endTimestamp:a}=s,c=e.__rest(s,["className","endTimestamp"]);const[l,m]=t.useState(n(a)),o=t.useCallback((()=>{const e=n(a);m(e)}),[a]);return t.useEffect((()=>(window.addEventListener("visibilitychange",o),()=>{window.removeEventListener("visibilitychange",o)})),[o]),t.useEffect((()=>{o()}),[o]),t.createElement("div",{className:u("countdown-wrapper",r)},t.createElement(i,Object.assign({duration:l,useButtons:!1,defaultPaused:!1},c)))};module.exports=c;
