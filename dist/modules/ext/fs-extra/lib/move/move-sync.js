"use strict";var r=require("../../../graceful-fs/graceful-fs.js"),e=require("../copy/index.js"),t=require("../remove/index.js"),n=require("../mkdirs/index.js"),s=require("../util/stat.js"),c=require("path");const i=r.gracefulFs,o=c,u=e.copy.copySync,a=t.remove_1.removeSync,f=n.mkdirs.mkdirpSync,m=s.stat;function y(r,e,t){try{i.renameSync(r,e)}catch(n){if("EXDEV"!==n.code)throw n;return function(r,e,t){const n={overwrite:t,errorOnExist:!0,preserveTimestamps:!0};return u(r,e,n),a(r)}(r,e,t)}}var d=function(r,e,t){const n=(t=t||{}).overwrite||t.clobber||!1,{srcStat:s,isChangingCase:c=!1}=m.checkPathsSync(r,e,"move",t);return m.checkParentPathsSync(r,s,e,"move"),function(r){const e=o.dirname(r);return o.parse(e).root===e}(e)||f(o.dirname(e)),function(r,e,t,n){if(n)return y(r,e,t);if(t)return a(e),y(r,e,t);if(i.existsSync(e))throw new Error("dest already exists.");return y(r,e,t)}(r,e,n,c)};exports.moveSync_1=d;
