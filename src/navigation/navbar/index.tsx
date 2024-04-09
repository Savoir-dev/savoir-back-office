import { FC } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import {
  Users as UsersIcon,
  MapPinned,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  LogOut,
} from 'lucide-react'
import { Flex, Text } from '@radix-ui/themes'

import { colors, space } from '../../styles/const'
import {
  generalSettingsAppRoutes,
  guideAndNewsAppRoutes,
  mapSettingsAppRoutes,
  usersAppRoutes,
} from '../internalRouter'
import { isLocation } from '../../utils/isLocation'

const Tabs = [
  {
    name: 'General settings',
    icon: Smartphone,
    path: generalSettingsAppRoutes.generalSettings(),
  },
  {
    name: 'Users settings',
    icon: UsersIcon,
    path: usersAppRoutes.users(),
  },
  {
    name: 'Map settings',
    icon: MapPinned,
    path: mapSettingsAppRoutes.basePath,
  },
  {
    name: 'Guides & News',
    icon: Newspaper,
    path: guideAndNewsAppRoutes.basePath,
  },
]

interface NavbarProps {
  isCollapsed: boolean
  toggleSidebar: () => void
}

export const Navbar: FC<NavbarProps> = ({ isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate()

  return (
    <NavbarStyled $isCollapsed={isCollapsed}>
      <div onClick={toggleSidebar}>
        {isCollapsed ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </div>

      {Tabs.map((tab) => (
        <NavbarItem
          align="center"
          gap="2"
          key={tab.name}
          $isActive={isLocation(tab.path)}
          $isCollapsed={isCollapsed}
          onClick={() => navigate(tab.path)}
        >
          <div style={{ flexShrink: 0 }}>
            <tab.icon
              color={isLocation(tab.path) ? colors.pumpkin : colors.deepBlack}
            />
          </div>

          {!isCollapsed && (
            <Text
              size="2"
              color={isLocation(tab.path) ? 'amber' : 'gray'}
              style={{ whiteSpace: 'nowrap' }}
            >
              {tab.name}
            </Text>
          )}
        </NavbarItem>
      ))}
      <NavbarItem
        align="center"
        gap="2"
        $isCollapsed={isCollapsed}
        onClick={() => {
          localStorage.removeItem('jwtAuthenticated')
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          navigate('/')
        }}
      >
        <LogOut color={colors.deepBlack} />
        <Text size="2" color="gray">
          Logout
        </Text>
      </NavbarItem>
    </NavbarStyled>
  )
}

const NavbarStyled = styled.nav<{ $isCollapsed: boolean }>`
  display: flex;
  gap: ${space[2]};
  padding: ${space[5]};
  background-color: ${colors.pumpkin};
  flex-direction: column;
  position: fixed;
  width: ${(props) => (props.$isCollapsed ? '80px' : '200px')};
  transition: 0.3s ease;
  height: 100%;
`

const NavbarItem = styled(Flex)<{
  $isActive?: boolean
  $isCollapsed?: boolean
}>`
  cursor: pointer;
  background-color: ${(props) =>
    props.$isActive ? colors.lightSmoke : 'transparent'};
  padding: ${space[1]};
  border-radius: ${space[1]};
  width: ${(props) => (props.$isCollapsed ? '32px' : 'auto')};
`
