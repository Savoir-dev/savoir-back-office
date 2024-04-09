import {
  Button,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import { useState } from 'react'
import styled from 'styled-components'
import { space } from '../../styles/const'
import { Image } from 'lucide-react'

export const NewsApp = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const onOpenDialog = () => setIsDialogOpen(true)
  const onCloseDialog = () => setIsDialogOpen(false)

  const handleSubmit = () => {
    onCloseDialog()
  }

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger>
        <Button color="orange">Create news</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Flex direction="column" gap="2">
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="4">
              <Dialog.Title>Create New News Item</Dialog.Title>
              <FilePicker as="label">
                <Image color="orange" size={30} />
                <input
                  type="file"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={(e) => {
                    // e.target.files && onChange(e.target.files[0])
                  }}
                />
              </FilePicker>
              <TextField.Root
                name="shortDescription"
                placeholder="Short Description"
              />
              <TextArea name="longDescription" placeholder="Long Description" />
              <Flex justify="end" gap="2">
                <Dialog.Close>
                  <Button variant="outline">Cancel</Button>
                </Dialog.Close>
                <Button type="submit" color="orange">
                  Submit
                </Button>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

const FilePicker = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${space[2]};
  width: 300px;
  height: 100px;
  gap: 8px;
  border: 1px solid orange;
  border-radius: ${space[2]};
  cursor: pointer;
`
