"use client";
import e,{forwardRef as t,useId as o,useRef as n,useCallback as a,useImperativeHandle as i}from"react";import r from"./FeedBox.module.scss.js";import c from"./FeedImagesView.js";import l from"../popover/PopoverButton.js";import m from"../../assets/svgs/ico-h-dots.svg.js";import s from"./FeedEmojiArea.js";import d from"./FeedEtcInfoArea.js";import f from"./FeedWriterInfo.js";import p from"./FeedTextContent.js";import C from"./FeedLinkPreview.js";import g from"./FeedIframesView.js";import{makeCxFunc as k}from"../../utils/forReactUtils.js";const E=k(r),h=t(((t,r)=>{let{className:k="",writerName:h,writerImg:j,channelName:u,channelImg:v,channelIsOfficial:N,categoryName:I,certificated:F,textContent:B,images:x=[],media:S=[],ogMetaData:M,managePopoverElement:w=e.createElement(e.Fragment,null),emojiSelectPopoverElement:y=e.createElement(e.Fragment,null),emojiList:P=[],commentCount:A=0,likeCount:L=0,isMyLike:b,avatarSize:T=32,intersectionVideo:V,createdAt:W,updatedAt:z,locale:D="en",textEllipsis:H=!0,hideFooter:O=!1,onClick:R,onMentionClick:U,onHashTagClick:q,onManageBtnClick:G,onEmojiSelectBtnClick:J,onEmojiClick:K,onShareBtnClick:Q,onImageClick:X,onLikeBtnClick:Y,onCommentBtnClick:Z,onWriterProfileClick:$,onChannelClick:_}=t;const ee=o(),te=n(),oe=n(),ne=a((e=>{e.stopPropagation(),G&&G(e)}),[G]);return i(r,(()=>(te.current.iframeRef=oe.current,te.current))),e.createElement("article",{ref:te,className:E(k,"feed-box",{"has-click-event":R}),onClick:R},e.createElement("div",{className:E("feed-box-container")},e.createElement("div",{className:E("feed-header")},e.createElement(f,{className:E("profile"),name:h,profileImg:j,profileSize:T,channelName:u,channelImg:v,channelIsOfficial:N,categoryName:I,certificated:F,createdAt:W,updatedAt:z,locale:D,onWriterProfileClick:$,onChannelClick:_}),w||G?e.createElement("div",{className:E("btn-manage")},e.createElement(l,{anchorId:G?"":"feed-manage-".concat(ee.replace(/:/gi,"")),id:"feed-manage-".concat(ee.replace(/:/gi,"")),popoverStyle:{right:-10,top:10,zIndex:999},popoverElement:w,popoverAnimation:{name:"modal-pop-fade",duration:300},whenWindowScrollClose:!0,onClick:ne},e.createElement(m,{width:32,height:32}))):e.createElement(e.Fragment,null)),e.createElement("div",{className:E("feed-body")},e.createElement(p,{className:E("text-content"),content:B,ellipsis:H,onTextClick:R,onMentionClick:U,onHashTagClick:q}),x.length>0&&e.createElement(c,{className:E("carousel"),images:x.map((e=>"string"==typeof e?{src:e}:{src:e.src,inappositeMsg:e.inappositeMsg})),onImageClick:X}),S.length>0&&e.createElement(g,{ref:oe,className:E("carousel"),media:S,intersectionVideo:V}),!!M&&e.createElement(C,{ogMetaData:M})),!O&&e.createElement("div",{className:E("feed-footer")},e.createElement("div",{className:E("feed-footer-container")},e.createElement(s,{className:E("feed-reactions"),emojiList:P,emojiSelectPopoverElement:y,onEmojiClick:K,onEmojiSelectBtnClick:J}),e.createElement(d,{className:E("feed-comments"),commentCount:A,likeCount:L,isMyClick:b,onLikeBtnClick:Y,onShareBtnClick:Q,onCommentBtnClick:Z})))))}));h.displayName="FeedBox";var j=h;export{j as default};
