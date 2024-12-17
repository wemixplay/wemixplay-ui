'use client';

import React, {
  Children,
  InputHTMLAttributes,
  FocusEvent,
  ReactElement,
  ReactNode,
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  ChangeEvent
} from 'react';

import useClickOutside from '@/hooks/useClickOutside';

import { makeCxFunc } from '@/utils/forReactUtils';

import NoDataText from '@/components/noData/NoDataText';
import Portal from '@/components/portal/Portal';
import { SvgIcoAccordion, SvgIcoSelectboxArrow } from '@/assets/svgs';

import style from './SelectBox.module.scss';
import SelectDropBox from './SelectDropBox';

type SelectBoxRef = HTMLInputElement & { handleClickSelectBox?: () => void };

interface PropsType
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'name' | 'placeholder' | 'disabled' | 'readOnly' | 'onChange' | 'onFocus' | 'onBlur' | 'onInput'
  > {
  className?: string;
  /**
   * option list를 찾는 search 기능 활성화 여부
   */
  search?: boolean;
  /** SelectBox가 갖는 value 값 */
  value?: string | number;
  /**
   * Option 컴포넌트만 받는 children
   *
   * Option 컴포넌트가 아니면 미노출 (단 Option 컴포넌트의 children은 노출)
   */
  children: ReactNode | ReactNode[];
  /**
   * 모바일, 태블릿 일때 DropBox 상단에 노출될 제목(라벨)
   */
  mobileLabel?: string;
  /**
   * SelectBox 우측에 나올 arrow 아이콘
   *
   * `ex) selectArrow={<SvgIcoSelectboxArrow />}`
   */
  selectArrow?: ReactElement;
  /**
   * SelectDropBox에 전달할 className
   */
  dropBoxClassName?: string;
  /**
   * Option을 선택해도 DropBox가 계속 닫히지 않고 열려있기를 원할때 사용
   */
  keepDropDown?: boolean;
  /**
   * DropBox 안에 option을 검색하는 input 태그에 들어갈 placeholder
   */
  searchPlaceholder?: string;
  /**
   * option list가 없거나 검색에 포함된 option이 아무것도 없을때 나타나는 `string | ReactElement` 형식의 메세지
   */
  noDataMsg?: string | ReactElement;
  /**
   * DropBox 상단에 close button을 노출할지 여부
   */
  showCloseBtn?: boolean;
  /**
   * 스크롤 시 DropBox가 닫히게 할지 여부
   */
  whenScrollCloseDropBox?: boolean;
  /**
   * error 상태
   */
  error?: boolean;
  /**
   * SelectBox를 눌렀을때 DropBox가 열리는게 아니고 특정 로직이 실행되어야 한다면 onClick 함수 전달
   */
  onClick?: () => void;
  /** 값이 변경될 때 호출될 함수 */
  handleChange?: (value: JSONObject, name: string) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement> | { target: HTMLInputElement }) => void;
}

export type SelectData = { label: ReactNode | string; value: string | number | null };

const cx = makeCxFunc(style);

