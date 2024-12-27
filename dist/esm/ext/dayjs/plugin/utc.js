import{getDefaultExportFromCjs as t,commonjsGlobal as s}from"../../../_virtual/_commonjsHelpers.js";import{__module as i}from"../../../_virtual/utc.js";var e,r,f;i.exports=(e="minute",r=/[+-]\d\d(?::?\d\d)?/g,f=/([+-]|\d\d)/g,function(t,s,i){var u=s.prototype;i.utc=function(t){return new s({date:t,utc:!0,args:arguments})},u.utc=function(t){var s=i(this.toDate(),{locale:this.$L,utc:!0});return t?s.add(this.utcOffset(),e):s},u.local=function(){return i(this.toDate(),{locale:this.$L,utc:!1})};var o=u.parse;u.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t)};var a=u.init;u.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else a.call(this)};var n=u.utcOffset;u.utcOffset=function(t,s){var i=this.$utils().u;if(i(t))return this.$u?0:i(this.$offset)?n.call(this):this.$offset;if("string"==typeof t&&(t=function(t){void 0===t&&(t="");var s=t.match(r);if(!s)return null;var i=(""+s[0]).match(f)||["-",0,0],e=i[0],u=60*+i[1]+ +i[2];return 0===u?0:"+"===e?u:-u}(t),null===t))return this;var u=Math.abs(t)<=16?60*t:t,o=this;if(s)return o.$offset=u,o.$u=0===t,o;if(0!==t){var a=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(u+a,e)).$offset=u,o.$x.$localOffset=a}else o=this.utc();return o};var h=u.format;u.format=function(t){var s=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return h.call(this,s)},u.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t},u.isUTC=function(){return!!this.$u},u.toISOString=function(){return this.toDate().toISOString()},u.toString=function(){return this.toDate().toUTCString()};var l=u.toDate;u.toDate=function(t){return"s"===t&&this.$offset?i(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this)};var c=u.diff;u.diff=function(t,s,e){if(t&&this.$u===t.$u)return c.call(this,t,s,e);var r=this.local(),f=i(t).local();return c.call(r,f,s,e)}});var u=t(i.exports);export{u as default};