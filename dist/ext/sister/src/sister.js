"use strict";
"use strict";var n;n=function(){var n={},r={};return n.on=function(n,e){var t={name:n,handler:e};return r[n]=r[n]||[],r[n].unshift(t),t},n.off=function(n){var e=r[n.name].indexOf(n);-1!==e&&r[n.name].splice(e,1)},n.trigger=function(n,e){var t,a=r[n];if(a)for(t=a.length;t--;)a[t].handler(e)},n};var r=n;exports.sister=r;
