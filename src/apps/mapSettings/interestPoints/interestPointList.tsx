import { useState } from "react";
import { Grid } from "@radix-ui/themes";
import { useQuery } from "react-query";

import { getInterestPoints } from "../../../services/routes/interestPoints/interestPoints.services";

import { InterestPointCard } from "./components/interestPointCard";

export const InterestPointList = () => {
  const [selectedInterestPointUid, setSelectedInterestPointUid] = useState<
    string | null
  >(null);

  const { data: interestPointsData } = useQuery({
    queryKey: "interestPoints",
    queryFn: () => getInterestPoints(),
  });

  const interestPoints = interestPointsData || [];
  console.log(interestPoints);
  return (
    <Grid columns="3" gap="3" width="auto">
      {interestPoints.map((item, index) => (
        <InterestPointCard
          interestPoint={item}
          key={index}
          selectedInterestPointUid={selectedInterestPointUid}
          setSelectedInterestPointUid={setSelectedInterestPointUid}
        />
      ))}
    </Grid>
  );
};
