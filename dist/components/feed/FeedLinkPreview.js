"use strict";var e=require("react"),t=require("./FeedLinkPreview.module.scss.js"),a=require("../../assets/svgs/ico-delete-x.svg.js"),l=require("../image/WpImage.js"),r=require("../../utils/forReactUtils.js").makeCxFunc(t);module.exports=function(t){var s=t.className,i=void 0===s?"":s,c=t.ogMetaData,n=t.handleDeleteOgMetaData,m=e.useCallback((function(e){if((null==c?void 0:c.url)&&!n){var t=document.createElement("a");t.href=c.url,t.target="_blank",t.click(),t.remove(),e.stopPropagation()}}),[null==c?void 0:c.url,n]);return e.createElement("div",{className:r(i,"og-meta-data-preview",{"has-click-event":!n}),onClick:m},e.createElement("div",{className:r("og-meta-data-content")},!!n&&e.createElement("button",{className:r("btn-img-delete"),onClick:function(){return n({urls:[c.url],type:"delete"})}},e.createElement(a,null)),e.createElement("div",{className:r("preview-box")},!!c.image&&e.createElement("p",{className:r("preview-img")},e.createElement(l,{src:c.image,alt:c.title})),e.createElement("div",{className:r("preview-data")},e.createElement("strong",{className:r("title")},c.title||"-"),!!c.url&&e.createElement("p",{className:r("link")},c.url),!!c.description&&e.createElement("p",{className:r("description")},c.description)))))};