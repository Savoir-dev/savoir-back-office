import { Card, Flex, Text } from '@radix-ui/themes'
import styled from 'styled-components'

import { PageHeader } from '../../components/molecules/pageHeader'
import { colors, space } from '../../styles/const'
import { Button } from '../../components/atoms/button'

import { MapSelector } from './mapSelector'
import { useState } from 'react'

export const GeneralSettingsApp = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 41.38879,
    lng: 2.15899,
  })
  return (
    <>
      <PageHeader title="General settings" />
      <Wrapper>
        <Flex gap="5">
          <Card>
            <Flex align="start" direction="column" gap="2">
              <Text size="5" style={{ margin: space[2] }} weight="bold">
                Welcome page picture
              </Text>
              <Flex direction="column" gap="2">
                <ImageStyled
                  src={
                    'https://images.unsplash.com/photo-1579282240050-352db0a14c21?q=80&w=3052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  }
                  alt="interest point image"
                />
                <Button color="orange">Change picture</Button>
              </Flex>
            </Flex>
          </Card>
          <Card>
            <Flex direction="column">
              <Text size="5" style={{ margin: space[2] }} weight="bold">
                Map default position
              </Text>
              <MapSelector
                isInputs
                size={400}
                location={location}
                setLocation={setLocation}
              />
            </Flex>
          </Card>
        </Flex>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  padding: ${space[3]};
`

const ImageStyled = styled.img`
  width: 300px;
  height: 600px;
  border-radius: ${space[1]};
  object-fit: cover;
  border: 1px solid ${colors.deepBlack};
`
