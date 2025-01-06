var n='@charset "UTF-8";\n/* stylelint-disable custom-property-pattern */\n/* stylelint-disable scss/dollar-variable-pattern */\n/* stylelint-disable selector-class-pattern */\n/* iOS 브라우저 높이 대응 */\n/* Gap */\n/* Spacing */\n/* Radius */\n/* Max Width */\n/*\n  Color Palette * Global\n  글로벌 변수에 정의된 것을 기준으로 시멘틱 컬러변수에 재정의하여 사용합니다.\n*/\n/* wemixplay */\n/* common */\n/* neutral */\n/* cool neutral */\n/* blue */\n/* red */\n/* green */\n/* orange */\n/* redOrange */\n/* lime */\n/* cyan */\n/* lightBlue */\n/* violet */\n/* purple */\n/* pink */\n/* opacity */\n/* ICON COLOR */\n/* Typography */\n/* 아래부터 4.0 리뉴얼 디자인 컬러값 적용 후 삭제 */\n/* stylelint-disable font-family-no-missing-generic-family-keyword */\n/* stylelint-disable order/properties-order */\n/* stylelint-disable scss/no-duplicate-mixins */\n/* 5120 NFT이미지 대응  */\n/* 768 미만은 모바일  */\n/* 1024 ~ */\n/* 1280 ~ */\n/* 1440 ~ */\n/* 1600 ~ */\n/* 1920 ~ */\n.btn {\n  position: relative;\n  display: flex;\n  height: 48px;\n  align-items: center;\n  justify-content: center;\n  padding: 0 28px;\n  border-radius: 0.625rem;\n  background-color: var(--wp-semantic-label-normal);\n  color: var(--wp-semantic-label-inverse-normal);\n  cursor: pointer;\n  text-align: center;\n  transition: background-color ease 0.25s;\n  word-break: keep-all;\n  overflow-wrap: break-word;\n  font-weight: 700;\n  letter-spacing: 0.0096em;\n  font-size: 15px;\n  font-size: 0.9375rem;\n  line-height: 22px;\n  line-height: 1.375rem;\n  /* 버튼 사이즈별 스타일 정의 */\n}\n.btn::before {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border-radius: 6.25rem;\n  background-color: var(--wp-semantic-label-normal);\n  content: "";\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.btn.loading {\n  pointer-events: none;\n}\n.btn [class*=spinner] {\n  margin-left: 8px;\n}\n.btn.fullsize {\n  width: 100%;\n  flex: 1;\n}\n.btn:disabled {\n  background-color: var(--wp-semantic-interaction-disable);\n  color: var(--wp-semantic-label-assistive);\n  cursor: not-allowed;\n}\n@media (hover: hover) and (pointer: fine) {\n  .btn:not(:disabled):hover::before {\n    opacity: 0.075;\n  }\n}\n.btn:not(:disabled):focus::before {\n  opacity: 0.12;\n}\n.btn:not(:disabled):active::before {\n  opacity: 0.18;\n}\n.btn * {\n  pointer-events: none;\n}\n.btn.large {\n  height: 44px;\n  padding: 0 24px;\n}\n.btn.medium {\n  height: 40px;\n  padding: 0 20px;\n  font-weight: 700;\n  letter-spacing: 0.0096em;\n  font-size: 15px;\n  font-size: 0.9375rem;\n  line-height: 22px;\n  line-height: 1.375rem;\n}\n.btn.small {\n  height: 32px;\n  padding: 0 14px;\n  font-weight: 700;\n  letter-spacing: 0.0252em;\n  font-size: 12px;\n  font-size: 0.75rem;\n  line-height: 16px;\n  line-height: 1rem;\n}\n.btn.tiny {\n  height: 24px;\n  padding: 0 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.0194em;\n  font-size: 13px;\n  font-size: 0.8125rem;\n  line-height: 18px;\n  line-height: 1.125rem;\n}\n.btn.secondary {\n  background-color: var(--wp-semantic-primary-normal);\n  color: var(--wp-semantic-static-white);\n}\n\n/**\n* IconButton Style\n*/\n.btn-icon {\n  width: var(--size);\n  height: var(--size);\n  padding: 0;\n  border-radius: 50%;\n  background: transparent;\n}\n.btn-icon svg rect {\n  fill: black;\n}\n.btn-icon::before {\n  border-radius: 50%;\n}\n.btn-icon.solid {\n  background: var(--wp-semantic-label-normal);\n}\n.btn-icon.solid svg rect {\n  fill: white;\n}\n\n/**\n* LineCapButton Style\n*/\n.btn-line-cap {\n  border: 1px solid var(--wp-semantic-label-normal);\n  border-radius: 6.25rem;\n  background-color: transparent;\n  color: var(--wp-semantic-label-normal);\n}\n.btn-line-cap::before {\n  border-radius: 6.25rem;\n  background-color: var(--wp-semantic-label-normal);\n}\n.btn-line-cap:disabled {\n  border-color: var(--wp-semantic-line-normal-normal);\n  background-color: transparent;\n  color: var(--wp-semantic-label-assistive);\n  cursor: not-allowed;\n}\n@media (hover: hover) and (pointer: fine) {\n  .btn-line-cap:not(:disabled):hover::before {\n    opacity: 0.05;\n  }\n}\n.btn-line-cap:not(:disabled):focus::before {\n  opacity: 0.08;\n}\n.btn-line-cap:not(:disabled):active::before {\n  opacity: 0.12;\n}\n\n/**\n* LineSquareButton Style\n*/\n.btn-line-square {\n  border: 1px solid var(--wp-semantic-label-normal);\n  border-radius: 0.625rem;\n  background-color: transparent;\n  color: var(--wp-semantic-label-normal);\n}\n.btn-line-square::before {\n  border-radius: 6.25rem;\n}\n.btn-line-square:disabled {\n  border-color: var(--wp-semantic-line-normal-normal);\n  background-color: transparent;\n  color: var(--wp-semantic-label-assistive);\n  cursor: not-allowed;\n}\n@media (hover: hover) and (pointer: fine) {\n  .btn-line-square:not(:disabled):hover::before {\n    opacity: 0.05;\n  }\n}\n.btn-line-square:not(:disabled):focus::before {\n  opacity: 0.08;\n}\n.btn-line-square:not(:disabled):active::before {\n  opacity: 0.12;\n}\n\n/**\n* SolidCapButton Stye\n*/\n.btn-solid-cap {\n  border-radius: 6.25rem;\n  color: var(--wp-semantic-label-inverse-normal);\n}\n.btn-solid-cap::before {\n  border-radius: 6.25rem;\n}\n.btn-solid-cap:disabled {\n  background-color: var(--wp-semantic-interaction-disable) !important;\n  color: var(--wp-semantic-label-assistive);\n  cursor: not-allowed;\n}\n@media (hover: hover) and (pointer: fine) {\n  .btn-solid-cap:not(:disabled):hover::before {\n    opacity: 0.075;\n  }\n}\n.btn-solid-cap:not(:disabled):focus::before {\n  opacity: 0.12;\n}\n.btn-solid-cap:not(:disabled):active::before {\n  opacity: 0.18;\n}\n\n/**\n* SolidSquareButton Style\n*/\n.btn-solid-square {\n  border-radius: 0.625rem;\n  background-color: var(--wp-semantic-label-normal);\n  color: var(--wp-semantic-background-normal-normal);\n}\n.btn-solid-square::before {\n  border-radius: 6.25rem;\n  background-color: var(--wp-semantic-background-normal-normal);\n}\n.btn-solid-square:disabled {\n  background-color: var(--wp-semantic-interaction-disable) !important;\n  color: var(--wp-semantic-label-assistive);\n  cursor: not-allowed;\n}\n@media (hover: hover) and (pointer: fine) {\n  .btn-solid-square:not(:disabled):hover::before {\n    opacity: 0.075;\n  }\n}\n.btn-solid-square:not(:disabled):focus::before {\n  opacity: 0.12;\n}\n.btn-solid-square:not(:disabled):active::before {\n  opacity: 0.18;\n}\n\n/**\n* AssistiveSquareButton Style\n  이 버튼스타일은 테이블 내부에 있는 버튼으로만 사용되고있습니다.\n*/\n.btn-assitive-square {\n  height: 24px;\n  padding: 0 0.75rem;\n  border: 1px solid var(--wp-semantic-line-normal-normal);\n  border-radius: 0.375rem;\n  background-color: transparent;\n  color: var(--wp-semantic-background-normal-normal);\n  font-weight: 400;\n  letter-spacing: 0.0252em;\n  font-size: 12px;\n  font-size: 0.75rem;\n  line-height: 16px;\n  line-height: 1rem;\n}\n.btn-assitive-square::before {\n  border-radius: 0.375rem;\n  background-color: transparent;\n}\n.btn-assitive-square:disabled {\n  border-color: var(--wp-semantic-line-normal-normal);\n  background-color: transparent;\n  color: var(--wp-semantic-label-assistive);\n  cursor: not-allowed;\n}\n@media (hover: hover) and (pointer: fine) {\n  .btn-assitive-square:not(:disabled):hover::before {\n    opacity: 0.075;\n  }\n}\n.btn-assitive-square:not(:disabled):focus::before {\n  opacity: 0.12;\n}\n.btn-assitive-square:not(:disabled):active::before {\n  opacity: 0.18;\n}\n\n/**\n* TextButton Style\n*/\n.btn-text {\n  position: relative;\n  display: inline-flex;\n  height: auto;\n  align-items: center;\n  padding: 0;\n  border: 0;\n  border-radius: 0;\n  background-color: transparent;\n  color: var(--wp-semantic-static-black);\n  font-feature-settings: "calt" off;\n  font-weight: 400;\n  font-size: 14px;\n  font-size: 0.875rem;\n  line-height: 18px;\n  line-height: 1.125rem;\n}\n.btn-text svg path {\n  fill: var(#737373);\n}\n.btn-text::before {\n  position: absolute;\n  top: unset;\n  bottom: 0;\n  left: 0;\n  width: 0;\n  height: 1px;\n  background-color: var(--wp-semantic-static-black) !important;\n  content: "";\n  transition: ease 0.25s;\n}\n.btn-text:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n@media (hover: hover) and (pointer: fine) {\n  .btn-text:not(:disabled):hover::before {\n    width: 100%;\n  }\n}\n\n/**\n  * EventPromaryButton\n  프로모션페이지에서 사용되는 3.0버전의 버튼 스타일 (이벤트 종료후 삭제)\n*/\n.btn-event-primary {\n  overflow: hidden;\n  border-radius: 6.25rem;\n  background: #f06;\n  color: #fff;\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 800;\n  line-height: 24px;\n}\n.btn-event-primary:disabled {\n  background: rgba(255, 255, 255, 0.08);\n  color: rgba(255, 255, 255, 0.16);\n  cursor: not-allowed;\n}\n@media (hover: hover) and (pointer: fine) {\n  .btn-event-primary:not(:disabled):hover {\n    background: #cc0052;\n  }\n}\n.btn-event-primary:not(:disabled):focus {\n  background: #cc0052;\n}\n\n.btn-event-secondary {\n  overflow: hidden;\n  border: 1px solid rgba(255, 255, 255, 0.24);\n  border-radius: 6.25rem;\n  background-color: transparent;\n  color: #fff;\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 800;\n  line-height: 24px;\n}\n.btn-event-secondary:disabled {\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  background: transparent;\n  color: rgba(255, 255, 255, 0.16);\n  cursor: not-allowed;\n}\n@media (hover: hover) and (pointer: fine) {\n  .btn-event-secondary:not(:disabled):hover {\n    border: 1px solid white;\n  }\n}\n.btn-event-secondary:not(:disabled):focus {\n  border: 1px solid white;\n}';export{n as default};
