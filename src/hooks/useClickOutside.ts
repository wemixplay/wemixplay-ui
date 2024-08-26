import { ForwardedRef, MutableRefObject, useEffect } from 'react';

/**
 * `useClickOutside` 훅은 사용자에게 특정 엘리먼트를 제외한 영역을 클릭했을시에 어떤 액션을 취할건지를 정의할 수 있게 해줍니다.
 *
 * @hook
 * @param {ForwardedRef | MutableRefObject | HTMLElement} [ref] - click outside를 적용시킬 target Element의 `ForwardedRef | MutableRefObject | HTMLElement`값
 * @param {((e: MouseEvent | TouchEvent) => void)} [handler] - click outside시 콜백함수
 * @param {{ offTouchEvent?: boolean }} [option] - option 값 (`{ offTouchEvent?: boolean }`)
 *
 * @example
 * import { useRef, useState } from "react"
  * import useClickOutside from "./useClickOutside"
  *
  * export default function ClickOutsideComponent() {
  *  const [open, setOpen] = useState(false)
  *  const modalRef = useRef()

  *  useClickOutside(modalRef, () => {
  *    if (open) setOpen(false)
  *  })
  *
  *  return (
  *    <>
  *      <button onClick={() => setOpen(true)}>Open</button>
  *      <div
  *        ref={modalRef}
  *        style={{
  *          display: open ? "block" : "none",
  *        }}
  *      >
  *        <span>Modal</span>
  *      </div>
  *    </>
  *  )
  * }
 */
const useClickOutside = (
  ref: MutableRefObject<JSONObject> | HTMLElement,
  handler: (e: MouseEvent | TouchEvent) => void,
  option?: { offTouchEvent?: boolean; event?: 'click' | 'mousedown' | 'mouseup' }
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // ref가 담고 있는 HTMLElement 타입의 값을 추출
      const el = ref && 'current' in ref ? ref?.current : ref;

      // 전달된 타겟 엘리먼트가 이벤트 내에 포함되는 엘리먼트인지 확인
      // 포함이 된다면 타켓 엘리먼트의 바깥 영역이 아니기 때문에 return
      if (!el || el.contains(event.target)) {
        return;
      }

      // 타겟 엘리먼트의 바깥 영역에 대한 이벤트라면 전달 받은 callback함수 실행
      handler(event);
    };

    document.addEventListener(option?.event || 'click', listener);
    if (!option?.offTouchEvent) document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener(option?.event || 'click', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, option]);
};

export default useClickOutside;
