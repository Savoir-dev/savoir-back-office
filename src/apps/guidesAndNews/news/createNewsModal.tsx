import { Button, Dialog, Flex, Text, TextArea } from '@radix-ui/themes'
import { FilePicker } from '../../../components/atoms/FilePicker'
import { Image } from 'lucide-react'

export const CreateNewsModal = () => {
  return (
    <Dialog.Content>
      <Flex direction="column" gap="2">
        <form onSubmit={() => {}}>
          <Flex direction="column" gap="4">
            <Dialog.Title>Create New News</Dialog.Title>
            <FilePicker as="label">
              <Image color="orange" size={30} />
              <input
                type="file"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={(e) => {}}
              />
            </FilePicker>
            <Flex direction="column" gap="2">
              <Flex direction="column">
                <Text>Short Description</Text>
                <TextArea name="shortDesc" placeholder="Detailed Description" />
              </Flex>
              <Flex direction="column">
                <Text>Long Description</Text>
                <TextArea name="shortDesc" placeholder="Detailed Description" />
              </Flex>
            </Flex>
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
  )
}
