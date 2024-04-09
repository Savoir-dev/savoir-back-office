import { Flex, Text, TextField } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { authAppRoutes } from '../../../navigation/internalRouter'
import { CustomCard, Wrapper } from '../style'
import { Button } from '../../../components/atoms/button'

export const LoginPage = () => {
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
  const onRegisterNavigate = () => {
    navigate(authAppRoutes.register())
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
                    placeholder=""
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Flex>
            <Flex width="100%" direction="column" align="center" gap="1">
              <Button style={{ width: '100%' }} color="orange" type="submit">
                Login
              </Button>
              <Button
                onClick={onRegisterNavigate}
                variant="outline"
                style={{ width: '100%' }}
                color="orange"
                type="submit"
              >
                Register
              </Button>
              <Text
                color="orange"
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
              >
                Forget password
              </Text>
            </Flex>
          </Flex>
        </form>
      </CustomCard>
    </Wrapper>
  )
}
