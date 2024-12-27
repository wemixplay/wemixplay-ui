"use strict";var e=require("../../../../_virtual/index.js");require("../fs/index.js");var r=require("../mkdirs/index.js"),t=require("../path-exists/index.js"),i=require("../util/utimes.js"),n=require("../util/stat.js"),a=require("path");const s=e.__exports,o=a,{mkdirs:c}=r.mkdirs,{pathExists:u}=t.pathExists_1,{utimesMillis:w}=i.utimes,d=n.stat;async function f(e,r,t){return!t.filter||t.filter(e,r)}async function l(e,r,t,i){const n=i.dereference?s.stat:s.lstat,a=await n(r);if(a.isDirectory())return async function(e,r,t,i,n){r||await s.mkdir(i);const a=await s.readdir(t);await Promise.all(a.map((async e=>{const r=o.join(t,e),a=o.join(i,e);if(!await f(r,a,n))return;const{destStat:s}=await d.checkPaths(r,a,"copy",n);return l(s,r,a,n)}))),r||await s.chmod(i,e.mode)}(a,e,r,t,i);if(a.isFile()||a.isCharacterDevice()||a.isBlockDevice())return async function(e,r,t,i,n){if(!r)return m(e,t,i,n);if(n.overwrite)return await s.unlink(i),m(e,t,i,n);if(n.errorOnExist)throw new Error(`'${i}' already exists`)}(a,e,r,t,i);if(a.isSymbolicLink())return async function(e,r,t,i){let n=await s.readlink(r);i.dereference&&(n=o.resolve(process.cwd(),n));if(!e)return s.symlink(n,t);let a=null;try{a=await s.readlink(t)}catch(e){if("EINVAL"===e.code||"UNKNOWN"===e.code)return s.symlink(n,t);throw e}i.dereference&&(a=o.resolve(process.cwd(),a));if(d.isSrcSubdir(n,a))throw new Error(`Cannot copy '${n}' to a subdirectory of itself, '${a}'.`);if(d.isSrcSubdir(a,n))throw new Error(`Cannot overwrite '${a}' with '${n}'.`);return await s.unlink(t),s.symlink(n,t)}(e,r,t,i);if(a.isSocket())throw new Error(`Cannot copy a socket file: ${r}`);if(a.isFIFO())throw new Error(`Cannot copy a FIFO pipe: ${r}`);throw new Error(`Unknown file: ${r}`)}async function m(e,r,t,i){if(await s.copyFile(r,t),i.preserveTimestamps){128&e.mode||await function(e,r){return s.chmod(e,128|r)}(t,e.mode);const i=await s.stat(r);await w(t,i.atime,i.mtime)}return s.chmod(t,e.mode)}var p=async function(e,r,t={}){"function"==typeof t&&(t={filter:t}),t.clobber=!("clobber"in t)||!!t.clobber,t.overwrite="overwrite"in t?!!t.overwrite:t.clobber,t.preserveTimestamps&&"ia32"===process.arch&&process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n\tsee https://github.com/jprichardson/node-fs-extra/issues/269","Warning","fs-extra-WARN0001");const{srcStat:i,destStat:n}=await d.checkPaths(e,r,"copy",t);if(await d.checkParentPaths(e,i,r,"copy"),!await f(e,r,t))return;const a=o.dirname(r);await u(a)||await c(a),await l(n,e,r,t)};exports.copy_1=p;
