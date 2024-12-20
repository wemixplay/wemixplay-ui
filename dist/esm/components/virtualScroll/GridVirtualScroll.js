import n from"@babel/runtime/helpers/typeof";import e from"@babel/runtime/helpers/toConsumableArray";import t from"@babel/runtime/helpers/slicedToArray";import r,{memo as i,useRef as o,useState as l,useMemo as a,useCallback as u,useEffect as c,cloneElement as d,createElement as s}from"react";import{makeCxFunc as f}from"../../utils/forReactUtils.js";import m from"../loadings/Spinner.js";import v from"../noData/NoDataText.js";import h from"./imageCacher.js";import p from"./VirtualScroll.module.scss.js";function g(n,e){var t="undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(!t){if(Array.isArray(n)||(t=function(n,e){if(n){if("string"==typeof n)return y(n,e);var t={}.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?y(n,e):void 0}}(n))||e){t&&(n=t);var r=0,i=function(){};return{s:i,n:function(){return r>=n.length?{done:!0}:{done:!1,value:n[r++]}},e:function(n){throw n},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,a=!1;return{s:function(){t=t.call(n)},n:function(){var n=t.next();return l=n.done,n},e:function(n){a=!0,o=n},f:function(){try{l||null==t.return||t.return()}finally{if(a)throw o}}}}function y(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=Array(e);t<e;t++)r[t]=n[t];return r}"undefined"==typeof window&&(r.useLayoutEffect=r.useEffect);var x=f(p),I=i((function(n){var e,i=n.width,a=n.gapX,c=n.gapY,d=n.rowIndex,s=n.columnIndex,f=n.startIndex,m=n.children;o();var v=l(),h=t(v,2),p=h[0],g=h[1],y=l({position:"absolute",width:i,top:(null!==(e=null==p?void 0:p.offsetHeight)&&void 0!==e?e:0+c)*(f+s),left:d?(i+a)*d:0,zIndex:1}),I=t(y,2),b=I[0],w=I[1],E=u((function(){if(p){var n=p.offsetHeight;w((function(e){return Object.assign(Object.assign({},e),{width:i,left:d?(i+a)*d:0,top:(n+c)*(f+s),visibility:"visible"})}))}}),[p,i,d,a,c,f,s]);return r.useLayoutEffect((function(){E()}),[E]),r.createElement("div",{ref:g,className:x("virtual-item"),style:b},m)}));I.displayName="VirtualItem";var b=i((function(i){var f,p,y,b,w,E,j,A,W=i.list,H=i.className,M=void 0===H?"":H,S=i.scrollTarget,O=i.preloadRowCnt,Y=void 0===O?2:O,C=i.itemWidth,N=i.itemHeight,T=i.gapX,L=i.gapY,X=i.loading,k=i.loadingElement,D=void 0===k?r.createElement(m,null):k,F=i.skeletonElement,R=i.skeletonCnt,z=void 0===R?3:R,U=i.noDataMsg,V=i.element,q=o(),B=o(null),$=o(0),G=o(0),J=o(0),K=o(0),P=o({startIndex:0,endIndex:10}),Q=l(!!W),Z=t(Q,1)[0],_=l({startIndex:0,endIndex:10}),nn=t(_,2),en=nn[0],tn=nn[1],rn=l({containerWidth:null!==(p=null===(f=q.current)||void 0===f?void 0:f.clientWidth)&&void 0!==p?p:0,width:"number"==typeof C?C:C(null!==(b=null===(y=q.current)||void 0===y?void 0:y.clientWidth)&&void 0!==b?b:0),gapX:"number"==typeof T?T:T(null!==(E=null===(w=q.current)||void 0===w?void 0:w.clientWidth)&&void 0!==E?E:0),gapY:"number"==typeof L?L:L(null!==(A=null===(j=q.current)||void 0===j?void 0:j.clientWidth)&&void 0!==A?A:0)}),on=t(rn,2),ln=on[0],an=on[1],un=a((function(){if("undefined"!=typeof window)return new ResizeObserver((function(n){var e,t=g(n);try{for(t.s();!(e=t.n()).done;){var r=e.value.target.clientWidth;an({containerWidth:null!=r?r:0,width:"number"==typeof C?C:C(null!=r?r:0),gapX:"number"==typeof T?T:T(null!=r?r:0),gapY:"number"==typeof L?L:L(null!=r?r:0)})}}catch(n){t.e(n)}finally{t.f()}}))}),[T,L,C]),cn=a((function(){return X||!W}),[X,W]),dn=a((function(){var n=Array.from({length:z}).map((function(){}));return function(n){for(var e=ln.containerWidth,t=ln.width,r=parseInt((e/t).toString()),i=Math.ceil(n.length/r)||0,o=new Array(i),l=0;l<i;l++)o[l]=n.slice(l*r,(l+1)*r).map((function(n,e){return n}));return o}(cn?n:W)}),[W,cn,ln,z]),sn=a((function(){return dn.slice(en.startIndex,en.endIndex)}),[en,dn]),fn=a((function(){var n="number"==typeof N?N:N(ln.containerWidth);if(q.current){var t=e(q.current.children);t.length&&(q.current.style.minHeight="");var r=Math.max.apply(Math,e(t.map((function(n){var e;return(null!==(e=n.offsetHeight)&&void 0!==e?e:0)+ln.gapY}))).concat([0]))||n||0;return $.current=r,r}return n||0}),[dn,sn,ln,N]),mn=a((function(){if(W||F){var n=ln.containerWidth,e=ln.width,t=ln.gapX;return parseInt(((n+t)/(e+t)).toString()),fn>0?dn.length*fn:0}}),[W,F,ln,z,fn,dn.length]),vn=u((function(){var n=S?"current"in S?S.current:S:null,e=n?n.scrollTop:window.scrollY,t=n?n.offsetHeight:window.innerHeight,r=n?n.scrollHeight:document.body.scrollHeight,i=G.current>e?0:Math.floor((e-G.current)/fn)-Y,o=Math.ceil((e+t)/fn)+Y;return r===e+t?{startIndex:P.current.startIndex,endIndex:P.current.endIndex}:{startIndex:fn&&i>=0?i:0,endIndex:fn&&o?o:10}}),[fn,Y,S]),hn=u((function(){var n=S?"current"in S?S.current:S:null,e=n?n.scrollTop:window.scrollY,t=Date.now(),r=e-K.current,i=r>0,o=i?r:-1*r;null!==B.current&&cancelAnimationFrame(B.current),B.current=requestAnimationFrame((function(){var n=vn();return o>0&&e>0&&(i&&n.endIndex<P.current.endIndex||!i&&n.startIndex>P.current.startIndex)?(cancelAnimationFrame(B.current),void(B.current=null)):(i&&o>fn?n.endIndex+=Math.floor(o/fn):!i&&o>fn&&(n.startIndex-=Math.floor(o/fn),n.startIndex<=0&&(n.startIndex=0)),t-J.current>=200||e<=0||0===o?(tn(n),K.current=e,P.current=Object.assign({},n),J.current=t,void(B.current=null)):o>=fn*(Y/2)?(tn(n),K.current=e,J.current=t,P.current=Object.assign({},n),void(B.current=null)):void((P.current.endIndex-n.endIndex>Y||n.startIndex-P.current.startIndex>Y)&&(tn(n),K.current=e,J.current=t,P.current=Object.assign({},n))))}))}),[vn,fn,Y,S]);return c((function(){if(un){var n=q.current;return un.observe(n),function(){n&&un.unobserve(n)}}}),[q,un]),c((function(){if(q.current){var n=q.current.getBoundingClientRect().top;G.current=window.scrollY+n}}),[]),c((function(){if("undefined"!=typeof window&&q.current){var n=S?"current"in S?S.current:S:window;return hn(),null==n||n.removeEventListener("scroll",hn),null==n||n.addEventListener("scroll",hn),function(){null!==B.current&&cancelAnimationFrame(B.current),null==n||n.removeEventListener("scroll",hn)}}}),[S,B,hn]),r.createElement("div",{ref:q,className:x(M,"virtual-scroll",{"no-data":!!W&&!W.length}),style:{height:mn,minHeight:Z&&!sn.length?"9999999px":0}},cn&&!F&&r.createElement("div",{className:x("loading")},D),!cn&&0===W.length&&("object"===n(U)?U:r.createElement(v,{className:x("no-msg-comp"),nullText:U})),sn.map((function(n,e){return n.map((function(t,i){var o=(en.startIndex+e)*n.length+i,l=e*n.length+i;return r.createElement(I,Object.assign({key:"".concat(l,"-").concat(ln.containerWidth).concat(cn?"skeleton":"")},ln,{rowIndex:i,columnIndex:e,startIndex:en.startIndex}),r.createElement("div",null,d(W?s(V):F,{item:t,imageCacher:h,index:o})))}))})))}));export{b as default};
