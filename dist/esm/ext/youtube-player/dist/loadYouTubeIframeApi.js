import{__module as o}from"../../../_virtual/loadYouTubeIframeApi.js";import{l as e}from"../../load-script/index.js";!function(o,t){Object.defineProperty(t,"__esModule",{value:!0});var r,n=(r=e)&&r.__esModule?r:{default:r};t.default=function(o){return new Promise((function(e){if(window.YT&&window.YT.Player&&window.YT.Player instanceof Function)e(window.YT);else{var t="http:"===window.location.protocol?"http:":"https:";(0,n.default)(t+"//www.youtube.com/iframe_api",(function(e){e&&o.trigger("error",e)}));var r=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=function(){r&&r(),e(window.YT)}}}))},o.exports=t.default}(o,o.exports);var t=o.exports;export{t as l};