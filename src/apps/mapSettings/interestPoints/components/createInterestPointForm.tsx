import {
  Badge,
  Button,
  Flex,
  Select,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Control, Controller, useFieldArray, useForm } from 'react-hook-form'
import { FilePicker } from '../../../../components/atoms/FilePicker'
import { Image, Mic, Plus, X } from 'lucide-react'
import { space } from '../../../../styles/const'
import { MapSelector } from '../../../generalSettings/mapSelector'
import {
  InterestPoint,
  InterestPointTranslation,
} from '../../../../services/types/interestPoints.type'

interface Props {
  location: { lat: number; lng: number }
  setLocation: Dispatch<SetStateAction<{ lat: number; lng: number }>>
  controlMainSettings: Control<InterestPoint>
  isOriginal?: boolean
  handleSubmit: (local: string, data: InterestPointTranslation) => void
  local: string
  interestPointTranslation: InterestPointTranslation
}

export const CreateInterestPointForm: FC<Props> = ({
  location,
  setLocation,
  controlMainSettings,
  isOriginal = true,
  handleSubmit,
  local,
  interestPointTranslation,
}) => {
  const [newTag, setNewTag] = useState('')

  const truncateName = (name: string, length = 10) => {
    const maxLength = length
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name
  }

  const { control, watch } = useForm<InterestPointTranslation>({
    defaultValues: {
      title: interestPointTranslation.title,
      subtitle: interestPointTranslation.subtitle,
      audio: interestPointTranslation.audio,
      audioDesc: interestPointTranslation.audioDesc,
      shortDesc: interestPointTranslation.shortDesc,
      longDesc: interestPointTranslation.longDesc,
      information: interestPointTranslation.information,
      tags: interestPointTranslation.tags,
    },
  })

  useEffect(() => {
    const interestPointTranslation = watch()
    handleSubmit(local, interestPointTranslation)
  }, [watch()])

  const validation = {
    title: {
      required: 'Title is required',
    },
    subtitle: {
      required: 'Subtitle is required',
    },
    type: {
      required: 'Type is required',
    },
    image: {
      required: 'Image is required',
    },
    audio: {
      required: 'Audio is required',
    },
    shortDesc: {
      required: 'Short description is required',
    },
    longDesc: {
      required: 'Long description is required',
    },
    duration: {
      required: 'Duration is required',
    },
    information: {
      required: 'Information is required',
    },
    guide: {
      required: 'Guide is required',
    },
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const handleAddTag = () => {
    if (newTag) {
      append({ tag: newTag })
      setNewTag('')
    }
  }

  return (
    <Flex justify="between">
      <Flex direction="column">
        <Flex style={{ marginBottom: space[2] }} direction="column" gap="2">
          <Text size="2" weight="bold">
            Select photo and audio
          </Text>

          <Flex gap="2">
            {isOriginal && (
              <Controller
                control={controlMainSettings}
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
            )}
            <Controller
              control={control}
              name="audio"
              rules={validation['audio']}
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
                      <Mic color="orange" size={30} />
                      <input
                        type="file"
                        style={{ display: 'none' }}
                        accept="audio/*"
                        onChange={(e) =>
                          e.target.files && onChange(e.target.files[0])
                        }
                      />
                    </>
                  )}
                </FilePicker>
              )}
            />
          </Flex>
          {isOriginal && (
            <Flex direction="column">
              <Text size="2" weight="bold">
                Color
              </Text>
              <Controller
                control={controlMainSettings}
                name="color"
                render={({ field: { onChange, value } }) => (
                  <input type="color" value={value} onChange={onChange} />
                )}
              />
            </Flex>
          )}
          <Flex width="100%" direction="column">
            <Text size="2" weight="bold">
              Audio description
            </Text>
            <Controller
              control={control}
              name="audioDesc"
              render={({ field: { onChange, value } }) => (
                <TextArea
                  style={{ width: '100%' }}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Flex>
        </Flex>
        <Flex direction="column" gap="2">
          {isOriginal && (
            <Flex direction="column">
              <Text size="2" weight="bold">
                Type
              </Text>
              <Controller
                rules={validation['type']}
                control={controlMainSettings}
                name="type"
                render={({ field: { value, onChange } }) => (
                  <Select.Root value={value} onValueChange={onChange}>
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Item value="whatIsThis">
                        What is this ?
                      </Select.Item>
                      <Select.Item value="walkingTour">
                        Walking tour
                      </Select.Item>
                    </Select.Content>
                  </Select.Root>
                )}
              />
            </Flex>
          )}

          <Flex gap="2">
            <Flex direction="column">
              <Text size="2" weight="bold">
                Title
              </Text>
              <Controller
                rules={validation['title']}
                control={control}
                name="title"
                render={({ field: { onChange, value } }) => (
                  <TextField.Root
                    placeholder="Sagrada familia..."
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Flex>
            <Flex direction="column">
              <Text size="2" weight="bold">
                subtitle
              </Text>
              <Controller
                rules={validation['subtitle']}
                control={control}
                name="subtitle"
                render={({ field: { onChange, value } }) => (
                  <TextField.Root
                    placeholder="A beautiful church..."
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Flex>
            {isOriginal && (
              <Flex direction="column">
                <Text size="2" weight="bold">
                  Duration
                </Text>
                <Controller
                  control={controlMainSettings}
                  rules={validation['duration']}
                  name="duration"
                  render={({ field: { onChange, value } }) => (
                    <TextField.Root
                      placeholder="2 hours..."
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Flex>
            )}
          </Flex>
          <Flex gap="2">
            <Flex width="50%" direction="column">
              <Text size="2" weight="bold">
                Short description
              </Text>
              <Controller
                control={control}
                rules={validation['shortDesc']}
                name="shortDesc"
                render={({ field: { onChange, value } }) => (
                  <TextArea value={value} onChange={onChange} />
                )}
              />
            </Flex>
            <Flex width="50%" direction="column">
              <Text size="2" weight="bold">
                Long description
              </Text>
              <Controller
                control={control}
                name="longDesc"
                render={({ field: { onChange, value } }) => (
                  <TextArea value={value} onChange={onChange} />
                )}
              />
            </Flex>
          </Flex>
          <Flex direction="column">
            <Text size="2" weight="bold">
              Tags
            </Text>

            <Flex gap="2">
              <TextField.Root
                value={newTag}
                placeholder="Food..."
                onChange={(e) => {
                  e.preventDefault()
                  setNewTag(e.target.value)
                }}
              />
              <Button color="orange" onClick={handleAddTag}>
                <Plus />
              </Button>
            </Flex>
            <Flex
              style={{ marginTop: space[2], marginBottom: space[2] }}
              gap="2"
            >
              {fields.map((field, index) => (
                <Badge size="3" color="orange" key={index}>
                  {field.tag}
                  <X
                    onClick={() => remove(index)}
                    size={10}
                    style={{ cursor: 'pointer' }}
                  />
                </Badge>
              ))}
            </Flex>

            <Flex direction="column">
              <Text size="2" weight="bold">
                Informations
              </Text>
              <Controller
                control={control}
                rules={validation['information']}
                name="information"
                render={({ field: { onChange, value } }) => (
                  <TextField.Root value={value} onChange={onChange} />
                )}
              />
            </Flex>
          </Flex>
          {isOriginal && (
            <Flex direction="column">
              <Text size="2" weight="bold">
                Guide
              </Text>
              <Controller
                control={controlMainSettings}
                rules={validation['guide']}
                name="guide"
                render={({ field: { onChange, value } }) => (
                  <TextField.Root value={value} onChange={onChange} />
                )}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
      <Flex direction="column" width="45%">
        <MapSelector
          size={400}
          location={{
            lat: location.lat || 41.38879,
            lng: location.lng || 2.15899,
          }}
          setLocation={({ lat, lng }) => {
            setLocation({ lat: lat, lng: lng })
          }}
        />
        <Flex direction="row" gap="2">
          <Flex direction="column">
            <Text size="2" weight="bold">
              Latitude
            </Text>
            <Controller
              control={controlMainSettings}
              name="latitude"
              render={({ field }) => (
                <TextField.Root
                  placeholder="Latitude"
                  value={location.lat}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </Flex>
          <Flex direction="column">
            <Text size="2" weight="bold">
              Longitude
            </Text>
            <Controller
              control={controlMainSettings}
              name="longitude"
              render={({ field }) => (
                <TextField.Root
                  placeholder="Longitude"
                  value={location.lng}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
