"use strict";var t,n;exports.__require=function(){if(n)return t;function e(t,n){t.onload=function(){this.onerror=this.onload=null,n(null,t)},t.onerror=function(){this.onerror=this.onload=null,n(new Error("Failed to load "+this.src),t)}}function o(t,n){t.onreadystatechange=function(){"complete"!=this.readyState&&"loaded"!=this.readyState||(this.onreadystatechange=null,n(null,t))}}return n=1,t=function(t,n,r){var a=document.head||document.getElementsByTagName("head")[0],i=document.createElement("script");"function"==typeof n&&(r=n,n={}),n=n||{},r=r||function(){},i.type=n.type||"text/javascript",i.charset=n.charset||"utf8",i.async=!("async"in n)||!!n.async,i.src=t,n.attrs&&function(t,n){for(var e in n)t.setAttribute(e,n[e])}(i,n.attrs),n.text&&(i.text=""+n.text),("onload"in i?e:o)(i,r),i.onload||e(i,r),a.appendChild(i)}};
