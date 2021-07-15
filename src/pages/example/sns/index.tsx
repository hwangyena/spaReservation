import React from "react";
import { useEffect } from "react";
import { VARIABLES } from "src/common";

const Sns = () => {
  return (
    <div>
      <NaverLogin
        clientId={VARIABLES.NAVER_TOKEN}
        callbackUrl={"http://localhost:3000/example/sns"}
        isPopup
      />
    </div>
  );
};

export default Sns;

interface NaverProps {
  clientId: string;
  callbackUrl: string;
  isPopup: boolean;
}

const NaverLogin = ({ clientId, callbackUrl, isPopup }: NaverProps) => {
  const initializeNaver = () => {
    const { naver } = window as any;
    const naverLogin = new naver.LoginWithNaverId({
      clientId,
      callbackUrl,
      isPopup,
      loginButton: { color: "white", type: 1, height: "47" },
    });
    naverLogin.init();
    console.log("naver",naver)
    console.log("naverLogin",naverLogin)
  };
  useEffect(() => {
    initializeNaver();
  }, []);
  return <div id="naverIdLogin" />;
};
