var n='@charset "UTF-8";\n/* stylelint-disable custom-property-pattern */\n/* stylelint-disable scss/dollar-variable-pattern */\n/* stylelint-disable selector-class-pattern */\n/* iOS 브라우저 높이 대응 */\n/* Gap */\n/* Spacing */\n/* Radius */\n/* Max Width */\n/*\n  Color Palette * Global\n  글로벌 변수에 정의된 것을 기준으로 시멘틱 컬러변수에 재정의하여 사용합니다.\n*/\n/* wemixplay */\n/* common */\n/* neutral */\n/* cool neutral */\n/* blue */\n/* red */\n/* green */\n/* orange */\n/* redOrange */\n/* lime */\n/* cyan */\n/* lightBlue */\n/* violet */\n/* purple */\n/* pink */\n/* opacity */\n/* ICON COLOR */\n/* Typography */\n/* 아래부터 4.0 리뉴얼 디자인 컬러값 적용 후 삭제 */\n/* stylelint-disable font-family-no-missing-generic-family-keyword */\n/* stylelint-disable order/properties-order */\n/* stylelint-disable scss/no-duplicate-mixins */\n/* 5120 NFT이미지 대응  */\n/* 768 미만은 모바일  */\n/* 1024 ~ */\n/* 1280 ~ */\n/* 1440 ~ */\n/* 1600 ~ */\n/* 1920 ~ */\n.ellipsis-wrap {\n  color: var(--wp-semantic-label-strong);\n}\n.ellipsis-wrap.shortened .btn-ellipsis-trigger svg {\n  transform: rotate(90deg);\n}\n.ellipsis-wrap.enable-show-more.shortened .btn-ellipsis-trigger svg {\n  width: 12px;\n  margin-top: 2.5px;\n  transform: rotate(0deg);\n}\n.ellipsis-wrap .ellipsis-content {\n  display: -webkit-box;\n  overflow: hidden;\n  -webkit-box-orient: vertical;\n  font-size: inherit;\n  font-style: normal;\n  font-weight: inherit;\n  line-height: inherit;\n  text-overflow: ellipsis;\n  transition: height 0.3s;\n  will-change: height;\n  font-feature-settings: "ss10" on;\n  line-height: 132%;\n  font-size: 14px;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n@media (min-width: 768px) {\n  .ellipsis-wrap .ellipsis-content {\n    font-feature-settings: "ss10" on;\n    line-height: 148%;\n    font-size: 18px;\n    font-size: 1.125rem;\n    font-weight: 500;\n  }\n}\n.ellipsis-wrap .btn-ellipsis-trigger {\n  display: flex;\n  height: 18px;\n  align-items: center;\n  margin-top: 0.5rem;\n  background: transparent;\n  color: inherit;\n  color: var(--wp-semantic-label-neutral);\n  font-size: inherit;\n  font-style: normal;\n  font-weight: inherit;\n  line-height: inherit;\n  font-feature-settings: "ss10" on;\n  line-height: 100%;\n  font-size: 12px;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n@media (min-width: 768px) {\n  .ellipsis-wrap .btn-ellipsis-trigger {\n    height: 20px;\n    font-feature-settings: "ss10" on;\n    line-height: 132%;\n    font-size: 14px;\n    font-size: 0.875rem;\n    font-weight: 500;\n  }\n}\n.ellipsis-wrap .btn-ellipsis-trigger svg {\n  width: 12px;\n  height: 12px;\n  transform: rotate(-90deg);\n  transition: transform 0.25s;\n}\n.ellipsis-wrap .btn-ellipsis-trigger svg path {\n  fill: var(--wp-semantic-label-neutral);\n}\n@media (min-width: 768px) {\n  .ellipsis-wrap .btn-ellipsis-trigger svg {\n    width: 16px;\n    height: 16px;\n  }\n}';export{n as default};
