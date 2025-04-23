"use strict";var r=require("./_cloneArrayBuffer.js")._cloneArrayBuffer;var e=function(e,f){var t=f?r(e.buffer):e.buffer;return new e.constructor(t,e.byteOffset,e.length)};exports._cloneTypedArray=e;
