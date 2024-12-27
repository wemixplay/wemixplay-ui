"use strict";var e=require("react"),t=require("./FeedIframesView.module.scss.js"),r=require("../carousel/Carousel.js"),a=require("../../assets/svgs/ico-delete-x.svg.js"),u=require("../../utils/forReactUtils.js"),o=require("../../node_modules/react-youtube/dist/YouTube.esm.js");const n="wp_ui_youtube_is_mute",s=u.makeCxFunc(t),c=e.forwardRef(((t,u)=>{let{className:c="",media:i=[],intersectionVideo:l,handleDeleteIframe:d}=t;const m=e.useRef(),p=e.useRef(),v=e.useRef("NOT_YET"),w=e.useRef({playTimeoutId:0,pauseTimeoutId:0}),[f,y]=e.useState(!1),I=e.useCallback((e=>{const[t]=e.split("?");return t.split("/").pop()}),[]),b=e.useCallback((e=>{if(!m.current)return;Number(localStorage.getItem(n)||0)?m.current.mute():m.current.unMute(),-1===e.data?v.current="NOT_YET":0===e.data?v.current="ENDED":1===e.data?v.current="PLAYING":2===e.data?v.current="PAUSED":3===e.data?v.current="BUFFERING":5===e.data&&(v.current="CUED")}),[]),E=e.useCallback((()=>{m.current&&m.current.playVideo()}),[]),g=e.useCallback((()=>{m.current&&m.current.pauseVideo()}),[]),T=e.useCallback((()=>{var e;m.current&&(null===(e=m.current)||void 0===e?void 0:e.playerInfo)&&(localStorage.getItem(n)?m.current.isMuted()?localStorage.setItem(n,"1"):localStorage.setItem(n,"0"):(m.current.mute(),localStorage.setItem(n,"1")))}),[]),N=e.useMemo((()=>{if("undefined"!=typeof window&&f&&l)return window.IntersectionObserver?new IntersectionObserver((e=>{var t,r,a,u;window.clearTimeout(w.current.playTimeoutId),m.current&&(null===(t=m.current)||void 0===t?void 0:t.playerInfo)&&((null===(r=e[0])||void 0===r?void 0:r.intersectionRatio)>0&&m.current.addEventListener("onVolumeChange",T),(null===(a=e[0])||void 0===a?void 0:a.intersectionRatio)>.8&&"PAUSED"!==v.current?w.current.playTimeoutId=window.setTimeout((()=>{m.current.playVideo()}),500):(null===(u=e[0])||void 0===u?void 0:u.intersectionRatio)<=.8&&(m.current.pauseVideo(),w.current.pauseTimeoutId=window.setTimeout((()=>{v.current="AUTO_PAUSED"}),200)))}),{threshold:[0,.25,.5,.75,1]}):void 0}),[l,f,T]);return e.useEffect((()=>{const e=p.current;if(N&&f)return N.observe(e),()=>{N.unobserve(e)}}),[f]),e.useImperativeHandle(u,(()=>p.current?(p.current.playState=v.current,p.current.playVideo=E,p.current.pauseVideo=g,p.current):p.current)),e.createElement("div",{className:s(c,"feed-iframe-views")},e.createElement(r,{className:s("iframe-preview-slider"),freeMode:!0,loop:!1,slidesPerView:"auto",spaceBetween:10},i.map(((t,r)=>e.createElement("div",{key:"".concat(t.src,"-").concat(r),className:s("preview-iframe-area")},!!d&&e.createElement("button",{className:s("btn-img-delete"),onClick:()=>d({deleteIndex:r})},e.createElement(a,null)),e.createElement("div",{ref:p,key:t.src,"data-src":t.src,className:s("preview-iframe-box")},"youtube"===t.type&&e.createElement(o,{videoId:I(t.src),opts:{host:"https://www.youtube-nocookie.com",playerVars:{autoplay:0,rel:0,controls:1,modestbranding:1,loop:1,enablejsapi:1,origin:"http://www.youtube-nocookie.com"}},onReady:e=>{m.current=e.target,y(!0)},onStateChange:b}),"twitch"===t.type&&e.createElement("iframe",{src:t.src})))))))}));c.displayName="FeedIframesView",module.exports=c;
