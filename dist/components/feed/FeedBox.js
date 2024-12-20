"use strict";var e=require("react"),t=require("./FeedBox.module.scss.js"),n=require("./FeedImagesView.js"),a=require("../popover/PopoverButton.js"),i=require("../../assets/svgs/ico-h-dots.svg.js"),o=require("./FeedEmojiArea.js"),r=require("./FeedEtcInfoArea.js"),c=require("./FeedWriterInfo.js"),l=require("./FeedTextContent.js"),s=require("./FeedLinkPreview.js"),m=require("./FeedIframesView.js"),d=require("../../utils/forReactUtils.js").makeCxFunc(t),u=e.forwardRef((function(t,u){var f=t.className,C=void 0===f?"":f,g=t.writerName,k=t.writerImg,p=t.channelName,v=t.channelImg,E=t.channelIsOfficial,h=t.categoryName,j=t.certificated,N=t.textContent,I=t.images,F=void 0===I?[]:I,q=t.media,x=void 0===q?[]:q,B=t.ogMetaData,S=t.managePopoverElement,w=void 0===S?e.createElement(e.Fragment,null):S,M=t.emojiSelectPopoverElement,y=void 0===M?e.createElement(e.Fragment,null):M,P=t.emojiList,A=void 0===P?[]:P,L=t.commentCount,b=void 0===L?0:L,R=t.likeCount,T=void 0===R?0:R,V=t.isMyLike,W=t.avatarSize,z=void 0===W?32:W,H=t.intersectionVideo,D=t.createdAt,O=t.updatedAt,U=t.locale,G=void 0===U?"en":U,J=t.textEllipsis,K=void 0===J||J,Q=t.hideFooter,X=void 0!==Q&&Q,Y=t.onClick,Z=t.onMentionClick,$=t.onHashTagClick,_=t.onManageBtnClick,ee=t.onEmojiSelectBtnClick,te=t.onEmojiClick,ne=t.onShareBtnClick,ae=t.onImageClick,ie=t.onLikeBtnClick,oe=t.onCommentBtnClick,re=t.onWriterProfileClick,ce=t.onChannelClick,le=e.useId(),se=e.useRef(),me=e.useRef(),de=e.useCallback((function(e){e.stopPropagation(),_&&_(e)}),[_]);return e.useImperativeHandle(u,(function(){return se.current.iframeRef=me.current,se.current})),e.createElement("article",{ref:se,className:d(C,"feed-box",{"has-click-event":Y}),onClick:Y},e.createElement("div",{className:d("feed-box-container")},e.createElement("div",{className:d("feed-header")},e.createElement(c,{className:d("profile"),name:g,profileImg:k,profileSize:z,channelName:p,channelImg:v,channelIsOfficial:E,categoryName:h,certificated:j,createdAt:D,updatedAt:O,locale:G,onWriterProfileClick:re,onChannelClick:ce}),w||_?e.createElement("div",{className:d("btn-manage")},e.createElement(a,{anchorId:_?"":"feed-manage-".concat(le.replace(/:/gi,"")),id:"feed-manage-".concat(le.replace(/:/gi,"")),popoverStyle:{right:-10,top:10,zIndex:999},popoverElement:w,popoverAnimation:{name:"modal-pop-fade",duration:300},whenWindowScrollClose:!0,onClick:de},e.createElement(i,{width:32,height:32}))):e.createElement(e.Fragment,null)),e.createElement("div",{className:d("feed-body")},e.createElement(l,{className:d("text-content"),content:N,ellipsis:K,onTextClick:Y,onMentionClick:Z,onHashTagClick:$}),F.length>0&&e.createElement(n,{className:d("carousel"),images:F.map((function(e){return"string"==typeof e?{src:e}:{src:e.src,inappositeMsg:e.inappositeMsg}})),onImageClick:ae}),x.length>0&&e.createElement(m,{ref:me,className:d("carousel"),media:x,intersectionVideo:H}),!!B&&e.createElement(s,{ogMetaData:B})),!X&&e.createElement("div",{className:d("feed-footer")},e.createElement("div",{className:d("feed-footer-container")},e.createElement(o,{className:d("feed-reactions"),emojiList:A,emojiSelectPopoverElement:y,onEmojiClick:te,onEmojiSelectBtnClick:ee}),e.createElement(r,{className:d("feed-comments"),commentCount:b,likeCount:T,isMyClick:V,onLikeBtnClick:ie,onShareBtnClick:ne,onCommentBtnClick:oe})))))}));u.displayName="FeedBox";var f=u;module.exports=f;
