import { useEffect, useState } from "react";
import { Dialog, Flex, Tabs, Text } from "@radix-ui/themes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AxiosResponse } from "axios";

import { space } from "../../../styles/const";
import { InterestPointFromApi } from "../../../services/types/interestPoints.type";
import {
  Itinerary,
  ItineraryTranslations,
  PostItinerary,
} from "../../../services/types/itineraries.type";
import { Button } from "../../../components/atoms/button";
import { getInterestPointsByWalkingTour } from "../../../services/routes/interestPoints/interestPoints.services";
import {
  getItineraryByUid,
  postItinerary,
  putItinerary,
} from "../../../services/routes/intineraries/itineraries.services";
import { CreateItineraryForm } from "./components/createItineraryForm";
interface Props {
  close: () => void;
  preSelectedInterestPoints?: InterestPointFromApi[];
  itinerary?: Itinerary;
  selectedItineraryUid?: string;
}

export const CreateItineraryModal = ({
  close,
  preSelectedInterestPoints = [],
  itinerary,
  selectedItineraryUid,
}: Props) => {
  const { data: itineraryData, refetch: refetchItinerary } = useQuery({
    queryKey: ["itineraryByUid", selectedItineraryUid],
    queryFn: () => getItineraryByUid(selectedItineraryUid),
    select: (data): AxiosResponse<Itinerary[]> => data.data,
    enabled: !!selectedItineraryUid,
  });

  const editableItinerary = itineraryData?.data;
  const enEditableItinerary = editableItinerary?.find((i) => {
    return i.language === "en";
  });
  const frEditableItinerary = editableItinerary?.find((i) => {
    return i.language === "fr";
  });
  const esEditableItinerary = editableItinerary?.find((i) => {
    return i.language === "es";
  });

  const [generalValues, setGeneralValues] = useState({
    duration: itinerary?.duration || "",
    guide: itinerary?.guide || "",
    color: itinerary?.color || "",
  });

  const [translatedItineraries, setTranslatedItineraries] = useState<
    ItineraryTranslations[]
  >([
    {
      language: "en",
      title: "",
      subtitle: "",
    },
    {
      language: "fr",
      title: "",
      subtitle: "",
    },
    {
      language: "es",
      title: "",
      subtitle: "",
    },
  ]);

  useEffect(() => {
    refetchItinerary();
    setTranslatedItineraries([
      {
        language: "en",
        title: enEditableItinerary?.title || "",
        subtitle: enEditableItinerary?.subtitle || "",
      },
      {
        language: "fr",
        title: frEditableItinerary?.title || "",
        subtitle: frEditableItinerary?.subtitle || "",
      },
      {
        language: "es",
        title: esEditableItinerary?.title || "",
        subtitle: esEditableItinerary?.subtitle || "",
      },
    ]);
  }, [selectedItineraryUid]);

  const [selectedInterestPoints, setSelectedInterestPoints] = useState<
    InterestPointFromApi[]
  >(preSelectedInterestPoints);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: PostItinerary | Itinerary) => {
      return itinerary
        ? putItinerary(itinerary.uid, data as Itinerary)
        : postItinerary(data as PostItinerary);
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
      duration: generalValues.duration,
      color: generalValues.color,
      guide: generalValues.guide,
      translations: translatedItineraries,
      interestPoints: selectedInterestPoints,
    });
  };

  const setTitleByLanguage = (language: string, newTitle: string) => {
    const updatedItineraries = translatedItineraries.map(
      (translatedItinerary) => {
        if (translatedItinerary.language === language) {
          return { ...translatedItinerary, title: newTitle };
        }
        return translatedItinerary;
      }
    );

    setTranslatedItineraries(updatedItineraries);
  };

  const setSubtitleByLanguage = (language: string, newSubtitle: string) => {
    const updatedItineraries = translatedItineraries.map(
      (translatedItinerary) => {
        if (translatedItinerary.language === language) {
          return { ...translatedItinerary, subtitle: newSubtitle };
        }
        return translatedItinerary;
      }
    );

    setTranslatedItineraries(updatedItineraries);
  };

  const interestPoints = interestPointsData?.data || [];

  return (
    <Dialog.Content onPointerDownOutside={close}>
      <Dialog.Title>
        {itinerary ? "Edit" : "Create"} a new itinerary
      </Dialog.Title>
      <Tabs.Root defaultValue="en">
        <Tabs.List style={{ marginBottom: space[2] }} color="orange">
          {translatedItineraries?.map((translatedItinerary) => {
            return (
              <Tabs.Trigger
                value={translatedItinerary.language}
                key={translatedItinerary.language}
                style={{ marginRight: space[2] }}
              >
                <Text>{translatedItinerary.language}</Text>
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
        {translatedItineraries.map((translatedItinerary) => {
          return (
            <Tabs.Content
              value={translatedItinerary.language}
              key={translatedItinerary.language}
            >
              <CreateItineraryForm
                generalValues={generalValues}
                setGeneralValues={setGeneralValues}
                key={translatedItinerary.language}
                translatedItinerary={translatedItinerary}
                setTitleByLanguage={setTitleByLanguage}
                setSubtitleByLanguage={setSubtitleByLanguage}
                selectedInterestPoints={selectedInterestPoints}
                setSelectedInterestPoints={setSelectedInterestPoints}
                interestPoints={interestPoints}
              />
            </Tabs.Content>
          );
        })}
        <Flex style={{ marginTop: space[4] }} justify="end" gap="2">
          <Button variant="outline" onClick={close}>
            Close
          </Button>
          <Button color="orange" onClick={handleSubmit}>
            {itinerary ? "Edit" : "Create"}
          </Button>
        </Flex>
      </Tabs.Root>
    </Dialog.Content>
  );
};
