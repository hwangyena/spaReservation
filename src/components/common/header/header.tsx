import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import React, { useState } from "react";
import Drawer from "antd/lib/drawer"; // default export 로 가져와야 번들사이즈가 줄어듬

const Wrapper = styled.header`
  background: lime;
  position: sticky;
  top: 0;
  z-index: 3;
  height: auto;
  .inner {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    justify-content: space-between;
  }
  .row-flex {
    display: flex;
    align-items: center;
  }
  .ham {
    cursor: pointer;
  }
`;

const Header = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="row-flex inner">
        <div className="row-flex">
          <Link href={"/"}>
            <a>
              <Image
                src={"/vercel.svg"}
                layout={"fixed"}
                width={100}
                height={30}
                alt="logo"
              />
            </a>
          </Link>
        </div>
        <div onClick={() => setIsVisible(true)} className="ham">
          🍔
        </div>
        <Drawer
          visible={isVisible}
          placement="right"
          onClose={() => setIsVisible(false)}
        >
          짜잔
        </Drawer>
      </div>
    </Wrapper>
  );
};

export default Header;
