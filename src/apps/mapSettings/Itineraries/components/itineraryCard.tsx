import { Card, DataList, Dialog, Flex, Grid, Text } from '@radix-ui/themes'
import { MapPin, Plus } from 'lucide-react'
import { useState } from 'react'

import styled from 'styled-components'
import { colors, space } from '../../../../styles/const'
import { Button } from '../../../../components/atoms/button'
import { CreateItineraryModal } from '../createItineraryModal'
import { Itinerary } from '../../../../services/types/itineraries.type'
import { useMutation, useQueryClient } from 'react-query'
import { deleteItinerary } from '../../../../services/intineraries/itineraries.services'

interface Props {
  itinerary: Itinerary
  setSelectedItineraryUid: (uid: string | undefined) => void
  selectedItineraryUid: string | undefined
}

export const ItineraryCard = ({
  itinerary,
  setSelectedItineraryUid,
  selectedItineraryUid,
}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const onCloseDialog = () => setIsDialogOpen(false)
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (uid: string | undefined) => {
      return deleteItinerary(uid)
    },
    onSuccess: () => {
      setIsDialogOpen(false)
      queryClient.invalidateQueries({
        queryKey: ['itineraries'],
      })
    },
  })

  const onOpenDialog = () => {
    setSelectedItineraryUid(itinerary.uid)
    queryClient.invalidateQueries({
      queryKey: ['itineraryByUid'],
    })
    setIsDialogOpen(true)
  }

  const onDeleteItinerary = (uid: string) => {
    mutate(uid)
  }

  return (
    <Dialog.Root open={isDialogOpen}>
      <Card size="3">
        <Flex direction="column" gap="3">
          <Flex gap="2">
            <Button
              size="1"
              color="orange"
              variant="outline"
              onClick={onOpenDialog}
            >
              <Text weight="bold">Edit</Text>
            </Button>
            <Button
              size="1"
              color="red"
              variant="outline"
              onClick={() => {
                setIsDeleting(true)
                setIsDialogOpen(true)
              }}
            >
              <Text weight="bold">Delete</Text>
            </Button>
          </Flex>
          <Flex direction="column">
            <DataList.Root>
              <DataList.Item align="center">
                <DataList.Label minWidth="40px">Title</DataList.Label>
                <DataList.Value>
                  <Text size="3" weight="bold">
                    {itinerary.translations[0].title}
                  </Text>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item align="center">
                <DataList.Label minWidth="40px">Walking tour</DataList.Label>
                <DataList.Value>
                  <Text size="3" weight="bold">
                    {itinerary.interestPoints.length}
                  </Text>
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Flex>
          <ScrollableFlex>
            {itinerary.interestPoints.map((interestPoint, index) => (
              <StyledConnector key={index}>
                <CustomCard>
                  <Flex direction="column" align="center" gap="2">
                    <MapPin color={interestPoint.color} />
                    <Text size="2" weight="bold">
                      {interestPoint.translations[0].title}
                    </Text>
                  </Flex>
                </CustomCard>
              </StyledConnector>
            ))}
            <StyledConnector>
              <Flex direction="column" align="center" gap="2">
                <Button size="1" color="orange" onClick={onOpenDialog}>
                  <Plus size={20} />
                </Button>
              </Flex>
            </StyledConnector>
          </ScrollableFlex>
        </Flex>
      </Card>
      {isDeleting ? (
        <Dialog.Content>
          <Dialog.Title>Delete Itinerary</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete this itinerary?
          </Dialog.Description>
          <Card style={{ margin: `${space[4]} 0` }}>
            <Flex justify="between">
              <Flex direction="column">
                <Text size="3" weight="bold">
                  Name
                </Text>
                <Text size="3">{itinerary.translations[0].title}</Text>
              </Flex>
            </Flex>
          </Card>
          <Flex gap="2" justify="end" align="center">
            <Button
              color="red"
              onClick={() => onDeleteItinerary(itinerary.uid)}
            >
              Delete
            </Button>
            <Button
              color="orange"
              variant="outline"
              onClick={() => {
                setIsDeleting(false)
                onCloseDialog()
              }}
            >
              Cancel
            </Button>
          </Flex>
        </Dialog.Content>
      ) : (
        <CreateItineraryModal
          close={onCloseDialog}
          itinerary={itinerary}
          selectedItineraryUid={selectedItineraryUid}
          preSelectedInterestPoints={itinerary.interestPoints}
        />
      )}
    </Dialog.Root>
  )
}

const ScrollableFlex = styled(Flex)`
  margin-top: ${space[5]};
  padding: ${space[2]} 0;
  display: flex;
  overflow-x: auto;
  flex-wrap: nowrap;
`

const CustomCard = styled.div`
  min-width: 100px;
  padding: ${space[2]};
  border-radius: 4px;
  border: 1px solid ${colors.lightSmoke};
`

const StyledConnector = styled.div`
  display: flex;
  align-items: center;
  min-width: 150px;

  &:not(:last-child)::after {
    content: '';
    width: 100%;
    border-bottom: 1px dashed;
  }
`
