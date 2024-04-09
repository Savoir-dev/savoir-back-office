import styled from 'styled-components'
import { space } from '../../styles/const'

export const FilePicker = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${space[2]};
  width: 300px;
  height: 100px;
  gap: 8px;
  border: 1px solid orange;
  border-radius: ${space[2]};
  cursor: pointer;
`
