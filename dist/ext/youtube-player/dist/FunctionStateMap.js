"use strict";var e,t=require("../../../_virtual/FunctionStateMap.js"),a=require("./constants/PlayerStates.js");exports.__require=function(){return e||(e=1,function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var u,r=(u=a.__require())&&u.__esModule?u:{default:u};t.default={pauseVideo:{acceptableStates:[r.default.ENDED,r.default.PAUSED],stateChangeRequired:!1},playVideo:{acceptableStates:[r.default.ENDED,r.default.PLAYING],stateChangeRequired:!1},seekTo:{acceptableStates:[r.default.ENDED,r.default.PLAYING,r.default.PAUSED],stateChangeRequired:!0,timeout:3e3}},e.exports=t.default}(t.__module,t.__module.exports)),t.__module.exports};