import a from"decimal.js";import e from"../_virtual/isNaN.js";import n from"../_virtual/isNumber.js";var t=[{value:1,symbol:""},{value:1e3,symbol:"K"},{value:1e6,symbol:"M"},{value:1e9,symbol:"B"},{value:1e12,symbol:"T"}],r=function(r,l){var c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t;if(!n(r)||e(r))return"0";var s=0;for(s=c.length-1;s>0&&!(Math.abs(r)>=c[s].value);s-=1);return"".concat(new a(r||0).div(c[s].value).toFixed(l,a.ROUND_DOWN).replace(/\.0+$|(\.[0-9]*[1-9])0+$/,"$1")).concat(c[s].symbol)},l=function(a){if((a=String(null!=a?a:0)).match(/[^0-9,.]/g))return a;if(a){var e=a.split(".");return e[0]=e[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),e.join(".")}return"0"},c=function(a){return a.replace(/\[LINEBREAK\]/g,"").replace(/\s+/g,"")},s=function(a){for(var e={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&#x2F;":"/","&#x60;":"`","&#x3D;":"="},n=a,t="";n!==t;)t=n,n=n.replace(/&[#\w]+;/g,(function(a){return e[a]||a}));return n},i=/WP@\[(.*?)\]\((\d+)\)/g,o=/WP#\[(.*?)\]\((\d+)\)/g,p=function(a){var e=s(a).replace(/<[^>]*>/g,"");return e=(e=(e=(e=e.replace(/WP@\[(.*?)\]\((\d+)\)/g,'<span class="mention complete-mention" data-id="$2" data-name="$1">@$1</span>')).replace(/WP#\[(.*?)\]\((\d+)\)/g,'<span class="hash complete-hash" data-id="$2" data-name="$1">#$1</span>')).replace(/\[([^\]]+)\]\(([^)]+)\)\[:(target="_blank")\]/g,'<a href="$2" target="_blank">$1</a>')).replace(/\[LINEBREAK\]/g,"<br />")},m=function(a){var e=a.replace(/&nbsp;/g," ");e=(e=(e=(e=(e=e.replace(/<div>/g,"<br />").replace(/<\/div>/g,"")).replace(/<br\s*\/?>/gi,"[LINEBREAK]").replace(/\n/g,"[LINEBREAK]")).replace(/<span[^>]*\bclass="mention complete-mention\b[^>]*\bdata-id="(\d+)"[^>]*(?:\s+data-[^>]*="[^"]*")*[^>]*>@([^<]+)<\/span>/g,(function(a,e,n){return"WP@[".concat(n.trim(),"](").concat(e.trim(),")")})).replace(/<span[^>]*\bclass="mention unknown-mention\b[^>]*>([^<]*)<\/span>/g,"$1").replace(/<span[^>]*\bclass="mention will-mention\b[^>]*>(?:\s+data-[^>]*="[^"]*")?[^>]*>@([^<]+)<\/span>/g,"@$1")).replace(/<span[^>]*\bclass="hash complete-hash\b[^>]*\bdata-id="(\d+)"[^>]*(?:\s+data-[^>]*="[^"]*")*[^>]*>#([^<]+)<\/span>/g,(function(a,e,n){return"WP#[".concat(n.trim(),"](").concat(e.trim(),")")})).replace(/<span[^>]*\bclass="hash\b[^>]*\bdata-id="(\d+)"[^>]*(?:\s+data-[^>]*="[^"]*")*[^>]*>#([^<]+)<\/span>/g,"WP#[$2]($1)")).replace(/<a href="(.*?)"(.*?)>(.*?)<\/a>/g,'[$3]($1)[:target="_blank"]');if(/<\/?[^>]+(>|$)/.test(e)){var n=document.createElement("div");n.innerHTML=e,e=n.textContent}return e};export{o as WP_HASH_REGEX,i as WP_MENTION_REGEX,l as commaWithValue,m as convertHtmlToMarkdownStr,p as convertMarkdownToHtmlStr,s as decodeHtmlEntities,c as removeSpaceAndLineBreak,r as toFormatterByInt};
