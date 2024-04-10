import { FC } from 'react'

import { useMutation, useQueryClient } from 'react-query'
import {
  postGuide,
  putGuide,
} from '../../../services/guidesAndNews/guidesAndNews.services'

import { Controller, useForm, SubmitHandler } from 'react-hook-form'

import { FilePicker } from '../../../components/atoms/FilePicker'
import { Button, Dialog, Flex, Text, TextArea } from '@radix-ui/themes'
import { Image } from 'lucide-react'

import { Guide } from '../../../services/guidesAndNews/guidesAndNews.type'
interface Props {
  close: () => void
  isEditing?: boolean
  guide?: Guide
}

export const CreateGuideModal: FC<Props> = ({ close, guide }) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (newGuide: Guide) => {
      return guide ? putGuide(newGuide) : postGuide(newGuide)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['guides'],
      })
      close()
    },
  })

  const { control, handleSubmit } = useForm<Guide>({
    defaultValues: {
      image: '',
      shortDesc: guide?.shortDesc || '',
      longDesc: guide?.longDesc || '',
    },
  })

  const validation = {
    image: {
      required: 'Image is required',
    },
    shortDesc: {
      required: 'Short Description is required',
    },
    longDesc: {
      required: 'Long Description is required',
    },
  }

  const onSubmit: SubmitHandler<Guide> = (data) => {
    const adjustedData = {
      ...data,
      uid: guide?.uid || '',
    }

    mutate(adjustedData)
  }

  const truncateName = (name: string, length = 10) => {
    const maxLength = length
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name
  }

  return (
    <Dialog.Content onPointerDownOutside={close}>
      <Flex direction="column" gap="2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="4">
            <Dialog.Title>Create new Guide</Dialog.Title>
            <Controller
              control={control}
              name="image"
              rules={validation['image']}
              render={({ field: { onChange, value } }) => (
                <FilePicker as="label">
                  {value ? (
                    <Flex
                      gap="2"
                      direction="column"
                      justify="center"
                      align="center"
                    >
                      <Text size="2" weight="bold">
                        {truncateName(value.name)}
                      </Text>
                      <Button color="orange" onClick={() => onChange(null)}>
                        Remove
                      </Button>
                    </Flex>
                  ) : (
                    <>
                      <Image color="orange" size={30} />
                      <input
                        type="file"
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={(e) =>
                          e.target.files && onChange(e.target.files[0])
                        }
                      />
                    </>
                  )}
                </FilePicker>
              )}
            />
            <Flex direction="column" gap="2">
              <Flex direction="column">
                <Text>Short Description</Text>
                <Controller
                  control={control}
                  rules={validation['shortDesc']}
                  name="shortDesc"
                  render={({ field: { onChange, value } }) => (
                    <TextArea value={value} onChange={onChange} />
                  )}
                />
              </Flex>
              <Flex direction="column">
                <Text>Long Description</Text>
                <Controller
                  control={control}
                  name="longDesc"
                  render={({ field: { onChange, value } }) => (
                    <TextArea value={value} onChange={onChange} />
                  )}
                />
              </Flex>
            </Flex>
            <Flex justify="end" gap="2">
              <Dialog.Close>
                <Button variant="outline" onClick={close}>
                  Cancel
                </Button>
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
