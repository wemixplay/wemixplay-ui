import{__module as e}from"../../../_virtual/FunctionStateMap.js";import{P as t}from"./constants/PlayerStates.js";!function(e,a){Object.defineProperty(a,"__esModule",{value:!0});var u,s=(u=t)&&u.__esModule?u:{default:u};a.default={pauseVideo:{acceptableStates:[s.default.ENDED,s.default.PAUSED],stateChangeRequired:!1},playVideo:{acceptableStates:[s.default.ENDED,s.default.PLAYING],stateChangeRequired:!1},seekTo:{acceptableStates:[s.default.ENDED,s.default.PLAYING,s.default.PAUSED],stateChangeRequired:!0,timeout:3e3}},e.exports=a.default}(e,e.exports);var a=e.exports;export{a as F};
