import e from"@babel/runtime/helpers/slicedToArray";import t from"@babel/runtime/helpers/toConsumableArray";import n from"@babel/runtime/helpers/classCallCheck";import i from"@babel/runtime/helpers/createClass";import o from"@babel/runtime/regenerator";import{__awaiter as l}from"../../_virtual/_tslib.js";import r from"react";import a from"../../_virtual/uniqueId.js";import s from"./components/MentionList.js";import c from"./components/MentionContainer.js";import{checkValidMention as d}from"../../utils/pluginUtils.js";var m=function(){return i((function e(t){var i=t.contentEditableEl;n(this,e),this.commandKey="mention",this.currentMentionList=[],this._config={list:[],onWriteMention:function(e){}},this.contentEditableEl=i}),[{key:"mentionId",get:function(){return this._mentionId},set:function(e){this._mentionId=e,this.setTargetMentionId&&this.setTargetMentionId(this._mentionId),e?this.config.onOpenMentionList&&this.config.onOpenMentionList():this.config.onCloseMentionList&&this.config.onCloseMentionList()}},{key:"config",get:function(){return this._config},set:function(e){this._config=e,this.setNewConfig&&this.setNewConfig(e)}},{key:"setConfig",value:function(e){this.config=Object.assign(Object.assign({},this.config),null!=e?e:{})}},{key:"component",value:function(e){var t=this,n=e.plugin;return r.createElement(c,{mention:n},(function(e){var i=e.config,o=e.targetMentionId;return r.createElement(s,{ref:function(e){n.mentionListRef=e},targetMentionId:o,contentEditableEl:n.contentEditableEl,list:i.detectDuplicate?i.list.filter((function(e){return t.currentMentionList.every((function(t){return t.name!==e.name}))})):i.list,listElement:i.listElement,selectMentionItem:function(e){n.selectMentionItem(e)},closeMentionList:function(){n.mentionId=""}})}))}},{key:"getCurrentMentionList",value:function(){var e=this.contentEditableEl.current.querySelectorAll(".mention.complete-mention"),t=Array.from(e).map((function(e){return Object.assign(Object.assign({},Object.fromEntries(Object.entries(e.dataset))),{name:e.textContent.replace("@","").trim()})}));return this.currentMentionList=t,this.config.onCompleteMention&&this.config.onCompleteMention({allMention:t}),t}},{key:"leaveMentionTag",value:function(){var e,t,n,i,o,l=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=l.mention,a=l.keepTag,s=window.getSelection(),c=document.createRange(),d=this.contentEditableEl.current,m=this.mentionId,u=d.querySelector("#".concat(m));if(u){var v="@"===(null===(e=null==u?void 0:u.textContent)||void 0===e?void 0:e.trim())&&!r,f=!!(null==u?void 0:u.classList.contains("will-mention")),g=new RegExp('<span\\s+id="'.concat(m,'"([^>]*)class="mention ').concat(f?"will-mention":"unknown-mention",'"([^>]*)>(.*?)<\\/span>'),"g");if(v){var h=document.createTextNode(null===(t=u.firstChild)||void 0===t?void 0:t.textContent);u.replaceWith(h);var p=document.createRange();return p.setStartAfter(h),p.setEndAfter(h),s.removeAllRanges(),s.addRange(p),void(this.mentionId="")}if(r){d.innerHTML=d.innerHTML.replace(g,'<span id="'.concat(m,'" class="mention complete-mention"$1$2>@').concat(r.name.trim(),"</span>"));var E=d.querySelector("#".concat(m));E.dataset.id=String(r.id),E.dataset.name=r.name.trim(),E.textContent="@".concat(r.name.trim())}else if(!a){var M=s.focusNode.textContent.trim();d.innerHTML=d.innerHTML.replace(g,'<span id="'.concat(m,'" class="mention unknown-mention"$1$2>').concat(M,"</span>"))}this.mentionId="";var x=null===(n=d.querySelector("#".concat(m)))||void 0===n?void 0:n.nextSibling;(Node.TEXT_NODE!==(null==x?void 0:x.TEXT_NODE)||(null===(i=null==x?void 0:x.nodeValue)||void 0===i?void 0:i.trim()))&&d.querySelector("#".concat(m)).insertAdjacentHTML("afterend","&nbsp;");var C=v?d:null===(o=d.querySelector("#".concat(m)))||void 0===o?void 0:o.nextSibling;v?(c.selectNodeContents(C),c.collapse(!1)):(c.setStart(C,1),c.collapse(!0)),s.removeAllRanges(),s.addRange(c),this.contentEditableEl.current.dispatchEvent(new Event("input",{bubbles:!0}))}}},{key:"handleClick",value:function(e){var t,n,i,o,l,r=window.getSelection(),a=r.focusNode,s=!!(null===(i=null===(n=null===(t=null==a?void 0:a.parentElement)||void 0===t?void 0:t.classList)||void 0===n?void 0:n.contains)||void 0===i?void 0:i.call(n,"mention")),c=r.getRangeAt(0);s&&c.startOffset>0&&c.startOffset===c.endOffset&&(this.config.onWriteMention&&this.config.onWriteMention(null===(l=null===(o=null==a?void 0:a.parentElement)||void 0===o?void 0:o.textContent)||void 0===l?void 0:l.replace("@","")),this.mentionId=a.parentElement.id)}},{key:"selectMentionItem",value:function(e){var n;return l(this,void 0,void 0,o.mark((function i(){var l,r,a;return o.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:if(l=this.mentionListRef.handleSubmit(e),!(Number(this.contentEditableEl.current.ariaValueMax)<=(null!==(n=null==l?void 0:l.name)&&void 0!==n?n:"").length+this.contentEditableEl.current.textContent.length)){i.next=5;break}return this.mentionId="",i.abrupt("return");case 5:if(r=this.contentEditableEl.current.querySelectorAll(".mention.complete-mention"),!(this.config.maxMentionCnt&&this.config.maxMentionCnt<=r.length)){i.next=16;break}if(this.mentionId="",this.contentEditableEl.current.blur(),!this.config.onMaxMentionList){i.next=14;break}return i.next=12,this.config.onMaxMentionList();case 12:i.next=15;break;case 14:alert("최대 ".concat(this.config.maxMentionCnt,"개 까지 작성이 가능합니다."));case 15:return i.abrupt("return");case 16:this.leaveMentionTag({mention:l}),a=Array.from(r).map((function(e){return Object.assign(Object.assign({},Object.fromEntries(Object.entries(e.dataset))),{name:e.textContent.replace("@","").trim()})})),this.currentMentionList=[].concat(t(a),[l]),this.config.onCompleteMention&&this.config.onCompleteMention({allMention:this.currentMentionList,currentMention:l});case 20:case"end":return i.stop()}}),i,this)})))}},{key:"handleKeyDown",value:function(e){var t,n,i,o,l,r,a,s,c,d,m,u,v,f=e.event,g=window.getSelection(),h=document.createRange(),p=this.mentionId,E=g.focusNode,M=g.focusOffset,x=!!(null===(i=null===(n=null===(t=null==E?void 0:E.parentElement)||void 0===t?void 0:t.classList)||void 0===n?void 0:n.contains)||void 0===i?void 0:i.call(n,"mention")),C=!!(null===(r=null===(l=null===(o=null==E?void 0:E.parentElement)||void 0===o?void 0:o.classList)||void 0===l?void 0:l.contains)||void 0===r?void 0:r.call(l,"will-mention"))||!!(null===(c=null===(s=null===(a=null==E?void 0:E.parentElement)||void 0===a?void 0:a.classList)||void 0===s?void 0:s.contains)||void 0===c?void 0:c.call(s,"unknown-mention"));if("ArrowLeft"!==f.code&&"ArrowRight"!==f.code||(!p&&M>1&&x?(this.config.onWriteMention&&this.config.onWriteMention(null===(m=null===(d=null==E?void 0:E.parentElement)||void 0===d?void 0:d.textContent)||void 0===m?void 0:m.replace("@","")),this.mentionId=E.parentElement.id):x&&p&&M<=1?this.mentionId="":x&&p&&"@"===(null===(u=E.firstChild)||void 0===u?void 0:u.textContent)?this.leaveMentionTag():(p&&!x||p&&x&&!C&&M>=E.textContent.length)&&(this.mentionId="")),"ArrowRight"===f.code)p&&C&&!E.parentElement.nextElementSibling&&!f.nativeEvent.isComposing?(f.preventDefault(),this.leaveMentionTag()):p&&"@"===(null===(v=E.firstChild)||void 0===v?void 0:v.textContent)&&this.leaveMentionTag();else if("ArrowUp"===f.code||"ArrowDown"===f.code)p&&(f.preventDefault(),"ArrowUp"===f.code?this.mentionListRef.handleArrowUp():this.mentionListRef.handleArrowDown());else if("Enter"===f.code)if(p&&!f.nativeEvent.isComposing)f.preventDefault(),this.selectMentionItem();else if(x&&M<=1){f.preventDefault();var b=document.createElement("br");E.parentElement.parentNode.insertBefore(b,E.parentElement),h.setStartAfter(b),h.setEndAfter(b),g.removeAllRanges(),g.addRange(h)}}},{key:"handleChange",value:function(t){var n,i,o,l,r,s,c,m,u,v,f=window.getSelection(),g=this.contentEditableEl.current,h=f.focusNode,p=f.focusOffset,E=null===(n=null==h?void 0:h.textContent)||void 0===n?void 0:n[p-1],M=null===(i=null==h?void 0:h.textContent)||void 0===i?void 0:i[p-2],x=!!(null===(r=null===(l=null===(o=null==h?void 0:h.parentElement)||void 0===o?void 0:o.classList)||void 0===l?void 0:l.contains)||void 0===r?void 0:r.call(l,"mention")),C=!!(null===(m=null===(c=null===(s=null==h?void 0:h.parentElement)||void 0===s?void 0:s.classList)||void 0===c?void 0:c.contains)||void 0===m?void 0:m.call(c,"complete-mention")),b=this.contentEditableEl.current.querySelectorAll(".mention.complete-mention"),I=!(null==M?void 0:M.trim())&&(null==h?void 0:h.nodeType)===Node.TEXT_NODE&&!x&&"@"===E;if(this.mentionId&&x&&this.config.onWriteMention&&this.config.onWriteMention(h.parentElement.firstChild.textContent.replace("@","")),I&&(null!=b?b:[]).length>=this.config.maxMentionCnt)this.config.onMaxMentionList?this.config.onMaxMentionList():alert("최대 ".concat(this.config.maxMentionCnt,"개 까지 작성이 가능합니다."));else if(I){var w=document.createRange();this.mentionId="mention-".concat(a());var L=null!==(u=h.textContent)&&void 0!==u?u:"",N=L.slice(0,p-1),R=L.slice(p),S=document.createElement("span");S.id=this.mentionId,S.className="mention will-mention",S.textContent="@",h.textContent=N;var A=h.parentNode;A.insertBefore(S,h.nextSibling);var T=document.createTextNode(R);A.insertBefore(T,S.nextSibling);var y=g.querySelector("#".concat(this.mentionId));if(!y)return;w.setStart(y,1),w.collapse(!0),f.removeAllRanges(),f.addRange(w)}else if(x&&1===p&&" "===E){this.mentionId="";var k=window.getSelection(),O=k.getRangeAt(0),j=O.startContainer.parentNode;j.textContent=j.textContent.trimStart();var D=document.createTextNode(" ");j.parentNode.insertBefore(D,j),O.setStartBefore(D),O.setEndBefore(D),k.removeAllRanges(),k.addRange(O)}else{if(x&&h.textContent.split(" ").length>1){this.mentionId="";var _=document.createRange(),B=h.textContent.split(" "),W=e(B,2),q=W[0],H=W[1],U=document.createTextNode(" "),$=document.createTextNode("".concat(q," ")),X=document.createTextNode(H);return h.parentNode.parentNode.insertBefore(X,h.parentNode.nextSibling),p!==h.textContent.length?(h.parentElement.replaceWith($),_.setStartBefore(X),_.setEndBefore(X)):(h.textContent=q,h.parentNode.parentNode.insertBefore(U,h.parentNode.nextSibling),_.setStartAfter(X),_.setEndAfter(X)),f.removeAllRanges(),void f.addRange(_)}if(x&&!d(h.textContent)){this.mentionId="";var K=f.getRangeAt(0).startOffset,V=document.createTextNode("".concat(h.textContent," "));h.parentElement.parentNode.replaceChild(V,h.parentNode);var P=document.createRange();return P.setStart(V,K),P.setEnd(V,K),f.removeAllRanges(),void f.addRange(P)}if(C&&h.parentElement.dataset.name.trim()!==h.parentElement.textContent.replace("@","").trim()){var z=document.createRange();for(var F in h.parentElement.classList.replace("complete-mention","will-mention"),h.parentElement.dataset)delete h.parentElement.dataset[F];this.mentionId=h.parentElement.id,z.setStart(h,null!=p?p:0),z.collapse(!0),f.removeAllRanges(),f.addRange(z)}}return I||x||(this.mentionId=""),I||!x||C||this.mentionId||!(null===(v=h.parentElement)||void 0===v?void 0:v.id)||(this.mentionId=h.parentElement.id),!I&&x&&this.mentionId&&!h.textContent.slice(-1).trim()&&this.leaveMentionTag(),this.currentMentionList.length!==b.length&&this.getCurrentMentionList(),!1}},{key:"handleUndoRedo",value:function(){var e,t=document.createRange();if(null===(e=t.startContainer.classList)||void 0===e?void 0:e.contains("mention")){var n=t.startContainer,i=n.id;this.mentionId||(this.config.onWriteMention&&this.config.onWriteMention(n.innerText.replace("@","")),this.mentionId=i)}else this.mentionId=""}},{key:"handlePaste",value:function(e){var t,n,i,o=e.event,l=window.getSelection(),r=l.focusNode,a=!!(null===(i=null===(n=null===(t=null==r?void 0:r.parentElement)||void 0===t?void 0:t.classList)||void 0===n?void 0:n.contains)||void 0===i?void 0:i.call(n,"mention")),s=o.nativeEvent.clipboardData.getData("text");if(a&&d(s)){var c=r.parentElement,m=document.createTextNode(s);c.nextSibling?c.parentNode.insertBefore(m,c.nextSibling):c.parentNode.appendChild(m);var u=document.createRange();u.setStartAfter(m),u.collapse(!0),l.removeAllRanges(),l.addRange(u),o.preventDefault()}}},{key:"observe",value:function(e){var t=e.setTargetMentionId,n=e.setConfig;this.setTargetMentionId=t,this.setNewConfig=n}}])}();export{m as default};