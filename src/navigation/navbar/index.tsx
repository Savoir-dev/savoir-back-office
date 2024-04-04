import styled from "styled-components";
import { colors, space } from "../../styles/const";
import { useNavigate } from "react-router-dom";
import {
  generalSettingsAppRoutes,
  mapSettingsAppRoutes,
  usersAppRoutes,
} from "../internalRouter";
import { Users as UsersIcon, MapPinned, Smartphone } from "lucide-react";
import { Flex, Text } from "@radix-ui/themes";
import { isLocation } from "../../utils/isLocation";

const Tabs = [
  {
    name: "General settings",
    icon: Smartphone,
    path: generalSettingsAppRoutes.generalSettings(),
  },
  {
    name: "Users settings",
    icon: UsersIcon,
    path: usersAppRoutes.users(),
  },
  {
    name: "Map settings",
    icon: MapPinned,
    path: mapSettingsAppRoutes.mapSettings(),
  },
];

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NavbarStyled>
      {Tabs.map((tab) => (
        <NavbarItem
          align="center"
          gap="2"
          key={tab.name}
          isActive={isLocation(tab.path)}
          onClick={() => navigate(tab.path)}
        >
          <tab.icon
            color={isLocation(tab.path) ? colors.pumpkin : colors.deepBlack}
          />
          <Text size="2" color={isLocation(tab.path) ? "amber" : "gray"}>
            {tab.name}
          </Text>
        </NavbarItem>
      ))}
    </NavbarStyled>
  );
};

const NavbarStyled = styled.nav`
  display: flex;
  gap: ${space[2]};
  padding: ${space[5]};
  background-color: ${colors.pumpkin};
  flex-direction: column;
  position: fixed;
  width: 200px;
  height: 100%;
`;

const NavbarItem = styled(Flex)<{ isActive: boolean }>`
  cursor: pointer;
  background-color: ${(props) =>
    props.isActive ? colors.lightSmoke : "transparent"};
  padding: ${space[1]};
  border-radius: ${space[1]};
`;
