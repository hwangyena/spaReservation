import styled from "styled-components";
import D from "rc-drawer";
import { ReactNode } from "react";
const Wrapper = styled(D)`
  .rc-drawer-content {
    padding: 24px;
  }
`;

interface Props {
  children?: ReactNode;
  visible: boolean;
  onClose: () => void;
  placement?: "left" | "top" | "right" | "bottom";
}

const Drawer = ({ children, visible, onClose, placement }: Props) => {
  return (
    <Wrapper
      open={visible}
      onClose={onClose}
      placement={placement ?? "left"}
      handler={false}
      width={"auto"}
      ease={"none"}
      prefixCls={"rc-drawer"}
    >
      {children}
    </Wrapper>
  );
};

export default Drawer;
