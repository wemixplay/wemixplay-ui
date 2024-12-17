'use client';

import React, {
  ChangeEvent,
  Children,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';

import useCheckDevice from '@/hooks/useCheckDevice';

import { scrollFreeze, scrollRelease } from '@/utils/browserUtils';
import { makeCxFunc } from '@/utils/forReactUtils';

import Drawer from '@/components/drawer/Drawer';
import { SvgIcoCloseBlack, SvgIcoSearchBlack } from '@/assets/svgs';

import style from './SelectDropBox.module.scss';

interface PropsType {
  className?: string;
  /**
   * DropBox가 SelectBox의 위에 나오게 할지 아래에 나오게 할지에 대한 방향 값
   */
  direction?: 'top' | 'bottom';
  children: ReactNode | ReactNode[];
  /** 모바일, 태블릿 일때 DropBox 상단에 노출될 제목(라벨) */
  label?: string;
  /** DropBox가 갖는 최대 높이값 */
  maxHeight?: number;
  /** SelectBox 컴포넌트의 최상위 element */
  parentEl: HTMLDivElement;
  /** SelectBox안에 있는 input element */
  inputEl: HTMLInputElement;
  /** option list를 찾는 search 기능 활성화 여부  */
  search?: boolean;
  /** option list를 찾는 input태그의 value 값 */
  searchText?: string;
  /** option을 검색하는 input 태그에 들어갈 placeholder */
  searchPlaceholder?: string;
  /**
   * option list가 없거나 검색에 포함된 option이 아무것도 없을때 나타나는 `string | ReactElement` 형식의 메세지
   */
  noDataMsg?: string | ReactElement;
  /** 상단에 close button을 노출할지 여부 */
  showCloseBtn?: boolean;
  /** 스크롤 시 DropBox가 닫히게 할지 여부 */
  whenScrollCloseDropBox?: boolean;
  /** DropBox open 상태 state를 dispatch 할 수 있는 setState 함수 */
  setOpen: Dispatch<SetStateAction<boolean>>;
  /** option을 검색하는 input 태그의 값을 상위 컴포넌트에 전달하는 함수 */
  handleSearchTextChange: (value: string) => void;
  /** option을 검색하는 input 태그가 focus된 상태일때 키보드를 누르면 호출되는 함수 */
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

const cx = makeCxFunc(style);

const MARGIN = 10;

/**
 * `SelectDropBox` 컴포넌트는 사용자가 선택을 위해 클릭한 `SelectBox`에 연결된 옵션 목록을 표시하는 드롭다운 박스입니다.
 * 사용자는 이 드롭다운에서 옵션을 검색하고 선택할 수 있습니다.
 *
 * @component
 * @param {Object} props - `SelectDropBox` 컴포넌트에 전달되는 프로퍼티들
 * @param {string} [props.className] - `SelectDropBox` 컴포넌트에 적용될 추가 CSS 클래스명
 * @param {'top'|'bottom'} [props.direction='bottom'] - 드롭다운 박스가 `SelectBox`의 위에 표시될지 아래에 표시될지 결정하는 방향 값
 * @param {React.ReactNode} props.children - 드롭다운 내부에 렌더링될 자식 요소들. 주로 옵션 목록이 위치
 * @param {string} [props.label] - 모바일, 태블릿 환경에서 드롭박스 상단에 표시될 라벨(제목)
 * @param {number} [props.maxHeight] - 드롭박스가 갖는 최대 높이값. 이 값을 넘어서는 내용은 스크롤을 통해 볼 수 있음
 * @param {HTMLDivElement} props.parentEl - `SelectBox` 컴포넌트의 최상위 요소
 * @param {HTMLInputElement} props.inputEl - `SelectBox` 내부에 있는 입력 필드 요소
 * @param {boolean} [props.search=false] - 옵션 리스트 내 검색 기능 활성화 여부
 * @param {string} [props.searchText] - 옵션을 검색하는 입력 필드의 현재 값
 * @param {string} [props.searchPlaceholder] - 검색 입력 필드에 표시될 플레이스홀더 텍스트
 * @param {string | ReactElement} [props.noDataMsg] - option list가 없거나 검색에 포함된 option이 아무것도 없을때 나타나는 `string | ReactElement` 형식의 메세지
 * @param {boolean} [props.showCloseBtn=false] - 드롭다운 박스 상단에 닫기 버튼 표시 여부
 * @param {boolean} [props.whenScrollCloseDropBox=false] - 스크롤 시 드롭다운 박스를 자동으로 닫을지 여부
 * @param {Dispatch<SetStateAction<boolean>>} props.setOpen - 드롭박스의 열림/닫힘 상태를 제어할 수 있는 상태 설정 함수
 * @param {function} props.handleSearchTextChange - 옵션을 검색하는 입력 필드 값이 변경될 때 호출되는 함수. 변경된 값을 상위 컴포넌트에 전달
 * @param {function} props.handleKeyPress - 옵션을 검색하는 입력 필드가 포커스된 상태에서 키보드 입력이 있을 때 호출되는 함수
 */
const SelectDropBox = forwardRef<HTMLDivElement, PropsType>((props, ref) => {
  const {
    className,
    children,
    label,
    inputEl,
    parentEl,
    maxHeight = 200,
    search,
    searchText = '',
    searchPlaceholder,
    noDataMsg,
    direction = 'bottom',
    showCloseBtn,
    whenScrollCloseDropBox,
    setOpen,
    handleSearchTextChange,
    handleKeyPress
  } = props;

  const rootElRef = useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const { isDesktop, isMobile } = useCheckDevice();

  // option list 검색을 담당하는 input 태그의 focus 상태를 나타내는 state
  const [focus, setFocus] = useState(false);
  // DropBox가 SelectBox 위에 노출이 될건지 아래에 노출이 될건지를 나타내는 state
  const [boxDirection, setBoxDirection] = useState(direction);

  // 브라우저 창 높이의 1%를 --vh 라는 css 변수로 임시 지정
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');

  /**
   * option list가 아무것도 없는지 나타내는 변수
   */
  const isEmptyOption = useMemo(() => {
    return Children.map(children, (child) => child).length === 0;
  }, [children]);

  /**
   * 모바일에서 보이는 .hd 엘리먼트를 보여줄지 결정하는 변수
   */
  const showHd = useMemo(() => {
    if (!isMobile) {
      return false;
    }

    return label || showCloseBtn;
  }, [isMobile, label, showCloseBtn]);

  /**
   * DropBox가 노출될 여유 공간을 체크하고 위로 노출할지 아래로 노출할지 결정하는 함수
   *
   * @param top SelectBox의 y 위치값
   * @param clientHeight SelectBox의 높이값
   */
  const checkTopBottomSpace = useCallback(
    (top: number, clientHeight: number) => {
      const windowTop = window.scrollY;
      const windowBottom = window.scrollY + window.innerHeight;

      // 공간이 없다면 반대 방향(위 -> 아래, 아래 -> 위)으로 방향 전환
      if (direction === 'top' && top - clientHeight + MARGIN < windowTop) {
        setBoxDirection('bottom');
      } else if (direction === 'bottom' && top + maxHeight + MARGIN > windowBottom) {
        setBoxDirection('top');
      }
    },
    [direction, maxHeight]
  );

  /**
   * SelectBox의 위치값과 높이값 등을 계산하여 DropBox가 노출될 위치 좌표 값을 계산하는 함수
   *
   * @param el SelectBox의 element (HTMLDivElement)
   */
  const calculatePosition = useCallback(
    (el: HTMLDivElement) => {
      if (!el) {
        return;
      }
      const { clientWidth, clientHeight } = el;
      const rect = el.getBoundingClientRect();
      const isBodyMinusPosition =
        document.body.style.position === 'fixed' &&
        !!document.body.style.top &&
        Number(document.body.style.top.replace('px', '')) < 0;
      const scrollY = isBodyMinusPosition
        ? Number(document.body.style.top.replace('px', '')) * -1
        : window.scrollY;
      const top = rect.top + scrollY;
      const { left } = rect;
      let positionStyle = `min-width:${clientWidth}px;`;

      const dropboxElHeight = rootElRef.current.clientHeight ?? 0;

      checkTopBottomSpace(rect.top + window.scrollY, dropboxElHeight);

      switch (boxDirection) {
        case 'top':
          positionStyle += `top: ${top - dropboxElHeight - MARGIN}px; left: ${left}px;`;
          break;
        case 'bottom':
          positionStyle += `top: ${top + clientHeight + MARGIN}px; left: ${left}px;`;
          break;
        default:
          break;
      }

      return positionStyle;
    },
    [checkTopBottomSpace, boxDirection]
  );

  /**
   * option list를 검색하는 input 태그의 onChange함수가 실행될때 호출하는 함수
   */
  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      // SelectBox 컴포넌트로 searchText 값 전달
      handleSearchTextChange(value);
    },
    [handleSearchTextChange]
  );

  /**
   * option list를 검색하는 input 태그 value 값을 reset해주는 함수
   */
  const handleSearchTextReset = useCallback(() => {
    // SelectBox 컴포넌트로 searchText 값 전달
    handleSearchTextChange('');
  }, [handleSearchTextChange]);

  /**
   * DropBox를 닫을때 호출하는 함수
   */
  const handleClose = useCallback(() => {
    // SelectBox안에 input 태그 blur 처리
    if (inputEl) inputEl.blur();
    setOpen(false);
  }, [inputEl, setOpen]);

  /**
   * DropBox가 열렸을때 선택된 option 값의 위치로 미리 스크롤 위치를 이동
   */
  useEffect(() => {
    const el = rootElRef.current;
    const scrollEl = scrollAreaRef.current;
    const position = calculatePosition(parentEl);

    if (el && scrollEl) {
      const activeEl = scrollEl.querySelector('.active') as HTMLDivElement;
      typeof scrollEl.scrollTo === 'function' && scrollEl.scrollTo(0, activeEl?.offsetTop ?? 0);
      el.setAttribute('style', position);
    }
  }, [calculatePosition, parentEl]);

  /**
   * searchText값과 매칭되는 option 리스트를 찾아 스크롤 위치를 이동
   */
  useEffect(() => {
    if (scrollAreaRef) {
      const el = scrollAreaRef.current;
      const matchEl = el.querySelector('.match') as HTMLDivElement;

      if (matchEl) {
        [...(el.children as JSONObject)].map((el) => el.classList.remove('match'));
        matchEl.classList.add('match');
        el.scrollTo(0, matchEl.offsetTop);
      }
    }
  }, [searchText, scrollAreaRef]);

  /**
   * 스크롤이나 리사이즈할때 DropBox를 닫아주도록 하는 기능을 위해
   * 이벤트 리스너에 함수를 등록해주는 부분
   */
  useEffect(() => {
    const closeDrop = () => {
      if (window.innerWidth < 800) return;
      setOpen(false);
      if (inputEl) inputEl.blur();
    };

    window.removeEventListener('resize', closeDrop);
    window.addEventListener('resize', closeDrop);

    if (whenScrollCloseDropBox) {
      window.removeEventListener('scroll', closeDrop);
      window.addEventListener('scroll', closeDrop);
    }

    return () => {
      window.removeEventListener('scroll', closeDrop);
      window.removeEventListener('resize', closeDrop);
    };
  }, [inputEl, setOpen, whenScrollCloseDropBox]);

  /**
   * 모바일에서는 DropBox가 열렸을때 window 스크롤이 비활성화 되도록
   */
  useEffect(() => {
    if (isMobile) {
      scrollFreeze();
    }

    return () => {
      if (isMobile) scrollRelease();
    };
  }, [isMobile]);

  // 해당 컴포넌트에 ref값이 전달된 경우 ref값에 rootElRef.current (HTMLDivElement)가 세팅 될 수 있도록 설정
  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => rootElRef.current);

  return (
    <div
      ref={rootElRef}
      role="button"
      tabIndex={-1}
      className={cx(className, boxDirection, 'select-drop-box', isMobile ? '' : 'desktop')}
    >
      <div className={cx('dim')} onClick={handleClose} />
      <Drawer
        className={cx('contents')}
        direction={'top'}
        disabled={isDesktop}
        onClose={() => handleClose()}
      >
        <div>
          {showHd && (
            <div className={cx('hd')}>
              {label && <label className={cx('label')}>{label}</label>}
              {showCloseBtn && (
                <button type="button" className={cx('btn-close')} onClick={handleClose}>
                  <SvgIcoCloseBlack />
                </button>
              )}
            </div>
          )}

          {search && (
            <div className={cx('search-area')}>
              <SvgIcoSearchBlack className={cx('ico-search')} />
              <input
                type="search"
                placeholder={searchPlaceholder}
                value={searchText}
                onInput={handleSearchChange}
                onKeyDown={handleKeyPress}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
              />

              <button
                type="button"
                style={{ display: focus && !!searchText ? 'block' : 'none' }}
                onMouseDown={handleSearchTextReset}
              >
                <SvgIcoCloseBlack className={cx('ico-reset')} />
              </button>
            </div>
          )}
          <div ref={scrollAreaRef} className={cx('scroll-area')}>
            {isEmptyOption ? noDataMsg : children}
          </div>
        </div>
      </Drawer>
    </div>
  );
});

SelectDropBox.displayName = 'SelectDropBox';

export type { PropsType as SelectDropBoxProps };
export default SelectDropBox;
