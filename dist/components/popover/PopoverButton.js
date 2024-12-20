"use strict";var e=require("@babel/runtime/helpers/toConsumableArray"),r=require("@babel/runtime/helpers/slicedToArray"),n=require("@babel/runtime/regenerator"),t=require("../../_virtual/_tslib.js"),o=require("react"),a=require("./PopoverButton.module.scss.js"),i=require("../ripple/Ripple.js"),u=require("../../hooks/useClickOutside.js"),c=require("../../utils/forReactUtils.js"),s=require("../portal/Portal.js"),l=c.makeCxFunc(a),d=[],m=o.forwardRef((function(a,c){var m=a.id,p=a.className,v=void 0===p?"":p,f=a.anchorId,b=a.detectDoubleClick,w=a.popoverElement,k=a.popoverStyle,x=void 0===k?{top:0,left:0,zIndex:1}:k,C=a.popoverAnimation,E=void 0===C?{name:"",duration:0}:C,q=a.ripple,g=a.excludeOutSideIds,h=void 0===g?d:g,j=a.whenWindowScrollClose,y=a.children,_=a.onClick,N=o.useRef(),S=o.useRef(!1),F=o.useState(!1),O=r(F,2),R=O[0],I=O[1],P=o.useState(""),T=r(P,2),A=T[0],D=T[1],M=o.useMemo((function(){return R&&("enter"===A||"leave"===A)?{animationName:E.name,animationDuration:"".concat(E.duration,"ms"),animationTimingFunction:E.timingFunc||"ease",animationDirection:"leave"===A?"reverse":"normal",animationFillMode:"leave"===A?"forwards":"normal"}:{}}),[E,R,A]),B=o.useCallback((function(e){return new Promise((function(r){return setTimeout(r,e)}))}),[]),L=o.useCallback((function(){return t.__awaiter(void 0,void 0,void 0,n.mark((function e(){return n.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(f){e.next=2;break}return e.abrupt("return");case 2:return D(""),e.next=5,B(10);case 5:return D("leave"),e.next=8,B(E.duration);case 8:I(!1);case 9:case"end":return e.stop()}}),e)})))}),[f,E.duration,B]),z=o.useCallback((function(){return t.__awaiter(void 0,void 0,void 0,n.mark((function e(){return n.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(f){e.next=2;break}return e.abrupt("return");case 2:return I(!0),D("enter"),e.next=6,B(E.duration);case 6:D("");case 7:case"end":return e.stop()}}),e)})))}),[f,E.duration,B]),H=o.useCallback((function(){R?L():z()}),[R,L,z]),U=o.useCallback((function(e){return t.__awaiter(void 0,void 0,void 0,n.mark((function r(){return n.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!S.current||!b){r.next=2;break}return r.abrupt("return");case 2:S.current=!0,setTimeout((function(){S.current=!1}),500),H(),_&&_(e);case 6:case"end":return r.stop()}}),r)})))}),[b,H,_]),W=o.useMemo((function(){var e="string"==typeof(null==w?void 0:w.type)?void 0:{close:L};return o.createElement("div",{className:l("popover-element-wrap")},R&&o.createElement("div",{className:l("popover-element",A),style:Object.assign(Object.assign({},x),M)},o.cloneElement(null!=w?w:o.createElement(o.Fragment,null),e)))}),[M,L,R,w,x,A]);return u(N,(function(r){var n=[].concat(e(h),[f]).filter((function(e){return!!e})).concat(d).map((function(e){return document.querySelector("#".concat(e))})).filter((function(e){return e})),t=r.target;document.body.contains(t)&&(n.some((function(e){return null==e?void 0:e.contains(t)}))||R&&L())}),{event:"mouseup"}),o.useEffect((function(){var e=function(){I(!1),D("")};return R&&j&&window.addEventListener("scroll",e),function(){window.removeEventListener("scroll",e)}}),[j,R]),o.useImperativeHandle(c,(function(){return{close:L,open:z}})),o.createElement("div",{ref:N,id:m,className:l("popover-area")},o.createElement(i.default,Object.assign({},q),o.createElement("button",{className:l("btn-popover",v,R&&"open"),onClick:U},y)),f?o.createElement(s,{id:f},W):null)}));m.displayName="PopoverButton";var p=m;module.exports=p;
