import { NextPage } from "next"
import React, { useState } from "react"
import Dialog from "rc-dialog"
import styled from "styled-components"

const Modal = styled(Dialog)`
  width: 520px;
  transform-origin: 429px 163px;
  top: 0;
  display: inline-block;
  text-align: left;
  vertical-align: middle;
  padding: 0 0 24px;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  pointer-events: none;
  position: relative;
  top: 100px;
  max-width: calc(100vw - 32px);
  margin: 0 auto;
  .rc-dialog-content {
    position: relative;
    background-color: #fff;
    background-clip: padding-box;
    border: 0;
    border-radius: 2px;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    pointer-events: auto;
  }
  .rc-dialog-body {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5715;
    word-wrap: break-word;
  }
  ::before {
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
    content: "";
  }
`

const ExampleModal: NextPage = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  return (
    <>
      <div>
        <button onClick={() => setIsModalVisible(true)}>오픈</button>
      </div>
      <Modal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        closable={false}
      >
        afsfsdfsfds
      </Modal>
    </>
  )
}

export default ExampleModal
