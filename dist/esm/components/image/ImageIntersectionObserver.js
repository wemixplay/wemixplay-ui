import e from"@babel/runtime/helpers/createClass";import t from"@babel/runtime/helpers/classCallCheck";var n="undefined"==typeof window?null:new(e((function e(){var n=this;t(this,e),this.callbackWeapMap=new WeakMap,this.addLoadEventListener=function(e,t){return n.callbackWeapMap.set(e,t)},this.handleOnIntersected=function(e){var t=n.callbackWeapMap.get(e);null==t||t()},this.startObserving=function(e,t){n.observer.observe(e),n.addLoadEventListener(e,t)},this.quitOberving=function(e){n.callbackWeapMap.delete(e),n.observer.unobserve(e)},this.observer=new IntersectionObserver((function(e){e.forEach((function(e){var t=e.target;e.intersectionRatio>0&&(n.handleOnIntersected(t),n.quitOberving(t))}))}),{root:null,rootMargin:"100px 0px",threshold:[.1,.2,.5,.8,.9,1]})})));export{n as default};
