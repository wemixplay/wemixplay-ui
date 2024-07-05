import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  isDesktop as isDesktopDD,
  isTablet as isTabletDD,
  isMobile as isMobileDD,
  isIOS,
  isAndroid,
  isMacOs
} from 'react-device-detect';

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
const useCheckDevice = (
  params: {
    isDesktop?: string;
    isTablet?: string;
    isMobile?: string;
    isFold?: string;
  } = {}
): CheckDeviceHookReturn => {
  const {
    isDesktop = '(min-width: 1280px)',
    isTablet = 'screen and (min-width: 768px) and (max-width: 1279px)',
    isMobile = '(max-width: 767px)',
    isFold = '(max-width: 359px)'
  } = params;

  const isDesktopMq = useMediaQuery({ query: isDesktop });
  const isTabletMq = useMediaQuery({ query: isTablet });
  const isMobileMq = useMediaQuery({ query: isMobile });
  const isFoldMq = useMediaQuery({ query: isFold });

  const [isClient, setIsClient] = useState(false);

  const deviceInfo = useMemo(
    () => ({
      isDesktop: isClient ? isDesktopMq : isDesktopDD,
      isTablet: isClient ? isTabletMq : isTabletDD,
      isMobile: isClient ? isMobileMq : isMobileDD,
      isFold: !!isFoldMq,
      deviceDetect: {
        isDesktop: isDesktopDD,
        isTablet: isTabletDD,
        isMobile: isMobileDD,
        isIOS: isIOS,
        isAndroid: isAndroid,
        isMacOs: isMacOs
      }
    }),
    [isClient, isDesktopMq, isTabletMq, isMobileMq, isFoldMq]
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  return deviceInfo;
};

export default useCheckDevice;
