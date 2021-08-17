import { ReactNode } from "react";
import styled from "styled-components";
import D from "rc-dialog";
const Wrapper = styled(D)`
  .rc-dialog-body {
    padding: 24px;
  }
`;

interface Props {
  visible: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal = ({ visible, onClose, children }: Props) => {
  return (
    <Wrapper
      visible={visible}
      onClose={onClose}
      transitionName=""
      closable={false}
      prefixCls={"rc-dialog"}
    >
      {children}
    </Wrapper>
  );
};

export default Modal;
