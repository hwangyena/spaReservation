import styled from 'styled-components'
import D from 'rc-dialog'
const Wrapper = styled(D)``

interface Props {
  visible: boolean
  onClose: () => void
}

const Modal = ({ visible, onClose }: Props) => {
  return (
    <Wrapper
      visible={visible}
      onClose={onClose}
      transitionName=""
      closable={false}
    >
      sadfghjk,hgfdsad
    </Wrapper>
  )
}

export default Modal
