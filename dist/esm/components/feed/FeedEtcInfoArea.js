import e,{useCallback as t}from"react";import s from"./FeedEtcInfoArea.module.scss.js";import n from"../../assets/svgs/ico-comment.svg.js";import o from"../../assets/svgs/ico-like.svg.js";import a from"../../assets/svgs/ico-share-m.svg.js";import c from"../../assets/svgs/ico-share.svg.js";import{toFormatterByInt as m}from"../../utils/valueParserUtils.js";import{makeCxFunc as l}from"../../utils/forReactUtils.js";import{isMobile as r}from"react-device-detect";var i=l(s),u=function(s){var l=s.className,u=void 0===l?"":l,p=s.commentCount,v=s.likeCount,f=s.isMyClick,k=s.onShareBtnClick,E=s.onLikeBtnClick,g=s.onCommentBtnClick,C=t((function(e){e.stopPropagation(),k&&k(e)}),[k]),b=t((function(e){e.stopPropagation(),g&&g(e)}),[g]),N=t((function(e){e.stopPropagation(),E&&E(e)}),[E]);return e.createElement("div",{className:i(u,"feed-comments")},e.createElement("button",{type:"button",className:i("btn-comment",{"has-click-event":g}),onClick:b},e.createElement("i",{className:i("icon")},e.createElement(n,null)),e.createElement("span",{className:i("count")},m(p,1))),e.createElement("button",{type:"button",className:i("btn-like",{active:f,"has-click-event":E}),onClick:N},e.createElement("span",{className:i("icon")},e.createElement(o,null)),e.createElement("span",{className:i("count")},m(v,1))),!!k&&e.createElement("button",{type:"button",className:i("btn-share","has-click-event"),onClick:C},r?e.createElement(a,null):e.createElement(c,null)))};export{u as default};