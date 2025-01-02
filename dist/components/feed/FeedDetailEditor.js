'use client';
"use strict";var e=require("../../_virtual/_tslib.js"),t=require("react"),a=require("./FeedDetailEditor.module.scss.js"),n=require("../editor/WpEditor.js"),l=require("../../plugins/mention/Mention.js"),i=require("../../plugins/hashTag/HashTag.js"),r=require("../../plugins/autoUrlMatch/AutoUrlMatch.js"),s=require("../../plugins/pasteToPlainText/PasteToPlainText.js"),o=require("../../utils/forReactUtils.js"),c=require('./../../ext/lodash/uniqBy.js'),m=require("../../utils/fileUtils.js"),d=require("./FeedImagesView.js"),u=require("../../utils/urlUtils.js"),g=require("./FeedIframesView.js"),p=require("./FeedLinkPreview.js"),h=require("../../assets/svgs/ico-chevron-down.svg.js"),f=require("../../assets/svgs/ico-image.svg.js"),v=require("../../plugins/countTextLength/CountTextLength.js"),b=require("../../utils/valueParserUtils.js"),E=require("../avatars/Person.js"),x=require("../popover/PopoverButton.js"),C=require("../loadings/Spinner.js");const w=o.makeCxFunc(a),y=t.forwardRef(((a,o)=>{var y,{className:I="",textValue:j,images:U,media:N,ogMetaData:k,name:T,minLength:M=10,isOfficial:S,writerName:q,writerImg:L,channelName:D,channelImg:A,categoryName:O,btnSubmitText:P="POST",maxLength:F=1e3,placeholder:R="What is happening?!",config:_={},imageMaxCnt:V=4,iframeMaxCnt:H=4,selectChannelPopoverElement:W=t.createElement(t.Fragment,null),selectCategoryPopoverElement:z=t.createElement(t.Fragment,null),loading:B,handleTextChange:J,handleImageChange:Y,handleMediaChange:$,handleSubmit:G,handleExternalUrlChange:K,onSelectChannelClick:Q,onSelectCategoryClick:X,onUserClick:Z,onMaxImageUploads:ee,onMaxIframeUploads:te}=a,ae=e.__rest(a,["className","textValue","images","media","ogMetaData","name","minLength","isOfficial","writerName","writerImg","channelName","channelImg","categoryName","btnSubmitText","maxLength","placeholder","config","imageMaxCnt","iframeMaxCnt","selectChannelPopoverElement","selectCategoryPopoverElement","loading","handleTextChange","handleImageChange","handleMediaChange","handleSubmit","handleExternalUrlChange","onSelectChannelClick","onSelectCategoryClick","onUserClick","onMaxImageUploads","onMaxIframeUploads"]);const ne=t.useRef(),le=t.useRef(),[ie,re]=t.useState(null!==(y=null==j?void 0:j.length)&&void 0!==y?y:0),[se,oe]=t.useState(b.convertMarkdownToHtmlStr(null!=j?j:"")),[ce,me]=t.useState(U),[de,ue]=t.useState(N),[ge,pe]=t.useState(k),[he,fe]=t.useState([]),ve=t.useMemo((()=>Object.assign(Object.assign({},de),{textValue:se,images:c(ce,"src"),media:c(de,"src")})),[se,ce,de]),be=t.useMemo((()=>{var e,t,a;const n=!!b.removeSpaceAndLineBreak(ve.textValue),l=!!(null!==(e=ve.images)&&void 0!==e?e:[]).length,i=!!(null!==(t=ve.media)&&void 0!==t?t:[]).length,r=(null!==(a=ve.images)&&void 0!==a?a:[]).some((e=>!!e.loading));return{loading:B||r,disalbed:M>ie||B||r||!i&&!l&&!n}}),[B,M,ie,ve]),Ee=t.useCallback((e=>{var t;let a=[...null!==(t=null==ve?void 0:ve.images)&&void 0!==t?t:[]];if("newImage"in e){if(Array.isArray(e.newImage)&&a.length<V)a=[...a,...e.newImage.slice(0,V-a.length)];else if(!Array.isArray(e.newImage)){if(a.length>=V)return ee?ee():alert("이미지는 최대 ".concat(V,"까지 업로드가 가능합니다.")),a;a.push(e.newImage)}a=c(a,"src")}else a=a.filter(((t,a)=>e.deleteIndex!==a));return le.current.value="",a}),[ve,T,V,ee]),xe=t.useCallback((e=>{e.preventDefault()}),[]),Ce=t.useCallback((t=>e.__awaiter(void 0,void 0,void 0,(function*(){var e;t.preventDefault();const a=Array.from(t.dataTransfer.files).filter((e=>e.type.startsWith("image/")));if(0===a.length)return;const n=[...null!==(e=null==ve?void 0:ve.images)&&void 0!==e?e:[]];for(const e of a){const t=yield m.readAsDataURLAsync(e);n.push({file:e,src:t})}const l=Ee({newImage:n});me(l),Y&&Y(l,T)}))),[T,ve,Ee,Y]),we=t.useCallback((t=>e.__awaiter(void 0,void 0,void 0,(function*(){const{file:e,dataUrl:a}=yield m.imageFileUpload(t),n=Ee({newImage:{file:e,src:a}});me(n),Y&&Y(n,T)}))),[T,ve,Ee,Y]),ye=t.useCallback((e=>{let t=[...ve.media];if("media"in e){if(t.length>=H)return te&&te(),t;if(Array.isArray(e.media)?t=[...t,...e.media]:t.push(e.media),t=c(t,"src"),t.length>H)return void(te&&te())}else t=t.filter(((t,a)=>e.deleteIndex!==a));return t}),[ve.media,H]),Ie=t.useCallback((e=>{let{textUrls:t,mediaUrls:a}=e;const n=/\.(jpg|jpeg|png|gif|bmp|tiff|webp|avif)(\?.*)?$/i,l=[...t,...a.map((e=>e.src))].reduce(((e,t)=>{let a="etc";return n.test(t)?a="image":u.isYouTubeURL(t)?a="youtube":u.isTwitchURL(t)&&(a="twitch"),e[a]||(e[a]=[]),e[a].push(t),e}),{}),{image:i=[],youtube:r=[],twitch:s=[],etc:o=[]}=l,c=Ee({newImage:[...a.filter((e=>"img"===e.tag)),...i.map((e=>({src:e})))]}),m=ye({media:[...r.map((e=>({type:"youtube",src:u.convertIframeYouTubeURL(e)}))),...s.map((e=>({type:"twitch",src:u.convertIframeTwitchURL(e)})))]});return ue(m),me(c),$&&$(m,T),Y&&Y(c,T),t.map((e=>'<a href="'.concat(e.startsWith("http")?e:"https://".concat(e),'" target="_blank">').concat(e,"</a>")))}),[T,ve,Y,$,Ee,ye]),je=t.useCallback((t=>e.__awaiter(void 0,void 0,void 0,(function*(){const e=t.clipboardData.items[0];if(0===e.type.indexOf("image")){const t=e.getAsFile(),a=yield m.readAsDataURLAsync(t);Ee({newImage:{file:t,src:a}})}}))),[Ee]),Ue=t.useCallback((e=>{const t=b.convertHtmlToMarkdownStr(e);oe(t),J&&J(t,T)}),[T,J]);return t.useEffect((()=>{ue(N)}),[JSON.stringify(N)]),t.useEffect((()=>{me(U)}),[JSON.stringify(U)]),t.useEffect((()=>{pe(k)}),[JSON.stringify(k)]),t.useEffect((()=>{if(j&&!se){const e=b.convertMarkdownToHtmlStr(j);oe(e)}}),[j,se]),t.useImperativeHandle(o,(()=>{const{setData:e}=ne.current;return ne.current.setData=t=>{const a=b.convertMarkdownToHtmlStr(t);e(a)},ne.current})),t.createElement("div",{className:w(I,"feed-detail-editor")},t.createElement("div",{className:w("feed-detail-editor-header",{"exist-user-click-event":!!Z})},t.createElement(E,{src:L,size:"custom",className:w("avatar","user-img"),onClick:Z}),t.createElement("div",{className:w("profile-info")},t.createElement("strong",{className:w("user-name"),onClick:Z},q||"-"),t.createElement("div",{className:w("btn-post-popover")},S?t.createElement(x,{anchorId:X?"":"post-category",id:"post-category",popoverStyle:{left:0,top:10,zIndex:9999},popoverElement:z,popoverAnimation:{name:"modal-pop-fade",duration:300},ripple:{disabled:!z&&!X},onClick:X},t.createElement("span",{className:w("selected-channel")},O||"-"," ",z||X?t.createElement(h,null):t.createElement(t.Fragment,null))):t.createElement(x,{anchorId:Q?"":"post-channel",id:"post-channel",popoverStyle:{left:0,top:10,zIndex:9999},popoverElement:W,popoverAnimation:{name:"modal-pop-fade",duration:300},ripple:{disabled:!W&&!Q},onClick:Q},t.createElement("span",{className:w("selected-channel")},!!A&&t.createElement(E,{src:A,size:"custom",className:w("avatar")}),D||"내 채널에 포스트",W||Q?t.createElement(h,null):t.createElement(t.Fragment,null)))))),t.createElement("div",{className:w("feed-detail-editor-body")},t.createElement(n,Object.assign({className:w("editor","post-content",{filled:se.length}),ref:ne,plugin:[l,i,r,s,v],initialValue:se,placeholder:R,maxLength:F},ae,{config:Object.assign(Object.assign({},_),{pasteToPlainText:{onMatchUrlReplace:Ie},autoUrlMatch:{onMatchUrl:e=>Ie({textUrls:[e],mediaUrls:[]}),onChangeMatchUrls:e=>{const t=/\.(jpg|jpeg|png|gif|bmp|webp|tiff|avif)$/i,a=e.filter((e=>!t.test(e)&&!u.isYouTubeURL(e)&&!u.isTwitchURL(e)));fe(he.filter((e=>a.includes(e))));const n=a.filter((e=>!he.includes(e)));he.includes(n[0])||K&&K(n[0])}},countTextLength:{hideUi:!0,onChangeTextLength:re}}),onDragOver:xe,onDrop:Ce,onPaste:je,handleChange:Ue})),ve.images.length>0&&t.createElement(d,{images:ve.images,handleDeleteImg:e=>{let{deleteIndex:t}=e;const a=Ee({deleteIndex:t});me(a),Y&&Y(a)}}),ve.media.length>0&&t.createElement(g,{media:ve.media,handleDeleteIframe:e=>{let{deleteIndex:t}=e;const a=ye({deleteIndex:t});ue(a),$&&$(a)}}),!!ge&&t.createElement(p,{ogMetaData:ge,handleDeleteOgMetaData:e=>{let{urls:t}=e;pe(void 0),K&&K(void 0),fe((e=>[...new Set([...e,...(null!=t?t:[]).map((e=>e.endsWith("/")?e.slice(0,-1):e))])]))}})),t.createElement("div",{className:w("control-box")},t.createElement("div",{className:w("left")},t.createElement("label",{className:w("btn-img-upload")},t.createElement("input",{ref:le,type:"file",accept:"image/png, image/gif, image/jpeg, image/jpg, image/webp, image/bmp, image/tiff",onChange:we}),t.createElement(f,null))),t.createElement("div",{className:w("right")},t.createElement("span",{className:w("text-count")},t.createElement("b",null,b.commaWithValue(ie))," / ",b.commaWithValue(F)),t.createElement("button",{className:w("btn-submit",{loading:be.loading}),disabled:be.disalbed,onClick:()=>G(Object.assign(Object.assign({},ve),{textValue:b.convertHtmlToMarkdownStr(ve.textValue)}),T)},t.createElement("span",{className:w("text")},P),B?t.createElement("span",{className:w("spinner")},t.createElement(C,{size:20})):t.createElement(t.Fragment,null)))))}));y.displayName="FeedDetailEditor";var I=y;module.exports=I;
