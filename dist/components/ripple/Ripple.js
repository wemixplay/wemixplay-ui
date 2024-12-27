"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),t=require("./Ripple.module.scss.js"),n=require("../../utils/forReactUtils.js");const i={color:"#ddd",duration:500,maxSize:400,disabled:!1},r=n.makeCxFunc(t),o=t=>{let{color:n=i.color,duration:o=i.duration,maxSize:a=i.maxSize,disabled:c=i.disabled,children:l}=t;const s=e.useRef(null),[p,d]=e.useState(null),u=e.useCallback((e=>{if(!p||c)return;p.style.position="relative",p.style.overflow="hidden";const{clientX:t,clientY:i}=e,{left:r,top:l,width:s,height:d}=p.getBoundingClientRect(),u=document.createElement("jwripple"),m=s+d/2;u.classList.add("animate"),u.setAttribute("style","\n          position: absolute;\n          top: ".concat(i-l,"px;\n          left: ").concat(t-r,"px;\n          z-index: 1;\n          min-width: 30px;\n          min-height: 30px;\n          max-width: ").concat(a,"px;\n          max-height: ").concat(a,"px;\n          width: ").concat(m,"px;\n          height: ").concat(m,"px;\n          background-color: ").concat(n,";\n          animation-duration: ").concat(Math.abs(o),"ms;\n          border-radius: 50%;\n          opacity: 0;\n          cursor: pointer;\n          pointer-events: none;\n          transform-origin: center;\n          will-change: transform, opacity;\n  ")),p.prepend(u),e.stopPropagation(),setTimeout((()=>{u.remove()}),Math.abs(o)+200)}),[p,n,o,c,a]);return e.useEffect((()=>{(()=>{if(s.current){if(s.current.childElementCount>1)throw new Error("[Ripple]: Ripple 컴포넌트 사용할 시 Ripple 컴포넌트의 하위 자식 엘리먼트 갯수는 하나여야만 합니다. 그렇지 않을 시 Ripple은 작동하지 않습니다.");if(0===s.current.childElementCount)throw new Error("[Ripple]: Ripple 컴포넌트의 하위 자식 엘리먼트가 존재하지 않습니다. 하위 자식 엘리먼트가 없을 경우 Ripple은 작동하지 않습니다.");d(s.current.children[0])}})()}),[s]),e.createElement("div",{ref:s,className:r("ripple"),onMouseDown:u},l)};var a=e.memo(o);exports.DEFAULT_RIPPLE_OPTION=i,exports.default=a;
