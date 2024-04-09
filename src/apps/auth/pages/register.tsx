import { Controller, useForm } from 'react-hook-form'
import { CustomCard, Wrapper } from '../style'
import { useNavigate } from 'react-router-dom'
import { authAppRoutes } from '../../../navigation/internalRouter'
import { Flex, Text, TextField } from '@radix-ui/themes'
import { Button } from '../../../components/atoms/button'

export const RegisterPage = () => {
  const { control } = useForm({
    defaultValues: {
      email: '',
      password: '',
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
    password: {
      required: 'This field is required',
    },
  }

  const navigate = useNavigate()
  const onLoginNavigate = () => {
    navigate(authAppRoutes.login())
  }

  return (
    <Wrapper>
      <CustomCard>
        <form>
          <Flex direction="column" gap="2">
            <Flex direction="column">
              <Text size="2" weight="bold">
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
              <Text size="2" weight="bold">
                Password
              </Text>
              <Controller
                rules={validation['password']}
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextField.Root
                    type="password"
                    placeholder=""
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Flex>
            <Flex width="100%" direction="column" align="center" gap="1">
              <Button style={{ width: '100%' }} color="orange" type="submit">
                Register
              </Button>
              <Button
                variant="outline"
                onClick={onLoginNavigate}
                color="orange"
                style={{
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Login
              </Button>
            </Flex>
          </Flex>
        </form>
      </CustomCard>
    </Wrapper>
  )
}
