import { FC } from "react";
import { Flex, Text, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/atoms/button";
import { login } from "../../services/auth/login.services";
import { generalSettingsAppRoutes } from "../../navigation/internalRouter";

import { CustomCard, Wrapper } from "./style";

export const AuthApp: FC = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
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
    password: {
      required: "This field is required",
    },
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: { email: string; password: string }) => {
      return login(data);
    },
    onSuccess: ({ data }: { data: string }) => {
      localStorage.setItem("token", data);
      navigate(generalSettingsAppRoutes.generalSettings());
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
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
            </Flex>
            <Flex direction="column">
              <Text size="3" weight="bold">
                Password
              </Text>
              <Controller
                rules={validation["password"]}
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
              <Button
                style={{ width: "100%" }}
                color="orange"
                type="submit"
                loading={isLoading}
                disabled={isLoading}
              >
                Login
              </Button>

              <Text
                color="orange"
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Forget password
              </Text>
            </Flex>
          </Flex>
        </form>
      </CustomCard>
    </Wrapper>
  );
};