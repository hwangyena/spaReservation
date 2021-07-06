import React from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from 'src/redux/store'
import { ApolloProvider } from '@apollo/client'
import { client } from 'src/apis/client'
import { Head, Layout } from 'src/components/common'
import GlobalStyle from 'src/assets/global-style'
import 'antd/dist/antd.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head />
        
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
