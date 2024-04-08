import { Card, DataList, Dialog, Flex, Grid, Text } from "@radix-ui/themes";
import { MapPin, Plus } from "lucide-react";
import { useState } from "react";

import styled from "styled-components";
import { colors, space } from "../../../../styles/const";
import { Button } from "../../../../components/atoms/button";
import { CreateItineraryModal } from "../createItineraryModal";
import { Itinerary } from "../../../../services/types/itineraries.type";

interface Props {
  itinerary: Itinerary;
}

export const ItineraryCard = ({ itinerary }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const onCloseDialog = () => setIsDialogOpen(false);
  return (
    <Dialog.Root open={isDialogOpen}>
      <Card size="3">
        <Flex direction="column" gap="3">
          <div>
            <Button
              size="1"
              color="orange"
              variant="outline"
              onClick={() => setIsDialogOpen(true)}
            >
              <Text weight="bold">Edit</Text>
            </Button>
          </div>
          <Flex direction="column">
            <DataList.Root>
              <DataList.Item align="center">
                <DataList.Label minWidth="40px">Title</DataList.Label>
                <DataList.Value>
                  <Text size="3" weight="bold">
                    {itinerary.name}
                  </Text>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item align="center">
                <DataList.Label minWidth="40px">Walking tour</DataList.Label>
                <DataList.Value>
                  <Text size="3" weight="bold">
                    {itinerary.interestPoints.length}
                  </Text>
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Flex>
          <ScrollableFlex>
            {itinerary.interestPoints.map((interestPoint, index) => (
              <StyledConnector key={index}>
                <CustomCard>
                  <Flex direction="column" align="center" gap="2">
                    <MapPin color={interestPoint.color} />
                    <Text size="2" weight="bold">
                      {interestPoint.title}
                    </Text>
                  </Flex>
                </CustomCard>
              </StyledConnector>
            ))}
            <StyledConnector>
              <Flex direction="column" align="center" gap="2">
                <Button
                  size="1"
                  color="orange"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus size={20} />
                </Button>
              </Flex>
            </StyledConnector>
          </ScrollableFlex>
        </Flex>
      </Card>
      <CreateItineraryModal
        isTitleField
        close={onCloseDialog}
        itinerary={itinerary}
        preSelectedInterestPoints={itinerary.interestPoints}
      />
    </Dialog.Root>
  );
};

const ScrollableFlex = styled(Flex)`
  margin-top: ${space[5]};
  padding: ${space[2]} 0;
  display: flex;
  overflow-x: auto;
  flex-wrap: nowrap;
`;

const CustomCard = styled.div`
  min-width: 100px;
  padding: ${space[2]};
  border-radius: 4px;
  border: 1px solid ${colors.lightSmoke};
`;

const StyledConnector = styled.div`
  display: flex;
  align-items: center;
  min-width: 150px;

  &:not(:last-child)::after {
    content: "";
    width: 100%;
    border-bottom: 1px dashed;
  }
`;