/**
 * `SelectBox` 컴포넌트는 사용자에게 드롭다운 형태의 선택 옵션들을 제공합니다.
 * 이 컴포넌트는 HTML `<input>` 태그의 주요 속성들을 상속받으며, 추가적인 커스터마이징 옵션을 제공합니다.
 *
 * @component
 * @param {string} [props.className] - `SelectBox` 컴포넌트에 적용될 추가 CSS 클래스명
 * @param {boolean} [props.search=false] - 옵션 리스트 내 검색 기능 활성화 여부
 * @param {string|number} [props.value] - 현재 선택된 `SelectBox`의 값
 * @param {ReactNode|ReactNode[]} props.children - `SelectBox` 내부에 렌더링될 자식 요소들. 주로 `Option` 컴포넌트들이 위치
 * @param {string} [props.mobileLabel] - 모바일, 태블릿 환경에서 드롭박스 상단에 표시될 라벨(제목)
 * @param {ReactElement} [props.selectArrow] - `SelectBox` 우측에 표시될 화살표 아이콘 요소. 예: `selectArrow={<SvgIcoSelectboxArrow />}`
 * @param {string} [props.dropBoxClassName] - 드롭다운 박스(`DropBox`)에 적용될 추가 CSS 클래스명
 * @param {boolean} [props.keepDropDown=false] - 옵션 선택 시 드롭다운 박스를 계속 열린 상태로 유지할지 여부
 * @param {string} [props.searchPlaceholder] - 검색 입력 필드에 표시될 플레이스홀더 텍스트
 * @param {string | ReactElement} [props.noDataMsg] - option list가 없거나 검색에 포함된 option이 아무것도 없을때 나타나는 `string | ReactElement` 형식의 메세지
 * @param {boolean} [props.showCloseBtn=false] - 드롭다운 박스 상단에 닫기 버튼 표시 여부
 * @param {boolean} [props.whenScrollCloseDropBox=false] - 스크롤 시 드롭다운 박스를 자동으로 닫을지 여부
 * @param {boolean} [props.error] - error 상태
 * @param {Function} [props.onClick] - `SelectBox` 클릭 시 실행될 콜백 함수. 특정 로직을 실행할 필요가 있을 때 사용
 * @param {Function} [props.handleChange] - 값이 변경될 때 호출될 함수. `(value: JSONObject, name: JSONObject) => void`
 *
 * @example
 * <SelectBox
 *   className="my-selectbox"
 *   search={true}
 *   value="option1"
 *   mobileLabel="Choose an option"
 *   selectArrow={<MyCustomArrowIcon />}
 *   dropBoxClassName="my-custom-dropdown"
 *   keepDropDown={true}
 *   searchPlaceholder="Search options..."
 *   showCloseBtn={true}
 *   whenScrollCloseDropBox={true}
 *   onClick={() => console.log('SelectBox clicked')}
 *   handleChange={(value, name) => console.log(`Selected: ${value}`)}
 *   handleEnter={(value, name) => console.log(`Enter pressed: ${value}`)}
 * >
 *   <Option value="option1">Option 1</Option>
 *   <Option value="option2">Option 2</Option>
 *   <Option value="option3">Option 3</Option>
 * </SelectBox>
 */
