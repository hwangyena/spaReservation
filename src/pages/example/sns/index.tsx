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
      <KaKaoLogin
        clientId={VARIABLES.KAKAO_TOKEN}
        onSuccess={(value) => console.log("kakaosuccess", value)}
        onFail={(value) => console.log("kakaofail", value)}
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
  const initiate = () => {
    const { naver } = window as any;
    const naverLogin = new naver.LoginWithNaverId({
      clientId,
      callbackUrl,
      isPopup,
      loginButton: { color: "white", type: 1, height: "47" },
    });
    naverLogin.init();
    console.log("naver", naver);
    console.log("naverLogin", naverLogin);
  };
  useEffect(() => {
    initiate();
  }, []);
  return <div id="naverIdLogin" />;
};

interface KakaoType {
  clientId: string;
  onSuccess: (value: any) => any;
  onFail: (value: any) => any;
}

const KaKaoLogin = ({ clientId, onSuccess, onFail }: KakaoType) => {
  /** 간편 로그인 사용 여부 @default true */
  const throughTalk = true;
  /** 세션이 종료된 뒤에도 액세스 토큰을 사용할 수 있도록 로컬 스토리지에 저장합니다. @default true  */
  const persistAccessToken = true;
  /** 사용자 정보를 요청할 지 여부 @default true */
  const needProfile = true;
  /** loginForm 을 이용할지 여부 @default false */
  const useLoginForm = false;

  const initiate = () => {
    const { Kakao } = typeof window !== "undefined" && (window as any);
    Kakao.init(clientId);
    console.log("Kakao", Kakao);
  };
  const onClick = () => {
    const { Kakao } = typeof window !== "undefined" && (window as any);

    Kakao.Auth.login({
      throughTalk,
      persistAccessToken,
      needProfile,
      useLoginForm,
      success: (response: any) => {
        if (needProfile) {
          Kakao.API.request({
            url: "/v2/user/me",
            success: (profile: any) => {
              const result = { response, profile };
              onSuccess(result);
            },
            fail: onFail,
          });
        } else {
          onSuccess({ response });
        }
      },
      fail: onFail,
    });
  };
  useEffect(() => {
    initiate();
  }, []);
  return <button onClick={onClick}>카카오 로그인</button>;
};
