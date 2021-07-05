
import React from 'react'
import dynamic from 'next/dynamic'
import { Loading } from 'src/components/common'

const Abc = dynamic(() => import('src/components/example/d-route/abc'), { loading: () => <Loading /> })

const DRoute = () => {
  return (
    <Abc />
  )
}

export default DRoute
