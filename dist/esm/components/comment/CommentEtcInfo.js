'use client';
import e from"react";import t from"./CommentEtcInfo.module.scss.js";import l from"../../assets/svgs/ico-like.svg.js";import{makeCxFunc as s}from"../../utils/forReactUtils.js";import{toFormatterByInt as o}from"../../utils/valueParserUtils.js";const a=s(t);var i=t=>{let{className:s="",likeInfo:i,onLikeBtnClick:n}=t;var c;return e.createElement("div",{className:a(s,"comment-etc-info")},e.createElement("button",{type:"button",className:a("btn-like",{active:null==i?void 0:i.isMyClick}),onClick:e=>{e.stopPropagation(),n&&n(e)}},e.createElement("i",{className:a("btn-like-ico")},e.createElement("span",{className:a("icon")},e.createElement(l,null))),e.createElement("span",{className:a("count")},o(null!==(c=null==i?void 0:i.likeCount)&&void 0!==c?c:0,1))))};export{i as default};
