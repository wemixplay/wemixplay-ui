"use strict";var e=require("react"),t=require("./FeedBox.module.scss.js"),a=require("./FeedImagesView.js"),n=require("../popover/PopoverButton.js"),i=require("../../assets/svgs/ico-h-dots.svg.js"),o=require("./FeedEmojiArea.js"),r=require("./FeedEtcInfoArea.js"),c=require("./FeedWriterInfo.js"),l=require("./FeedTextContent.js"),s=require("./FeedLinkPreview.js"),m=require("./FeedIframesView.js");const d=require("../../utils/forReactUtils.js").makeCxFunc(t),u=e.forwardRef(((t,u)=>{let{className:C="",writerName:f,writerImg:g,channelName:k,channelImg:p,channelIsOfficial:E,categoryName:h,certificated:v,textContent:j,images:N=[],media:I=[],ogMetaData:F,managePopoverElement:q=e.createElement(e.Fragment,null),emojiSelectPopoverElement:x=e.createElement(e.Fragment,null),emojiList:B=[],commentCount:S=0,likeCount:w=0,isMyLike:M,avatarSize:y=32,intersectionVideo:P,createdAt:A,updatedAt:L,locale:b="en",textEllipsis:R=!0,hideFooter:T=!1,onClick:V,onMentionClick:W,onHashTagClick:z,onManageBtnClick:H,onEmojiSelectBtnClick:D,onEmojiClick:O,onShareBtnClick:U,onImageClick:G,onLikeBtnClick:J,onCommentBtnClick:K,onWriterProfileClick:Q,onChannelClick:X}=t;const Y=e.useId(),Z=e.useRef(),$=e.useRef(),_=e.useCallback((e=>{e.stopPropagation(),H&&H(e)}),[H]);return e.useImperativeHandle(u,(()=>(Z.current.iframeRef=$.current,Z.current))),e.createElement("article",{ref:Z,className:d(C,"feed-box",{"has-click-event":V}),onClick:V},e.createElement("div",{className:d("feed-box-container")},e.createElement("div",{className:d("feed-header")},e.createElement(c,{className:d("profile"),name:f,profileImg:g,profileSize:y,channelName:k,channelImg:p,channelIsOfficial:E,categoryName:h,certificated:v,createdAt:A,updatedAt:L,locale:b,onWriterProfileClick:Q,onChannelClick:X}),q||H?e.createElement("div",{className:d("btn-manage")},e.createElement(n,{anchorId:H?"":"feed-manage-".concat(Y.replace(/:/gi,"")),id:"feed-manage-".concat(Y.replace(/:/gi,"")),popoverStyle:{right:-10,top:10,zIndex:999},popoverElement:q,popoverAnimation:{name:"modal-pop-fade",duration:300},whenWindowScrollClose:!0,onClick:_},e.createElement(i,{width:32,height:32}))):e.createElement(e.Fragment,null)),e.createElement("div",{className:d("feed-body")},e.createElement(l,{className:d("text-content"),content:j,ellipsis:R,onTextClick:V,onMentionClick:W,onHashTagClick:z}),N.length>0&&e.createElement(a,{className:d("carousel"),images:N.map((e=>"string"==typeof e?{src:e}:{src:e.src,inappositeMsg:e.inappositeMsg})),onImageClick:G}),I.length>0&&e.createElement(m,{ref:$,className:d("carousel"),media:I,intersectionVideo:P}),!!F&&e.createElement(s,{ogMetaData:F})),!T&&e.createElement("div",{className:d("feed-footer")},e.createElement("div",{className:d("feed-footer-container")},e.createElement(o,{className:d("feed-reactions"),emojiList:B,emojiSelectPopoverElement:x,onEmojiClick:O,onEmojiSelectBtnClick:D}),e.createElement(r,{className:d("feed-comments"),commentCount:S,likeCount:w,isMyClick:M,onLikeBtnClick:J,onShareBtnClick:U,onCommentBtnClick:K})))))}));u.displayName="FeedBox";var C=u;module.exports=C;