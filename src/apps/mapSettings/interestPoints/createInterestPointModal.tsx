import {
  Badge,
  Dialog,
  Flex,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Image, Mic, Plus, X } from "lucide-react";
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from "react-hook-form";

import { space } from "../../../styles/const";
import { postInterestPoint } from "../../../services/interestPoints/interestPoints.services";
import { InterestPoint } from "../../../services/types/interestPoints/interestPoints.type";
import { Button } from "../../../components/atoms/button";

interface Props {
  close: () => void;
}

const formKey = "interestPointFormState";

export const CreateInterestPointModal = ({ close }: Props) => {
  const [newTag, setNewTag] = useState("");

  const truncateName = (name: string, length = 10) => {
    const maxLength = length;
    return name.length > maxLength
      ? `${name.substring(0, maxLength)}...`
      : name;
  };

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      type: "",
      image: null,
      audio: null,
      title: "",
      subtitle: "",
      shortDesc: "",
      longDesc: "",
      duration: "",
      information: "",
      guide: "",
      color: "",
      tags: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: InterestPoint) => {
      return postInterestPoint(data);
    },
    onSuccess: () => {
      localStorage.removeItem(formKey);
      queryClient.invalidateQueries({
        queryKey: ["interestPoints"],
      });
      close();
    },
  });

  const onSubmit: SubmitHandler<InterestPoint> = (data) => {
    mutate(data);
  };

  const validation = {
    title: {
      required: "Title is required",
      maxLength: {
        value: 20,
        message: "Title is too long",
      },
    },
    subtitle: {
      required: "Subtitle is required",
      maxLength: {
        value: 20,
        message: "Subtitle is too long",
      },
    },
  };

  const handleAddTag = () => {
    if (newTag) {
      append({ tag: newTag });
      setNewTag("");
    }
  };

  useEffect(() => {
    const savedFormState = localStorage.getItem(formKey);
    if (savedFormState) {
      reset({ ...JSON.parse(savedFormState), image: null });
    }
  }, [reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value.type);
      localStorage.setItem(formKey, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Dialog.Content onPointerDownOutside={close}>
      <Dialog.Title>Create a new interest point</Dialog.Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex style={{ marginBottom: space[2] }} direction="column" gap="2">
          <Text size="2" weight="bold">
            Select photo and audio
          </Text>

          <Flex gap="2">
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
                      <Button color="orange" onClick={() => onChange(null)}>
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
                        onChange={(e) => onChange(e.target.files[0])}
                      />
                    </>
                  )}
                </FilePicker>
              )}
            />

            <Controller
              control={control}
              name="audio"
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
                        style={{ display: "none" }}
                        accept="audio/*"
                        onChange={(e) => onChange(e.target.files[0])}
                      />
                    </>
                  )}
                </FilePicker>
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
              rules={validation["title"]}
              control={control}
              name="type"
              render={({ field: { value, onChange } }) => (
                <Select.Root value={value} onValueChange={onChange}>
                  {" "}
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Item value="whatIsThis">What is this ?</Select.Item>
                    <Select.Item value="walkingTour">Walking tour</Select.Item>
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
              name="guide"
              render={({ field: { onChange, value } }) => (
                <TextField.Root value={value} onChange={onChange} />
              )}
            />
          </Flex>
        </Flex>
        <Flex style={{ marginTop: space[4] }} justify="end" gap="2">
          <Button variant="outline" onClick={close}>
            Close
          </Button>
          <Button color="orange">Create</Button>
        </Flex>
      </form>
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
