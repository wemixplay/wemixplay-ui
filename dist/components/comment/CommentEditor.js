'use client';
"use strict";var e=require("../../_virtual/_tslib.js"),t=require("react"),a=require("./CommentEditor.module.scss.js"),r=require("../../utils/forReactUtils.js"),n=require("./CommentWriterInfo.js"),l=require("../buttons/SolidCapButton.js"),s=require("../editor/WpEditor.js"),i=require("../../plugins/mention/Mention.js"),o=require("../../plugins/autoUrlMatch/AutoUrlMatch.js"),c=require("../../plugins/countTextLength/CountTextLength.js"),m=require("../../plugins/pasteToPlainText/PasteToPlainText.js"),u=require("../../utils/valueParserUtils.js");const d=r.makeCxFunc(a),h=t.forwardRef(((a,r)=>{var h,{className:g="",writerName:p,writerImg:v,btnSubmitText:b="POST",value:x,config:T,minLength:f=1,maxLength:j=1e3,placeholder:C,name:N,handleChange:S,handleSubmit:q}=a,E=e.__rest(a,["className","writerName","writerImg","btnSubmitText","value","config","minLength","maxLength","placeholder","name","handleChange","handleSubmit"]);const k=t.useRef(),[w,L]=t.useState(u.convertMarkdownToHtmlStr(null!=x?x:"")),[M,U]=t.useState(null!==(h=null==x?void 0:x.length)&&void 0!==h?h:0),P=t.useCallback((e=>{let{textUrls:t}=e;return t.map((e=>'<a href="'.concat(e,'" target="_blank">').concat(e,"</a>")))}),[]),H=t.useCallback(((e,t)=>{const a=u.convertHtmlToMarkdownStr(e);L(a),S&&S(a,t)}),[N,S]),I=t.useCallback((()=>{q&&q(w)}),[w,q]);return t.useEffect((()=>{if(x&&!w){const e=u.convertMarkdownToHtmlStr(x);L(e)}}),[x,w]),t.useImperativeHandle(r,(()=>{const{setData:e}=k.current;return k.current.setData=(t,a)=>{const r=u.convertMarkdownToHtmlStr(t);e(r,a)},k.current})),t.createElement("div",{className:d(g,"comment-editor")},t.createElement(n,{className:d("editor-profile"),writerName:p,writerImg:v}),t.createElement("div",{className:d("editor-area")},t.createElement(s,Object.assign({className:d("editor",{filled:w.length}),plugin:[i,o,m,c],config:Object.assign(Object.assign({},T),{pasteToPlainText:{onMatchUrlReplace:P},autoUrlMatch:{onMatchUrl:e=>P({textUrls:[e]})},countTextLength:{hideUi:!0,onChangeTextLength:U}}),name:N,initialValue:w,placeholder:C,maxLength:j,handleChange:H},E,{ref:k}))),t.createElement("div",{className:d("editor-tool")},t.createElement("em",{className:d("counter-current")},u.commaWithValue(M)),"/",t.createElement("span",{className:d("counter-max")},u.commaWithValue(j)),t.createElement(l,{size:"medium",className:d("btn-post"),disabled:f>M||!u.removeSpaceAndLineBreak(w),onClick:I},b)))}));h.displayName="CommentEditor";var g=h;module.exports=g;
