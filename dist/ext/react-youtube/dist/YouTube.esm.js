"use strict";var t=require("../../../_virtual/index.js"),e=require("react"),r=require("../../../_virtual/index2.js"),a=require("../../../_virtual/index3.js"),s=Object.defineProperty,i=Object.defineProperties,o=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,h=(t,e,r)=>e in t?s(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,d=(t,e)=>{for(var r in e||(e={}))l.call(e,r)&&h(t,r,e[r]);if(n)for(var r of n(e))p.call(e,r)&&h(t,r,e[r]);return t},y=(t,e)=>i(t,o(e));function u(t={}){return y(d({},t),{height:0,width:0,playerVars:y(d({},t.playerVars),{autoplay:0,start:0,end:0})})}var c={videoId:t.string,id:t.string,className:t.string,iframeClassName:t.string,style:t.object,title:t.string,loading:t.oneOf(["lazy","eager"]),opts:t.objectOf(t.any),onReady:t.func,onError:t.func,onPlay:t.func,onPause:t.func,onEnd:t.func,onStateChange:t.func,onPlaybackRateChange:t.func,onPlaybackQualityChange:t.func},P=class extends e.Component{constructor(t){super(t),this.destroyPlayerPromise=void 0,this.onPlayerReady=t=>{var e,r;return null==(r=(e=this.props).onReady)?void 0:r.call(e,t)},this.onPlayerError=t=>{var e,r;return null==(r=(e=this.props).onError)?void 0:r.call(e,t)},this.onPlayerStateChange=t=>{var e,r,a,s,i,o,n,l;switch(null==(r=(e=this.props).onStateChange)||r.call(e,t),t.data){case P.PlayerState.ENDED:null==(s=(a=this.props).onEnd)||s.call(a,t);break;case P.PlayerState.PLAYING:null==(o=(i=this.props).onPlay)||o.call(i,t);break;case P.PlayerState.PAUSED:null==(l=(n=this.props).onPause)||l.call(n,t)}},this.onPlayerPlaybackRateChange=t=>{var e,r;return null==(r=(e=this.props).onPlaybackRateChange)?void 0:r.call(e,t)},this.onPlayerPlaybackQualityChange=t=>{var e,r;return null==(r=(e=this.props).onPlaybackQualityChange)?void 0:r.call(e,t)},this.destroyPlayer=()=>this.internalPlayer?(this.destroyPlayerPromise=this.internalPlayer.destroy().then((()=>this.destroyPlayerPromise=void 0)),this.destroyPlayerPromise):Promise.resolve(),this.createPlayer=()=>{if("undefined"==typeof document)return;if(this.destroyPlayerPromise)return void this.destroyPlayerPromise.then(this.createPlayer);const t=y(d({},this.props.opts),{videoId:this.props.videoId});this.internalPlayer=a(this.container,t),this.internalPlayer.on("ready",this.onPlayerReady),this.internalPlayer.on("error",this.onPlayerError),this.internalPlayer.on("stateChange",this.onPlayerStateChange),this.internalPlayer.on("playbackRateChange",this.onPlayerPlaybackRateChange),this.internalPlayer.on("playbackQualityChange",this.onPlayerPlaybackQualityChange),(this.props.title||this.props.loading)&&this.internalPlayer.getIframe().then((t=>{this.props.title&&t.setAttribute("title",this.props.title),this.props.loading&&t.setAttribute("loading",this.props.loading)}))},this.resetPlayer=()=>this.destroyPlayer().then(this.createPlayer),this.updatePlayer=()=>{var t;null==(t=this.internalPlayer)||t.getIframe().then((t=>{this.props.id?t.setAttribute("id",this.props.id):t.removeAttribute("id"),this.props.iframeClassName?t.setAttribute("class",this.props.iframeClassName):t.removeAttribute("class"),this.props.opts&&this.props.opts.width?t.setAttribute("width",this.props.opts.width.toString()):t.removeAttribute("width"),this.props.opts&&this.props.opts.height?t.setAttribute("height",this.props.opts.height.toString()):t.removeAttribute("height"),this.props.title?t.setAttribute("title",this.props.title):t.setAttribute("title","YouTube video player"),this.props.loading?t.setAttribute("loading",this.props.loading):t.removeAttribute("loading")}))},this.getInternalPlayer=()=>this.internalPlayer,this.updateVideo=()=>{var t,e,r,a;if(void 0===this.props.videoId||null===this.props.videoId)return void(null==(t=this.internalPlayer)||t.stopVideo());let s=!1;const i={videoId:this.props.videoId};(null==(e=this.props.opts)?void 0:e.playerVars)&&(s=1===this.props.opts.playerVars.autoplay,"start"in this.props.opts.playerVars&&(i.startSeconds=this.props.opts.playerVars.start),"end"in this.props.opts.playerVars&&(i.endSeconds=this.props.opts.playerVars.end)),s?null==(r=this.internalPlayer)||r.loadVideoById(i):null==(a=this.internalPlayer)||a.cueVideoById(i)},this.refContainer=t=>{this.container=t},this.container=null,this.internalPlayer=null}componentDidMount(){this.createPlayer()}componentDidUpdate(t){return e=this,a=null,s=function*(){(function(t,e){var r,a,s,i;return t.id!==e.id||t.className!==e.className||(null==(r=t.opts)?void 0:r.width)!==(null==(a=e.opts)?void 0:a.width)||(null==(s=t.opts)?void 0:s.height)!==(null==(i=e.opts)?void 0:i.height)||t.iframeClassName!==e.iframeClassName||t.title!==e.title})(t,this.props)&&this.updatePlayer(),function(t,e){return t.videoId!==e.videoId||!r(u(t.opts),u(e.opts))}(t,this.props)&&(yield this.resetPlayer()),function(t,e){var r,a;if(t.videoId!==e.videoId)return!0;const s=(null==(r=t.opts)?void 0:r.playerVars)||{},i=(null==(a=e.opts)?void 0:a.playerVars)||{};return s.start!==i.start||s.end!==i.end}(t,this.props)&&this.updateVideo()},new Promise(((t,r)=>{var i=t=>{try{n(s.next(t))}catch(t){r(t)}},o=t=>{try{n(s.throw(t))}catch(t){r(t)}},n=e=>e.done?t(e.value):Promise.resolve(e.value).then(i,o);n((s=s.apply(e,a)).next())}));var e,a,s}componentWillUnmount(){this.destroyPlayer()}render(){return e.createElement("div",{className:this.props.className,style:this.props.style},e.createElement("div",{id:this.props.id,className:this.props.iframeClassName,ref:this.refContainer}))}},v=P;v.propTypes=c,v.defaultProps={videoId:"",id:"",className:"",iframeClassName:"",style:{},title:"",loading:void 0,opts:{},onReady:()=>{},onError:()=>{},onPlay:()=>{},onPause:()=>{},onEnd:()=>{},onStateChange:()=>{},onPlaybackRateChange:()=>{},onPlaybackQualityChange:()=>{}},v.PlayerState={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};var g=v;module.exports=g;
