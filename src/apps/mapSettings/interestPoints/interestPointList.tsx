import { Grid } from "@radix-ui/themes";
import { useQuery } from "react-query";

import { getInterestPoints } from "../../../services/routes/interestPoints/interestPoints.services";

import { InterestPointCard } from "./components/interestPointCard";

export const InterestPointList = () => {
  const { data: interestPointsData } = useQuery({
    queryKey: "interestPoints",
    queryFn: () => getInterestPoints(),
  });

  const interestPoints = interestPointsData || [];

  const sortedInterestPoints = [...interestPoints].sort((a, b) => {
    const aTitle = a.translations[0]?.title || "";
    const bTitle = b.translations[0]?.title || "";
    const aSubtitle = a.translations[0]?.subtitle || "";
    const bSubtitle = b.translations[0]?.subtitle || "";

    if (aTitle < bTitle) return -1;
    if (aTitle > bTitle) return 1;
    if (aSubtitle < bSubtitle) return -1;
    if (aSubtitle > bSubtitle) return 1;
    return 0;
  });

  return (
    <Grid columns="3" gap="3" width="auto">
      {sortedInterestPoints.map((item, index) => (
        <InterestPointCard interestPoint={item} key={index} />
      ))}
    </Grid>
  );
};
