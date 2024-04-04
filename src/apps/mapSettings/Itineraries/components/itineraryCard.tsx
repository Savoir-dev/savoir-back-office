import { Card, DataList, Dialog, Flex, Grid, Text } from "@radix-ui/themes";
import { MapPin, Plus } from "lucide-react";
import { useState } from "react";

import { InterestPoint } from "../../../../services/types/interestPoints/interestPoints.type";
import styled from "styled-components";
import { colors, space } from "../../../../styles/const";
import { InterestPointSelectableCard } from "../../components/interestPointSelectableCard";
import { interestPointsFakeData } from "../../interestPoints/interestPointList";
import { Button } from "../../../../components/atoms/button";

interface Props {
  itinerary: {
    title: string;
    length: number;
    interestPoints: InterestPoint[];
  };
}

export const ItineraryCard = ({ itinerary }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
                    {itinerary.title}
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
            <StyledConnector isAddNew={true}>
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
      <Dialog.Content onPointerDownOutside={() => setIsDialogOpen(false)}>
        <Flex direction="column">
          <Text size="2" weight="bold">
            Interest points
          </Text>
          <Flex
            direction="column"
            style={{ overflowY: "auto", maxHeight: "500px" }}
            gap="2"
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
                  order={itinerary.interestPoints.indexOf(interestPoint) + 1}
                  interestPoint={interestPoint}
                  selected={() => {}}
                  onSelect={() => {}}
                />
              ))}
            </Grid>
          </Flex>
          <Flex style={{ marginTop: space[4] }} justify="end" gap="2">
            <Button color="orange">Edit</Button>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
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
