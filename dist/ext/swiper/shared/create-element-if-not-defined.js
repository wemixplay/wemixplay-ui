"use strict";var e=require("./utils.js");exports.c=function(t,r,s,a){return t.params.createElements&&Object.keys(a).forEach((c=>{if(!s[c]&&!0===s.auto){let i=e.e(t.el,`.${a[c]}`)[0];i||(i=e.c("div",a[c]),i.className=a[c],t.el.append(i)),s[c]=i,r[c]=i}})),s};