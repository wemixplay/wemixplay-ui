import e,{forwardRef as t,useRef as a}from"react";import n from"./CurationBox.module.scss.js";import i from"./FeedWriterInfo.js";import o from"./FeedTextContent.js";import{makeCxFunc as r}from"../../utils/forReactUtils.js";var c=r(n),l=t((function(t,n){var r=t.className,l=void 0===r?"":r,m=t.writerName,s=t.writerImg,f=t.channelName,d=t.channelImg,C=t.channelIsOfficial,p=t.categoryName,u=t.certificated,N=t.textContent,k=t.avatarSize,h=void 0===k?32:k,v=t.createdAt,x=t.updatedAt,g=t.locale,I=void 0===g?"en":g,E=t.onClick,j=t.onMentionClick,A=t.onHashTagClick,T=t.onWriterProfileClick,w=t.onChannelClick,y=a();return e.createElement("div",{ref:y,className:c("curation-box",l),onClick:E},e.createElement("div",{className:c("curation-box-content")},e.createElement(o,{className:c("text-content"),content:N,ellipsis:!1,onTextClick:E,onMentionClick:j,onHashTagClick:A})),e.createElement("div",{className:c("curation-writer-info")},e.createElement(i,{className:c("profile"),name:m,profileImg:s,profileSize:h,channelName:f,channelImg:d,channelIsOfficial:C,categoryName:p,certificated:u,createdAt:v,updatedAt:x,locale:I,onWriterProfileClick:T,onChannelClick:w})))}));l.displayName="CurationBox";export{l as default};
