import React from "react";
import type { AppContext, AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "src/redux/store";
import { ApolloProvider } from "@apollo/client";
import { Head, Layout } from "src/components/common";
import "antd/dist/antd.css";
import { GlobalStyle } from "src/styles";
import { parseCookies, VARIABLES } from "src/common";
import App from "next/app";
import { getClient } from "src/apis/client";

interface MyAppProps extends AppProps {
  cookies: {
    [key: string]: string;
  };
}

const MyApp = ({ Component, pageProps, cookies }: MyAppProps) => {
  const accessToken = cookies[VARIABLES.ACCESS_TOKEN]
  const refreshToken = cookies[VARIABLES.REFRESH_TOKEN]
  return (
    <>
      <Head />
      <Provider store={store}>
        <ApolloProvider client={getClient({accessToken,refreshToken})}>
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

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const req = appContext.ctx.req;
  const cookies = parseCookies(req);
  return { ...appProps, cookies: cookies };
};
