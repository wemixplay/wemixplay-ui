"use strict";var e=require("decimal.js"),t=require('./../ext/lodash/isNaN.js'),a=require('./../ext/lodash/isNumber.js');const r=[{value:1,symbol:""},{value:1e3,symbol:"K"},{value:1e6,symbol:"M"},{value:1e9,symbol:"B"},{value:1e12,symbol:"T"}],n=e=>{const t={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&#x2F;":"/","&#x60;":"`","&#x3D;":"="};let a=e,r="";for(;a!==r;)r=a,a=a.replace(/&[#\w]+;/g,(e=>t[e]||e));return a},o=e=>{const t=e.split(".");return[t[0],t[1]]};exports.commaStrToNumber=e=>Number(e.replace(/,/gi,"")),exports.commaWithValue=e=>{if((e=String(null!=e?e:0)).match(/[^0-9,.]/g))return e;if(e){const t=e.split(".");return t[0]=t[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),t.join(".")}return"0"},exports.convertHtmlToMarkdownStr=e=>{let t=e.replace(/&nbsp;/g," ");t=t.replace(/<div>/g,"<br />").replace(/<\/div>/g,""),t=t.replace(/<br\s*\/?>/gi,"[LINEBREAK]").replace(/\n/g,"[LINEBREAK]"),t=t.replace(/<span[^>]*\bclass="mention complete-mention\b[^>]*\bdata-id="(\d+)"[^>]*(?:\s+data-[^>]*="[^"]*")*[^>]*>@([^<]+)<\/span>/g,((e,t,a)=>"WP@[".concat(a.trim(),"](").concat(t.trim(),")"))).replace(/<span[^>]*\bclass="mention unknown-mention\b[^>]*>([^<]*)<\/span>/g,"$1").replace(/<span[^>]*\bclass="mention will-mention\b[^>]*>(?:\s+data-[^>]*="[^"]*")?[^>]*>@([^<]+)<\/span>/g,"@$1"),t=t.replace(/<span[^>]*\bclass="hash complete-hash\b[^>]*\bdata-id="(\d+)"[^>]*(?:\s+data-[^>]*="[^"]*")*[^>]*>#([^<]+)<\/span>/g,((e,t,a)=>"WP#[".concat(a.trim(),"](").concat(t.trim(),")"))).replace(/<span[^>]*\bclass="hash\b[^>]*\bdata-id="(\d+)"[^>]*(?:\s+data-[^>]*="[^"]*")*[^>]*>#([^<]+)<\/span>/g,"WP#[$2]($1)"),t=t.replace(/<a href="(.*?)"(.*?)>(.*?)<\/a>/g,'[$3]($1)[:target="_blank"]');if(/<\/?[^>]+(>|$)/.test(t)){const e=document.createElement("div");e.innerHTML=t,t=e.textContent}return t},exports.convertMarkdownToHtmlStr=e=>{let t=n(e).replace(/<[^>]*>/g,"");return t=t.replace(/WP@\[(.*?)\]\((\d+)\)/g,'<span class="mention complete-mention" data-id="$2" data-name="$1">@$1</span>'),t=t.replace(/WP#\[(.*?)\]\((\d+)\)/g,'<span class="hash complete-hash" data-id="$2" data-name="$1">#$1</span>'),t=t.replace(/\[([^\]]+)\]\(([^)]+)\)\[:(target="_blank")\]/g,'<a href="$2" target="_blank">$1</a>'),t=t.replace(/\[LINEBREAK\]/g,"<br />"),t},exports.decodeHtmlEntities=n,exports.formatNumberValueWithComma=e=>{"number"==typeof e&&(e=String(e));const[t,a]=o(e),r=a?".".concat(a):"",n=t.replace(/\B(?=(\d{3})+(?!\d))/g,",");return"".concat(n).concat(r)},exports.getFloatFixed=(e,t)=>parseFloat(String(Math.round(100*e)/100)).toFixed(t),exports.makeParts=e=>{const t=e.split(".");return t[0]=t[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),t},exports.pad=(e,t,a)=>{let r="".concat(e);if(r.length>=a)return r;for(;r.length<a;)r=t+r;return r},exports.removeSpaceAndLineBreak=e=>e.replace(/\[LINEBREAK\]/g,"").replace(/\s+/g,""),exports.splitNumberStringByComma=o,exports.toFormatterByInt=function(n,o){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:r;if(!a.default(n)||t(n))return"0";let l=0;for(l=s.length-1;l>0&&!(Math.abs(n)>=s[l].value);l-=1);return"".concat(new e(n||0).div(s[l].value).toFixed(o,e.ROUND_DOWN).replace(/\.0+$|(\.[0-9]*[1-9])0+$/,"$1")).concat(s[l].symbol)};
