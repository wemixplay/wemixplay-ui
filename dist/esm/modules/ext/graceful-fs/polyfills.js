import n from"constants";var c=n,t=process.cwd,o=null,e=process.env.GRACEFUL_FS_PLATFORM||process.platform;process.cwd=function(){return o||(o=t.call(process)),o};try{process.cwd()}catch(n){}if("function"==typeof process.chdir){var r=process.chdir;process.chdir=function(n){o=null,r.call(process,n)},Object.setPrototypeOf&&Object.setPrototypeOf(process.chdir,r)}var i=function(n){c.hasOwnProperty("O_SYMLINK")&&process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)&&function(n){n.lchmod=function(t,o,e){n.open(t,c.O_WRONLY|c.O_SYMLINK,o,(function(c,t){c?e&&e(c):n.fchmod(t,o,(function(c){n.close(t,(function(n){e&&e(c||n)}))}))}))},n.lchmodSync=function(t,o){var e,r=n.openSync(t,c.O_WRONLY|c.O_SYMLINK,o),i=!0;try{e=n.fchmodSync(r,o),i=!1}finally{if(i)try{n.closeSync(r)}catch(n){}else n.closeSync(r)}return e}}(n);n.lutimes||function(n){c.hasOwnProperty("O_SYMLINK")&&n.futimes?(n.lutimes=function(t,o,e,r){n.open(t,c.O_SYMLINK,(function(c,t){c?r&&r(c):n.futimes(t,o,e,(function(c){n.close(t,(function(n){r&&r(c||n)}))}))}))},n.lutimesSync=function(t,o,e){var r,i=n.openSync(t,c.O_SYMLINK),f=!0;try{r=n.futimesSync(i,o,e),f=!1}finally{if(f)try{n.closeSync(i)}catch(n){}else n.closeSync(i)}return r}):n.futimes&&(n.lutimes=function(n,c,t,o){o&&process.nextTick(o)},n.lutimesSync=function(){})}(n);n.chown=r(n.chown),n.fchown=r(n.fchown),n.lchown=r(n.lchown),n.chmod=t(n.chmod),n.fchmod=t(n.fchmod),n.lchmod=t(n.lchmod),n.chownSync=i(n.chownSync),n.fchownSync=i(n.fchownSync),n.lchownSync=i(n.lchownSync),n.chmodSync=o(n.chmodSync),n.fchmodSync=o(n.fchmodSync),n.lchmodSync=o(n.lchmodSync),n.stat=f(n.stat),n.fstat=f(n.fstat),n.lstat=f(n.lstat),n.statSync=u(n.statSync),n.fstatSync=u(n.fstatSync),n.lstatSync=u(n.lstatSync),n.chmod&&!n.lchmod&&(n.lchmod=function(n,c,t){t&&process.nextTick(t)},n.lchmodSync=function(){});n.chown&&!n.lchown&&(n.lchown=function(n,c,t,o){o&&process.nextTick(o)},n.lchownSync=function(){});"win32"===e&&(n.rename="function"!=typeof n.rename?n.rename:function(c){function t(t,o,e){var r=Date.now(),i=0;c(t,o,(function f(u){if(u&&("EACCES"===u.code||"EPERM"===u.code||"EBUSY"===u.code)&&Date.now()-r<6e4)return setTimeout((function(){n.stat(o,(function(n,r){n&&"ENOENT"===n.code?c(t,o,f):e(u)}))}),i),void(i<100&&(i+=10));e&&e(u)}))}return Object.setPrototypeOf&&Object.setPrototypeOf(t,c),t}(n.rename));function t(c){return c?function(t,o,e){return c.call(n,t,o,(function(n){s(n)&&(n=null),e&&e.apply(this,arguments)}))}:c}function o(c){return c?function(t,o){try{return c.call(n,t,o)}catch(n){if(!s(n))throw n}}:c}function r(c){return c?function(t,o,e,r){return c.call(n,t,o,e,(function(n){s(n)&&(n=null),r&&r.apply(this,arguments)}))}:c}function i(c){return c?function(t,o,e){try{return c.call(n,t,o,e)}catch(n){if(!s(n))throw n}}:c}function f(c){return c?function(t,o,e){function r(n,c){c&&(c.uid<0&&(c.uid+=4294967296),c.gid<0&&(c.gid+=4294967296)),e&&e.apply(this,arguments)}return"function"==typeof o&&(e=o,o=null),o?c.call(n,t,o,r):c.call(n,t,r)}:c}function u(c){return c?function(t,o){var e=o?c.call(n,t,o):c.call(n,t);return e&&(e.uid<0&&(e.uid+=4294967296),e.gid<0&&(e.gid+=4294967296)),e}:c}function s(n){return!n||("ENOSYS"===n.code||!(process.getuid&&0===process.getuid()||"EINVAL"!==n.code&&"EPERM"!==n.code))}n.read="function"!=typeof n.read?n.read:function(c){function t(t,o,e,r,i,f){var u;if(f&&"function"==typeof f){var s=0;u=function(l,a,y){if(l&&"EAGAIN"===l.code&&s<10)return s++,c.call(n,t,o,e,r,i,u);f.apply(this,arguments)}}return c.call(n,t,o,e,r,i,u)}return Object.setPrototypeOf&&Object.setPrototypeOf(t,c),t}(n.read),n.readSync="function"!=typeof n.readSync?n.readSync:(l=n.readSync,function(c,t,o,e,r){for(var i=0;;)try{return l.call(n,c,t,o,e,r)}catch(n){if("EAGAIN"===n.code&&i<10){i++;continue}throw n}});var l};export{i as p};
