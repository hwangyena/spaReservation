import { useEffect } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

interface NaverProps {
  clientId: string;
  callbackUrl: string;
  isPopup: boolean;
  onSuccess: (value: any) => any;
  onFailure: (value: any) => any;
}
const NaverLogin = ({
  clientId,
  callbackUrl,
  isPopup,
  onSuccess,
  onFailure,
}: NaverProps) => {
  const initiate = () => {
    const { naver } = window;
    const naverLogin = new naver.LoginWithNaverId({
      clientId,
      callbackUrl,
      isPopup,
      loginButton: { color: "white", type: 1, height: "47" },
    });
    naverLogin.init();
    if (!window.opener) {
      naver.successCallback = (data: any) => onSuccess(data);
      naver.failureCallback = (data: any) => onFailure(data);
    } else {
      naverLogin.getLoginStatus((status: any) => {
        if (status) {
          window.opener?.naver.successCallback(naverLogin);
        } else {
          window.opener?.naver.failureCallback();
        }
        window.close();
      });
    }
  };
  useEffect(() => {
    initiate();
  }, []);
  return <div id="naverIdLogin" />;
};

export default NaverLogin;
