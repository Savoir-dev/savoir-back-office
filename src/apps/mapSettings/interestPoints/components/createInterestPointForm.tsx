import {
  Flex,
  Select,
  Text,
  TextArea,
  TextField,
  Badge,
} from '@radix-ui/themes'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { FilePicker } from '../../../../components/atoms/FilePicker'
import { Image, Mic, Plus, X } from 'lucide-react'
import { space } from '../../../../styles/const'
import { MapSelector } from '../../../generalSettings/mapSelector'
import {
  InterestPoint,
  InterestPointTranslation,
} from '../../../../services/types/interestPoints.type'
import { Button } from '../../../../components/atoms/button'

interface Props {
  location: { lat: string; lng: string }
  control: Control<InterestPoint>
  index: number
  interestPointTranslation: InterestPointTranslation
  isOriginal?: boolean
  setLocation: Dispatch<SetStateAction<{ lat: string; lng: string }>>
  getValues: UseFormGetValues<InterestPoint>
  setValue: UseFormSetValue<InterestPoint>
  watch: UseFormWatch<InterestPoint>
  isLinkedToItinerary: boolean | undefined
}

export const CreateInterestPointForm: FC<Props> = ({
  location,
  control,
  index,
  interestPointTranslation,
  isOriginal = true,
  setLocation,
  getValues,
  setValue,
  watch,
  isLinkedToItinerary,
}) => {
  const [tags, setTags] = useState<string[]>([])
  const [imagePreviewUrl, setImagePreviewUrl] = useState(getValues().imageUrl)
  const [audioPreviewUrl, setAudioPreviewUrl] = useState(
    getValues().translations[index].audioUrl,
  )
  const [newTag, setNewTag] = useState('')

  const truncateName = (name: string, length = 10) => {
    const maxLength = length
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name
  }

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

  const handleAddTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (newTag === '') return

    const updatedTags = [...tags, newTag]

    setValue(`translations.${index}.tags`, updatedTags)
    setTags(updatedTags)
    setNewTag('')
  }

  const handleRemoveTag = (tagIndex: number) => {
    const updatedTags = tags.filter((_, index) => index !== tagIndex)
    setTags(updatedTags)

    setValue(`translations.${index}.tags`, updatedTags)
  }

  useEffect(() => {
    const subscription = watch((value) => {
      setImagePreviewUrl(value.imageUrl || '')
      if (value.translations && value.translations[index])
        setAudioPreviewUrl(value.translations[index]?.audioUrl || '')
    })
    return () => subscription.unsubscribe()
  }, [watch, setImagePreviewUrl])

  useEffect(() => {
    const formData = getValues()
    if (formData && formData.translations && formData.translations[index]) {
      setTags(formData.translations[index].tags || [])
    }
  }, [getValues, index])

  return (
    <Flex justify="between">
      <Flex direction="column">
        <Flex style={{ marginBottom: space[2] }} direction="column" gap="2">
          <Text size="2" weight="bold">
            Select {index === 0 && 'photo and'} audio
          </Text>

          <Flex gap="2">
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
                          onClick={() => onChange(undefined)}
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
            <Controller
              control={control}
              name={`translations.${index}.audio`}
              render={({ field: { onChange, value, ref } }) => (
                <FilePicker as="label">
                  {value?.name ? (
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
                        onClick={() => {
                          onChange(null)
                          setAudioPreviewUrl('')
                        }}
                      >
                        Remove
                      </Button>
                    </Flex>
                  ) : (
                    <>
                      {audioPreviewUrl ? (
                        <Flex
                          gap="2"
                          direction="column"
                          justify="center"
                          align="center"
                          position={'relative'}
                        >
                          <audio
                            controls
                            src={audioPreviewUrl}
                            style={{ maxWidth: '200px' }}
                          ></audio>
                          <div style={{ position: 'absolute' }}>
                            <Button
                              color="orange"
                              onClick={() => {
                                setValue(`translations.${index}.audioUrl`, '')
                                setAudioPreviewUrl('')
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        </Flex>
                      ) : (
                        <>
                          <Mic color="orange" size={30} />
                          <input
                            type="file"
                            style={{ display: 'none' }}
                            accept="audio/*"
                            onChange={(e) => {
                              if (e.target.files) {
                                onChange(e.target.files[0])
                                setAudioPreviewUrl(
                                  URL.createObjectURL(e.target.files[0]),
                                )
                              }
                            }}
                            ref={ref}
                          />
                        </>
                      )}
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
                control={control}
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
              defaultValue={interestPointTranslation.audioDesc}
              control={control}
              name={`translations.${index}.audioDesc`}
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
          {isOriginal && !isLinkedToItinerary && (
            <Flex direction="column">
              <Text size="2" weight="bold">
                Type
              </Text>
              <Controller
                rules={validation['type']}
                control={control}
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
                name={`translations.${index}.title`}
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
                Subtitle
              </Text>
              <Controller
                rules={validation['subtitle']}
                control={control}
                name={`translations.${index}.subtitle`}
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
                  control={control}
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
                name={`translations.${index}.shortDesc`}
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
                name={`translations.${index}.longDesc`}
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
              {tags.map((tag, tagIndex) => (
                <Badge key={tagIndex}>
                  {tag}
                  <X
                    onClick={() => handleRemoveTag(tagIndex)}
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
                name={`translations.${index}.information`}
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
                control={control}
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
          isInputs
          size={400}
          location={{
            lat: location.lat || '',
            lng: location.lng || '',
          }}
          setLocation={({ lat, lng }) => {
            setLocation({ lat: lat, lng: lng })
          }}
          control={control}
        />
      </Flex>
    </Flex>
  )
}
