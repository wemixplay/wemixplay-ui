"use strict";var e=require("@babel/runtime/helpers/slicedToArray"),t=require("../../_virtual/_tslib.js"),r=require("react"),i=require("../../utils/dateUtils.js"),s=require("../../utils/forReactUtils.js"),n=require("../timer/Timer.js"),u=require("./Countdown.module.scss.js"),a=s.makeCxFunc(u),c=function(e){var t=i.getTimestamp(e)-i.dayjs().valueOf();return t>0?t:0},l=function(i){var s=i.className,u=i.endTimestamp,l=t.__rest(i,["className","endTimestamp"]),o=r.useState(c(u)),m=e(o,2),d=m[0],f=m[1],v=r.useCallback((function(){var e=c(u);f(e)}),[u]);return r.useEffect((function(){return window.addEventListener("visibilitychange",v),function(){window.removeEventListener("visibilitychange",v)}}),[v]),r.useEffect((function(){v()}),[v]),r.createElement("div",{className:a("countdown-wrapper",s)},r.createElement(n,Object.assign({duration:d,useButtons:!1,defaultPaused:!1},l)))};module.exports=l;
