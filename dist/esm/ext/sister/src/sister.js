"use strict";
var n;n=function(){var n={},r={};return n.on=function(n,a){var e={name:n,handler:a};return r[n]=r[n]||[],r[n].unshift(e),e},n.off=function(n){var a=r[n.name].indexOf(n);-1!==a&&r[n.name].splice(a,1)},n.trigger=function(n,a){var e,f=r[n];if(f)for(e=f.length;e--;)f[e].handler(a)},n};var r=n;export{r as s};
