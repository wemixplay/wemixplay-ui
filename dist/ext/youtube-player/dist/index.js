"use strict";var e,r=require("../../../_virtual/index5.js"),t=require("../../sister/src/sister.js"),o=require("./loadYouTubeIframeApi.js"),n=require("./YouTubePlayer.js");exports.__require=function(){return e||(e=1,function(e,r){Object.defineProperty(r,"__esModule",{value:!0});var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=s(t.__require()),f=s(o.__require()),l=s(n.__require());function s(e){return e&&e.__esModule?e:{default:e}}var d=void 0;r.default=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=(0,i.default)();if(d||(d=(0,f.default)(o)),r.events)throw new Error("Event handlers cannot be overwritten.");if("string"==typeof e&&!document.getElementById(e))throw new Error('Element "'+e+'" does not exist.');r.events=l.default.proxyEvents(o);var n=new Promise((function(t){"object"===(void 0===e?"undefined":u(e))&&e.playVideo instanceof Function?t(e):d.then((function(n){var u=new n.Player(e,r);return o.on("ready",(function(){t(u)})),null}))})),s=l.default.promisifyPlayer(n,t);return s.on=o.on,s.off=o.off,s},e.exports=r.default}(r.__module,r.__module.exports)),r.__module.exports};