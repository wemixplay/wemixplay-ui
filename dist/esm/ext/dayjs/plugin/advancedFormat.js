import{getDefaultExportFromCjs as e,commonjsGlobal as r}from"../../../_virtual/_commonjsHelpers.js";import{__module as t}from"../../../_virtual/advancedFormat.js";t.exports=function(e,r){var t=r.prototype,a=t.format;t.format=function(e){var r=this,t=this.$locale();if(!this.isValid())return a.bind(this)(e);var s=this.$utils(),o=(e||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,(function(e){switch(e){case"Q":return Math.ceil((r.$M+1)/3);case"Do":return t.ordinal(r.$D);case"gggg":return r.weekYear();case"GGGG":return r.isoWeekYear();case"wo":return t.ordinal(r.week(),"W");case"w":case"ww":return s.s(r.week(),"w"===e?1:2,"0");case"W":case"WW":return s.s(r.isoWeek(),"W"===e?1:2,"0");case"k":case"kk":return s.s(String(0===r.$H?24:r.$H),"k"===e?1:2,"0");case"X":return Math.floor(r.$d.getTime()/1e3);case"x":return r.$d.getTime();case"z":return"["+r.offsetName()+"]";case"zzz":return"["+r.offsetName("long")+"]";default:return e}}));return a.bind(this)(o)}};var a=e(t.exports);export{a as default};
