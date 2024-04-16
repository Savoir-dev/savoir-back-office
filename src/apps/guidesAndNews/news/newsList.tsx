import { Button, Card, Dialog, Flex, Grid, Text } from "@radix-ui/themes";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useQuery } from "react-query";

import { space } from "../../../styles/const";
import { getNews } from "../../../services/routes/guidesAndNews/guidesAndNews.services";
import { News } from "../../../services/routes/guidesAndNews/guidesAndNews.type";
import { CreateNewsModal } from "./createNewsModal";

export const NewsList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { data: newsData } = useQuery({
    queryKey: ["news"],
    queryFn: () => {
      return getNews();
    },
    select: (data): AxiosResponse<News[]> => data.data,
  });

  const news = newsData?.data || [];

  const onCloseModal = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog.Root open={isDialogOpen}>
      <Grid
        columns="3"
        gap="3"
        width="auto"
        style={{
          marginTop: space[3],
        }}
      >
        {news.map((item, index) => (
          <Card key={index}>
            <Flex
              gap="2"
              position="absolute"
              style={{ zIndex: 1, top: space[5], left: space[5] }}
            >
              <Button
                size="1"
                color="red"
                onClick={() => setIsDialogOpen(true)}
              >
                <Trash size={16} />
              </Button>

              <Button
                size="1"
                color="orange"
                onClick={() => {
                  setIsEditing(true);
                  setIsDialogOpen(true);
                }}
              >
                Edit
              </Button>
            </Flex>
            <Flex direction="column" gap="2">
              <img
                src={item.image}
                alt="interest point image"
                style={{
                  objectFit: "cover",
                  width: "200px",
                  borderRadius: space[1],
                }}
              />
              <Flex direction="column">
                <Flex direction="column">
                  <Text size="3" weight="bold">
                    Short description
                  </Text>
                  <Text>{item.shortDesc}</Text>
                </Flex>
                <Flex direction="column">
                  <Text size="3" weight="bold">
                    Long description
                  </Text>
                  <Text>{item.longDesc}</Text>
                </Flex>
              </Flex>
            </Flex>
            {isDialogOpen && isEditing ? (
              <CreateNewsModal close={onCloseModal} newsUid={item.uid} />
            ) : (
              <Dialog.Content></Dialog.Content>
            )}
          </Card>
        ))}
      </Grid>
    </Dialog.Root>
  );
};
