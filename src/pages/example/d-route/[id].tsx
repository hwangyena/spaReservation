import { useRouter } from 'next/router'
import Abc from 'src/components/example/d-route/abc'

const AbcRoute = () => {
  const router = useRouter()
  return (
    <div>
      현재 경로 : {router.query.id}
      <Abc />
    </div>
  )
}

export default AbcRoute
