'use client';
import e,{forwardRef as t,useRef as r,useState as o,useCallback as n,useMemo as a,useEffect as i,useImperativeHandle as u}from"react";import c from"./FeedIframesView.module.scss.js";import s from"../carousel/Carousel.js";import l from"../../assets/svgs/ico-delete-x.svg.js";import{makeCxFunc as d}from"../../utils/forReactUtils.js";import m from'./../../ext/react-youtube/dist/YouTube.esm.js';const p="wp_ui_youtube_is_mute",v=d(c),w=t(((t,c)=>{let{className:d="",media:w=[],intersectionVideo:f,handleDeleteIframe:y}=t;const I=r(),E=r(),b=r("NOT_YET"),g=r({playTimeoutId:0,pauseTimeoutId:0}),[T,N]=o(!1),V=n((e=>{const[t]=e.split("?");return t.split("/").pop()}),[]),S=n((e=>{if(!I.current)return;Number(localStorage.getItem(p)||0)?I.current.mute():I.current.unMute(),-1===e.data?b.current="NOT_YET":0===e.data?b.current="ENDED":1===e.data?b.current="PLAYING":2===e.data?b.current="PAUSED":3===e.data?b.current="BUFFERING":5===e.data&&(b.current="CUED")}),[]),h=n((()=>{I.current&&I.current.playVideo()}),[]),_=n((()=>{I.current&&I.current.pauseVideo()}),[]),D=n((()=>{var e;I.current&&(null===(e=I.current)||void 0===e?void 0:e.playerInfo)&&(localStorage.getItem(p)?I.current.isMuted()?localStorage.setItem(p,"1"):localStorage.setItem(p,"0"):(I.current.mute(),localStorage.setItem(p,"1")))}),[]),U=a((()=>{if("undefined"!=typeof window&&T&&f)return window.IntersectionObserver?new IntersectionObserver((e=>{var t,r,o,n;window.clearTimeout(g.current.playTimeoutId),I.current&&(null===(t=I.current)||void 0===t?void 0:t.playerInfo)&&((null===(r=e[0])||void 0===r?void 0:r.intersectionRatio)>0&&I.current.addEventListener("onVolumeChange",D),(null===(o=e[0])||void 0===o?void 0:o.intersectionRatio)>.8&&"PAUSED"!==b.current?g.current.playTimeoutId=window.setTimeout((()=>{I.current.playVideo()}),500):(null===(n=e[0])||void 0===n?void 0:n.intersectionRatio)<=.8&&(I.current.pauseVideo(),g.current.pauseTimeoutId=window.setTimeout((()=>{b.current="AUTO_PAUSED"}),200)))}),{threshold:[0,.25,.5,.75,1]}):void 0}),[f,T,D]);return i((()=>{const e=E.current;if(U&&T)return U.observe(e),()=>{U.unobserve(e)}}),[T]),u(c,(()=>E.current?(E.current.playState=b.current,E.current.playVideo=h,E.current.pauseVideo=_,E.current):E.current)),e.createElement("div",{className:v(d,"feed-iframe-views")},e.createElement(s,{className:v("iframe-preview-slider"),freeMode:!0,loop:!1,slidesPerView:"auto",spaceBetween:10},w.map(((t,r)=>e.createElement("div",{key:"".concat(t.src,"-").concat(r),className:v("preview-iframe-area")},!!y&&e.createElement("button",{className:v("btn-img-delete"),onClick:()=>y({deleteIndex:r})},e.createElement(l,null)),e.createElement("div",{ref:E,key:t.src,"data-src":t.src,className:v("preview-iframe-box")},"youtube"===t.type&&e.createElement(m,{videoId:V(t.src),opts:{host:"https://www.youtube-nocookie.com",playerVars:{autoplay:0,rel:0,controls:1,modestbranding:1,loop:1,enablejsapi:1,origin:"http://www.youtube-nocookie.com"}},onReady:e=>{I.current=e.target,N(!0)},onStateChange:S}),"twitch"===t.type&&e.createElement("iframe",{src:t.src})))))))}));w.displayName="FeedIframesView";export{w as default};
