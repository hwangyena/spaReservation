import { ReactNode } from 'react'
import styled from 'styled-components'
import D from 'rc-dialog'

const Wrapper = styled(D)`
  .rc-dialog-content {
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
  }

  .rc-dialog-body {
    padding: 24px;
  }
`

interface Props {
  visible: boolean
  onClose: () => void
  children?: ReactNode
}

const Modal = ({ visible, onClose, children }: Props) => {
  return (
    <Wrapper
      visible={visible}
      onClose={onClose}
      transitionName=""
      closable={false}
    >
      {children}
    </Wrapper>
  )
}

export default Modal
