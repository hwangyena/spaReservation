import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from 'src/redux/store'
import { ApolloProvider } from '@apollo/client'
import Head from 'next/head'
import nProgress from 'nprogress'
import { useRouter } from 'next/router'
import { Layout } from 'src/components/common'
import { GlobalStyle } from 'src/assets'
import 'antd/dist/antd.css'
import { useApollo } from 'src/apis/client'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  useEffect(() => {
    const handleStart = () => nProgress.start()
    const handleStop = () => nProgress.done()

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
  const apolloClient = useApollo(pageProps)

  return (
    <>
      <Head>
        <title>프로젝트 명을 기입하시오</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="템플릿입니다" />
        <meta name="keyword" content="템플릿" />
        <meta property="og:site_name" content="템플릿" />
        <meta property="og:title" content="템플릿" />
        <meta property="og:description" content="템플릿입니다" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.naver.com/" />
      </Head>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </Provider>
    </>
  )
}

export default MyApp
