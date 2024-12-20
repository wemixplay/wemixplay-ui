import e from"@babel/runtime/helpers/slicedToArray";import t from"@babel/runtime/helpers/toConsumableArray";import n from"@babel/runtime/helpers/classCallCheck";import a from"@babel/runtime/helpers/createClass";import i from"react";import s from'./../../ext/lodash/uniqueId.js';import o from"./components/HashList.js";import l from"./components/HashContainer.js";import{checkValidHashTag as r}from"../../utils/pluginUtils.js";var d=function(){return a((function e(t){var a=t.contentEditableEl;n(this,e),this.commandKey="hash",this.currentHashList=[],this._config={list:[],onWriteHash:function(e){}},this.contentEditableEl=a}),[{key:"hashId",get:function(){return this._hashId},set:function(e){this._hashId=e,this.setTargetHashId&&this.setTargetHashId(this._hashId),e?this.config.onOpenHashList&&this.config.onOpenHashList():this.config.onCloseHashList&&this.config.onCloseHashList()}},{key:"config",get:function(){return this._config},set:function(e){this._config=e,this.setNewConfig&&this.setNewConfig(e)}},{key:"setConfig",value:function(e){this.config=Object.assign(Object.assign({},this.config),null!=e?e:{})}},{key:"component",value:function(e){var t=this,n=e.plugin;return i.createElement(l,{hash:n},(function(e){var a=e.config,s=e.targetHashId;return i.createElement(o,{ref:function(e){n.hashListRef=e},contentEditableEl:n.contentEditableEl,targetHashId:s,list:a.detectDuplicate?a.list.filter((function(e){return t.currentHashList.every((function(t){return t.name!==e.name}))})):a.list,listElement:a.listElement,selectHashItem:function(e){n.selectHashItem(e)},closeHashList:function(){n.hashId=""}})}))}},{key:"getAllHashTag",value:function(){var e=this.contentEditableEl.current.querySelectorAll(".hash");return Array.from(e).map((function(e){return Object.assign(Object.assign({},Object.fromEntries(Object.entries(e.dataset))),{name:e.textContent.replace("#","").trim()})}))}},{key:"updateCurrentHashList",value:function(e){this.currentHashList=this.getAllHashTag(),e&&(this.currentHashList=[].concat(t(this.currentHashList),[e])),this.config.onCompleteHash&&this.config.onCompleteHash({allHashTag:this.currentHashList,currentHashTag:e})}},{key:"leaveHashTag",value:function(){var e,t,n,a,i,s,o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},l=o.hash,r=o.keepTag,d=window.getSelection(),h=document.createRange(),c=this.contentEditableEl.current,u=this.hashId,v=c.querySelector("#".concat(u));if(v){var m="#"===(null===(t=null===(e=v.firstChild)||void 0===e?void 0:e.textContent)||void 0===t?void 0:t.trim())&&!l,f=new RegExp('<span\\s+id="'.concat(u,'"([^>]*)class="hash"([^>]*)>(.*?)<\\/span>'),"g");if(m){var p=document.createTextNode(null===(n=v.firstChild)||void 0===n?void 0:n.textContent);v.replaceWith(p);var g=document.createRange();return g.setStartAfter(p),g.setEndAfter(p),d.removeAllRanges(),d.addRange(g),void(this.hashId="")}if(l)if(this.config.detectDuplicate&&this.currentHashList.some((function(e){return e.name===l.name})))c.innerHTML=c.innerHTML.replace(f,'<span id="'.concat(u,'" class="duplicate-hash"$1$2>#').concat(l.name,"</span>"));else{c.innerHTML=c.innerHTML.replace(f,'<span id="'.concat(u,'" class="hash complete-hash"$1$2>#').concat(l.name,"</span>"));var E=c.querySelector("#".concat(u));E.dataset.id=String(l.id),E.dataset.name=l.name,E.textContent="#".concat(l.name)}else if(!r){var C=d.focusNode.textContent.trim();if(this.config.detectDuplicate&&this.currentHashList.some((function(e){return e.name===l.name})))c.innerHTML=c.innerHTML.replace(f,'<span id="'.concat(u,'" class="duplicate-hash"$1$2>').concat(C,"</span>"));else{c.innerHTML=c.innerHTML.replace(f,'<span id="'.concat(u,'" class="hash"$1$2>').concat(C,"</span>"));var H=c.querySelector("#".concat(u));H.dataset.id="0",H.dataset.name=C.replace("#",""),this.updateCurrentHashList({id:Number(H.dataset.id),name:H.dataset.name})}}this.hashId="";var x=null===(a=c.querySelector("#".concat(u)))||void 0===a?void 0:a.nextSibling;(Node.TEXT_NODE!==(null==x?void 0:x.TEXT_NODE)||(null===(i=null==x?void 0:x.nodeValue)||void 0===i?void 0:i.trim()))&&c.querySelector("#".concat(u)).insertAdjacentHTML("afterend","&nbsp;");var b=m?c:null===(s=c.querySelector("#".concat(u)))||void 0===s?void 0:s.nextSibling;m?(h.selectNodeContents(b),h.collapse(!1)):(h.setStart(b,1),h.collapse(!0)),d.removeAllRanges(),d.addRange(h),this.contentEditableEl.current.dispatchEvent(new Event("input",{bubbles:!0}))}}},{key:"selectHashItem",value:function(e){var t,n=this.hashListRef.handleSubmit(e);Number(this.contentEditableEl.current.ariaValueMax)<=(null!==(t=null==n?void 0:n.name)&&void 0!==t?t:"").length+this.contentEditableEl.current.textContent.length?this.hashId="":(this.leaveHashTag({hash:n}),this.updateCurrentHashList(n))}},{key:"handleClick",value:function(e){var t,n,a,i,s,o=window.getSelection(),l=o.focusNode,r=!!(null===(a=null===(n=null===(t=null==l?void 0:l.parentElement)||void 0===t?void 0:t.classList)||void 0===n?void 0:n.contains)||void 0===a?void 0:a.call(n,"hash")),d=o.getRangeAt(0);r&&d.startOffset>0&&d.startOffset===d.endOffset&&(this.hashId=l.parentElement.id,this.config.onWriteHash&&this.config.onWriteHash(null===(s=null===(i=null==l?void 0:l.parentElement)||void 0===i?void 0:i.textContent)||void 0===s?void 0:s.replace("#","")))}},{key:"handleKeyDown",value:function(e){var t,n,a,i,s,o,l,r,d,h,c=e.event,u=window.getSelection(),v=document.createRange(),m=this.hashId,f=u.focusNode,p=u.focusOffset,g=!!(null===(a=null===(n=null===(t=null==f?void 0:f.parentElement)||void 0===t?void 0:t.classList)||void 0===n?void 0:n.contains)||void 0===a?void 0:a.call(n,"hash")),E=g&&!(null===(o=null===(s=null===(i=null==f?void 0:f.parentElement)||void 0===i?void 0:i.classList)||void 0===s?void 0:s.contains)||void 0===o?void 0:o.call(s,"complete-hash"));if("ArrowLeft"!==c.code&&"ArrowRight"!==c.code||(g&&p>1&&!m?(this.config.onWriteHash&&this.config.onWriteHash(null===(r=null===(l=null==f?void 0:f.parentElement)||void 0===l?void 0:l.textContent)||void 0===r?void 0:r.replace("#","")),this.hashId=f.parentElement.id):g&&m&&p<=1?this.hashId="":m&&"#"===(null===(d=f.firstChild)||void 0===d?void 0:d.textContent)?this.leaveHashTag():(m&&!g||m&&g&&!E&&p>=f.textContent.length)&&(this.hashId="")),"ArrowRight"===c.code)m&&E&&!f.parentElement.nextElementSibling&&!c.nativeEvent.isComposing?(c.preventDefault(),this.leaveHashTag()):m&&"#"===(null===(h=f.firstChild)||void 0===h?void 0:h.textContent)&&this.leaveHashTag();else if("ArrowUp"===c.code||"ArrowDown"===c.code)m&&(c.preventDefault(),"ArrowUp"===c.code?this.hashListRef.handleArrowUp():this.hashListRef.handleArrowDown());else if("Enter"===c.code)if(m&&!c.nativeEvent.isComposing)c.preventDefault(),this.selectHashItem();else if(g&&p<=1){c.preventDefault();var C=document.createElement("br");f.parentElement.parentNode.insertBefore(C,f.parentElement),v.setStartAfter(C),v.setEndAfter(C),u.removeAllRanges(),u.addRange(v)}}},{key:"handleChange",value:function(t){var n,a,i,o,l,d,h,c,u,v,m,f=window.getSelection(),p=document.createRange(),g=this.contentEditableEl.current,E=f.focusNode,C=f.focusOffset,H=null===(n=null==E?void 0:E.textContent)||void 0===n?void 0:n[C-1],x=null===(a=null==E?void 0:E.textContent)||void 0===a?void 0:a[C-2],b=!!(null===(l=null===(o=null===(i=null==E?void 0:E.parentElement)||void 0===i?void 0:i.classList)||void 0===o?void 0:o.contains)||void 0===l?void 0:l.call(o,"hash")),T=b&&!!(null===(c=null===(h=null===(d=null==E?void 0:E.parentElement)||void 0===d?void 0:d.classList)||void 0===h?void 0:h.contains)||void 0===c?void 0:c.call(h,"complete-hash")),N=!(null==x?void 0:x.trim())&&(null==E?void 0:E.nodeType)===Node.TEXT_NODE&&!b&&"#"===H;if(this.hashId&&b){var L=E.parentElement,R=L.textContent.replace("#","");this.config.onWriteHash&&this.config.onWriteHash(R),R===(null===(u=this.config.list[0])||void 0===u?void 0:u.name)?L.dataset.id=String(this.config.list[0].id):L.dataset.id="0",L.dataset.name=R,this.updateCurrentHashList()}if(N){this.hashId="hash-".concat(s());var I=null!==(v=null==E?void 0:E.textContent)&&void 0!==v?v:"",S=I.slice(0,C-1),A=I.slice(C),y=document.createElement("span");y.id=this.hashId,y.className="hash",y.textContent="#",y.dataset.id="0",y.dataset.name=I,E.textContent=S;var w=E.parentNode;w.insertBefore(y,E.nextSibling);var k=document.createTextNode(A);w.insertBefore(k,y.nextSibling);var O=g.querySelector("#".concat(this.hashId));if(!O)return;p.setStart(O,1),p.collapse(!0),f.removeAllRanges(),f.addRange(p)}else if(b&&1===C&&" "===H){this.hashId="";var D=window.getSelection(),W=D.getRangeAt(0),B=W.startContainer.parentNode;B.textContent=B.textContent.trimStart();var j=document.createTextNode(" ");B.parentNode.insertBefore(j,B),W.setStartBefore(j),W.setEndBefore(j),D.removeAllRanges(),D.addRange(W)}else{if(b&&E.textContent.split(" ").length>1){this.hashId="";var M=E.textContent.split(" "),_=e(M,2),q=_[0],$=_[1],U=document.createTextNode(" "),X=document.createTextNode("".concat(q," ")),K=document.createTextNode($);return E.parentNode.parentNode.insertBefore(K,E.parentNode.nextSibling),C!==E.textContent.length?(E.parentElement.replaceWith(X),p.setStartBefore(K),p.setEndBefore(K)):(E.textContent=q,"#"===q?(E.parentElement.replaceWith(X),p.setStartAfter(X),p.setEndAfter(X)):(E.parentNode.parentNode.insertBefore(U,E.parentNode.nextSibling),p.setStartAfter(K),p.setEndAfter(K))),f.removeAllRanges(),void f.addRange(p)}if(b&&!r(E.parentElement.textContent)){this.hashId="";var V=f.getRangeAt(0).startOffset,P=E.parentNode,z=P.textContent.split("#");if((null==z?void 0:z.length)>2){var F=document.createTextNode(E.parentElement.textContent);E.parentElement.replaceWith(F);var G=document.createRange();G.setStart(F,F.length),G.setEnd(F,F.length),f.removeAllRanges(),f.addRange(G)}var J=e(z,2),Q=J[0],Y=J[1];if(Y&&Y===E.parentElement.dataset.name){var Z=document.createTextNode(Q);P.textContent="#".concat(Y),P.parentNode.insertBefore(Z,P);var ee=document.createRange();ee.setStart(Z,V),ee.setEnd(Z,V),f.removeAllRanges(),f.addRange(ee)}else if(Y){var te=document.createTextNode("".concat(E.textContent," "));E.parentElement.parentNode.replaceChild(te,E.parentNode);var ne=document.createRange();ne.setStart(te,V),ne.setEnd(te,V),f.removeAllRanges(),f.addRange(ne)}return}if(T&&E.parentElement.dataset.name.trim()!==E.parentElement.textContent.replace("#","").trim()){for(var ae in E.parentElement.classList.remove("complete-hash"),E.parentElement.dataset.id="0",E.parentElement.dataset.name=E.parentElement.textContent.replace("#","").trim(),E.parentElement.dataset)delete E.parentElement.dataset[ae];this.hashId=E.parentElement.id,p.setStart(E,C),p.collapse(!0),f.removeAllRanges(),f.addRange(p)}}N||b||(this.hashId=""),N||!b||T||this.hashId||!(null===(m=E.parentElement)||void 0===m?void 0:m.id)||(this.hashId=E.parentElement.id),!N&&b&&this.hashId&&!E.textContent.slice(-1).trim()&&this.leaveHashTag(),this.currentHashList.length!==this.getAllHashTag().length&&this.updateCurrentHashList()}},{key:"handleUndoRedo",value:function(){var e,t=document.createRange();if(null===(e=t.startContainer.classList)||void 0===e?void 0:e.contains("hash")){var n=t.startContainer,a=n.id;this.hashId||(this.config.onWriteHash&&this.config.onWriteHash(n.innerText.replace("#","")),this.hashId=a)}else this.hashId=""}},{key:"handlePaste",value:function(e){var t,n,a,i=e.event,s=window.getSelection(),o=s.focusNode,l=!!(null===(a=null===(n=null===(t=null==o?void 0:o.parentElement)||void 0===t?void 0:t.classList)||void 0===n?void 0:n.contains)||void 0===a?void 0:a.call(n,"hash")),d=i.nativeEvent.clipboardData.getData("text");if(l&&r(d)){var h=o.parentElement,c=document.createTextNode(d);h.nextSibling?h.parentNode.insertBefore(c,h.nextSibling):h.parentNode.appendChild(c);var u=document.createRange();u.setStartAfter(c),u.collapse(!0),s.removeAllRanges(),s.addRange(u),i.preventDefault()}}},{key:"observe",value:function(e){var t=e.setTargetHashId,n=e.setConfig;this.setTargetHashId=t,this.setNewConfig=n}}])}();export{d as default};
