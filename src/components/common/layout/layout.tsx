import { useQuery } from "@apollo/client"
import React, { ReactNode } from "react"
import { Footer, Header, Nav } from "src/components/common"

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Nav />
      <main style={{ minHeight: "var(--content-height)" }}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
