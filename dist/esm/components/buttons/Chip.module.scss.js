var n='@charset "UTF-8";\n/* stylelint-disable custom-property-pattern */\n/* stylelint-disable scss/dollar-variable-pattern */\n/* stylelint-disable selector-class-pattern */\n/* iOS 브라우저 높이 대응 */\n/* Gap */\n/* Spacing */\n/* Radius */\n/* Max Width */\n/*\n  Color Palette * Global\n  글로벌 변수에 정의된 것을 기준으로 시멘틱 컬러변수에 재정의하여 사용합니다.\n*/\n/* wemixplay */\n/* common */\n/* neutral */\n/* cool neutral */\n/* blue */\n/* red */\n/* green */\n/* orange */\n/* redOrange */\n/* lime */\n/* cyan */\n/* lightBlue */\n/* violet */\n/* purple */\n/* pink */\n/* opacity */\n/* ICON COLOR */\n/* Typography */\n/* 아래부터 4.0 리뉴얼 디자인 컬러값 적용 후 삭제 */\n/* stylelint-disable font-family-no-missing-generic-family-keyword */\n/* stylelint-disable order/properties-order */\n/* stylelint-disable scss/no-duplicate-mixins */\n/* 5120 NFT이미지 대응  */\n/* 768 미만은 모바일  */\n/* 1024 ~ */\n/* 1280 ~ */\n/* 1440 ~ */\n/* 1600 ~ */\n/* 1920 ~ */\n.chip {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: space-around;\n  padding: 14px 16px;\n  border-radius: 1rem;\n  background: lightgray;\n  cursor: pointer;\n  font-size: 13px;\n  font-weight: 400;\n  letter-spacing: 0.2px;\n  line-height: 16px;\n  /* 리셋 정의후 변경예정 */\n}\n.chip:hover:not(.disabled) {\n  background: gray;\n}\n.chip .text {\n  display: inline-flex;\n  width: max-content;\n  align-items: center;\n  word-break: keep-all;\n  overflow-wrap: break-word;\n}\n.chip .delete-btn {\n  display: inline-block;\n  padding: 0;\n  border: none;\n  margin-left: 12px;\n  background: transparent;\n  cursor: pointer;\n  vertical-align: middle;\n}\n.chip .delete-btn svg {\n  display: block;\n  width: 20px;\n  height: 20px;\n}\n.chip.disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}';export{n as default};
