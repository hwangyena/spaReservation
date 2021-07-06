import { GetServerSideProps } from "next";
import React from "react";
import { getDeviceType, DeviceType } from "src/common";
import { useResponsive } from "src/hooks";
import styled from "styled-components";

const getResponsiveComponent = (deviceType: DeviceType): JSX.Element => {
  switch (deviceType) {
    case "MOBILE":
      return <div>{`I'm mobile`}</div>;
    case "TABLET":
      return <div>{`I'm tablet`}</div>;
    default:
      return <div>{`I'm desktop`}</div>;
  }
};

interface Props {
  deviceType: DeviceType;
}

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  min-height: var(--content-height);
  .row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px;
  }
  .sp {
    font-weight: bold;
    font-size: 24px;
    color: green;
  }
`;

const Responsive = ({ deviceType }: Props) => {
  const deviceState = useResponsive(deviceType);
  return (
    <Wrapper>
      <h1>반응형 예시</h1>
      <div className="row">
        <span>{`반응형(deviceState) =>`}</span>
        <span className="sp">{getResponsiveComponent(deviceState)}</span>
      </div>
      <div className="row">
        <span>{`적응형(deviceType) =>`}</span>
        <span className="sp">{getResponsiveComponent(deviceType)}</span>
      </div>
      <div className="row">
        deviceState : 초기값은 디바이스의 종류, 이후 가로넓이에 따라 정해짐(반응형)
      </div>
      <div className="row">
        deviceType : 라우팅 시 디바이스의 종류에 따라 정해짐(적응형)
      </div>
    </Wrapper>
  );
};

export default Responsive;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      deviceType: getDeviceType(req),
    },
  };
};
