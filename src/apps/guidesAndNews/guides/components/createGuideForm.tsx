import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { FilePicker } from '../../../../components/atoms/FilePicker'
import { Flex, Text, TextArea } from '@radix-ui/themes'
import { Image } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import {
  Guide,
  GuideTranslation,
} from '../../../../services/routes/guidesAndNews/guidesAndNews.type'
import { Button } from '../../../../components/atoms/button'

interface Props {
  index: number
  control: Control<Guide>
  guideTranslation: GuideTranslation
  getValues: UseFormGetValues<Guide>
  setValue: UseFormSetValue<Guide>
  watch: UseFormWatch<Guide>
  isOriginal: boolean
}

export const CreateGuideForm: FC<Props> = ({
  index,
  control,
  guideTranslation,
  getValues,
  watch,
  setValue,
  isOriginal,
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(getValues().imageUrl)

  useEffect(() => {
    const subscription = watch((value) => {
      setImagePreviewUrl(value.imageUrl || '')
    })
    return () => subscription.unsubscribe()
  }, [watch, setImagePreviewUrl])

  const validation = {
    image: {
      required: 'Image is required',
    },
    title: {
      required: 'Title is required',
    },
    subtitle: {
      required: 'Subtitle is required',
    },
    shortDesc: {
      required: 'Short Description is required',
    },
    longDesc: {
      required: 'Long Description is required',
    },
  }

  const truncateName = (name: string, length = 10) => {
    const maxLength = length
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name
  }

  return (
    <>
      {isOriginal && (
        <Controller
          control={control}
          name="image"
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

                  <Button
                    color="orange"
                    onClick={(e) => {
                      e.preventDefault()
                      onChange(undefined)
                    }}
                  >
                    Remove
                  </Button>
                </Flex>
              ) : (
                <>
                  {imagePreviewUrl ? (
                    <Flex
                      gap="2"
                      direction="column"
                      justify="center"
                      align="center"
                      position={'relative'}
                    >
                      <img
                        src={imagePreviewUrl}
                        alt="Current Upload"
                        style={{ width: '100px', height: '100px' }}
                      />
                      <div style={{ position: 'absolute' }}>
                        <Button
                          color="orange"
                          onClick={() => {
                            setValue('imageUrl', '')
                            setImagePreviewUrl('')
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </Flex>
                  ) : (
                    <>
                      <Image color="orange" size={30} />
                      <input
                        type="file"
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={(e) => {
                          e.target.files && onChange(e.target.files[0])
                        }}
                      />
                    </>
                  )}
                </>
              )}
            </FilePicker>
          )}
        />
      )}
      <Flex direction="column" gap="2">
        <Flex direction="column">
          <Text>Title</Text>
          <Controller
            control={control}
            defaultValue={guideTranslation.title}
            rules={validation['title']}
            name={`translations.${index}.title`}
            render={({ field: { onChange, value } }) => (
              <TextArea value={value} onChange={onChange} />
            )}
          />
        </Flex>
        <Flex direction="column">
          <Text>Subtitle</Text>
          <Controller
            control={control}
            defaultValue={guideTranslation.subtitle}
            rules={validation['subtitle']}
            name={`translations.${index}.subtitle`}
            render={({ field: { onChange, value } }) => (
              <TextArea value={value} onChange={onChange} />
            )}
          />
        </Flex>
        <Flex direction="column">
          <Text>Short Description</Text>
          <Controller
            control={control}
            defaultValue={guideTranslation.shortDesc}
            rules={validation['shortDesc']}
            name={`translations.${index}.shortDesc`}
            render={({ field: { onChange, value } }) => (
              <TextArea value={value} onChange={onChange} />
            )}
          />
        </Flex>
        <Flex direction="column">
          <Text>Long Description</Text>
          <Controller
            control={control}
            defaultValue={guideTranslation.longDesc}
            name={`translations.${index}.longDesc`}
            render={({ field: { onChange, value } }) => (
              <TextArea value={value} onChange={onChange} />
            )}
          />
        </Flex>
      </Flex>
    </>
  )
}
