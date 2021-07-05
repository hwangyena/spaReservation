import { useEffect, useState } from "react";
import { DeviceType } from "src/common/functions";

const mobileBreakPoint = "only screen and (max-width: 479.98px)";
const tabletBreakPoint = "only screen and (min-width: 480px) and (max-width: 1023.98px)";

/**
 * 현재 화면의 크기를 알려주는 hooks
 * @param deviceType getDeviceType에서 받아온 문자열
 * @returns 'DESKTOP' | 'MOBILE' | 'TABLET'
 */
const useResponsive = (deviceType: DeviceType) => {
  const [device, setDevice] = useState<DeviceType>(deviceType);
  useEffect(() => {
    const isMobile = window.matchMedia(mobileBreakPoint);
    const isTablet = window.matchMedia(tabletBreakPoint);
    const getDevice = () => setDevice(isTablet.matches ? 'TABLET' : isMobile.matches ? 'MOBILE' : 'DESKTOP')
    let timeoutId: NodeJS.Timeout; // debounce mechanism
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(getDevice, 300);
    };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  });
  return device;
};

export default useResponsive;
