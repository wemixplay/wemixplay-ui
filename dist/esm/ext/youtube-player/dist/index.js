"use strict";
import{getDefaultExportFromCjs as e}from"../../../_virtual/_commonjsHelpers.js";import{__module as o}from"../../../_virtual/index.js";import{s as t}from"../../sister/src/sister.js";import{l as r}from"./loadYouTubeIframeApi.js";import{Y as n}from"./YouTubePlayer.js";!function(e,o){Object.defineProperty(o,"__esModule",{value:!0});var f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=l(t),u=l(r),s=l(n);function l(e){return e&&e.__esModule?e:{default:e}}var a=void 0;o.default=function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=(0,i.default)();if(a||(a=(0,u.default)(r)),o.events)throw new Error("Event handlers cannot be overwritten.");if("string"==typeof e&&!document.getElementById(e))throw new Error('Element "'+e+'" does not exist.');o.events=s.default.proxyEvents(r);var n=new Promise((function(t){"object"===(void 0===e?"undefined":f(e))&&e.playVideo instanceof Function?t(e):a.then((function(n){var f=new n.Player(e,o);return r.on("ready",(function(){t(f)})),null}))})),l=s.default.promisifyPlayer(n,t);return l.on=r.on,l.off=r.off,l},e.exports=o.default}(o,o.exports);var f=e(o.exports);export{f as default};
