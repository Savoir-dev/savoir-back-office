import { useState } from "react";
import { Dialog, Flex, Grid, Text, TextField } from "@radix-ui/themes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AxiosResponse } from "axios";

import { InterestPointSelectableCard } from "../components/interestPointSelectableCard";
import { space } from "../../../styles/const";
import { InterestPointFromApi } from "../../../services/types/interestPoints.type";
import { PostItinerary } from "../../../services/types/itineraries.type";
import { Button } from "../../../components/atoms/button";
import { getInterestPointsByWalkingTour } from "../../../services/interestPoints/interestPoints.services";
import { postItinerary } from "../../../services/intineraries/itineraries.services";
interface Props {
  close: () => void;
  isTitleField?: boolean;
  preSelectedInterestPoints?: InterestPointFromApi[];
}

export const CreateItineraryModal = ({
  close,
  isTitleField,
  preSelectedInterestPoints = [],
}: Props) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedInterestPoints, setSelectedInterestPoints] = useState<
    InterestPointFromApi[]
  >(preSelectedInterestPoints);

  const queryClient = useQueryClient();

  const toggleInterestPointSelection = (
    interestPoint: InterestPointFromApi
  ) => {
    if (isInterestPointSelected(interestPoint)) {
      setSelectedInterestPoints(
        selectedInterestPoints.filter((point) => point !== interestPoint)
      );
    } else {
      setSelectedInterestPoints([...selectedInterestPoints, interestPoint]);
    }
  };

  const isInterestPointSelected = (
    interestPoint: InterestPointFromApi
  ): boolean => {
    return selectedInterestPoints.includes(interestPoint);
  };

  const { mutate } = useMutation({
    mutationFn: (data: PostItinerary) => {
      return postItinerary(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["itineraries"],
      });
      close();
    },
  });

  const { data: interestPointsData } = useQuery({
    queryKey: "interestPointsByWalkingTour",
    queryFn: () => getInterestPointsByWalkingTour(),
    select: (data): AxiosResponse<InterestPointFromApi[]> => data.data,
  });

  const handleSubmit = () => {
    mutate({
      name,
      duration,
      interestPoints: selectedInterestPoints,
    });
  };

  const interestPoints = interestPointsData?.data || [];

  return (
    <Dialog.Content onPointerDownOutside={close}>
      <Dialog.Title>Create a new itinerary</Dialog.Title>
      <Flex direction="column" gap="2">
        {isTitleField && (
          <Flex direction="column">
            <Text size="2" weight="bold">
              Title
            </Text>
            <TextField.Root
              placeholder="Title..."
              onChange={(e) => setName(e.target.value)}
            />
          </Flex>
        )}
        <Flex direction="column">
          <Text size="2" weight="bold">
            Duration
          </Text>
          <TextField.Root
            placeholder="2h30"
            onChange={(e) => setDuration(e.target.value)}
          />
        </Flex>
        <Text size="2" weight="bold">
          Interest points
        </Text>
        <Flex
          direction="column"
          style={{ overflowY: "auto", maxHeight: "500px" }}
        >
          <Grid
            columns="2"
            gap="2"
            width="auto"
            style={{ padding: space[2], position: "relative" }}
          >
            {interestPoints.map((interestPoint, index) => (
              <InterestPointSelectableCard
                key={index}
                order={selectedInterestPoints.indexOf(interestPoint) + 1}
                interestPoint={interestPoint}
                selected={isInterestPointSelected(interestPoint)}
                onSelect={() => toggleInterestPointSelection(interestPoint)}
              />
            ))}
          </Grid>
        </Flex>
      </Flex>
      <Flex style={{ marginTop: space[4] }} justify="end" gap="2">
        <Button variant="outline" onClick={close}>
          Close
        </Button>
        <Button color="orange" onClick={handleSubmit}>
          Create
        </Button>
      </Flex>
    </Dialog.Content>
  );
};
