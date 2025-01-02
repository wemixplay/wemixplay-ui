"use strict";var e=require("react"),t=require("../../utils/forReactUtils.js"),n=require("../loadings/Spinner.js"),r=require("../noData/NoDataText.js"),l=require("./imageCacher.js"),u=require("./VirtualScroll.module.scss.js");"undefined"==typeof window&&(e.useLayoutEffect=e.useEffect);const c=t.makeCxFunc(u),i=e.memo((t=>{let{width:n,gapX:r,gapY:l,rowIndex:u,columnIndex:i,startIndex:o,children:s}=t;var a;e.useRef();const[d,m]=e.useState(),[f,g]=e.useState({position:"absolute",width:n,top:(null!==(a=null==d?void 0:d.offsetHeight)&&void 0!==a?a:0+l)*(o+i),left:u?(n+r)*u:0,zIndex:1}),h=e.useCallback((()=>{if(d){const e=d.offsetHeight;g((t=>Object.assign(Object.assign({},t),{width:n,left:u?(n+r)*u:0,top:(e+l)*(o+i),visibility:"visible"})))}}),[d,n,u,r,l,o,i]);return e.useLayoutEffect((()=>{h()}),[h]),e.createElement("div",{ref:m,className:c("virtual-item"),style:f},s)}));i.displayName="VirtualItem";const o=t=>{let{list:u,className:o="",scrollTarget:s,preloadRowCnt:a=2,itemWidth:d,itemHeight:m,gapX:f,gapY:g,loading:h,loadingElement:p=e.createElement(n,null),skeletonElement:v,skeletonCnt:x=3,noDataMsg:I,element:w}=t;var b,y,E,M,j,R,W,H;const Y=e.useRef(),C=e.useRef(null),S=e.useRef(0),k=e.useRef(0),q=e.useRef(0),N=e.useRef(0),O=e.useRef({startIndex:0,endIndex:10}),[A]=e.useState(!!u),[X,F]=e.useState({startIndex:0,endIndex:10}),[L,T]=e.useState({containerWidth:null!==(y=null===(b=Y.current)||void 0===b?void 0:b.clientWidth)&&void 0!==y?y:0,width:"number"==typeof d?d:d(null!==(M=null===(E=Y.current)||void 0===E?void 0:E.clientWidth)&&void 0!==M?M:0),gapX:"number"==typeof f?f:f(null!==(R=null===(j=Y.current)||void 0===j?void 0:j.clientWidth)&&void 0!==R?R:0),gapY:"number"==typeof g?g:g(null!==(H=null===(W=Y.current)||void 0===W?void 0:W.clientWidth)&&void 0!==H?H:0)}),D=e.useMemo((()=>{if("undefined"!=typeof window)return new ResizeObserver((e=>{for(const t of e){const{clientWidth:e}=t.target;T({containerWidth:null!=e?e:0,width:"number"==typeof d?d:d(null!=e?e:0),gapX:"number"==typeof f?f:f(null!=e?e:0),gapY:"number"==typeof g?g:g(null!=e?e:0)})}}))}),[f,g,d]),z=e.useMemo((()=>h||!u),[h,u]),V=e.useMemo((()=>{const e=Array.from({length:x}).map((()=>{}));return(e=>{const{containerWidth:t,width:n,gapX:r,gapY:l}=L,u=parseInt((t/n).toString()),c=Math.ceil(e.length/u)||0,i=new Array(c);for(let t=0;t<c;t++)i[t]=e.slice(t*u,(t+1)*u).map(((e,t)=>e));return i})(z?e:u)}),[u,z,L,x]),B=e.useMemo((()=>V.slice(X.startIndex,X.endIndex)),[X,V]),U=e.useMemo((()=>{const e="number"==typeof m?m:m(L.containerWidth);if(Y.current){const t=[...Y.current.children];t.length&&(Y.current.style.minHeight="");const n=Math.max(...t.map((e=>{var t;return(null!==(t=e.offsetHeight)&&void 0!==t?t:0)+L.gapY})),0)||e||0;return S.current=n,n}return e||0}),[V,B,L,m]),G=e.useMemo((()=>{if(!u&&!v)return;const{containerWidth:e,width:t,gapX:n,gapY:r}=L;return parseInt(((e+n)/(t+n)).toString()),U>0?V.length*U:0}),[u,v,L,x,U,V.length]),J=e.useCallback((()=>{const e=s?"current"in s?s.current:s:null,t=e?e.scrollTop:window.scrollY,n=e?e.offsetHeight:window.innerHeight,r=e?e.scrollHeight:document.body.scrollHeight,l=k.current>t?0:Math.floor((t-k.current)/U)-a,u=Math.ceil((t+n)/U)+a;return r===t+n?{startIndex:O.current.startIndex,endIndex:O.current.endIndex}:{startIndex:U&&l>=0?l:0,endIndex:U&&u?u:10}}),[U,a,s]),K=e.useCallback((()=>{const e=s?"current"in s?s.current:s:null,t=e?e.scrollTop:window.scrollY,n=Date.now(),r=t-N.current,l=r>0,u=l?r:-1*r;null!==C.current&&cancelAnimationFrame(C.current),C.current=requestAnimationFrame((()=>{const e=J();return u>0&&t>0&&(l&&e.endIndex<O.current.endIndex||!l&&e.startIndex>O.current.startIndex)?(cancelAnimationFrame(C.current),void(C.current=null)):(l&&u>U?e.endIndex+=Math.floor(u/U):!l&&u>U&&(e.startIndex-=Math.floor(u/U),e.startIndex<=0&&(e.startIndex=0)),n-q.current>=200||t<=0||0===u?(F(e),N.current=t,O.current=Object.assign({},e),q.current=n,void(C.current=null)):u>=U*(a/2)?(F(e),N.current=t,q.current=n,O.current=Object.assign({},e),void(C.current=null)):void((O.current.endIndex-e.endIndex>a||e.startIndex-O.current.startIndex>a)&&(F(e),N.current=t,q.current=n,O.current=Object.assign({},e))))}))}),[J,U,a,s]);return e.useEffect((()=>{if(D){const e=Y.current;return D.observe(e),()=>{e&&D.unobserve(e)}}}),[Y,D]),e.useEffect((()=>{if(Y.current){const{top:e}=Y.current.getBoundingClientRect();k.current=window.scrollY+e}}),[]),e.useEffect((()=>{if("undefined"!=typeof window&&Y.current){const e=s?"current"in s?s.current:s:window;return K(),null==e||e.removeEventListener("scroll",K),null==e||e.addEventListener("scroll",K),()=>{null!==C.current&&cancelAnimationFrame(C.current),null==e||e.removeEventListener("scroll",K)}}}),[s,C,K]),e.createElement("div",{ref:Y,className:c(o,"virtual-scroll",{"no-data":!!u&&!u.length}),style:{height:G,minHeight:A&&!B.length?"9999999px":0}},z&&!v&&e.createElement("div",{className:c("loading")},p),!z&&0===u.length&&("object"==typeof I?I:e.createElement(r,{className:c("no-msg-comp"),nullText:I})),B.map(((t,n)=>t.map(((r,c)=>{const o=(X.startIndex+n)*t.length+c,s=n*t.length+c;return e.createElement(i,Object.assign({key:"".concat(s,"-").concat(L.containerWidth).concat(z?"skeleton":"")},L,{rowIndex:c,columnIndex:n,startIndex:X.startIndex}),e.createElement("div",null,e.cloneElement(u?e.createElement(w):v,{item:r,imageCacher:l,index:o})))})))))};var s=e.memo(o);module.exports=s;
