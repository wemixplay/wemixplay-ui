"use strict";var i=require("../../../../_virtual/index2.js");require("../../../universalify/index.js");var e=require("../../../../_virtual/index.js");require("../fs/index.js");const r=e.__exports;var t={utimesMillis:(0,i.__exports.fromPromise)((async function(i,e,t){const s=await r.open(i,"r+");let n=null;try{await r.futimes(s,e,t)}finally{try{await r.close(s)}catch(i){n=i}}if(n)throw n})),utimesMillisSync:function(i,e,t){const s=r.openSync(i,"r+");return r.futimesSync(s,e,t),r.closeSync(s)}};exports.utimes=t;
