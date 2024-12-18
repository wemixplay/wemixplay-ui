import t from"@babel/runtime/helpers/toConsumableArray";import e from"@babel/runtime/helpers/slicedToArray";import r from"@babel/runtime/regenerator";import{__awaiter as o}from"../../_virtual/_tslib.js";import{debounce as n,throttle as i}from"lodash-es";import c,{useRef as a,useState as l,useMemo as s,useCallback as u,useEffect as p}from"react";import{isMobile as d}from"react-device-detect";import f from"../../hooks/useClickOutside.js";import{makeCxFunc as h}from"../../utils/forReactUtils.js";import m from"../portal/Portal.js";import v from"./Tooltip.module.scss.js";import g from"../../assets/svgs/ico-tooltip-arrow.svg.js";var w=function(t){return new Promise((function(e){return setTimeout(e,t)}))},b=h(v),x=function(h){var v=h.className,x=void 0===v?"":v,H=h.anchorId,W=h.width,E=void 0===W?200:W,y=h.space,L=void 0===y?4:y,k=h.place,N=void 0===k?"bottom":k,Y=h.events,T=void 0===Y?["hover"]:Y,X=h.arrowPosition,C=void 0===X?0:X,j=h.hideArrow,A=h.tooltipPosition,B=h.tooltipColor,P=h.tooltipTextColor,R=h.tooltipBoxShadow,z=h.tooltipBorderRadius,S=h.open,D=h.whenWindowScrollClose,I=h.children,_=a(),q=a(),O=a(),U=a(),F=a(0),G=a(!1),J=l(!1),K=e(J,2),M=K[0],Q=K[1],V=l(N),Z=e(V,2),$=Z[0],tt=Z[1],et=l(!!S),rt=e(et,2),ot=rt[0],nt=rt[1],it=s((function(){var e=t(T),r=e.findIndex((function(t){return"hover"===t}));return-1===r||d||e.splice(r,0,"mouseover","mouseout"),e}),[T]),ct=u((function(){if(q.current)return q.current;var t=document.querySelector("#".concat(H));t&&(q.current=t)}),[H]),at=u((function(t,e){var r,o=window,n=o.scrollY,i=n,c=n+o.innerHeight,a=(null===(r=q.current)||void 0===r?void 0:r.getBoundingClientRect()).top;return i>t&&a>0?t+a:c<t+e?c-e-10:t}),[]),lt=u((function(t,e){var r=window,o=r.scrollX,n=o+r.innerWidth;return o>t?o+L:n<t+e?n-e-L:t}),[L]),st=u((function(t){var e=t.targetTop,r=t.targetLeft,o=t.targetWidth,n=t.targetHeight,i=t.tooltipHeight,c=t.arrowWidth,a=t.arrowHeight;return scrollY+e-i-a-L<scrollY&&"top"===N?"bottom":scrollY+e+n+a+L>scrollY+innerHeight&&"bottom"===N?"top":r-c-L<100&&"left"===N?"right":innerWidth-(scrollX+r+o+c+L+10)<100&&"right"===N?"left":r+scrollX<scrollX?"right":N}),[N,L]),ut=u((function(){var t;if(!_.current||!q.current)return{targetTop:0,targetLeft:0,targetWidth:0,targetHeight:0,arrowWidth:0,arrowHeight:0,tooltipWidth:0,tooltipHeight:0,scrollX:0,scrollY:0,innerWidth:0,innerHeight:0};var e=q.current.getBoundingClientRect(),r=e.top,o=e.left,n=e.height,i=e.width,c=_.current,a=c.offsetHeight,l=c.offsetWidth,s=null!==(t=O.current)&&void 0!==t?t:{},u=s.clientWidth,p=void 0===u?0:u,d=s.clientHeight,f=void 0===d?0:d,h=window,m=h.scrollX,v=h.scrollY,g=h.innerWidth,w=h.innerHeight,b=document.body.style,x=b.position,H=b.top,W=b.left,E="fixed"===x?-1*Number(H.replace("px","")):0,y="fixed"===x?-1*Number(W.replace("px","")):0;return{targetTop:r,targetLeft:o,targetWidth:i,targetHeight:n,arrowWidth:p,arrowHeight:f,tooltipWidth:l,tooltipHeight:a,scrollX:y||m,scrollY:E||v,innerWidth:g,innerHeight:w}}),[]),pt=u((function(){return o(void 0,void 0,void 0,r.mark((function t(){var e,o,n,i,c,a,l,s,u,p,d,f,h,m,v,g,b,x,H,W,E,y,k;return r.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(q.current&&_.current){t.next=2;break}return t.abrupt("return");case 2:e=ut(),o=e.targetTop,n=e.targetLeft,i=e.targetWidth,c=e.targetHeight,a=e.arrowWidth,l=e.arrowHeight,s=e.tooltipWidth,u=e.tooltipHeight,p=e.scrollX,d=e.scrollY,f=e.innerWidth,h=e.innerHeight,v=(m=null!=A?A:{}).top,g=void 0===v?0:v,b=m.left,x=void 0===b?0:b,H=C||0,W=st({targetTop:o,targetLeft:n,targetWidth:i,targetHeight:c,arrowWidth:a,arrowHeight:l,tooltipWidth:s,tooltipHeight:u,scrollX:p,scrollY:d,innerWidth:f,innerHeight:h}),tt(W),E="",y="",k="",t.t0=W,t.next="top"===t.t0?13:"left"===t.t0?16:"right"===t.t0?19:(t.t0,22);break;case 13:return E+="\n          top: ".concat(g+d+o-u-l-L,"px;\n          left: ").concat(lt(x+p+n+i/2-s/2,s),"px;\n        "),y+="\n          top: ".concat(g+d+o-l-L,"px;\n          left: ").concat(H+p+n+i/2-a/2,"px;\n        "),t.abrupt("break",25);case 16:return E+="\n          top: ".concat(at(g+d+o-(u-c)/2,u),"px;\n          left: ").concat(lt(x+p+n-s-l-L,s),"px;\n          max-width: ").concat(n-a-L,"px;\n        "),y+="\n          top: ".concat(H+d+o+c/2-a/2,"px;\n          left: ").concat(x+p+n-a-L,"px;\n        "),t.abrupt("break",25);case 19:return E+="\n          top: ".concat(at(g+d+o-(u-c)/2,u),"px;\n          left: ").concat(x+p+n+i+a+L,"px;\n          max-width: ").concat(f-(p+n+i+a+L+10),"px;\n        "),y+="\n          top: ".concat(H+d+o+c/2-l/2,"px;\n          left: ").concat(x+p+n+i+L,"px;\n        "),t.abrupt("break",25);case 22:return E+="\n        top: ".concat(g+d+o+c+l+L,"px;\n        left: ").concat(lt(x+p+n+i/2-s/2,s),"px;\n      "),y+="\n        transform: rotate(0deg);\n        top: ".concat(g+d+o+c+L,"px;\n        left: ").concat(H+p+n+i/2-a/2,"px;\n      "),t.abrupt("break",25);case 25:if(k+="\n      ".concat(E,"\n      width: ").concat(s,"px;\n      height: ").concat(u,"px;\n    "),_.current.setAttribute("style",E),U.current.setAttribute("style",k),O.current&&O.current.setAttribute("style",y),2!==F.current){t.next=34;break}return F.current=0,t.abrupt("return",nt(!0));case 34:return t.next=36,w(20);case 36:F.current+=1,pt();case 38:case"end":return t.stop()}}),t)})))}),[C,L,A,st,lt,at,ut]),dt=s((function(){return n((function(t){"click"!==t.type&&G.current||("click"===t.type&&(t.preventDefault(),G.current=!0),"mouseout"===t.type?nt(!1):0===F.current&&pt(),t.preventDefault())}),100)}),[pt]),ft=u((function(){q.current&&"boolean"!=typeof S&&it.forEach((function(t){q.current.addEventListener(t,dt)}))}),[S,it,dt]),ht=u((function(){q.current&&it.forEach((function(t){q.current.removeEventListener(t,dt)}))}),[it,dt]);return f(_,(function(t){if("boolean"!=typeof S){var e=q.current;e&&!e.contains(t.target)&&(G.current=!1,nt(!1))}})),p((function(){return ct(),ft(),function(){ht()}}),[pt,ct,ft,ht]),p((function(){var t=i((function(){nt(!1)}),30);return window.removeEventListener("resize",t),window.addEventListener("resize",t),D&&(window.removeEventListener("scroll",t),window.addEventListener("scroll",t)),function(){window.removeEventListener("resize",t),window.removeEventListener("scroll",t)}}),[D,pt]),p((function(){S&&M&&pt(),nt(S)}),[M,S,pt]),c.createElement(m,{id:"tooltip"},c.createElement("div",{ref:function(){M||Q(!0)},className:b("tooltip",x,$,{open:ot}),style:{visibility:ot?"visible":"hidden","--tooltip-color":B,"--tooltip-text-color":P,"--tooltip-box-shadow":R,"--tooltip-border-radius":z}},c.createElement("div",{ref:U,className:b("tooltip-shadow")}),!j&&c.createElement("div",{ref:O,className:b("tooltip-arrow")},c.createElement("span",null,c.createElement(g,{className:b("tooltip-arrow-icon")}))),c.createElement("div",{ref:_,className:b("tooltip-text")},c.createElement("div",{className:b("speech-bubble-wrap")},c.createElement("div",{className:b("speech-bubble"),style:{width:E}},c.createElement("div",null,I))))))};export{x as default};