const SelectBox = forwardRef<SelectBoxRef, PropsType>((props, ref) => {
  const {
    className = '',
    children,
    name,
    value,
    error,
    search,
    mobileLabel,
    placeholder,
    disabled,
    readOnly,
    dropBoxClassName,
    selectArrow = <SvgIcoAccordion />,
    keepDropDown,
    searchPlaceholder = 'Search',
    showCloseBtn,
    whenScrollCloseDropBox,
    noDataMsg = <NoDataText className={cx('no-data')} />,
    onClick,
    handleChange,
    ...inputProps
  } = props;

  const inpRef = useRef<SelectBoxRef>(null);
  const elRef = useRef<HTMLDivElement | null>(null);
  const dropBoxRef = useRef<HTMLDivElement | null>(null);

  const [selectValue, setSelectValue] = useState<string | number | null>(value ?? '');
  const [searchText, setSearchText] = useState('');
  const [searchDirectText, setSearchDirectText] = useState('');
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);

  /**
   * SelectBox의 children으로 전달된 Option 컴포넌트들을 필터링하고 props 전달
   */
  const optionList = useMemo(() => {
    // Option 컴포넌트의 handleChange로 전달될 함수 정의
    const onChangeForOption = ({ value: newValue }: SelectData) => {
      if (disabled) return;

      // 선택된 값을 SelectBox 내부 state에 저장
      setSelectValue(newValue);
      // prop으로 전달된 handleChange 함수를 호출하여 상위 컴포넌트에게 선택된 값을 전달
      handleChange && handleChange(newValue, name);
      inpRef.current.value = String(newValue);
      inputProps.onChange && inputProps.onChange({ target: inpRef.current });

      // 값을 선택해도 DropDown을 유지시켜주는 keepDropDown이 false이면 DropBox 닫아주기
      if (!keepDropDown) setOpen(false);
    };

    // children으로 전달된 Element중에서 Option 컴포넌트만을 찾아 반환하는 재귀 함수
    const getChildren = (childArray: JSONObject[]): ReactElement[] => {
      return (childArray ?? []).flatMap((child) => {
        // props가 없거나 child가 없다면 Option 컴포넌트가 아니라고 판단하여 빈배열 반환
        if (!child?.props) return [];

        // Option 컴포넌트를 찾아다면 selectValue, seartchText, handleChange를 전달
        if (child.type?.displayName === 'Option') {
          let text: string;
          // option을 검색할때 사용하는 prop인 text가 값이 없다면 label과 children 중 string 타입을 갖는 값을 text로 전달
          // label과 children 모두 유효하지 않다면 value값을 string으로 형변환하여 text로 전달
          if (!child.props.text) {
            if (typeof child.props.label === 'string') {
              text = child.props.label;
            } else if (typeof child.props.children === 'string') {
              text = child.props.children;
            } else {
              text = child.props.value.toString();
            }
          }

          return cloneElement(child, {
            ...child.props,
            text: text.toLowerCase(),
            selectedValue: selectValue,
            searchText: searchText,
            handleChange: onChangeForOption
          });
        }

        // child가 children prop을 갖고 있다면 재귀로 다시 탐색
        if (Array.isArray(child.props.children)) {
          return getChildren(child.props.children);
        }

        return [];
      });
    };

    // children이 단일 ReactNode라면 배열로 변환
    const childList = Children.map(children, (child) => child);

    return getChildren(childList);
  }, [children, disabled, handleChange, keepDropDown, name, searchText, selectValue, inputProps]);

  /**
   * searchDirectText와 optionList 요소의 props.text를 비교하여
   * 검색한 값에 포함된 option들만 필터링하여 실제로 화면에 랜더해줄 option list 추출
   */
  const renderOptionList = useMemo(() => {
    return optionList.filter((option) => {
      return option.props.text.toLowerCase().includes(searchDirectText.toLowerCase());
    });
  }, [optionList, searchDirectText]);

  /**
   * SelectBox 선택된 값을 나타내는 내부 state인 selectValue와 같은 value를 갖는 option (ReactElement)
   */
  const findOption = useMemo(() => {
    // SelectBox 선택된 값을 나타내는 내부 state인 selectValue와 같은 value를 갖는 option Element를 탐색
    // SelectBox에 전달된 value와 같은 value를 갖는 option Element를 탐색
    // 둘중 하나라도 매칭되는게 있다면 해당 option Element 반환
    return optionList.find(
      (option) => option.props.value === selectValue || option.props.value === value
    );
  }, [optionList, selectValue, value]);

  /**
   * SelectBox에 보여줄 선택된 값 or placeholder
   */
  const labelText = useMemo(() => {
    // selectValue와 일치하는 option이 없다면 placeholder를 반환
    if (!findOption) {
      return {
        text: placeholder ?? optionList[0]?.props.label ?? optionList[0]?.props.children ?? '',
        isPlaceholder: !!placeholder
      };
    }

    const { label, children } = findOption.props;

    // findOption의 props중 label이나 children을 반환
    return {
      text: label ?? children ?? '',
      isPlaceholder: false
    };
  }, [findOption, optionList, placeholder]);

  /**
   * SelectBox를 클릭했을 때 호출되는 함수
   */
  const handleClickSelectBox = useCallback(() => {
    // SelectBox를 클릭했을때 onClick prop이 전달되었다면 onClick 함수를 실행
    if (onClick) {
      onClick();
    } else {
      if (disabled || readOnly) return;

      // SelectBox의 DropBox open 상태를 toggle
      setOpen((o) => !o);
    }
  }, [disabled, readOnly, onClick]);

  /**
   * option을 검색하는 input 태그의 onChange에 전달되는 함수
   */
  const handleDirectChange = useCallback((value: string) => {
    setSearchText(value);
    setSearchDirectText(value);
  }, []);

  /**
   * SelecBox에 focus가 되어 있는 상태(DropBox가 open 된 상태)에서 `Enter`키를 눌렀을때 호출되는 함수
   */
  const handleEnter = useCallback(() => {
    // DropBox가 열려있지 않다면 DropBox가 열리도록 state 변경
    if (!open) {
      setOpen(true);
      return;
    }

    // searchText를 포함한 option Element 탐색
    const findOption = optionList.find((option) => {
      return option.props.text.includes(searchText.toLowerCase());
    });

    if (findOption) {
      setSelectValue(findOption.props.value);
      handleChange && handleChange(findOption.props.value, name);

      inpRef.current.value = findOption.props.value;

      inputProps.onChange &&
        inputProps.onChange({
          target: inpRef.current
        });
      setOpen(false);
      inpRef.current.blur();
    }
  }, [handleChange, inputProps, name, open, optionList, searchText]);

  /**
   * SelecBox에 focus가 되어 있는 상태(DropBox가 open 된 상태)에서 ⬇나 ⬆를 키를 눌렀을때 호출되는 함수
   */
  const handleArrowKeyPress = useCallback(
    (type: 'up' | 'down') => {
      let findOption: (typeof optionList)[number];

      // 현재 searchText와 일치하는 값을 갖는 option의 index를 구함
      const findIndex = optionList.findIndex((option) =>
        searchText ? option.props.text === searchText : option.props.value === selectValue
      );

      if (type === 'down') {
        // ⬇를 눌렀을 경우 findIndex에 1을 더해줘 option list에서 하나씩 아래로 내려가도록
        findOption = findIndex + 1 >= optionList.length ? optionList[0] : optionList[findIndex + 1];
      } else {
        // ⬆를 눌렀을 경우 findIndex에 1을 빼주어 option list에서 하나씩 아래로 올라가도록
        findOption = findIndex <= 0 ? optionList[optionList.length - 1] : optionList[findIndex - 1];
      }

      const newText = findOption.props.text;

      setSearchText(newText);
    },
    [optionList, selectValue, searchText]
  );

  /**
   * SelecBox에 focus가 되어 있는 상태(DropBox가 open 된 상태)에서 키보드를 눌렀을때 호출되는 함수
   *
   * 키보드의 ⬇나 ⬆를 키를 누르거나 `Enter`키를 눌렀을때 동작을 정의
   */
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      // 한글의 경우 enter를 눌렀을때 자음/모음/받침으로 인해 2번 호출이 되기 때문에 compose가 되었는지 확인하는 조건 추가 확인
      if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
        handleEnter();
      } else if (e.key === 'ArrowDown') {
        handleArrowKeyPress('down');
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        handleArrowKeyPress('up');
        e.preventDefault();
      }
    },
    [handleEnter, handleArrowKeyPress]
  );

  /**
   * SelectBox안 input 태그 onBlur, onFocus 함수가 실행될때 호출되는 함수
   */
  const handleFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>, status: boolean) => {
      setFocus(status);

      if (status) {
        inputProps.onFocus && inputProps.onFocus(e);
      } else {
        inputProps.onBlur && inputProps.onBlur(e);
      }
    },
    [inputProps]
  );

  useClickOutside(
    elRef,
    (e) => {
      const isRightBtn = 'button' in e && e.button === 2;
      if (!isRightBtn && !dropBoxRef.current?.contains(e.target as JSONObject)) setOpen(false);
    },
    { offTouchEvent: true }
  );

  /**
   * optionList가 있고 placeHolder가 없고 findOption이 없을때
   * optionList의 첫번째 요소를 현재 값으로 set
   */
  useEffect(() => {
    if (optionList.length) {
      if (!placeholder && !findOption) {
        const firstOption = optionList[0];
        const firstValue = firstOption.props.value;

        setSelectValue(firstValue);
      }
    }
  }, [placeholder, findOption, optionList]);

  /**
   * value 값이 변경되었을때 selectedValue도 동기화
   */
  useEffect(() => {
    if (typeof value !== 'undefined') {
      setSelectValue(value);
    }
  }, [value]);

  /**
   * drop box가 닫힐때 searchText를 빈문자로 reset
   */
  useEffect(() => {
    if (!open) {
      setSearchText('');
    }
  }, [open]);

  // 해당 컴포넌트에 ref값이 전달된 경우 ref값에 inpRef.current (HTMLInputElement)가 세팅 될 수 있도록 설정
  useImperativeHandle(ref, () => {
    inpRef.current.handleClickSelectBox = handleClickSelectBox;

    return inpRef.current;
  });

  return (
    <>
      <div
        ref={elRef}
        className={cx('select-box', className, {
          open,
          focus,
          disabled,
          error,
          readonly: readOnly,
          placeholder: labelText.isPlaceholder,
          'not-allow': disabled
        })}
        onClick={handleClickSelectBox}
      >
        <label>
          <div className={cx('value', { placeholder: labelText.isPlaceholder })}>
            <span>{labelText.text}</span>
          </div>

          <input
            {...inputProps}
            ref={inpRef}
            type="text"
            value={selectValue}
            name={name}
            readOnly
            onFocus={(e) => handleFocus(e, true)}
            onBlur={(e) => handleFocus(e, false)}
            onKeyDown={handleKeyPress}
          />
          <i className={cx('ico-arrow')}>{selectArrow}</i>
        </label>
      </div>
      {open && (
        <Portal>
          <SelectDropBox
            ref={dropBoxRef}
            className={dropBoxClassName}
            label={mobileLabel}
            inputEl={inpRef.current}
            parentEl={elRef.current}
            setOpen={setOpen}
            search={search}
            searchText={searchText}
            searchPlaceholder={searchPlaceholder}
            showCloseBtn={showCloseBtn}
            whenScrollCloseDropBox={whenScrollCloseDropBox}
            noDataMsg={noDataMsg}
            handleSearchTextChange={handleDirectChange}
            handleKeyPress={handleKeyPress}
          >
            {renderOptionList}
          </SelectDropBox>
        </Portal>
      )}
    </>
  );
});

SelectBox.displayName = 'SelectBox';

export type { PropsType as SelectBoxProps, SelectBoxRef };
export default SelectBox;
