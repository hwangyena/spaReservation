import NextHead from 'next/head'

const meta = <>
  <meta name='viewport' content="width=device-width, initial-scale=1" />
  <meta name="description" content="템플릿입니다" />
  <meta name="keyword" content="템플릿" />
  <meta property="og:site_name" content="템플릿" />
  <meta property="og:title" content="템플릿" />
  <meta property="og:description" content="템플릿입니다" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.naver.com/" />
</>

const link = <>
  <link rel={'icon'} href={'/favicon.ico'} />
</>

const Head = () => {
  return (
    <NextHead>
      <title>프로젝트 명을 기입하시오</title>
      {meta}
      {link}
    </NextHead>
  )
}

export default Head