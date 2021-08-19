import type { NextPage } from "next";
import dynamic from "next/dynamic";
import styled from "styled-components";
import React, { useState } from "react";

const Modal = dynamic(() => import("src/components/custom/modal"));
const Drawer = dynamic(() => import("src/components/custom/drawer"));

const Wrapper = styled.div`
  text-align: center;
  padding-top: 2rem;
  h1 {
    margin-bottom: 2rem;
  }
`;

const Home: NextPage = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  return (
    <>
      <Wrapper>
        <h1 className="no-drag">테스터룸</h1>
        <PopArticle
          openModal={() => setIsModalVisible(true)}
          openDrawer={() => setIsDrawerVisible(true)}
        />
      </Wrapper>
      <Modal visible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <h2>This is Modal</h2>
        <h3>This is Modal</h3>
        <h4>This is Modal</h4>
        <h5>This is Modal</h5>
      </Modal>
      <Drawer
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
      >
        <h2>This is Drawer</h2>
        <h3>This is Drawer</h3>
        <h4>This is Drawer</h4>
        <h5>This is Drawer</h5>
      </Drawer>
    </>
  );
};

export default Home;

const PopArticleWrapper = styled.article`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0e1538;
  a {
    position: relative;
    width: 160px;
    height: 60px;
    margin: 20px;
    ::before,
    ::after {
      content: "";
      position: absolute;
      transition: 0.5s;
      inset: 1px;
    }
    :hover {
      ::before {
        inset: -3px;
      }
      ::after {
        inset: -3px;
        filter: blur(10px);
      }
    }
    :first-child::before,
    :first-child::after {
      background: linear-gradient(45deg, #00ccff, #0e1538, #0e1538, #d400d4);
    }
    :last-child::before,
    :last-child::after {
      background: linear-gradient(45deg, #ff075b, #0e1538, #0e1538, #1aff22);
    }
    button {
      color: white;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #0e1538;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.2em;
      text-transform: uppercase;
      letter-spacing: 2px;
      border: 1px solid #040a29;
      overflow: hidden;
      ::before {
        content: "";
        position: absolute;
        top: 0;
        left: -50%;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.075);
        transform: skew(25deg);
      }
    }
  }
`;

interface PopArticleProps {
  openModal: () => void;
  openDrawer: () => void;
}

const PopArticle = ({ openModal, openDrawer }: PopArticleProps) => {
  return (
    <PopArticleWrapper>
      <a>
        <button className="modal" onClick={openModal}>
          Modal
        </button>
      </a>

      <a>
        <button className="drawer" onClick={openDrawer}>
          Drawer
        </button>
      </a>
    </PopArticleWrapper>
  );
};
