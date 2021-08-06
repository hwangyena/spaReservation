import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document"
import { ServerStyleSheet } from "styled-components"
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })
      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
          {/* 아임포트용 스크립트 */}
          {/* <script async type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" aria-label='jquery'/>
          <script async type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.8.js" aria-label='iamport'/> */}
          {/* 네이버 로그인 */}
          <script
            async
            type="text/javascript"
            src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"
            aria-label="kakao-login"
          />
          {/* 카카오 로그인 */}
          <script
            async
            type="text/javascript"
            src="https://developers.kakao.com/sdk/js/kakao.js"
            aria-label="naver-login"
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
