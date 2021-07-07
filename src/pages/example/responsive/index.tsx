import { GetServerSideProps } from "next";
import { getDeviceType, DeviceType } from "src/common";
import { useResponsive } from "src/hooks";
import styled from "styled-components";

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  min-height: var(--content-height);
  .row {
    margin: 10px;
  }
  .sp {
    font-weight: bold;
    font-size: 24px;
    color: green;
  }
`;

interface Props {
  deviceType: DeviceType;
}

const Responsive = ({ deviceType }: Props) => {
  const deviceState = useResponsive(deviceType);
  return (
    <Wrapper>
      <h1>반응형 예시</h1>
      <div className="row">{`반응형(deviceState) => `}<span className="sp">{deviceState}</span></div>
      <div className="row">{`적응형(deviceType) => `} <span className="sp">{deviceType}</span></div>
      <div className="row">deviceState : 초기값은 디바이스의 종류, 이후 가로넓이에 따라 정해짐(반응형)</div>
      <div className="row">deviceType : 라우팅 시 디바이스의 종류에 따라 정해짐(적응형)</div>
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
