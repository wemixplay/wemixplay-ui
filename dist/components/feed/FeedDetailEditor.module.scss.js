"use strict";module.exports='@charset "UTF-8";\n/* stylelint-disable custom-property-pattern */\n/* stylelint-disable scss/dollar-variable-pattern */\n/* stylelint-disable selector-class-pattern */\n/* iOS 브라우저 높이 대응 */\n/* Gap */\n/* Spacing */\n/* Radius */\n/* Max Width */\n/*\n  Color Palette * Global\n  글로벌 변수에 정의된 것을 기준으로 시멘틱 컬러변수에 재정의하여 사용합니다.\n*/\n/* wemixplay */\n/* common */\n/* neutral */\n/* cool neutral */\n/* blue */\n/* red */\n/* green */\n/* orange */\n/* redOrange */\n/* lime */\n/* cyan */\n/* lightBlue */\n/* violet */\n/* purple */\n/* pink */\n/* opacity */\n/* ICON COLOR */\n/* Typography */\n/* 아래부터 4.0 리뉴얼 디자인 컬러값 적용 후 삭제 */\n/* stylelint-disable font-family-no-missing-generic-family-keyword */\n/* stylelint-disable order/properties-order */\n/* stylelint-disable scss/no-duplicate-mixins */\n/* 5120 NFT이미지 대응  */\n/* 768 미만은 모바일  */\n/* 1024 ~ */\n/* 1280 ~ */\n/* 1440 ~ */\n/* 1600 ~ */\n/* 1920 ~ */\n.feed-detail-editor {\n  height: 100%;\n}\n@media (min-width: 768px) {\n  .feed-detail-editor {\n    height: auto;\n  }\n}\n.feed-detail-editor-header {\n  display: flex;\n  align-items: center;\n  padding: 0 0.875rem;\n  gap: 0 12px;\n}\n@media (min-width: 768px) {\n  .feed-detail-editor-header {\n    padding: 1.25rem;\n  }\n}\n.feed-detail-editor-header.exist-user-click-event .user-name,\n.feed-detail-editor-header.exist-user-click-event .user-img {\n  cursor: pointer;\n}\n.feed-detail-editor-header .profile-info .user-name {\n  font-weight: 700;\n  letter-spacing: -0.002em;\n  font-size: 18px;\n  font-size: 1.125rem;\n  line-height: 26px;\n  line-height: 1.625rem;\n  color: var(--wp-semantic-label-normal);\n}\n.feed-detail-editor-header .profile-info .btn-post-popover :global .btn-popover {\n  display: flex;\n  width: auto;\n  height: auto;\n  align-items: center;\n  border-radius: 0;\n  color: var(--wp-semantic-label-normal);\n  font-weight: 500;\n  letter-spacing: 0.0145em;\n  font-size: 14px;\n  font-size: 0.875rem;\n  line-height: 20px;\n  line-height: 1.25rem;\n}\n.feed-detail-editor-header .avatar {\n  width: 44px;\n  height: 44px;\n  flex-shrink: 0;\n}\n.feed-detail-editor-header .selected-channel {\n  display: flex;\n  align-items: center;\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.5rem;\n  background: var(--wp-semantic-background-normal-alternative);\n  color: var(--wp-semantic-label-normal);\n  font-weight: 600;\n  letter-spacing: 0.0145em;\n  font-size: 14px;\n  font-size: 0.875rem;\n  line-height: 20px;\n  line-height: 1.25rem;\n}\n.feed-detail-editor-header .selected-channel svg {\n  margin-left: 0.5rem;\n}\n.feed-detail-editor-header .selected-channel svg path {\n  fill: var(--wp-semantic-label-normal);\n}\n.feed-detail-editor-header .selected-channel .avatar {\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n  margin-right: 0.25rem;\n  background: rebeccapurple;\n}\n.feed-detail-editor-body {\n  display: flex;\n  height: 100%;\n  flex-direction: column;\n  padding: 0 1.25rem 1.25rem;\n}\n.feed-detail-editor-body [class*=og-meta-data-preview] {\n  padding: 0;\n}\n.feed-detail-editor-body [class*=og-meta-data-preview] [class*=og-meta-data-content] [class*=preview-box] {\n  flex-wrap: nowrap;\n}\n.feed-detail-editor-body [class*=og-meta-data-preview] [class*=og-meta-data-content] [class*=preview-img] {\n  min-width: 140px;\n  max-width: 140px;\n  height: auto;\n}\n.feed-detail-editor-body [class*=og-meta-data-preview] [class*=og-meta-data-content] [class*=preview-data] {\n  padding: 0.5rem 1rem;\n}\n.feed-detail-editor-body [class*=og-meta-data-preview] [class*=og-meta-data-content] [class*=preview-data] [class*=title] {\n  font-feature-settings: "ss10" on;\n  line-height: 148%;\n  font-size: 16px;\n  font-size: 1rem;\n  font-weight: 700;\n}\n.feed-detail-editor-body [class*=og-meta-data-preview] [class*=og-meta-data-content] [class*=preview-data] [class*=link] {\n  font-feature-settings: "ss10" on;\n  line-height: 148%;\n  font-size: 16px;\n  font-size: 1rem;\n  font-weight: 400;\n}\n.feed-detail-editor-body [class*=og-meta-data-preview] [class*=og-meta-data-content] [class*=preview-data] [class*=description] {\n  font-weight: 400;\n  letter-spacing: 0.0145em;\n  font-size: 14px;\n  font-size: 0.875rem;\n  line-height: 20px;\n  line-height: 1.25rem;\n  margin-top: -4px;\n}\n.feed-detail-editor-body > [class*=wp-editor] {\n  padding-bottom: 0;\n}\n.feed-detail-editor .editor.post-content {\n  min-height: 120px;\n  padding: 0;\n  border: none;\n  margin: 0;\n  font-feature-settings: "ss10" on;\n  line-height: 148%;\n  font-size: 16px;\n  font-size: 1rem;\n  font-weight: 500;\n}\n@media (min-width: 768px) {\n  .feed-detail-editor .editor.post-content {\n    overflow: auto;\n    min-height: 120px;\n    max-height: 520px;\n    padding: 0.75rem;\n    border: 1px solid transparent;\n    border-radius: 0.75rem;\n    background: var(--wp-semantic-background-normal-alternative);\n    transition: 0.25s;\n  }\n  .feed-detail-editor .editor.post-content::-webkit-scrollbar {\n    position: absolute;\n    width: 3px;\n    height: 3px;\n  }\n  .feed-detail-editor .editor.post-content::-webkit-scrollbar-track {\n    background-color: transparent;\n  }\n  .feed-detail-editor .editor.post-content::-webkit-scrollbar-thumb {\n    background-color: var(--wp-semantic-fill-strong);\n  }\n  .feed-detail-editor .editor.post-content::-webkit-scrollbar-track, .feed-detail-editor .editor.post-content::-webkit-scrollbar-thumb {\n    border-radius: 0.75rem;\n  }\n  .feed-detail-editor .editor.post-content:focus {\n    border: 1px solid var(--wp-semantic-label-normal);\n    background: transparent;\n  }\n  .feed-detail-editor .editor.post-content:focus::before {\n    font-size: 0;\n  }\n  .feed-detail-editor .editor.post-content.filled {\n    border: 1px solid var(--wp-semantic-label-normal) !important;\n    background: transparent;\n  }\n}\n.feed-detail-editor .control-box {\n  display: flex;\n  padding: 0 1.25rem 1rem 1.25rem;\n  margin-top: auto;\n}\n.feed-detail-editor .control-box .left .btn-img-upload {\n  position: relative;\n  display: flex;\n  width: 44px;\n  height: 44px;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n.feed-detail-editor .control-box .left .btn-img-upload svg path {\n  fill: var(--wp-semantic-label-normal);\n}\n.feed-detail-editor .control-box .left .btn-img-upload::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 30px;\n  height: 30px;\n  border-radius: 0.25rem;\n  background-color: var(--wp-semantic-label-normal);\n  content: "";\n  opacity: 0;\n  transform: translate(-50%, -50%);\n  transition: opacity 0.25s;\n}\n.feed-detail-editor .control-box .left .btn-img-upload:hover::before {\n  opacity: 0.12;\n}\n.feed-detail-editor .control-box .left .btn-img-upload input {\n  display: none;\n}\n.feed-detail-editor .control-box .right {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  margin-left: auto;\n}\n.feed-detail-editor .control-box .right .text-count {\n  font-weight: 500;\n  letter-spacing: 0.0145em;\n  font-size: 14px;\n  font-size: 0.875rem;\n  line-height: 22px;\n  line-height: 1.375rem;\n  padding-right: 1rem;\n  color: var(--wp-semantic-label-assistive);\n}\n.feed-detail-editor .control-box .right .text-count > b {\n  color: var(--wp-semantic-label-normal);\n}\n.feed-detail-editor .control-box .right .btn-submit {\n  position: relative;\n  height: 40px;\n  padding: 0 1.25rem;\n  border-radius: 6.25rem;\n  background: var(--wp-semantic-label-normal);\n  color: var(--wp-semantic-label-inverse-normal);\n  text-align: center;\n  transition: background 0.25s, color 0.25s;\n  font-weight: 700;\n  letter-spacing: 0.0096em;\n  font-size: 15px;\n  font-size: 0.9375rem;\n  line-height: 22px;\n  line-height: 1.375rem;\n}\n.feed-detail-editor .control-box .right .btn-submit.loading .text {\n  visibility: hidden;\n}\n.feed-detail-editor .control-box .right .btn-submit.loading .spinner {\n  position: absolute;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  inset: 0;\n}\n.feed-detail-editor .control-box .right .btn-submit:disabled {\n  border-radius: 0.5rem;\n  background: var(--wp-semantic-line-solid-alternative);\n  color: var(--wp-semantic-label-alternative);\n  cursor: not-allowed;\n}';
