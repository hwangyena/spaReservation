import throttle from "lodash/throttle";
import { useEffect, useState } from "react";
import type { DeviceType } from "src/common/functions";

const mobileBreakPoint = "only screen and (max-width: 479.98px)";
const tabletBreakPoint = "only screen and (min-width: 480px) and (max-width: 1023.98px)";
const time = 500 // 스크롤 이벤트에 텀을 줘서 성능저하를 방지(중요)

/**
 * 현재 화면의 크기를 알려주는 hooks
 * @param deviceType getDeviceType에서 받아온 문자열
 * @returns 'DESKTOP' | 'MOBILE' | 'TABLET'
 */
const useResponsive = (deviceType: DeviceType) => {
  const [device, setDevice] = useState<DeviceType>(deviceType);

  useEffect(() => {
    // 최초 device 크기 확인
    const isMobile = window.matchMedia(mobileBreakPoint);
    const isTablet = window.matchMedia(tabletBreakPoint);
    setDevice(isTablet.matches ? 'TABLET' : isMobile.matches ? 'MOBILE' : 'DESKTOP')
  }, [])

  useEffect(() => {
    // 스크롤 될 때마다 크기 확인. throttle로 성능 최적화
    const isMobile = window.matchMedia(mobileBreakPoint);
    const isTablet = window.matchMedia(tabletBreakPoint);
    const resizeListener = () => setDevice(isTablet.matches ? 'TABLET' : isMobile.matches ? 'MOBILE' : 'DESKTOP')
    window.addEventListener("resize", throttle(resizeListener, time));
    return () => window.removeEventListener("resize", resizeListener);
  }, [device]);

  return device;
};

export default useResponsive;
