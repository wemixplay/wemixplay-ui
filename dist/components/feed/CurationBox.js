'use client';
"use strict";var e=require("react"),t=require("./CurationBox.module.scss.js"),a=require("./FeedWriterInfo.js"),n=require("./FeedTextContent.js");const r=require("../../utils/forReactUtils.js").makeCxFunc(t),i=e.forwardRef(((t,i)=>{let{className:c="",writerName:l,writerImg:o,channelName:s,channelImg:m,channelIsOfficial:u,categoryName:f,certificated:C,textContent:d,avatarSize:k=32,createdAt:N,updatedAt:h,locale:x="en",onClick:g,onMentionClick:p,onHashTagClick:I,onWriterProfileClick:v,onChannelClick:q}=t;const E=e.useRef();return e.createElement("div",{ref:E,className:r("curation-box",c),onClick:g},e.createElement("div",{className:r("curation-box-content")},e.createElement(n,{className:r("text-content"),content:d,ellipsis:!1,onTextClick:g,onMentionClick:p,onHashTagClick:I})),e.createElement("div",{className:r("curation-writer-info")},e.createElement(a,{className:r("profile"),name:l,profileImg:o,profileSize:k,channelName:s,channelImg:m,channelIsOfficial:u,categoryName:f,certificated:C,createdAt:N,updatedAt:h,locale:x,onWriterProfileClick:v,onChannelClick:q})))}));i.displayName="CurationBox";var c=i;module.exports=c;
