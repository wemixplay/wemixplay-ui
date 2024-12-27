"use strict";var e=require("../../../../_virtual/index.js"),t=require("../../../../_virtual/index2.js");require("../../../universalify/index.js");var r=require("../../../graceful-fs/graceful-fs.js");!function(e){const n=t.__exports.fromCallback,i=r.gracefulFs,a=["access","appendFile","chmod","chown","close","copyFile","fchmod","fchown","fdatasync","fstat","fsync","ftruncate","futimes","lchmod","lchown","link","lstat","mkdir","mkdtemp","open","opendir","readdir","readFile","readlink","realpath","rename","rm","rmdir","stat","symlink","truncate","unlink","utimes","writeFile"].filter((e=>"function"==typeof i[e]));Object.assign(e,i),a.forEach((t=>{e[t]=n(i[t])})),e.exists=function(e,t){return"function"==typeof t?i.exists(e,t):new Promise((t=>i.exists(e,t)))},e.read=function(e,t,r,n,a,f){return"function"==typeof f?i.read(e,t,r,n,a,f):new Promise(((f,s)=>{i.read(e,t,r,n,a,((e,t,r)=>{if(e)return s(e);f({bytesRead:t,buffer:r})}))}))},e.write=function(e,t,...r){return"function"==typeof r[r.length-1]?i.write(e,t,...r):new Promise(((n,a)=>{i.write(e,t,...r,((e,t,r)=>{if(e)return a(e);n({bytesWritten:t,buffer:r})}))}))},e.readv=function(e,t,...r){return"function"==typeof r[r.length-1]?i.readv(e,t,...r):new Promise(((n,a)=>{i.readv(e,t,...r,((e,t,r)=>{if(e)return a(e);n({bytesRead:t,buffers:r})}))}))},e.writev=function(e,t,...r){return"function"==typeof r[r.length-1]?i.writev(e,t,...r):new Promise(((n,a)=>{i.writev(e,t,...r,((e,t,r)=>{if(e)return a(e);n({bytesWritten:t,buffers:r})}))}))},"function"==typeof i.realpath.native?e.realpath.native=n(i.realpath.native):process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?","Warning","fs-extra-WARN0003")}(e.__exports);
