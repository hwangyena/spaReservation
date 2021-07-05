import React from 'react'
import dynamic from 'next/dynamic'
import { Loading } from 'src/components/common'

const CounterComponent = dynamic(() => import('src/components/example/counter'), { loading: () => <Loading /> })

const Counter = () => {
  return (
    <CounterComponent />
  )
}

export default Counter
