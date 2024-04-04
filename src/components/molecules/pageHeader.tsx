import { Tabs, Text } from '@radix-ui/themes'
import styled from 'styled-components'
import { colors, space } from '../../styles/const'
import { useNavigate } from 'react-router-dom'

interface Props {
  title: string
  subNavigation?: {
    label: string
    path: string
    isActive: boolean
  }[]
}

export const PageHeader = ({ title, subNavigation }: Props) => {
  const navigate = useNavigate()
  const activeTab = subNavigation?.find((nav) => nav.isActive)?.label

  return (
    <PageHeaderStyled>
      <CustomTitle size="6" weight="bold">
        {title}
      </CustomTitle>
      <Tabs.Root defaultValue={activeTab}>
        <TabsWrapper size="2" color="orange">
          {subNavigation?.map((nav) => {
            return (
              <Tabs.Trigger
                key={nav.label}
                value={nav.label}
                onClick={() => navigate(nav.path)}
              >
                {nav.label}
              </Tabs.Trigger>
            )
          })}
        </TabsWrapper>
      </Tabs.Root>
    </PageHeaderStyled>
  )
}

const CustomTitle = styled(Text)`
  padding: ${space[4]} ${space[3]};
`

const PageHeaderStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.lightPumpkin};
`

const TabsWrapper = styled(Tabs.List)`
  > button:first-child {
    margin-left: ${space[2]};
  }
`
