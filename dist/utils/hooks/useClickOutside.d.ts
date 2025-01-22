import { MutableRefObject } from 'react';
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
declare const useClickOutside: (ref: MutableRefObject<JSONObject> | HTMLElement, handler: (e: MouseEvent | TouchEvent) => void, option?: {
    offTouchEvent?: boolean;
    event?: 'click' | 'mousedown' | 'mouseup';
}) => void;
export default useClickOutside;
