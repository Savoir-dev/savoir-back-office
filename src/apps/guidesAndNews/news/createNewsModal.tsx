import { FC } from "react";

import { useMutation, useQueryClient } from "react-query";
import { postNews } from "../../../services/routes/guidesAndNews/guidesAndNews.services";

import { Controller, useForm, SubmitHandler } from "react-hook-form";

import { FilePicker } from "../../../components/atoms/FilePicker";
import { Button, Dialog, Flex, Text, TextArea } from "@radix-ui/themes";
import { Image } from "lucide-react";

import {
  Guide,
  NewsPost,
} from "../../../services/routes/guidesAndNews/guidesAndNews.type";
interface Props {
  close: () => void;
}

export const CreateNewsModal: FC<Props> = ({ close }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (news: NewsPost) => {
      return postNews(news);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["news"],
      });
      close();
    },
  });

  const { control, handleSubmit } = useForm<Guide>({
    defaultValues: {
      image: "",
      shortDesc: "",
      longDesc: "",
    },
  });

  const validation = {
    image: {
      required: "Image is required",
    },
    shortDesc: {
      required: "Short Description is required",
    },
    longDesc: {
      required: "Long Description is required",
    },
  };

  const onSubmit: SubmitHandler<Guide> = (data) => {
    mutate(data);
  };

  const truncateName = (name: string, length = 10) => {
    const maxLength = length;
    return name.length > maxLength
      ? `${name.substring(0, maxLength)}...`
      : name;
  };

  return (
    <Dialog.Content>
      <Flex direction="column" gap="2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="4">
            <Dialog.Title>Create new news</Dialog.Title>
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
                  rules={validation["shortDesc"]}
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
  );
};
