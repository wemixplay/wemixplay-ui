"use strict";var e=require("@babel/runtime/helpers/slicedToArray"),i=require("react"),s=require("react-responsive"),r=require("react-device-detect");module.exports=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},d=t.isDesktop,o=void 0===d?"(min-width: 1280px)":d,u=t.isTablet,a=void 0===u?"screen and (min-width: 768px) and (max-width: 1279px)":u,n=t.isMobile,l=void 0===n?"(max-width: 767px)":n,c=t.isFold,p=void 0===c?"(max-width: 359px)":c,b=s.useMediaQuery({query:o}),M=s.useMediaQuery({query:a}),v=s.useMediaQuery({query:l}),x=s.useMediaQuery({query:p}),y=i.useState(!1),m=e(y,2),q=m[0],h=m[1],D=i.useMemo((function(){return{isDesktop:q?b:r.isDesktop,isTablet:q?M:r.isTablet,isMobile:q?v:r.isMobile,isFold:!!x,deviceDetect:{isDesktop:r.isDesktop,isTablet:r.isTablet,isMobile:r.isMobile,isIOS:r.isIOS,isAndroid:r.isAndroid,isMacOs:r.isMacOs}}}),[q,b,M,v,x]);return i.useEffect((function(){h(!0)}),[]),D};