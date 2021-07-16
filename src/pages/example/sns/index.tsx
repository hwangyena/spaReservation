import React from "react";
import { useEffect } from "react";
import GoogleLogin from "react-google-login";
import KaKaoLogin from "react-kakao-login";
import { VARIABLES } from "src/common";
import NaverLogin from "src/components/naver/naver-login";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-top: 200px;
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const Sns = () => {
  return (
    <Wrapper>
      <NaverLogin
        clientId={VARIABLES.NAVER_TOKEN}
        callbackUrl={"http://localhost:3000/example/sns"}
        isPopup
        onSuccess={(res) => {
          alert("콘솔확인");
          console.log("naversuccess", res);
        }}
        onFailure={(res) => {
          alert("콘솔확인");
          console.log("naverfailure", res);
        }}
      />
      <KaKaoLogin
        token={VARIABLES.KAKAO_TOKEN}
        onSuccess={(value) => {
          alert("콘솔확인");
          console.log("kakaosuccess", value);
        }}
        onFail={(value) => {
          alert("콘솔확인");
          console.log("kakaofail", value);
        }}
      />
      <GoogleLogin
        clientId={VARIABLES.GOOGLE_TOKEN}
        onSuccess={(res) => {
          alert("콘솔확인");
          console.log("googlesuccess", res);
        }}
        onFailure={(res) => {
          alert("콘솔확인");
          console.log("googlefailure", res);
        }}
      />
    </Wrapper>
  );
};

export default Sns;



