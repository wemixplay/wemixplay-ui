"use client";
"use strict";var e=require("../../_virtual/_tslib.js"),n=require("react"),t=require("./WpEditor.module.scss.js"),r=require('./../../ext/lodash/debounce.js'),o=require("./WpEditorContents.js"),a=require("../../utils/forReactUtils.js"),c=require("../../utils/pluginUtils.js");const l=a.makeCxFunc(t),i=e=>{let{plugin:n,contentEditableEl:t}=e;return n.map((e=>new e({contentEditableEl:t})))},u=n.forwardRef(((t,a)=>{var{className:u="",name:s,initialValue:d,config:p={},plugin:g=[],placeholder:h,maxLength:m,onClick:v,handleChange:f}=t,C=e.__rest(t,["className","name","initialValue","config","plugin","placeholder","maxLength","onClick","handleChange"]);const b=n.useRef(!1),y=n.useRef(),E=n.useRef({index:0,stack:[""],disabled:!1}),[k,T]=n.useState(i({plugin:g,contentEditableEl:y})),R=n.useMemo((()=>r.default((()=>{var e;y.current&&E.current.stack[E.current.index]!==(null===(e=y.current)||void 0===e?void 0:e.innerHTML)&&(E.current.stack.push(y.current.innerHTML),E.current.index+=1)}),300)),[]),L=n.useMemo((()=>{if("undefined"!=typeof window)return new MutationObserver((()=>{y.current&&E.current&&(E.current.disabled?E.current.disabled=!1:R())}))}),[R]),w=n.useCallback((()=>{const e=document.createRange();return{selection:window.getSelection(),range:e}}),[]),x=n.useCallback((()=>{var e;const{selection:n,range:t}=w();return t.selectNodeContents(null!==(e=y.current.lastChild)&&void 0!==e?e:y.current),t.collapse(!1),n.removeAllRanges(),n.addRange(t),t}),[w]),K=n.useCallback((e=>{let{range:n}=w();if("historyUndo"===e.inputType||"historyRedo"===e.inputType){e.preventDefault&&e.preventDefault();const{index:t,stack:r}=E.current,o="historyUndo"===e.inputType?t-1:t+1;if(o>=0&&o<r.length){const t=r[o];y.current.innerHTML=t,f&&f(t.replace(/&nbsp;/g," "),s),n=x(),"historyUndo"===e.inputType?E.current.index-=1:E.current.index+=1;const a=n.getBoundingClientRect(),c=y.current.getBoundingClientRect();a.top<c.top?y.current.scrollTop-=c.top-a.top:a.bottom>c.bottom&&(y.current.scrollTop+=a.bottom-c.bottom)}E.current.disabled=!0,k.forEach((n=>{n.handleUndoRedo&&n.handleUndoRedo({type:e.inputType})}))}else{const{index:e}=E.current;e>0&&(E.current.stack=E.current.stack.slice(0,e+1)),E.current.disabled=!1}}),[s,f,w,k,x]),M=n.useCallback((e=>{const{selection:n}=w(),t=y.current.innerHTML;if((e.ctrlKey&&"KeyB"===e.code||e.metaKey&&"KeyB"===e.code)&&e.preventDefault(),"KeyZ"===e.code&&(e.metaKey||e.ctrlKey)&&e.shiftKey&&(K(Object.assign(Object.assign({},e),{inputType:"historyRedo"})),e.preventDefault()),k.forEach((n=>{n.handleKeyDown&&n.handleKeyDown({event:e})})),!("Enter"!==e.code&&"NumpadEnter"!==e.code||e.shiftKey||e.nativeEvent.isComposing||y.current.innerHTML!==t)){e.preventDefault(),e.stopPropagation(),document.execCommand("insertLineBreak");let t=n.getRangeAt(0);t=t.cloneRange(),t.setStart(t.startContainer,0);const r=t.getBoundingClientRect(),o=y.current.getBoundingClientRect();if(r.bottom>o.bottom){const e=r.bottom-o.bottom;y.current.scrollTo({top:y.current.scrollTop+2*e})}}C.onKeyDown&&C.onKeyDown(e)}),[w,K,k,C]),D=n.useCallback((e=>{e.target.innerHTML||(y.current.innerHTML=""),(()=>{const e=window.getSelection();if(e.rangeCount>0){const n=e.getRangeAt(0),t=n.startContainer.parentNode;if("tagName"in t&&"font"===t.tagName.toLowerCase()){const r=t.textContent,o=document.createDocumentFragment(),a=document.createTextNode(r);o.appendChild(a),t.parentNode.replaceChild(o,t),n.setStart(a,r.length),n.setEnd(a,r.length),e.removeAllRanges(),e.addRange(n)}}})();for(const n of k)n.handleChange&&n.handleChange({event:e});f&&f(y.current.innerHTML.replace(/&nbsp;/g," "),s),C.onChange&&C.onChange(e),C.onInput&&C.onInput(e),R()}),[f,R,s,k,C]),H=n.useCallback((e=>{k.forEach((n=>{n.handleClick&&n.handleClick({event:e})}))}),[k]),N=n.useCallback((e=>{k.forEach((n=>{n.handleCopy&&n.handleCopy({event:e})})),C.onCopy&&C.onCopy(e)}),[k,C]),B=n.useCallback((e=>{var n,t,r,o,a,l;E.current.stack[E.current.index]!==y.current.innerHTML&&(E.current.stack.push(y.current.innerHTML),E.current.index+=1);let i=k;const u=window.getSelection().focusNode,s=!!(null===(r=null===(t=null===(n=null==u?void 0:u.parentElement)||void 0===n?void 0:n.classList)||void 0===t?void 0:t.contains)||void 0===r?void 0:r.call(t,"hash")),d=!!(null===(l=null===(a=null===(o=null==u?void 0:u.parentElement)||void 0===o?void 0:o.classList)||void 0===a?void 0:a.contains)||void 0===l?void 0:l.call(a,"mention")),p=e.nativeEvent.clipboardData.getData("text");s&&c.checkValidHashTag(p)&&(i=i.filter((e=>"pasteToPlainText"!==e.commandKey))),d&&c.checkValidMention(p)&&(i=i.filter((e=>"pasteToPlainText"!==e.commandKey))),i.forEach((n=>{n.handlePaste&&n.handlePaste({event:e})})),C.onPaste&&C.onPaste(e)}),[k,C]),j=n.useCallback((e=>{k.forEach((n=>{n.handleFocus&&n.handleFocus({event:e})})),C.onFocus&&C.onFocus(e)}),[k,C]),P=n.useCallback((e=>{k.forEach((n=>{n.handleBlur&&n.handleBlur({event:e})})),C.onBlur&&C.onBlur(e)}),[k,C]),q=n.useCallback((function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{keepRange:!0};y.current.innerHTML=e,y.current.dispatchEvent(new Event("input",{bubbles:!0})),n.keepRange&&x()}),[x]);return n.useEffect((()=>{k.forEach((e=>{e.setConfig&&e.setConfig(p[e.commandKey])}))}),[p,k]),n.useEffect((()=>{if(L){const e=y.current;return L.observe(e,{childList:!0,subtree:!0,characterData:!0}),e.addEventListener("beforeinput",K),()=>{L.disconnect(),e.removeEventListener("beforeinput",K)}}}),[L,K]),n.useEffect((()=>{!d||y.current.innerHTML||b.current||(y.current.innerHTML=d,x(),b.current=!0)}),[d,x]),n.useEffect((()=>{T(i({plugin:g,contentEditableEl:y}))}),[]),n.useImperativeHandle(a,(()=>(y.current.setData=q,y.current))),n.createElement("div",{className:l("wp-editor"),onClick:v},n.createElement(o,Object.assign({ref:y,className:l(u,"wp-editor-content")},C,{"aria-placeholder":h,"aria-valuemax":m,contentEditable:!0,onInput:D,onPaste:B,onCopy:N,onKeyDown:M,onFocus:j,onBlur:P,onClick:H})),k.filter((e=>null==e?void 0:e.component)).map(((e,t)=>{var r;const o=e.component;return n.createElement(o,{key:null!==(r=e.commandKey)&&void 0!==r?r:t,plugin:e})})))}));u.displayName="WpEditor";var s=u;module.exports=s;
