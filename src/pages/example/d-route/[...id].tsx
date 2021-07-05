import { useRouter } from 'next/router'
import React from 'react'
import Abc from 'src/components/example/d-route/abc'

interface Props {

}

const AbcRoute = (props: Props) => {
  const router = useRouter()
  return (
    <div>
      현재 경로 : {router.query.id}
      <Abc />
    </div>
  )
}

export default AbcRoute
