import { FC, useState } from 'react'
import { Button, Flex, Text, TextField } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { CustomCard, Wrapper } from '../style'
import { forgetPassword } from '../../../services/auth/login.services'
import { PasswordTextField } from '../components/passwordTextField'

export const ChangePasswordApp: FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const validation = {
    email: {
      required: 'This field is required',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Invalid email',
      },
    },
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: { email: string }) => {
      return forgetPassword(data.email)
    },
  })

  const onSubmit = (data: { email: string; password: string }) => {
    mutate(data)
  }

  return (
    <Wrapper>
      <CustomCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="2">
            <Flex direction="column">
              <Text size="3" weight="bold">
                Email
              </Text>
              <Controller
                rules={validation['email']}
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextField.Root
                    placeholder=""
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Flex>
            <Flex direction="column">
              <Text size="3" weight="bold">
                Password
              </Text>
              <Controller
                rules={validation['email']}
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextField.Root
                    placeholder=""
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Flex>
            <Flex direction="column">
              <Text size="3" weight="bold">
                Confirm Password
              </Text>
              <Controller
                rules={validation['password']}
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <PasswordTextField
                    value={value}
                    onChange={onChange}
                    isPasswordVisible={isPasswordVisible}
                    setIsPasswordVisible={setIsPasswordVisible}
                  />
                )}
              />
            </Flex>
            <Flex width="100%" direction="column" align="center" gap="1">
              <Button
                style={{ width: '100%' }}
                color="orange"
                type="submit"
                loading={isLoading}
                disabled={isLoading}
              >
                Send mail
              </Button>
            </Flex>
          </Flex>
        </form>
      </CustomCard>
    </Wrapper>
  )
}
