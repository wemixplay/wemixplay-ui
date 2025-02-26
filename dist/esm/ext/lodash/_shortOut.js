var r=Date.now;var n=function(n){var a=0,e=0;return function(){var t=r(),i=16-(t-e);if(e=t,i>0){if(++a>=800)return arguments[0]}else a=0;return n.apply(void 0,arguments)}};export{n as _};
