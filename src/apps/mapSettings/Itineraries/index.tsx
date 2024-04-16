import { Box, Dialog, Flex } from '@radix-ui/themes'
import { useState } from 'react'

import { ItinerariesList } from './itinerariesList'
import { CreateItineraryModal } from './createItineraryModal'
import { Button } from '../../../components/atoms/button'

export const ItinerariesApp = () => {
  const [
    isCreateItineraryDialogOpen,
    setIsCreateItineraryDialogOpen,
  ] = useState(false)

  const onOpenCreateItineraryDialog = () => setIsCreateItineraryDialogOpen(true)
  const onCloseDialog = () => setIsCreateItineraryDialogOpen(false)

  return (
    <Flex direction="column" gap="2">
      <Dialog.Root open={isCreateItineraryDialogOpen}>
        <Box>
          <Button color="orange" onClick={onOpenCreateItineraryDialog}>
            Create new itinerary
          </Button>
        </Box>
        {isCreateItineraryDialogOpen && (
          <CreateItineraryModal close={onCloseDialog} />
        )}
      </Dialog.Root>
      <ItinerariesList />
    </Flex>
  )
}
