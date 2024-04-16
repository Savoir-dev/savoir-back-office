import { useState } from 'react'
import { Button, Dialog } from '@radix-ui/themes'
import { CreateGuideModal } from './createGuideModal'
import { GuidesList } from './guidesList'

export const GuideApp = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const onClose = () => {
    setIsDialogOpen(false)
  }

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger>
        <Button color="orange">Create Guide</Button>
      </Dialog.Trigger>
      <GuidesList />
      <CreateGuideModal close={onClose} />
    </Dialog.Root>
  )
}
