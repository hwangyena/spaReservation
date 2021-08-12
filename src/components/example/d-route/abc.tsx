import Link from "next/link"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`
const Abc = () => {
  return (
    <Wrapper>
      <Link href={"/example/d-route/a"}>에이</Link>
      <Link href={"/example/d-route/b"}>비</Link>
      <Link href={"/example/d-route/c"}>씨</Link>
    </Wrapper>
  )
}

export default Abc
