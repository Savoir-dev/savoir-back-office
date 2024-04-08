import {
  Badge,
  Dialog,
  Flex,
  Select,
  Tabs,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import styled from "styled-components";
import { useEffect, useState, FC } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Image, Mic, Plus, X } from "lucide-react";
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from "react-hook-form";

import { space } from "../../../styles/const";
import {
  postInterestPoint,
  putInterestPoint,
} from "../../../services/interestPoints/interestPoints.services";
import {
  InterestPoint,
  InterestPointFromApi,
} from "../../../services/types/interestPoints.type";
import { Button } from "../../../components/atoms/button";
import { MapSelector } from "../../generalSettings/mapSelector";

const formKey = "interestPointFormState";

const convertToFormInterestPoint = (
  ip: InterestPointFromApi
): InterestPoint => ({
  ...ip,
  latitude: ip.latitude.toString(),
  longitude: ip.longitude.toString(),
  image: undefined,
  audio: undefined,
  tags: ip.tags.map((tag) => ({ tag })),
});

interface InterestPointForm {
  isEditing?: boolean;
  interestPoint?: InterestPointFromApi;
  close: () => void;
}

export const CreateInterestPointModal: FC<InterestPointForm> = ({
  isEditing,
  interestPoint,
  close,
}) => {
  const [newTag, setNewTag] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 41.38879,
    lng: 2.15899,
  });
  const [language, setLanguage] = useState("french");

  const truncateName = (name: string, length = 10) => {
    const maxLength = length;
    return name.length > maxLength
      ? `${name.substring(0, maxLength)}...`
      : name;
  };

  const { control, handleSubmit, reset, watch } = useForm<InterestPoint>({
    defaultValues: interestPoint
      ? convertToFormInterestPoint(interestPoint)
      : {
          type: "",
          image: undefined,
          audio: undefined,
          title: "",
          subtitle: "",
          shortDesc: "",
          longDesc: "",
          duration: "",
          information: "",
          guide: "",
          color: "orange",
          latitude: "",
          longitude: "",
          audioDesc: "",
          tags: [],
        },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: InterestPoint) => {
      return isEditing ? putInterestPoint(data) : postInterestPoint(data);
    },
    onSuccess: () => {
      sessionStorage.removeItem(formKey);

      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes("interestPoints") ||
          query.queryKey.includes("interestPointsByWalkingTour"),
      });

      close();
    },
  });

  const onSubmit: SubmitHandler<InterestPoint> = (data) => {
    const adjustedData = {
      ...data,
      latitude: location.lat.toString(),
      longitude: location.lng.toString(),
    };
    mutate(adjustedData);
  };

  const validation = {
    title: {
      required: "Title is required",
    },
    subtitle: {
      required: "Subtitle is required",
    },
    type: {
      required: "Type is required",
    },
    image: {
      required: "Image is required",
    },
    audio: {
      required: "Audio is required",
    },
    shortDesc: {
      required: "Short description is required",
    },
    longDesc: {
      required: "Long description is required",
    },
    duration: {
      required: "Duration is required",
    },
    information: {
      required: "Information is required",
    },
    guide: {
      required: "Guide is required",
    },
  };

  const handleAddTag = () => {
    if (newTag) {
      append({ tag: newTag });
      setNewTag("");
    }
  };

  useEffect(() => {
    const savedFormState = sessionStorage.getItem(formKey);
    if (savedFormState) {
      reset({ ...JSON.parse(savedFormState), image: null });
    }
  }, [reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      sessionStorage.setItem(formKey, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Dialog.Content onPointerDownOutside={close} maxWidth={"1200px"}>
      <Dialog.Title>
        {isEditing ? "Edit" : "Create"} a new interest point
      </Dialog.Title>
      <Tabs.Root defaultValue="french">
        <Tabs.List color="orange" style={{ marginBottom: space[2] }}>
          <Tabs.Trigger value="french" onClick={() => setLanguage("french")}>
            French 🇫🇷
          </Tabs.Trigger>
          <Tabs.Trigger value="english" onClick={() => setLanguage("english")}>
            English 🇬🇧
          </Tabs.Trigger>
          <Tabs.Trigger value="spanish" onClick={() => setLanguage("english")}>
            Spanish 🇪🇸
          </Tabs.Trigger>
        </Tabs.List>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex justify="between">
            <Flex direction="column">
              <Flex
                style={{ marginBottom: space[2] }}
                direction="column"
                gap="2"
              >
                <Text size="2" weight="bold">
                  Select photo and audio
                </Text>

                <Flex gap="2">
                  <Controller
                    control={control}
                    name="image"
                    rules={validation["image"]}
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
                              onClick={() => onChange(null)}
                            >
                              Remove
                            </Button>
                          </Flex>
                        ) : (
                          <>
                            <Image color="orange" size={30} />
                            <input
                              type="file"
                              style={{ display: "none" }}
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
                  <Controller
                    control={control}
                    name="audio"
                    rules={validation["audio"]}
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
                              onClick={() => onChange(null)}
                            >
                              Remove
                            </Button>
                          </Flex>
                        ) : (
                          <>
                            <Mic color="orange" size={30} />
                            <input
                              type="file"
                              style={{ display: "none" }}
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
                <Flex width="100%" direction="column">
                  <Text size="2" weight="bold">
                    Audio description
                  </Text>
                  <Controller
                    control={control}
                    name="audioDesc"
                    render={({ field: { onChange, value } }) => (
                      <TextArea
                        style={{ width: "100%" }}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Flex>
              </Flex>
              <Flex direction="column" gap="2">
                <Flex direction="column">
                  <Text size="2" weight="bold">
                    Type
                  </Text>
                  <Controller
                    rules={validation["type"]}
                    control={control}
                    name="type"
                    render={({ field: { value, onChange } }) => (
                      <Select.Root value={value} onValueChange={onChange}>
                        {" "}
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

                <Flex gap="2">
                  <Flex direction="column">
                    <Text size="2" weight="bold">
                      Title
                    </Text>
                    <Controller
                      rules={validation["title"]}
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
                      rules={validation["subtitle"]}
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
                  <Flex direction="column">
                    <Text size="2" weight="bold">
                      Duration
                    </Text>
                    <Controller
                      control={control}
                      rules={validation["duration"]}
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
                </Flex>
                <Flex gap="2">
                  <Flex width="50%" direction="column">
                    <Text size="2" weight="bold">
                      Short description
                    </Text>
                    <Controller
                      control={control}
                      rules={validation["shortDesc"]}
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
                        e.preventDefault();
                        setNewTag(e.target.value);
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
                          style={{ cursor: "pointer" }}
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
                      rules={validation["information"]}
                      name="information"
                      render={({ field: { onChange, value } }) => (
                        <TextField.Root value={value} onChange={onChange} />
                      )}
                    />
                  </Flex>
                </Flex>
                <Flex direction="column">
                  <Text size="2" weight="bold">
                    Guide
                  </Text>
                  <Controller
                    control={control}
                    rules={validation["guide"]}
                    name="guide"
                    render={({ field: { onChange, value } }) => (
                      <TextField.Root value={value} onChange={onChange} />
                    )}
                  />
                </Flex>
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
                  console.log("test");
                  setLocation({ lat: lat, lng: lng });
                }}
              />
              <Flex direction="row" gap="2">
                <Flex direction="column">
                  <Text size="2" weight="bold">
                    Latitude
                  </Text>
                  <Controller
                    control={control}
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
                    control={control}
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
          <Flex style={{ marginTop: space[4] }} justify="end" gap="2">
            <Button variant="outline" onClick={close}>
              Close
            </Button>
            <Button color="orange" loading={isLoading} disabled={isLoading}>
              {isEditing ? "Edit" : "Create"}
            </Button>
          </Flex>
        </form>
      </Tabs.Root>
    </Dialog.Content>
  );
};

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
`;
