import styled from 'styled-components'
import D from 'rc-drawer'

const Wrapper = styled(D)``

interface Props {
  visible: boolean
  onClose: () => void
  placement?: 'top' | 'right' | 'bottom' | 'left'
}

const Drawer = ({ visible, onClose, placement }: Props) => {
  return (
    <Wrapper
      open={visible}
      onClose={onClose}
      placement={placement ?? 'right'}
      duration={'.6s'}
    >
      sdfk;lodsfklo;fdslm;fds
    </Wrapper>
  )
}

export default Drawer
