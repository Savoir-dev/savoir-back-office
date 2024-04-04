import { useState } from "react";
import { Dialog, Flex, Grid, Text, TextField } from "@radix-ui/themes";

import { interestPointsFakeData } from "../interestPoints/interestPointList";
import { InterestPointSelectableCard } from "../components/interestPointSelectableCard";
import { space } from "../../../styles/const";
import { InterestPoint } from "../../../services/types/interestPoints/interestPoints.type";
import { Button } from "../../../components/atoms/button";
interface Props {
  close: () => void;
  isTitleField?: boolean;
  preSelectedInterestPoints?: InterestPoint[];
}

export const CreateItineraryModal = ({
  close,
  isTitleField,
  preSelectedInterestPoints = [],
}: Props) => {
  const [selectedInterestPoints, setSelectedInterestPoints] = useState<
    InterestPoint[]
  >(preSelectedInterestPoints);

  const toggleInterestPointSelection = (interestPoint: InterestPoint) => {
    if (isInterestPointSelected(interestPoint)) {
      setSelectedInterestPoints(
        selectedInterestPoints.filter((point) => point !== interestPoint)
      );
    } else {
      setSelectedInterestPoints([...selectedInterestPoints, interestPoint]);
    }
  };

  const isInterestPointSelected = (interestPoint: InterestPoint): boolean => {
    return selectedInterestPoints.includes(interestPoint);
  };

  return (
    <Dialog.Content onPointerDownOutside={close}>
      <Dialog.Title>Create a new itinerary</Dialog.Title>
      <Flex direction="column" gap="2">
        {isTitleField && (
          <Flex direction="column">
            <Text size="2" weight="bold">
              Title
            </Text>
            <TextField.Root placeholder="Title..." />
          </Flex>
        )}
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
            {interestPointsFakeData.map((interestPoint, index) => (
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
        <Button color="orange">Create</Button>
        <Button variant="outline" onClick={close}>
          Close
        </Button>
      </Flex>
    </Dialog.Content>
  );
};
