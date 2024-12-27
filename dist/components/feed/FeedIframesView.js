"use strict";var e=require("react"),r=require("./FeedIframesView.module.scss.js"),t=require("../carousel/Carousel.js"),a=require("../../assets/svgs/ico-delete-x.svg.js"),u=require("../../utils/forReactUtils.js"),n=require("react-youtube");const o="wp_ui_youtube_is_mute",c=u.makeCxFunc(r),s=e.forwardRef(((r,u)=>{let{className:s="",media:i=[],intersectionVideo:l,handleDeleteIframe:d}=r;const m=e.useRef(),p=e.useRef(),v=e.useRef("NOT_YET"),w=e.useRef({playTimeoutId:0,pauseTimeoutId:0}),[f,y]=e.useState(!1),I=e.useCallback((e=>{const[r]=e.split("?");return r.split("/").pop()}),[]),b=e.useCallback((e=>{if(!m.current)return;Number(localStorage.getItem(o)||0)?m.current.mute():m.current.unMute(),-1===e.data?v.current="NOT_YET":0===e.data?v.current="ENDED":1===e.data?v.current="PLAYING":2===e.data?v.current="PAUSED":3===e.data?v.current="BUFFERING":5===e.data&&(v.current="CUED")}),[]),E=e.useCallback((()=>{m.current&&m.current.playVideo()}),[]),g=e.useCallback((()=>{m.current&&m.current.pauseVideo()}),[]),N=e.useCallback((()=>{var e;m.current&&(null===(e=m.current)||void 0===e?void 0:e.playerInfo)&&(localStorage.getItem(o)?m.current.isMuted()?localStorage.setItem(o,"1"):localStorage.setItem(o,"0"):(m.current.mute(),localStorage.setItem(o,"1")))}),[]),T=e.useMemo((()=>{if("undefined"!=typeof window&&f&&l)return window.IntersectionObserver?new IntersectionObserver((e=>{var r,t,a,u;window.clearTimeout(w.current.playTimeoutId),m.current&&(null===(r=m.current)||void 0===r?void 0:r.playerInfo)&&((null===(t=e[0])||void 0===t?void 0:t.intersectionRatio)>0&&m.current.addEventListener("onVolumeChange",N),(null===(a=e[0])||void 0===a?void 0:a.intersectionRatio)>.8&&"PAUSED"!==v.current?w.current.playTimeoutId=window.setTimeout((()=>{m.current.playVideo()}),500):(null===(u=e[0])||void 0===u?void 0:u.intersectionRatio)<=.8&&(m.current.pauseVideo(),w.current.pauseTimeoutId=window.setTimeout((()=>{v.current="AUTO_PAUSED"}),200)))}),{threshold:[0,.25,.5,.75,1]}):void 0}),[l,f,N]);return e.useEffect((()=>{const e=p.current;if(T&&f)return T.observe(e),()=>{T.unobserve(e)}}),[f]),e.useImperativeHandle(u,(()=>p.current?(p.current.playState=v.current,p.current.playVideo=E,p.current.pauseVideo=g,p.current):p.current)),e.createElement("div",{className:c(s,"feed-iframe-views")},e.createElement(t,{className:c("iframe-preview-slider"),freeMode:!0,loop:!1,slidesPerView:"auto",spaceBetween:10},i.map(((r,t)=>e.createElement("div",{key:"".concat(r.src,"-").concat(t),className:c("preview-iframe-area")},!!d&&e.createElement("button",{className:c("btn-img-delete"),onClick:()=>d({deleteIndex:t})},e.createElement(a,null)),e.createElement("div",{ref:p,key:r.src,"data-src":r.src,className:c("preview-iframe-box")},"youtube"===r.type&&e.createElement(n,{videoId:I(r.src),opts:{host:"https://www.youtube-nocookie.com",playerVars:{autoplay:0,rel:0,controls:1,modestbranding:1,loop:1,enablejsapi:1,origin:"http://www.youtube-nocookie.com"}},onReady:e=>{m.current=e.target,y(!0)},onStateChange:b}),"twitch"===r.type&&e.createElement("iframe",{src:r.src})))))))}));s.displayName="FeedIframesView",module.exports=s;
