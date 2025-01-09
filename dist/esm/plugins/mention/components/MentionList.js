"use client";
import e,{forwardRef as t,useRef as n,useState as r,useCallback as o,useImperativeHandle as c,useEffect as i}from"react";import{isDesktop as l}from"react-device-detect";import s from"./MentionList.module.scss.js";import{makeCxFunc as a}from"../../../utils/forReactUtils.js";import u from"../../../components/avatars/Person.js";import m from"../../../assets/svgs/ico-certified-v2.svg.js";import d from"../../../hooks/useCheckDevice.js";const h=a(s),f=t(((t,s)=>{let{targetMentionId:a,className:f="",list:p,contentEditableEl:g,listElement:v,selectMentionItem:b,closeMentionList:y}=t;const E=n(),w=n(),L=n({x:0,y:0}),[N,x]=r({}),[T,k]=r(0),{isMobile:j}=d(),M=o((()=>{if(!(null!=p?p:[]).length)return;const e=0===T?p.length-1:T-1;k(e);const t=w.current.querySelector("li:nth-child(".concat(e+1,")"));w.current.scrollTop=t.offsetTop-20}),[T,p]),H=o((()=>{if(!(null!=p?p:[]).length)return;const e=T===p.length-1?0:T+1;k(e);const t=w.current.querySelector("li:nth-child(".concat(e+1,")"));w.current.scrollTop=t.offsetTop-20}),[p,T]),z=o((e=>{if((null!=p?p:[]).length)return p[null!=e?e:T]}),[T,p]),I=o((e=>{l&&k(e)}),[]),O=o((e=>{k(e),b(e)}),[b]),S=o((e=>{var t,n;if(!e)return;const{offsetHeight:r}=e,o=e.getBoundingClientRect(),c="fixed"===document.body.style.position&&!!document.body.style.top&&Number(document.body.style.top.replace("px",""))<0?-1*Number(document.body.style.top.replace("px","")):window.scrollY,i=o.left+E.current.offsetWidth-window.innerWidth,l=o.top+c,s=o.bottom+c,a=i>0?o.left-i-10:o.left,u=c,m=c+window.innerHeight;let d="bottom",h=null!==(t=E.current.clientHeight)&&void 0!==t?t:0;h>m-s&&(d=l-u>m-s?"top":"bottom"),h>l-u&&h>m-s&&(w.current.style.height="".concat("top"===d?l-u-32:m-s-32,"px")),h=null!==(n=E.current.clientHeight)&&void 0!==n?n:0;const f={position:"absolute",zIndex:"9999999",visibility:"visible"};switch(j&&(f.maxWidth="95%"),d){case"top":f.top=l-h,f.left=j?"50%":a;break;case"bottom":f.top=l+r,f.left=j?"50%":a}return j&&(f.transform="translateX(-50%)"),f}),[j]),Y=o((e=>{L.current={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY}}),[]),q=o((e=>{const t=w.current.scrollTop,n=w.current.scrollHeight;(e.cancelable&&t<=0&&e.changedTouches[0].clientY-L.current.y>0||e.cancelable&&t>=n-w.current.clientHeight&&L.current.y-e.changedTouches[0].clientY>0)&&e.preventDefault()}),[]);return c(s,(()=>(E.current.handleArrowUp=M,E.current.handleArrowDown=H,E.current.handleSubmit=z,E.current))),i((()=>{if(g.current&&a){const e=g.current.querySelector("#".concat(a)),t=S(e);x(t)}else x({})}),[a,p.length,S]),i((()=>{k(0)}),[p]),i((()=>{const e=e=>{const t=e.target;!E.current||E.current.contains(t)||t.classList.contains("mention")||y()};return document.addEventListener("click",e),window.addEventListener("resize",y),()=>{document.removeEventListener("click",e),window.removeEventListener("resize",y)}}),[y]),i((()=>{const e=w.current;return e.addEventListener("touchstart",Y),e.addEventListener("touchmove",q),()=>{e.removeEventListener("touchstart",Y),e.removeEventListener("touchmove",q)}}),[Y,q]),e.createElement("div",{ref:E,className:h(f,"mention-list"),contentEditable:!1,style:Object.assign(Object.assign({},N),{display:(null!=p?p:[]).length>0?"block":"none"})},e.createElement("ul",{ref:w,className:h("mention-list-area")},(null!=p?p:[]).map(((t,n)=>e.createElement("li",{className:h("mention-item",{active:T===n}),key:"".concat(t.name,"-").concat(n),"data-id":t.id,onMouseOver:()=>I(n),onClick:()=>O(n)},v?v(t):e.createElement(e.Fragment,null,e.createElement(u,{src:t.profileImg,size:"custom",className:h("thumb")}),e.createElement("p",{className:h("item-info")},e.createElement("strong",{className:h("item-title")},t.name),!!t.isOfficial&&e.createElement(m,{width:12,height:12}))))))))}));f.displayName="MentionList";export{f as default};
