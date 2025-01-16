"use client";
"use strict";var e=require("react"),t=require("./CommentBox.module.scss.js"),o=require("../../utils/forReactUtils.js"),n=require("../popover/PopoverButton.js"),r=require("../../assets/svgs/ico-h-dots.svg.js"),a=require("./CommentWriterInfo.js"),l=require("../feed/FeedTextContent.js"),c=require("./CommentEtcInfo.js");const i=o.makeCxFunc(t);var m=t=>{let{className:o="",writerName:m,writerImg:s,follwerCount:d,follwersText:u,comment:p,likeInfo:C,createdAt:k,updatedAt:g,managePopoverElement:f,deletedMsg:v,locale:E,onManageBtnClick:h,onProfileClick:w,onLikeBtnClick:x,onMentionClick:I,onHashTagClick:q,onClick:j}=t;const N=e.useId(),T=e.useCallback((e=>{e.stopPropagation(),h&&h(e)}),[h]);return e.createElement("article",{className:i(o,"comment-box",{"deleted-comment":v,"has-click-event":j}),onClick:j},v,!v&&e.createElement(e.Fragment,null,e.createElement("div",{className:i("author")},e.createElement(a,{writerName:m,writerImg:s,follwerCount:d,follwersText:u,locale:E,createdAt:k,updatedAt:g,onProfileClick:w}),e.createElement("div",{className:i("btn-manage")},e.createElement(n,{anchorId:h?"":"comment-manage-".concat(N.replace(/:/gi,"")),id:"comment-manage-".concat(N.replace(/:/gi,"")),popoverStyle:{right:-10,top:10,zIndex:999},popoverElement:f,popoverAnimation:{name:"modal-pop-fade",duration:300},onClick:T},e.createElement(r,{width:22,height:22})))),e.createElement(l,{className:i("comment-content"),content:p,ellipsis:!0,enableShowMore:!0,onMentionClick:I,onHashTagClick:q,onTextClick:j}),e.createElement(c,{likeInfo:C,onLikeBtnClick:x})))};module.exports=m;
