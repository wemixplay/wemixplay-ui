import t from"isomorphic-dompurify";const{sanitize:e}=t;class i{constructor(t){let{contentEditableEl:e}=t;this.commandKey="pasteToPlainText",this.config={},this.contentEditableEl=e}setConfig(t){this.config=Object.assign(Object.assign({},this.config),null!=t?t:{})}checkHTMLFormat(t){return/<(div|span|p|img|video|iframe)(\s[^>]*)?>/i.test(t)}getMediaMatchUrlList(t){const e=/<(img|video|iframe)(?=[^>]*\s+src=["']([^"']+)["'])[^>]*>/g;let i;const n=[];for(;null!==(i=e.exec(t));)n.push({tag:i[1],src:i[2].startsWith("http")?i[2]:"https://".concat(i[2])});return n}getUrlMatchList(t){var e,i;return null!==(i=null===(e=(null!=t?t:"").match(/\bhttps?:\/\/[^\s"']+|www\.[^\s"']+|ftp:\/\/[^\s"']+/gi))||void 0===e?void 0:e.map((t=>{const e=t.trim();return e.startsWith("http")?e:"https://".concat(e)})))&&void 0!==i?i:[]}handlePaste(t){let{event:i}=t;var n,a,s;const r=window.getSelection(),c=i.nativeEvent.clipboardData.getData("text"),l=i.nativeEvent.clipboardData.getData("text/html");let o=i.nativeEvent.clipboardData.getData("text/plain");o=e(o),o=o.replace(/<img[^>]*src="([^"]*)"[^>]*>|<video[^>]*>.*?<\/video>|<iframe[^>]*>.*?<\/iframe>/gi,"$1");const d=this.contentEditableEl.current.getAttribute("aria-valuemax");if(d){const t=Number(d)-this.contentEditableEl.current.textContent.length-1;o=t>0?o.slice(0,t):""}const h=this.getMediaMatchUrlList(this.checkHTMLFormat(c)?c:l),p=this.getUrlMatchList(o),g=null!==(s=null===(a=(n=this.config).onMatchUrlReplace)||void 0===a?void 0:a.call(n,{textUrls:p,mediaUrls:h}))&&void 0!==s?s:[];p.forEach(((t,e)=>{g[e]&&(o.includes(t)?o=o.replace(t,g[e]):o.includes(t.replace("https://",""))&&(o=o.replace(t.replace("https://",""),g[e])))}));const m=r.getRangeAt(0);m.deleteContents();const v=document.createElement("div");v.innerHTML="".concat(o.replace(/<script\b[^>]*>([\s\S]*?)<\/script>|<style\b[^>]*>([\s\S]*?)<\/style>/gi,"").trim(),"&nbsp;");const u=v.lastChild;for(const t of Array.from(v.childNodes).reverse())m.insertNode(t);v.remove(),m.setStartAfter(u),m.setEndAfter(u),r.removeAllRanges(),r.addRange(m),i.preventDefault(),this.contentEditableEl.current.dispatchEvent(new Event("input",{bubbles:!0}))}}export{i as default};
