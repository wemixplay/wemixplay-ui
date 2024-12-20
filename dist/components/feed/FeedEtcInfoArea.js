"use strict";var e=require("react"),t=require("./FeedEtcInfoArea.module.scss.js"),s=require("../../assets/svgs/ico-comment.svg.js"),a=require("../../assets/svgs/ico-like.svg.js"),n=require("../../assets/svgs/ico-share-m.svg.js"),c=require("../../assets/svgs/ico-share.svg.js"),l=require("../../utils/valueParserUtils.js"),r=require("../../utils/forReactUtils.js"),o=require("react-device-detect"),i=r.makeCxFunc(t),u=function(t){var r=t.className,u=void 0===r?"":r,m=t.commentCount,k=t.likeCount,v=t.isMyClick,C=t.onShareBtnClick,b=t.onLikeBtnClick,p=t.onCommentBtnClick,E=e.useCallback((function(e){e.stopPropagation(),C&&C(e)}),[C]),g=e.useCallback((function(e){e.stopPropagation(),p&&p(e)}),[p]),q=e.useCallback((function(e){e.stopPropagation(),b&&b(e)}),[b]);return e.createElement("div",{className:i(u,"feed-comments")},e.createElement("button",{type:"button",className:i("btn-comment",{"has-click-event":p}),onClick:g},e.createElement("i",{className:i("icon")},e.createElement(s,null)),e.createElement("span",{className:i("count")},l.toFormatterByInt(m,1))),e.createElement("button",{type:"button",className:i("btn-like",{active:v,"has-click-event":b}),onClick:q},e.createElement("span",{className:i("icon")},e.createElement(a,null)),e.createElement("span",{className:i("count")},l.toFormatterByInt(k,1))),!!C&&e.createElement("button",{type:"button",className:i("btn-share","has-click-event"),onClick:E},o.isMobile?e.createElement(n,null):e.createElement(c,null)))};module.exports=u;
