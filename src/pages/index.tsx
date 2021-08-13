import React, { useState } from 'react'
import Drawer from 'src/components/drawer'
import Modal from 'src/components/modal'
import styled from 'styled-components'

const Wrapper = styled.div`
  text-align: center;
  header {
    background: #19ce60;
    height: 50px;
  }
  section {
    display: flex;
    justify-content: space-between;
    height: calc(100vh - 50px - 50px);
  }
  nav {
    background: skyblue;
    flex: 0.25;
  }
  main {
    background: white;
    flex: 0.75;
  }
  article {
    button {
      height: 50px;
      border-radius: 50%;
      padding: 10px;
      background: var(--primary);
    }
  }
  footer {
    background: #4285f4;
    height: 50px;
  }
`

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false)
  return (
    <>
      <Wrapper>
        <header>헤더</header>
        <section>
          <nav>네비</nav>
          <main>
            <article>
              <button onClick={() => setIsModalVisible(true)}>모달 오픈</button>
              <button onClick={() => setIsDrawerVisible(true)}>🍔 오픈</button>
            </article>
          </main>
        </section>
        <footer>푸터</footer>
      </Wrapper>
      <Modal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      {/* <Drawer
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
      /> */}
    </>
  )
}
export default Home
