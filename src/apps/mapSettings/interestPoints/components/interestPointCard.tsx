import { AspectRatio, Badge, Card, Flex, Text } from "@radix-ui/themes";
import { InterestPoint } from "../../../../services/types/interestPoints/interestPoints.type";
import { space } from "../../../../styles/const";
import AudioPlayer from "react-h5-audio-player";
import styled from "styled-components";

export const InterestPointCard = ({
  interestPoint,
}: {
  interestPoint: InterestPoint;
}) => {
  return (
    <Card key={interestPoint.title}>
      <AspectRatio ratio={14 / 7}>
        <img
          src={interestPoint.image}
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
        <Text size="4" weight="bold">
          {interestPoint.title}
        </Text>
        <Text size="2" weight="bold">
          {interestPoint.subtitle}
        </Text>
        <Text size="2" style={{ textDecoration: "underline" }}>
          {interestPoint.type}
        </Text>
        <Text size="2">{interestPoint.shortDesc}</Text>
        <Flex gap="1">
          {interestPoint.tags.map((tag, index) => (
            <Badge color="orange" key={index}>
              {tag}
            </Badge>
          ))}
        </Flex>
        <CustomAudioStyled
          src={interestPoint.audio}
          onPlay={(e) => console.log("onPlay")}
        />
        <Text size="2">By {interestPoint.guide}</Text>
      </Flex>
    </Card>
  );
};

const CustomAudioStyled = styled(AudioPlayer)`
  box-shadow: none;
`;
