import{__module as e}from"../../../../../_virtual/debug.js";import{m as r}from"../../ms/index.js";!function(e,n){var t;function s(e){function r(){if(r.enabled){var e=r,s=+new Date,o=s-(t||s);e.diff=o,e.prev=t,e.curr=s,t=s;for(var a=new Array(arguments.length),i=0;i<a.length;i++)a[i]=arguments[i];a[0]=n.coerce(a[0]),"string"!=typeof a[0]&&a.unshift("%O");var f=0;a[0]=a[0].replace(/%([a-zA-Z%])/g,(function(r,t){if("%%"===r)return r;f++;var s=n.formatters[t];if("function"==typeof s){var o=a[f];r=s.call(e,o),a.splice(f,1),f--}return r})),n.formatArgs.call(e,a),(r.log||n.log||console.log.bind(console)).apply(e,a)}}return r.namespace=e,r.enabled=n.enabled(e),r.useColors=n.useColors(),r.color=function(e){var r,t=0;for(r in e)t=(t<<5)-t+e.charCodeAt(r),t|=0;return n.colors[Math.abs(t)%n.colors.length]}(e),"function"==typeof n.init&&n.init(r),r}(n=e.exports=s.debug=s.default=s).coerce=function(e){return e instanceof Error?e.stack||e.message:e},n.disable=function(){n.enable("")},n.enable=function(e){n.save(e),n.names=[],n.skips=[];for(var r=("string"==typeof e?e:"").split(/[\s,]+/),t=r.length,s=0;s<t;s++)r[s]&&("-"===(e=r[s].replace(/\*/g,".*?"))[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")))},n.enabled=function(e){var r,t;for(r=0,t=n.skips.length;r<t;r++)if(n.skips[r].test(e))return!1;for(r=0,t=n.names.length;r<t;r++)if(n.names[r].test(e))return!0;return!1},n.humanize=r,n.names=[],n.skips=[],n.formatters={}}(e,e.exports);var n=e.exports;export{n as d};
