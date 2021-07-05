import React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import store from 'src/redux/store'
import { ApolloProvider } from '@apollo/client'
import { client } from 'src/apis/client'
import { Layout } from 'src/components/common'
import GlobalStyle from 'src/assets/global-style'
import 'antd/dist/antd.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>프로젝트 명을 기입하시오</title>
        <meta name='viewport' content="width=device-width, initial-scale=1" />
      </Head>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <GlobalStyle/>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </Provider>
    </>
  )
}

export default App
