import { FC, useState } from 'react'
import { Button, Flex, Text, TextField } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { CustomCard, Wrapper } from '../style'
import { resetPassword } from '../../../services/routes/auth/login.services'
import { PasswordTextField } from '../components/passwordTextField'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authAppRoutes } from '../../../navigation/internalRouter'

export const ChangePasswordApp: FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  })

  console.log('errors', errors)

  const validation = {
    email: {
      required: 'This field is required',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Invalid email',
      },
    },
    password: {
      required: 'This field is required',
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters long',
      },
    },
    confirmPassword: {
      required: 'This field is required',
      validate: (value: string) =>
        value === watch('password') || 'Passwords do not match',
    },
  }

  const [searchParams] = useSearchParams()
  const resetToken = searchParams.get('resetToken')

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: { password: string; email: string }) => {
      return resetPassword({
        email: data.email,
        token: resetToken as string,
        newPassword: data.password,
      })
    },
    onSuccess: () => {
      navigate(authAppRoutes.login())
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
              {errors.password && (
                <Text color="red">{errors['password']?.message}</Text>
              )}
            </Flex>
            <Flex direction="column">
              <Text size="3" weight="bold">
                Confirm Password
              </Text>
              <Controller
                rules={validation['confirmPassword']}
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <PasswordTextField
                    value={value}
                    onChange={onChange}
                    isPasswordVisible={isPasswordVisible}
                    setIsPasswordVisible={setIsPasswordVisible}
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text color="red">{errors['confirmPassword']?.message}</Text>
              )}
            </Flex>
            <Flex width="100%" direction="column" align="center" gap="1">
              <Button
                style={{ width: '100%' }}
                color="orange"
                type="submit"
                loading={isLoading}
                disabled={!isValid}
              >
                Validate
              </Button>
            </Flex>
          </Flex>
        </form>
      </CustomCard>
    </Wrapper>
  )
}
