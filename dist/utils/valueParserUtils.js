"use strict";var e=require("@babel/runtime/helpers/slicedToArray"),a=require("decimal.js"),r=require("../_virtual/isNaN.js"),t=require("../_virtual/isNumber.js"),n=[{value:1,symbol:""},{value:1e3,symbol:"K"},{value:1e6,symbol:"M"},{value:1e9,symbol:"B"},{value:1e12,symbol:"T"}],c=function(e){for(var a={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&#x2F;":"/","&#x60;":"`","&#x3D;":"="},r=e,t="";r!==t;)t=r,r=r.replace(/&[#\w]+;/g,(function(e){return a[e]||e}));return r},o=function(e){var a=e.split(".");return[a[0],a[1]]};exports.commaStrToNumber=function(e){return Number(e.replace(/,/gi,""))},exports.commaWithValue=function(e){if((e=String(null!=e?e:0)).match(/[^0-9,.]/g))return e;if(e){var a=e.split(".");return a[0]=a[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),a.join(".")}return"0"},exports.convertHtmlToMarkdownStr=function(e){var a=e.replace(/&nbsp;/g," ");a=(a=(a=(a=(a=a.replace(/<div>/g,"<br />").replace(/<\/div>/g,"")).replace(/<br\s*\/?>/gi,"[LINEBREAK]").replace(/\n/g,"[LINEBREAK]")).replace(/<span[^>]*\bclass="mention complete-mention\b[^>]*\bdata-id="(\d+)"[^>]*(?:\s+data-[^>]*="[^"]*")*[^>]*>@([^<]+)<\/span>/g,(function(e,a,r){return"WP@[".concat(r.trim(),"](").concat(a.trim(),")")})).replace(/<span[^>]*\bclass="mention unknown-mention\b[^>]*>([^<]*)<\/span>/g,"$1").replace(/<span[^>]*\bclass="mention will-mention\b[^>]*>(?:\s+data-[^>]*="[^"]*")?[^>]*>@([^<]+)<\/span>/g,"@$1")).replace(/<span[^>]*\bclass="hash complete-hash\b[^>]*\bdata-id="(\d+)"[^>]*(?:\s+data-[^>]*="[^"]*")*[^>]*>#([^<]+)<\/span>/g,(function(e,a,r){return"WP#[".concat(r.trim(),"](").concat(a.trim(),")")})).replace(/<span[^>]*\bclass="hash\b[^>]*\bdata-id="(\d+)"[^>]*(?:\s+data-[^>]*="[^"]*")*[^>]*>#([^<]+)<\/span>/g,"WP#[$2]($1)")).replace(/<a href="(.*?)"(.*?)>(.*?)<\/a>/g,'[$3]($1)[:target="_blank"]');if(/<\/?[^>]+(>|$)/.test(a)){var r=document.createElement("div");r.innerHTML=a,a=r.textContent}return a},exports.convertMarkdownToHtmlStr=function(e){var a=c(e).replace(/<[^>]*>/g,"");return a=(a=(a=(a=a.replace(/WP@\[(.*?)\]\((\d+)\)/g,'<span class="mention complete-mention" data-id="$2" data-name="$1">@$1</span>')).replace(/WP#\[(.*?)\]\((\d+)\)/g,'<span class="hash complete-hash" data-id="$2" data-name="$1">#$1</span>')).replace(/\[([^\]]+)\]\(([^)]+)\)\[:(target="_blank")\]/g,'<a href="$2" target="_blank">$1</a>')).replace(/\[LINEBREAK\]/g,"<br />")},exports.decodeHtmlEntities=c,exports.formatNumberValueWithComma=function(a){"number"==typeof a&&(a=String(a));var r=o(a),t=e(r,2),n=t[0],c=t[1],l=c?".".concat(c):"",s=n.replace(/\B(?=(\d{3})+(?!\d))/g,",");return"".concat(s).concat(l)},exports.makeParts=function(e){var a=e.split(".");return a[0]=a[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),a},exports.pad=function(e,a,r){var t="".concat(e);if(t.length>=r)return t;for(;t.length<r;)t=a+t;return t},exports.removeSpaceAndLineBreak=function(e){return e.replace(/\[LINEBREAK\]/g,"").replace(/\s+/g,"")},exports.splitNumberStringByComma=o,exports.toFormatterByInt=function(e,c){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:n;if(!t(e)||r(e))return"0";var l=0;for(l=o.length-1;l>0&&!(Math.abs(e)>=o[l].value);l-=1);return"".concat(new a(e||0).div(o[l].value).toFixed(c,a.ROUND_DOWN).replace(/\.0+$|(\.[0-9]*[1-9])0+$/,"$1")).concat(o[l].symbol)};