"use strict";var e=require("@babel/runtime/helpers/slicedToArray"),a=require("react"),t=require("./FeedWriterInfo.module.scss.js"),c=require("../../assets/svgs/ico-certified-v2.svg.js"),l=require("../../utils/dateUtils.js"),r=require("../avatars/Person.js"),i=require("../../utils/forReactUtils.js"),s=require("../clientOnly/ClientOnly.js"),n=i.makeCxFunc(t);module.exports=function(t){var i=t.className,o=void 0===i?"":i,m=t.name,u=t.profileImg,d=t.profileSize,f=t.channelName,h=t.channelImg,p=t.channelIsOfficial,v=t.categoryName,E=t.certificated,g=t.createdAt,N=t.updatedAt,k=t.locale,C=t.onWriterProfileClick,q=t.onChannelClick,j=a.useState(!1),y=e(j,2)[1],b=a.useCallback((function(e){e.stopPropagation(),C&&C(e)}),[C]),A=a.useCallback((function(e){e.stopPropagation(),q&&q(e)}),[q]);return a.useEffect((function(){y(!0)}),[]),a.createElement("div",{className:n(o,"profile",{"has-click-event":C})},a.createElement(r,{src:u,customSize:d,onClick:b,className:n("writer-avatar")}),a.createElement("div",{className:n("profile-text")},a.createElement("strong",{className:n("title"),onClick:b},m||"-",!!E&&a.createElement(c,{width:20,height:20})),a.createElement("div",{className:n("info")},!!v&&a.createElement("span",{className:n("category")},v)),a.createElement("span",{className:n("date")},a.createElement(s,{fallback:"-"},l.getModifyTimeString({createdAt:g,updatedAt:N,locale:k})))),!!f&&a.createElement("div",{className:n("from-info",{"has-click-event":q})},a.createElement(r,{src:h,customSize:24,onClick:A}),a.createElement("div",{className:n("channel"),onClick:A},a.createElement("span",{className:n("channel-name")},f),!!p&&a.createElement(c,{width:12,height:12}))))};