const a=a=>{let e=(a=>{const e={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&#x2F;":"/","&#x60;":"`","&#x3D;":"="};let t=a,n="";for(;t!==n;)n=t,t=t.replace(/&[#\w]+;/g,(a=>e[a]||a));return t})(a);const t=document.createElement("div");return t.innerHTML=e,e=t.textContent,t.remove(),e=e.replace(/WP@\[(.*?)\]\((\d+)\)/g,'<span class="mention complete-mention" data-id="$2" data-name="$1">@$1</span>'),e=e.replace(/WP#\[(.*?)\]\((\d+)\)/g,'<span class="hash complete-hash" data-id="$2" data-name="$1">#$1</span>'),e=e.replace(/\[([^\]]+)\]\(([^)]+)\)\[:(target="_blank")\]/g,'<a href="$2" target="_blank">$1</a>'),e=e.replace(/\[LINEBREAK\]/g,"<br />"),e},e=a=>{let e=a.replace(/&nbsp;/g," ");e=e.replace(/<div>/g,"<br />").replace(/<\/div>/g,""),e=e.replace(/<br\s*\/?>/gi,"[LINEBREAK]").replace(/\n/g,"[LINEBREAK]"),e=e.replace(/<span[^>]*\bclass="mention complete-mention\b[^>]*\bdata-id="(\d+)"[^>]*(?:\s+data-[^>]*="[^"]*")*[^>]*>@([^<]+)<\/span>/g,((a,e,t)=>"WP@[".concat(t.trim(),"](").concat(e.trim(),")"))).replace(/<span[^>]*\bclass="mention unknown-mention\b[^>]*>([^<]*)<\/span>/g,"$1").replace(/<span[^>]*\bclass="mention will-mention\b[^>]*>(?:\s+data-[^>]*="[^"]*")?[^>]*>@([^<]+)<\/span>/g,"@$1"),e=e.replace(/<span[^>]*\bclass="hash complete-hash\b[^>]*\bdata-id="(\d+)"[^>]*(?:\s+data-[^>]*="[^"]*")*[^>]*>#([^<]+)<\/span>/g,((a,e,t)=>"WP#[".concat(t.trim(),"](").concat(e.trim(),")"))).replace(/<span[^>]*\bclass="hash\b[^>]*\bdata-id="(\d+)"[^>]*(?:\s+data-[^>]*="[^"]*")*[^>]*>#([^<]+)<\/span>/g,"WP#[$2]($1)"),e=e.replace(/<a href="(.*?)"(.*?)>(.*?)<\/a>/g,'[$3]($1)[:target="_blank"]');if(/<\/?[^>]+(>|$)/.test(e)){const a=document.createElement("div");a.innerHTML=e,e=a.textContent}return e};export{e as convertHtmlToMarkdownStr,a as convertMarkdownToHtmlStr};
