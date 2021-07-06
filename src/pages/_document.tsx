import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components';
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const initialProps = await Document.getInitialProps(ctx)
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          {/* 아임포트용 스크립트 */}
          {/* <script async type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" />
          <script async type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.8.js" /> */}
        </body>
      </Html>
    )
  }
}

export default MyDocument