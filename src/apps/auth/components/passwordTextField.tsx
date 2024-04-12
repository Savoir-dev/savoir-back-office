import { TextField } from '@radix-ui/themes'
import { FC } from 'react'
import { space } from '../../../styles/const'
import { Eye, EyeOff } from 'lucide-react'

interface Props {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isPasswordVisible: boolean
  setIsPasswordVisible: (value: boolean) => void
}

export const PasswordTextField: FC<Props> = ({
  value,
  onChange,
  isPasswordVisible,
  setIsPasswordVisible,
}) => {
  return (
    <>
      <TextField.Root
        value={value}
        onChange={onChange}
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder=""
      >
        <TextField.Slot
          style={{ width: 0, padding: space[1] }}
        ></TextField.Slot>
        <TextField.Slot pr="3">
          {!isPasswordVisible ? (
            <Eye
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{ cursor: 'pointer' }}
              height="16"
              width="16"
            />
          ) : (
            <EyeOff
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{ cursor: 'pointer' }}
              height="16"
              width="16"
            />
          )}
        </TextField.Slot>
      </TextField.Root>
    </>
  )
}
