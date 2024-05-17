import { AspectRatio, Badge, Card, Dialog, Flex, Text } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "react-query";
import AudioPlayer from "react-h5-audio-player";
import styled from "styled-components";
import { MapPin } from "lucide-react";
import { useState, FC } from "react";

import { InterestPoint } from "../../../../services/types/interestPoints.type";
import { space } from "../../../../styles/const";
import { CreateInterestPointModal } from "../createInterestPointModal";
import { deleteInterestPointByInterestPointId } from "../../../../services/routes/interestPoints/interestPoints.services";
import { Button } from "../../../../components/atoms/button";

interface InterestPointCardProps {
  interestPoint: InterestPoint;
}
export const InterestPointCard: FC<InterestPointCardProps> = ({
  interestPoint,
}) => {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onCloseDialog = () => {
    setIsEditing(false);
    setIsDialogOpen(false);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (uid: string) => {
      return deleteInterestPointByInterestPointId(uid);
    },
    onSuccess: () => {
      setIsDialogOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["interestPoints"],
      });
    },
  });

  const deleteInterestPoint = (uid: string) => {
    mutate(uid);
  };

  return (
    <Dialog.Root open={isDialogOpen}>
      <Card key={interestPoint.translations[0].title}>
        <Flex
          gap="2"
          position="absolute"
          style={{ zIndex: 1, top: space[5], left: space[5] }}
        >
          {!interestPoint.isLinkedToItinerary && (
            <Button size="1" color="red" onClick={() => setIsDialogOpen(true)}>
              <Text>Delete</Text>
            </Button>
          )}
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
        <AspectRatio ratio={14 / 7}>
          <img
            src={interestPoint.imageUrl}
            alt="interest point image"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: space[1],
            }}
          />
        </AspectRatio>
        <Flex style={{ marginTop: space[2] }} direction="column" gap="1">
          <Flex align="center" gap="1">
            <MapPin color={interestPoint.color} size={16} />
            <Text size="4" weight="bold">
              {interestPoint.translations[0].title}
            </Text>
          </Flex>
          <Text>
            {interestPoint.latitude}, {interestPoint.longitude}
          </Text>
          <Text size="2" weight="bold">
            {interestPoint.translations[0].subtitle}
          </Text>
          <Text size="2" style={{ textDecoration: "underline" }}>
            {interestPoint.type}
          </Text>
          <Text size="2">{interestPoint.translations[0].shortDesc}</Text>
          <Flex gap="1">
            {interestPoint.translations[0].tags.map((tag, index) => (
              <Badge color="orange" key={index}>
                {tag}
              </Badge>
            ))}
          </Flex>
          <CustomAudioStyled src={interestPoint.translations[0].audioUrl} />
          <Text size="2">By {interestPoint.guide}</Text>
        </Flex>
      </Card>
      {isDialogOpen && isEditing ? (
        <CreateInterestPointModal
          isEditing={isEditing}
          interestPoint={interestPoint}
          close={onCloseDialog}
        />
      ) : (
        <Dialog.Content onPointerDownOutside={onCloseDialog}>
          <Dialog.Title>Delete interest point</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete this interest point?
          </Dialog.Description>
          <Card style={{ margin: `${space[4]} 0` }}>
            <Flex justify="between">
              <Flex direction="column">
                <Text size="3" weight="bold">
                  Title
                </Text>
                <Text size="3">{interestPoint.translations[0].title}</Text>
              </Flex>
            </Flex>
          </Card>
          <Flex gap="2" justify="end" align="center">
            <Button
              loading={isLoading}
              disabled={isLoading}
              color="red"
              onClick={() => deleteInterestPoint(interestPoint.uid)}
            >
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={onCloseDialog}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </Flex>
        </Dialog.Content>
      )}
    </Dialog.Root>
  );
};

const CustomAudioStyled = styled(AudioPlayer)`
  box-shadow: none;
`;
