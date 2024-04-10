import { Card, Flex, Text } from '@radix-ui/themes'
import styled from 'styled-components'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { PageHeader } from '../../components/molecules/pageHeader'
import { colors, space } from '../../styles/const'
import { Button } from '../../components/atoms/button'

import { MapSelector } from './mapSelector'

import {
  getSettings,
  putSettings,
} from '../../services/settings/settings.services'
import { ISettings } from '../../services/types/settings.type'

export const GeneralSettingsApp = () => {
  const [welcomePageImage, setWelcomePageImage] = useState<File | null>(null)
  const [location, setLocation] = useState({ lat: 0, lng: 0 })

  const queryClient = useQueryClient()
  const { data: settingsData, isLoading } = useQuery({
    queryKey: 'settings',
    queryFn: getSettings,
    onSuccess: ({ data }) => {
      setWelcomePageImage(data[0].welcomePageImage)
      setLocation({ lat: data[0].latitude, lng: data[0].longitude })
    },
    select: (data) => data.data,
  })

  const { mutate } = useMutation({
    mutationFn: (settings: ISettings) => {
      return putSettings(settings)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      })
    },
  })

  const onSave = () => {
    mutate({
      uid: settingsData.data[0].uid,
      welcomePageImage,
      latitude: location.lat.toString(),
      longitude: location.lng.toString(),
    })
  }

  if (isLoading) return <div>Loading...</div>

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
              {welcomePageImage ? (
                <Flex direction="column" gap="2">
                  <ImageStyled
                    src={welcomePageImage}
                    alt="interest point image"
                  />
                  <CustomButton color="orange">
                    Change picture
                    <HiddenInput
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setWelcomePageImage(e.target.files[0])
                      }}
                    />
                  </CustomButton>
                </Flex>
              ) : (
                <Flex direction="column" gap="2">
                  <ImageStyled
                    src={welcomePageImage}
                    alt="interest point image"
                  />
                  <CustomButton color="orange">
                    Add picture
                    <HiddenInput
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setWelcomePageImage(e.target.files[0])
                      }}
                    />
                  </CustomButton>
                </Flex>
              )}
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
      <Flex align="end" justify="end">
        <Button
          color="orange"
          size="3"
          style={{ width: '100px', marginRight: space[2] }}
          onClick={onSave}
        >
          Save
        </Button>
      </Flex>
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

const CustomButton = styled(Button)`
  position: relative;
  overflow: hidden;
  display: inline-block;
`

const HiddenInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`
