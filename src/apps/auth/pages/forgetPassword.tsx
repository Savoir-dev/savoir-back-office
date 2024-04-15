import { FC, useState } from "react";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { CustomCard, Wrapper } from "../style";
import { forgetPassword } from "../../../services/routes/auth/login.services";

export const ForgetPasswordApp: FC = () => {
  const [mailSent, setMailSent] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const validation = {
    email: {
      required: "This field is required",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Invalid email",
      },
    },
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: { email: string }) => {
      return forgetPassword(data.email);
    },
    onSuccess: () => {
      setMailSent(true);
    },
  });

  const onSubmit = (data: { email: string }) => {
    mutate(data);
  };

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
                rules={validation["email"]}
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
              {mailSent && <Text>A mail has been sent on your address</Text>}
            </Flex>
            <Flex width="100%" direction="column" align="center" gap="1">
              <Button
                style={{ width: "100%" }}
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
  );
};
