import { FC } from "react";
import {
  Button as RdxButton,
  ButtonProps as ButtonRdxProps,
} from "@radix-ui/themes";
import styled from "styled-components";

export const Button: FC<ButtonRdxProps> = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

const StyledButton = styled(RdxButton)`
  cursor: pointer;
`;
