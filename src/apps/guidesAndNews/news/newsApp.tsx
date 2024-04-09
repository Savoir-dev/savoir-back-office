import { Button, Dialog, Flex, TextArea, TextField } from '@radix-ui/themes'
import { useState } from 'react'
import { CreateNewsModal } from './createNewsModal'

export const NewsApp = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger>
        <Button color="orange">Create news</Button>
      </Dialog.Trigger>
      <CreateNewsModal />
    </Dialog.Root>
  )
}
