type CheckDeviceHookReturn = {
    /** 현재 디바이스가 데스크탑인지 여부 */
    isDesktop: boolean;
    /** 현재 디바이스가 태블릿인지 여부 */
    isTablet: boolean;
    /** 현재 디바이스가 모바일인지 여부 */
    isMobile: boolean;
    /** 현재 디바이스가 폴드인지 여부 */
    isFold: boolean;
    /** 디바이스 타입에 대한 정보를 갖는 객체 */
    deviceDetect: {
        isDesktop: boolean;
        isTablet: boolean;
        isMobile: boolean;
        isIOS: boolean;
        isAndroid: boolean;
        isMacOs: boolean;
    };
};
/**
 * 디바이스 타입을 체크하는 Hook.
 * @param {Object} params - 디바이스 타입에 대한 미디어 쿼리 문자열을 갖는 객체.
 * @param {string} params.isDesktop - 데스크탑에 대한 미디어 쿼리 문자열.
 * @param {string} params.isTablet - 태블릿에 대한 미디어 쿼리 문자열.
 * @param {string} params.isMobile - 모바일에 대한 미디어 쿼리 문자열.
 * @param {string} params.isFold - 폴드에 대한 미디어 쿼리 문자열.
 * @returns {Object} deviceInfo - 디바이스 타입에 대한 정보를 갖는 객체.
 * @returns {boolean} deviceInfo.isDesktop - 현재 디바이스가 데스크탑인지 여부.
 * @returns {boolean} deviceInfo.isTablet - 현재 디바이스가 태블릿인지 여부.
 * @returns {boolean} deviceInfo.isMobile - 현재 디바이스가 모바일인지 여부.
 * @returns {boolean} deviceInfo.isFold - 현재 디바이스가 폴드인지 여부.
 */
declare const useCheckDevice: (params?: {
    isDesktop?: string;
    isTablet?: string;
    isMobile?: string;
    isFold?: string;
}) => CheckDeviceHookReturn;
export default useCheckDevice;
