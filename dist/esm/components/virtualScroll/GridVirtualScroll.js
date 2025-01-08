"use client";
import e,{memo as t,useRef as n,useState as r,useMemo as l,useCallback as o,useEffect as i,cloneElement as c,createElement as a}from"react";import{makeCxFunc as u}from"../../utils/forReactUtils.js";import d from"../loadings/Spinner.js";import s from"../noData/NoDataText.js";import m from"./imageCacher.js";import f from"./VirtualScroll.module.scss.js";"undefined"==typeof window&&(e.useLayoutEffect=e.useEffect);const g=u(f),h=t((t=>{let{width:l,gapX:i,gapY:c,rowIndex:a,columnIndex:u,startIndex:d,children:s}=t;var m;n();const[f,h]=r(),[p,v]=r({position:"absolute",width:l,top:(null!==(m=null==f?void 0:f.offsetHeight)&&void 0!==m?m:0+c)*(d+u),left:a?(l+i)*a:0,zIndex:1}),x=o((()=>{if(f){const e=f.offsetHeight;v((t=>Object.assign(Object.assign({},t),{width:l,left:a?(l+i)*a:0,top:(e+c)*(d+u),visibility:"visible"})))}}),[f,l,a,i,c,d,u]);return e.useLayoutEffect((()=>{x()}),[x]),e.createElement("div",{ref:h,className:g("virtual-item"),style:p},s)}));h.displayName="VirtualItem";var p=t((t=>{let{list:u,className:f="",scrollTarget:p,preloadRowCnt:v=2,itemWidth:x,itemHeight:I,gapX:w,gapY:y,loading:b,loadingElement:E=e.createElement(d,null),skeletonElement:j,skeletonCnt:W=3,noDataMsg:H,element:Y}=t;var M,N,O,A,X,C,L,T;const k=n(),D=n(null),F=n(0),R=n(0),S=n(0),z=n(0),V=n({startIndex:0,endIndex:10}),[q]=r(!!u),[B,U]=r({startIndex:0,endIndex:10}),[G,J]=r({containerWidth:null!==(N=null===(M=k.current)||void 0===M?void 0:M.clientWidth)&&void 0!==N?N:0,width:"number"==typeof x?x:x(null!==(A=null===(O=k.current)||void 0===O?void 0:O.clientWidth)&&void 0!==A?A:0),gapX:"number"==typeof w?w:w(null!==(C=null===(X=k.current)||void 0===X?void 0:X.clientWidth)&&void 0!==C?C:0),gapY:"number"==typeof y?y:y(null!==(T=null===(L=k.current)||void 0===L?void 0:L.clientWidth)&&void 0!==T?T:0)}),K=l((()=>{if("undefined"!=typeof window)return new ResizeObserver((e=>{for(const t of e){const{clientWidth:e}=t.target;J({containerWidth:null!=e?e:0,width:"number"==typeof x?x:x(null!=e?e:0),gapX:"number"==typeof w?w:w(null!=e?e:0),gapY:"number"==typeof y?y:y(null!=e?e:0)})}}))}),[w,y,x]),P=l((()=>b||!u),[b,u]),Q=l((()=>{const e=Array.from({length:W}).map((()=>{}));return(e=>{const{containerWidth:t,width:n,gapX:r,gapY:l}=G,o=parseInt((t/n).toString()),i=Math.ceil(e.length/o)||0,c=new Array(i);for(let t=0;t<i;t++)c[t]=e.slice(t*o,(t+1)*o).map(((e,t)=>e));return c})(P?e:u)}),[u,P,G,W]),Z=l((()=>Q.slice(B.startIndex,B.endIndex)),[B,Q]),$=l((()=>{const e="number"==typeof I?I:I(G.containerWidth);if(k.current){const t=[...k.current.children];t.length&&(k.current.style.minHeight="");const n=Math.max(...t.map((e=>{var t;return(null!==(t=e.offsetHeight)&&void 0!==t?t:0)+G.gapY})),0)||e||0;return F.current=n,n}return e||0}),[Q,Z,G,I]),_=l((()=>{if(!u&&!j)return;const{containerWidth:e,width:t,gapX:n,gapY:r}=G;return parseInt(((e+n)/(t+n)).toString()),$>0?Q.length*$:0}),[u,j,G,W,$,Q.length]),ee=o((()=>{const e=p?"current"in p?p.current:p:null,t=e?e.scrollTop:window.scrollY,n=e?e.offsetHeight:window.innerHeight,r=e?e.scrollHeight:document.body.scrollHeight,l=R.current>t?0:Math.floor((t-R.current)/$)-v,o=Math.ceil((t+n)/$)+v;return r===t+n?{startIndex:V.current.startIndex,endIndex:V.current.endIndex}:{startIndex:$&&l>=0?l:0,endIndex:$&&o?o:10}}),[$,v,p]),te=o((()=>{const e=p?"current"in p?p.current:p:null,t=e?e.scrollTop:window.scrollY,n=Date.now(),r=t-z.current,l=r>0,o=l?r:-1*r;null!==D.current&&cancelAnimationFrame(D.current),D.current=requestAnimationFrame((()=>{const e=ee();return o>0&&t>0&&(l&&e.endIndex<V.current.endIndex||!l&&e.startIndex>V.current.startIndex)?(cancelAnimationFrame(D.current),void(D.current=null)):(l&&o>$?e.endIndex+=Math.floor(o/$):!l&&o>$&&(e.startIndex-=Math.floor(o/$),e.startIndex<=0&&(e.startIndex=0)),n-S.current>=200||t<=0||0===o?(U(e),z.current=t,V.current=Object.assign({},e),S.current=n,void(D.current=null)):o>=$*(v/2)?(U(e),z.current=t,S.current=n,V.current=Object.assign({},e),void(D.current=null)):void((V.current.endIndex-e.endIndex>v||e.startIndex-V.current.startIndex>v)&&(U(e),z.current=t,S.current=n,V.current=Object.assign({},e))))}))}),[ee,$,v,p]);return i((()=>{if(K){const e=k.current;return K.observe(e),()=>{e&&K.unobserve(e)}}}),[k,K]),i((()=>{if(k.current){const{top:e}=k.current.getBoundingClientRect();R.current=window.scrollY+e}}),[]),i((()=>{if("undefined"!=typeof window&&k.current){const e=p?"current"in p?p.current:p:window;return te(),null==e||e.removeEventListener("scroll",te),null==e||e.addEventListener("scroll",te),()=>{null!==D.current&&cancelAnimationFrame(D.current),null==e||e.removeEventListener("scroll",te)}}}),[p,D,te]),e.createElement("div",{ref:k,className:g(f,"virtual-scroll",{"no-data":!!u&&!u.length}),style:{height:_,minHeight:q&&!Z.length?"9999999px":0}},P&&!j&&e.createElement("div",{className:g("loading")},E),!P&&0===u.length&&("object"==typeof H?H:e.createElement(s,{className:g("no-msg-comp"),nullText:H})),Z.map(((t,n)=>t.map(((r,l)=>{const o=(B.startIndex+n)*t.length+l,i=n*t.length+l;return e.createElement(h,Object.assign({key:"".concat(i,"-").concat(G.containerWidth).concat(P?"skeleton":"")},G,{rowIndex:l,columnIndex:n,startIndex:B.startIndex}),e.createElement("div",null,c(u?a(Y):j,{item:r,imageCacher:m,index:o})))})))))}));export{p as default};
