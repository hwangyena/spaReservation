import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "src/redux/store";
import { ApolloProvider } from "@apollo/client";
import { client } from "src/apis/client";
import { Head, Layout } from "src/components/common";
import "antd/dist/antd.css";
import { GlobalStyle } from "src/styles";

const App = ({ Component, pageProps }: AppProps) => {
  const a = 2;
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

export default App;
