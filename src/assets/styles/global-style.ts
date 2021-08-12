import { createGlobalStyle } from "styled-components"
import NprogressStyle from "./nprogress"

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: hotpink;
    --secendary: #7fa6c5;
    --text-primary: #000000;
    --text-secendary: #ffffff;
    --content-height: calc(100vh - 150px);
  }
  ${NprogressStyle}
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    font-size: 16px;
    color: var(--text-primary);
    background: #ffffff;
    /* 글자가 연해져요 */
    /* -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; */
    font-variant: normal;
    font-feature-settings: normal;
  }

  input,
  select,
  textarea,
  button {
    outline: none;
    appearance: none;
    -moz-appearance: none;
    border-radius: unset;
    border: 0px;
    padding: 0px;
  }

  textarea {
    resize: none;
  }

  button {
    cursor: pointer;
  }

  img {
    -webkit-user-drag: none;
  }
  /* 모달 테스트 */
  .rc-dialog-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    height: 100%;
    background-color: #00000073;
  }
  .rc-dialog-wrap {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    outline: 0;
    -webkit-overflow-scrolling: touch;
    z-index: 1000;
    text-align: center;
  }
`

export default GlobalStyle
