import{__exports as t}from"../../../../_virtual/index.js";import"../fs/index.js";import{m as r}from"../mkdirs/index.js";import{p as e}from"../path-exists/index.js";import{u as i}from"../util/utimes.js";import{s as n}from"../util/stat.js";import o from"path";const a=t,s=o,{mkdirs:c}=r,{pathExists:m}=e,{utimesMillis:f}=i,w=n;async function d(t,r,e){return!e.filter||e.filter(t,r)}async function p(t,r,e,i){const n=i.dereference?a.stat:a.lstat,o=await n(r);if(o.isDirectory())return async function(t,r,e,i,n){r||await a.mkdir(i);const o=await a.readdir(e);await Promise.all(o.map((async t=>{const r=s.join(e,t),o=s.join(i,t);if(!await d(r,o,n))return;const{destStat:a}=await w.checkPaths(r,o,"copy",n);return p(a,r,o,n)}))),r||await a.chmod(i,t.mode)}(o,t,r,e,i);if(o.isFile()||o.isCharacterDevice()||o.isBlockDevice())return async function(t,r,e,i,n){if(!r)return u(t,e,i,n);if(n.overwrite)return await a.unlink(i),u(t,e,i,n);if(n.errorOnExist)throw new Error(`'${i}' already exists`)}(o,t,r,e,i);if(o.isSymbolicLink())return async function(t,r,e,i){let n=await a.readlink(r);i.dereference&&(n=s.resolve(process.cwd(),n));if(!t)return a.symlink(n,e);let o=null;try{o=await a.readlink(e)}catch(t){if("EINVAL"===t.code||"UNKNOWN"===t.code)return a.symlink(n,e);throw t}i.dereference&&(o=s.resolve(process.cwd(),o));if(w.isSrcSubdir(n,o))throw new Error(`Cannot copy '${n}' to a subdirectory of itself, '${o}'.`);if(w.isSrcSubdir(o,n))throw new Error(`Cannot overwrite '${o}' with '${n}'.`);return await a.unlink(e),a.symlink(n,e)}(t,r,e,i);if(o.isSocket())throw new Error(`Cannot copy a socket file: ${r}`);if(o.isFIFO())throw new Error(`Cannot copy a FIFO pipe: ${r}`);throw new Error(`Unknown file: ${r}`)}async function u(t,r,e,i){if(await a.copyFile(r,e),i.preserveTimestamps){128&t.mode||await function(t,r){return a.chmod(t,128|r)}(e,t.mode);const i=await a.stat(r);await f(e,i.atime,i.mtime)}return a.chmod(e,t.mode)}var l=async function(t,r,e={}){"function"==typeof e&&(e={filter:e}),e.clobber=!("clobber"in e)||!!e.clobber,e.overwrite="overwrite"in e?!!e.overwrite:e.clobber,e.preserveTimestamps&&"ia32"===process.arch&&process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n\tsee https://github.com/jprichardson/node-fs-extra/issues/269","Warning","fs-extra-WARN0001");const{srcStat:i,destStat:n}=await w.checkPaths(t,r,"copy",e);if(await w.checkParentPaths(t,i,r,"copy"),!await d(t,r,e))return;const o=s.dirname(r);await m(o)||await c(o),await p(n,t,r,e)};export{l as c};
