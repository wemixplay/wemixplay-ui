import e from"@babel/runtime/helpers/slicedToArray";import t,{useState as a,useCallback as r,useEffect as c}from"react";import l from"./FeedWriterInfo.module.scss.js";import i from"../../assets/svgs/ico-certified-v2.svg.js";import{getModifyTimeString as n}from"../../utils/dateUtils.js";import s from"../avatars/Person.js";import{makeCxFunc as o}from"../../utils/forReactUtils.js";import m from"../clientOnly/ClientOnly.js";var f=o(l),p=function(l){var o=l.className,p=void 0===o?"":o,d=l.name,h=l.profileImg,v=l.profileSize,u=l.channelName,E=l.channelImg,N=l.channelIsOfficial,g=l.categoryName,k=l.certificated,C=l.createdAt,j=l.updatedAt,y=l.locale,A=l.onWriterProfileClick,I=l.onChannelClick,P=a(!1),b=e(P,2)[1],w=r((function(e){e.stopPropagation(),A&&A(e)}),[A]),z=r((function(e){e.stopPropagation(),I&&I(e)}),[I]);return c((function(){b(!0)}),[]),t.createElement("div",{className:f(p,"profile",{"has-click-event":A})},t.createElement(s,{src:h,customSize:v,onClick:w,className:f("writer-avatar")}),t.createElement("div",{className:f("profile-text")},t.createElement("strong",{className:f("title"),onClick:w},d||"-",!!k&&t.createElement(i,{width:20,height:20})),t.createElement("div",{className:f("info")},!!g&&t.createElement("span",{className:f("category")},g)),t.createElement("span",{className:f("date")},t.createElement(m,{fallback:"-"},n({createdAt:C,updatedAt:j,locale:y})))),!!u&&t.createElement("div",{className:f("from-info",{"has-click-event":I})},t.createElement(s,{src:E,customSize:24,onClick:z}),t.createElement("div",{className:f("channel"),onClick:z},t.createElement("span",{className:f("channel-name")},u),!!N&&t.createElement(i,{width:12,height:12}))))};export{p as default};
