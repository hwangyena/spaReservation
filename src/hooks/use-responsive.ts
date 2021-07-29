import throttle from "lodash/throttle"
import { useEffect, useState } from "react"
import type { DeviceType } from "src/common"

const mobileBreakPoint = "only screen and (max-width: 767.98px)"
const tabletBreakPoint =
  "only screen and (min-width: 768px) and (max-width: 1023.98px)"
const time = 500 // 스크롤 이벤트에 텀을 줘서 성능저하를 방지(중요)
const compareDevice = (isMobile: boolean, isTablet: boolean) =>
  isMobile ? "MOBILE" : isTablet ? "TABLET" : "DESKTOP"

/**
 * 현재 화면의 크기를 알려주는 hooks
 * @param deviceType 'DESKTOP' | 'MOBILE' | 'TABLET' 중 하나, default 'DESKTOP'
 * @returns 'DESKTOP' | 'MOBILE' | 'TABLET'
 */
const useResponsive = (deviceType?: DeviceType) => {
  const [device, setDevice] = useState<DeviceType>(deviceType ?? "DESKTOP")

  useEffect(() => {
    // 최초 device 크기 확인
    const matchMobile = window.matchMedia(mobileBreakPoint)
    const matchTablet = window.matchMedia(tabletBreakPoint)
    const c = compareDevice(matchMobile.matches, matchTablet.matches)
    setDevice(c)
  }, [])

  useEffect(() => {
    // 스크롤 될 때마다 크기 확인. throttle로 성능 최적화
    const matchMobile = window.matchMedia(mobileBreakPoint)
    const matchTablet = window.matchMedia(tabletBreakPoint)
    const resizeListener = throttle(() => {
      const c = compareDevice(matchMobile.matches, matchTablet.matches)
      setDevice(c)
    }, time)
    window.addEventListener("resize", resizeListener)
    return () => {
      window.removeEventListener("resize", resizeListener)
    }
  }, [device])

  return device
}

export default useResponsive
