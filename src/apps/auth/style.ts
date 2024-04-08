import styled from "styled-components";
import { colors } from "../../styles/const";
import { Card } from "@radix-ui/themes";

export const CustomCard = styled(Card)`
  background-color: white;
  width: 400px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.lightPumpkin};
  height: 100vh;
`;
