'use client';
import e,{memo as t,useRef as n,useState as r,useMemo as i,createElement as l,useCallback as c,useEffect as o,cloneElement as a}from"react";import{makeCxFunc as s}from"../../utils/forReactUtils.js";import d from"../loadings/Spinner.js";import u from"../noData/NoDataText.js";import m from"./imageCacher.js";import f from"./VirtualScroll.module.scss.js";"undefined"==typeof window&&(e.useLayoutEffect=e.useEffect);const g=s(f),h=t((t=>{let{gapY:i,index:l,resizeObserver:a,children:s,heightList:d,updateHeight:u}=t;var m,f;const h=n(),[v,x]=r({position:"absolute",width:"100%",top:(null!==(f=null===(m=h.current)||void 0===m?void 0:m.offsetHeight)&&void 0!==f?f:0+i)*l,left:0,zIndex:1,visibility:d[l]?"visible":"hidden"}),p=c((()=>{if(h.current){const e=h.current.offsetHeight;u(e,l)}}),[l,u]),I=c((()=>{if(d[l]){const e=d.slice(0,l).reduce(((e,t)=>e+t),0);x((t=>Object.assign(Object.assign({},t),{left:0,top:e+i,visibility:"visible"})))}else p()}),[i,d,l,p]);return o((()=>{I()}),[I]),o((()=>{const e=h.current;return a.observe(e),()=>{a.unobserve(e)}}),[a]),e.createElement("div",{ref:h,"data-index":l,className:g("virtual-item"),style:v},s)}));h.displayName="VirtualItem";var v=t((t=>{let{className:s="",scrollTarget:f,list:v,preloadCnt:x=5,itemHeight:p,gapY:I=0,loading:b,loadingElement:w=e.createElement(d,null),skeletonElement:y,skeletonCnt:E=3,noDataMsg:j,element:H}=t;var O,N,W,Y;const L=n(),A=n(null),M=n(0),T=n(0),k=n({startIndex:0,endIndex:50}),[z]=r(!!v),[C,D]=r([]),[F,R]=r({startIndex:0,endIndex:50}),[S,V]=r({containerWidth:null!==(N=null===(O=L.current)||void 0===O?void 0:O.clientWidth)&&void 0!==N?N:0,gapY:"number"==typeof I?I:I(null!==(Y=null===(W=L.current)||void 0===W?void 0:W.clientWidth)&&void 0!==Y?Y:0)}),q=i((()=>l(H)),[H]),U=i((()=>new ResizeObserver((e=>{var t;for(const n of e){const{clientWidth:e,offsetHeight:r,dataset:i}=n.target,l=Number(null!==(t=i.index)&&void 0!==t?t:-1);-1===l?V({containerWidth:null!=e?e:0,gapY:"number"==typeof I?I:I(null!=e?e:0)}):D((e=>e.map(((e,t)=>t===l?r:e))))}}))),[I]),B=i((()=>b||!v),[b,v]),G=i((()=>v||y?B?Array.from({length:E}).map((()=>{})):v.slice(F.startIndex,F.endIndex):[]),[v,y,F,E,B]),J=i((()=>{const e="number"==typeof p?p:p(S.containerWidth);return C.filter((e=>!!e)).length?Math.max(...C.filter((e=>!!e))):e}),[C,p,S.containerWidth]),K=i((()=>{const e=v?v.length:E;return e>0&&C.length===e?C.reduce(((e,t)=>e+t+S.gapY),0):J>0?J*e:0}),[v,E,C,J,S.gapY]),P=c((()=>{const e=f?"current"in f?f.current:f:null,t=e?e.scrollTop:window.scrollY,n=e?e.offsetHeight:window.innerHeight,r=C.reduce(((e,t)=>{var n;const r=(null!==(n=e[e.length-1])&&void 0!==n?n:0)+t;return e.push(r),e}),[]);let i=r.findIndex((e=>e>=t)),l=r.findIndex((e=>e>=t+n));return-1===i?i=k.current.startIndex:(i=i-10-x,i=J&&i>0?i:0),-1===l?l=k.current.endIndex:(l=l+10+x,l=J&&l>0?l:50),{startIndex:i,endIndex:l}}),[f,C,J,x]),Q=c(((e,t)=>{(v||y)&&D((n=>(n[t]=e,n.slice(0,v?v.length:E))))}),[v,y,E]),X=c((()=>{const e=f?"current"in f?f.current:f:null,t=e?e.scrollTop:window.scrollY,n=Date.now(),r=t-T.current,i=r>0,l=Math.abs(r);null!==A.current&&cancelAnimationFrame(A.current),A.current=requestAnimationFrame((()=>{const e=P();return l>0&&t>0&&(i&&e.endIndex<k.current.endIndex||!i&&e.startIndex>k.current.startIndex)?(cancelAnimationFrame(A.current),void(A.current=null)):(i&&l>J?e.endIndex+=Math.floor(l/J):!i&&l>J&&(e.startIndex-=Math.floor(l/J),e.startIndex<=0&&(e.startIndex=0)),n-M.current>=200||t<=0||0===l?(R(e),T.current=t,k.current=Object.assign({},e),M.current=n,void(A.current=null)):void(l>=J*(x/2)?(R(e),T.current=t,k.current=Object.assign({},e),M.current=n,A.current=null):(k.current.endIndex-e.endIndex>x||e.startIndex-k.current.startIndex>x)&&(R(e),T.current=t,M.current=n,k.current=Object.assign({},e))))}))}),[P,J,x,f]);return o((()=>{U.observe(L.current)}),[L,U]),o((()=>{if("undefined"!=typeof window&&L.current){const e=f?"current"in f?f.current:f:window;return X(),e.removeEventListener("scroll",X),e.addEventListener("scroll",X),()=>{null!==A.current&&cancelAnimationFrame(A.current),e.removeEventListener("scroll",X)}}}),[f,A,X]),e.createElement("div",{ref:L,className:g(s,"virtual-scroll",{"no-data":v&&!v.length}),style:{height:K,minHeight:z&&!v?"100000px":0}},B&&!y&&e.createElement("div",{className:g("loading")},w),!B&&0===v.length&&("object"==typeof j?j:e.createElement(u,{className:g("no-msg-comp"),nullText:j})),G.map(((t,n)=>{const r=F.startIndex+n;return e.createElement(h,Object.assign({key:"".concat(r,"-").concat(S.containerWidth,"-").concat(v?"":"skeleton")},S,{index:r,resizeObserver:U,heightList:C,updateHeight:Q}),e.createElement("div",null,a(v?q:y,{item:t,imageCacher:m,index:r})))})))}));export{v as default};
