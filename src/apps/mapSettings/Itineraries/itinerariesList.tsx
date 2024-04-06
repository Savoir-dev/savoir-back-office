import { useQuery } from "react-query";
import { AxiosResponse } from "axios";

import { Itinerary } from "../../../services/types/itineraries.type";
import { getItineraries } from "../../../services/intineraries/itineraries.services";

import { ItineraryCard } from "./components/itineraryCard";

export const ItinerariesList = () => {
  const { data: itinerariesData } = useQuery({
    queryKey: "itineraries",
    queryFn: () => getItineraries(),
    select: (data): AxiosResponse<Itinerary[]> => data.data,
  });

  const itineraries = itinerariesData?.data || [];

  return (
    <>
      {itineraries.map((itinerary) => {
        return <ItineraryCard key={itinerary.uid} itinerary={itinerary} />;
      })}
    </>
  );
};
