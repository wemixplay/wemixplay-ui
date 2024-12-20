"use strict";var e=require("react"),t=require("../../hooks/useCheckDevice.js"),s=require("../editor/WpEditorContents.js"),i=require("../ellipsis/Ellipsis.js"),n=require("../../utils/valueParserUtils.js"),o=require("../../utils/forReactUtils.js"),r=require("./FeedTextContent.module.scss.js"),l=require("isomorphic-dompurify"),a=o.makeCxFunc(r),c=function(o){var r=o.className,c=o.content,u=o.ellipsis,m=o.enableShowMore,d=o.onTextClick,h=o.onHashTagClick,p=o.onMentionClick,v=t(),k=v.isDesktop,C=v.isMobile,g=v.isTablet,f=e.useMemo((function(){return l.sanitize(n.convertMarkdownToHtmlStr(null!=c?c:""),{ADD_ATTR:["target"]})}),[c]),x=e.useCallback((function(e){var t,s,i=e.target,n=null!==(s=null===(t=i.dataset)||void 0===t?void 0:t.id)&&void 0!==s?s:"",o=i.textContent;i.classList.contains("mention")&&i.classList.contains("complete-mention")?p&&p({id:n,name:o.replace("@","")}):i.classList.contains("hash")&&i.classList.contains("complete-hash")?h&&h({id:n,name:o.replace("#","")}):"A"!==i.tagName&&d&&d(e),e.stopPropagation()}),[p,h]);return e.createElement(s,{className:a(r,"feed-text-content",{"has-click-event":d}),onClick:x},u?e.createElement(i,{className:a("text"),content:f,defaultShortened:!0,lineClamp:5,triggerLess:"show less",triggerMore:"show more",observingEnvs:[C,g,k],onShowMoreLessClick:m?void 0:function(){}}):e.createElement("div",{className:a("text","full-text"),dangerouslySetInnerHTML:{__html:f}}))};module.exports=c;
