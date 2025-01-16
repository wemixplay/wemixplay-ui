interface IExternalImageIntersectionObserver {
    startObserving: (element: Element, callback: () => void) => void;
    quitOberving: (element: Element) => void;
}
declare class ExInteralImagesectionObserver implements IExternalImageIntersectionObserver {
    /**
     * ExternalImage의 지연로딩을 위해 요소의 뷰포트 포착여부를 관리할 옵저버 객체.
     */
    private observer;
    /**
     * callbackWeapMap은 LazyElement에서 생성하는 이미지를 보여줄 요소의 주소값을 key로,
     * 해당 요소가 뷰포트에 포착되면 각 해당 이미지 요소의 상태를 업데이트하는 콜백함수를 value로 갖는 map.
     */
    private callbackWeapMap;
    /**
     * 이미지가 보여질 요소가 지연로딩이라 요소가 포착되었을 때 상태를 업데이트하는 콜백을 넘겼다면,
     * 해당 콜백을 addLoadEvtListener 함수를 통해 callbackWeapMap 안에 저장함.
     */
    private addLoadEventListener;
    /**
     * 지연로딩을 위해 뷰포트에 포착된 요소객체의 참조값을 받아 callbackWeapMap에서
     * 해당 참조값을 key로 갖는 함수를 찾고, 그 함수를 실행하여 요소의 로딩 상태를 업데이트하는 함수.
     */
    private handleOnIntersected;
    /**
     * 옵저빙을 시작하고 뷰포트 포착 시 실행할 함수를 callbackWeapMap에 저장하는 행위를 추상화한 함수.
     */
    startObserving: any;
    /**
     * ExternalImage 컴포넌트의 props가 바뀌어 useEffect가 재실행되었을 때와 이벤트 발생 후
     * 해당 컴포넌트가 기존에 callbackWeapMap에 저장한 이벤트 함수를 클리어하는 함수.
     */
    quitOberving: any;
    constructor();
}
declare const externalImageIntersectionObserver: ExInteralImagesectionObserver;
export default externalImageIntersectionObserver;
