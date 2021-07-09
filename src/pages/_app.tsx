import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "src/redux/store";
import { ApolloProvider } from "@apollo/client";
import { client } from "src/apis/client";
import { Head, Layout } from "src/components/common";
import "antd/dist/antd.css";
import { GlobalStyle } from "src/styles";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head />
      <Provider store={store}>
        <ApolloProvider client={client}>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </Provider>
    </>
  );
};

export default MyApp;

// 필요할때만 사용할 것. 해당 함수는 모든 페이지를 ServerSideRendering화 시킨다.
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await App.getInitialProps(appContext);
//   const req = appContext.ctx.req;
//   const cookies = parseCookies(req);
//   return { ...appProps, cookies: cookies };
// };
