var n='@charset "UTF-8";\n/* stylelint-disable custom-property-pattern */\n/* stylelint-disable scss/dollar-variable-pattern */\n/* stylelint-disable selector-class-pattern */\n/* iOS 브라우저 높이 대응 */\n/* Gap */\n/* Spacing */\n/* Radius */\n/* Max Width */\n/*\n  Color Palette * Global\n  글로벌 변수에 정의된 것을 기준으로 시멘틱 컬러변수에 재정의하여 사용합니다.\n*/\n/* wemixplay */\n/* common */\n/* neutral */\n/* cool neutral */\n/* blue */\n/* red */\n/* green */\n/* orange */\n/* redOrange */\n/* lime */\n/* cyan */\n/* lightBlue */\n/* violet */\n/* purple */\n/* pink */\n/* opacity */\n/* ICON COLOR */\n/* Typography */\n/* 아래부터 4.0 리뉴얼 디자인 컬러값 적용 후 삭제 */\n/* stylelint-disable font-family-no-missing-generic-family-keyword */\n/* stylelint-disable order/properties-order */\n/* stylelint-disable scss/no-duplicate-mixins */\n/* 5120 NFT이미지 대응  */\n/* 768 미만은 모바일  */\n/* 1024 ~ */\n/* 1280 ~ */\n/* 1440 ~ */\n/* 1600 ~ */\n/* 1920 ~ */\n.refresh {\n  position: relative;\n  display: inline-block;\n  width: 30px;\n  height: 30px;\n  box-sizing: content-box;\n  font-size: 10px;\n  font-weight: 700;\n}\n.refresh .btn-refresh {\n  display: flex;\n  width: inherit;\n  height: inherit;\n  align-items: center;\n  justify-content: center;\n  background-color: transparent;\n  color: inherit;\n  font-family: inherit;\n  font-size: inherit;\n  font-style: inherit;\n  font-weight: inherit;\n  /* Icon */\n  /* Count */\n}\n.refresh .btn-refresh-ico {\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.refresh .btn-refresh-ico > svg {\n  width: 100%;\n  height: 100%;\n  animation: none;\n}\n.refresh .btn-refresh-ico > svg path {\n  fill: var(--wp-semantic-label-normal);\n}\n.refresh .btn-refresh-ico.refreshed > svg {\n  animation-duration: 1s;\n  animation-name: rotate;\n  transform-origin: center;\n}\n.refresh .btn-refresh-count {\n  color: inherit;\n  font-family: inherit;\n  font-size: inherit;\n  font-style: inherit;\n  font-weight: inherit;\n}\n\n/* Animation Keyframes */\n@keyframes rotate {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}';export{n as default};
