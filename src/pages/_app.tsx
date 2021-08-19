import { useEffect } from "react";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "src/redux/store";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "src/apis/client";
import nProgress from "nprogress";
import "src/styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  useEffect(() => {
    const handleStart = () => nProgress.start();
    const handleStop = () => nProgress.done();

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);
  const apolloClient = useApollo(pageProps);

  return (
    <>
      <NextHead>
        <title>initproject web next</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="템플릿입니다" />
        <meta name="keyword" content="템플릿" />
        <meta property="og:site_name" content="템플릿" />
        <meta property="og:title" content="템플릿" />
        <meta property="og:description" content="템플릿입니다" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.naver.com/" />
      </NextHead>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Provider>
    </>
  );
};

export default MyApp;
