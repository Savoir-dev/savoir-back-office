import { Control, Controller } from 'react-hook-form'
import { FilePicker } from '../../../../components/atoms/FilePicker'
import { Button, Flex, Text, TextArea } from '@radix-ui/themes'
import { Image } from 'lucide-react'
import { FC } from 'react'
import {
  News,
  NewsTranslation,
} from '../../../../services/routes/guidesAndNews/guidesAndNews.type'

interface Props {
  index: number
  control: Control<News>
  newsTranslation: NewsTranslation
}

export const CreateNewsForm: FC<Props> = ({
  index,
  control,
  newsTranslation,
}) => {
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
      <Controller
        control={control}
        name="image"
        rules={validation['image']}
        render={({ field: { onChange, value } }) => (
          <FilePicker as="label">
            {value && value instanceof File ? (
              <Flex gap="2" direction="column" justify="center" align="center">
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
          <Text>Title</Text>
          <Controller
            control={control}
            defaultValue={newsTranslation.title}
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
            defaultValue={newsTranslation.subtitle}
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
            defaultValue={newsTranslation.shortDesc}
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
            defaultValue={newsTranslation.longDesc}
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
