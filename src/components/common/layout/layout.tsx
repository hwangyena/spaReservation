// 인라인 스타일 예시

import React, { ReactNode } from 'react'
import { Footer, Header } from 'src/components/common'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main style={{ minHeight: 'calc(100vh - 150px)' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout