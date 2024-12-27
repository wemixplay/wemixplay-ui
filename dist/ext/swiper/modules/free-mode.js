"use strict";var e=require("../shared/utils.js");module.exports=function(t){let{swiper:o,extendParams:s,emit:i,once:n}=t;s({freeMode:{enabled:!1,momentum:!0,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,momentumVelocityRatio:1,sticky:!1,minimumVelocity:.02}}),Object.assign(o,{freeMode:{onTouchStart:function(){if(o.params.cssMode)return;const e=o.getTranslate();o.setTranslate(e),o.setTransition(0),o.touchEventsData.velocities.length=0,o.freeMode.onTouchEnd({currentPos:o.rtl?o.translate:-o.translate})},onTouchMove:function(){if(o.params.cssMode)return;const{touchEventsData:t,touches:s}=o;0===t.velocities.length&&t.velocities.push({position:s[o.isHorizontal()?"startX":"startY"],time:t.touchStartTime}),t.velocities.push({position:s[o.isHorizontal()?"currentX":"currentY"],time:e.d()})},onTouchEnd:function(t){let{currentPos:s}=t;if(o.params.cssMode)return;const{params:a,wrapperEl:r,rtlTranslate:l,snapGrid:m,touchEventsData:c}=o,d=e.d()-c.touchStartTime;if(s<-o.minTranslate())o.slideTo(o.activeIndex);else if(s>-o.maxTranslate())o.slides.length<m.length?o.slideTo(m.length-1):o.slideTo(o.slides.length-1);else{if(a.freeMode.momentum){if(c.velocities.length>1){const t=c.velocities.pop(),s=c.velocities.pop(),i=t.position-s.position,n=t.time-s.time;o.velocity=i/n,o.velocity/=2,Math.abs(o.velocity)<a.freeMode.minimumVelocity&&(o.velocity=0),(n>150||e.d()-t.time>300)&&(o.velocity=0)}else o.velocity=0;o.velocity*=a.freeMode.momentumVelocityRatio,c.velocities.length=0;let t=1e3*a.freeMode.momentumRatio;const s=o.velocity*t;let d=o.translate+s;l&&(d=-d);let u,f=!1;const p=20*Math.abs(o.velocity)*a.freeMode.momentumBounceRatio;let M;if(d<o.maxTranslate())a.freeMode.momentumBounce?(d+o.maxTranslate()<-p&&(d=o.maxTranslate()-p),u=o.maxTranslate(),f=!0,c.allowMomentumBounce=!0):d=o.maxTranslate(),a.loop&&a.centeredSlides&&(M=!0);else if(d>o.minTranslate())a.freeMode.momentumBounce?(d-o.minTranslate()>p&&(d=o.minTranslate()+p),u=o.minTranslate(),f=!0,c.allowMomentumBounce=!0):d=o.minTranslate(),a.loop&&a.centeredSlides&&(M=!0);else if(a.freeMode.sticky){let e;for(let t=0;t<m.length;t+=1)if(m[t]>-d){e=t;break}d=Math.abs(m[e]-d)<Math.abs(m[e-1]-d)||"next"===o.swipeDirection?m[e]:m[e-1],d=-d}if(M&&n("transitionEnd",(()=>{o.loopFix()})),0!==o.velocity){if(t=l?Math.abs((-d-o.translate)/o.velocity):Math.abs((d-o.translate)/o.velocity),a.freeMode.sticky){const e=Math.abs((l?-d:d)-o.translate),s=o.slidesSizesGrid[o.activeIndex];t=e<s?a.speed:e<2*s?1.5*a.speed:2.5*a.speed}}else if(a.freeMode.sticky)return void o.slideToClosest();a.freeMode.momentumBounce&&f?(o.updateProgress(u),o.setTransition(t),o.setTranslate(d),o.transitionStart(!0,o.swipeDirection),o.animating=!0,e.k(r,(()=>{o&&!o.destroyed&&c.allowMomentumBounce&&(i("momentumBounce"),o.setTransition(a.speed),setTimeout((()=>{o.setTranslate(u),e.k(r,(()=>{o&&!o.destroyed&&o.transitionEnd()}))}),0))}))):o.velocity?(i("_freeModeNoMomentumRelease"),o.updateProgress(d),o.setTransition(t),o.setTranslate(d),o.transitionStart(!0,o.swipeDirection),o.animating||(o.animating=!0,e.k(r,(()=>{o&&!o.destroyed&&o.transitionEnd()})))):o.updateProgress(d),o.updateActiveIndex(),o.updateSlidesClasses()}else{if(a.freeMode.sticky)return void o.slideToClosest();a.freeMode&&i("_freeModeNoMomentumRelease")}(!a.freeMode.momentum||d>=a.longSwipesMs)&&(i("_freeModeStaticRelease"),o.updateProgress(),o.updateActiveIndex(),o.updateSlidesClasses())}}}})};