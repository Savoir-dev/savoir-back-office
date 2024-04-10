import { Button, Dialog, Flex, Tabs, Text, TextField } from "@radix-ui/themes";
import { useEffect, useState, FC } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";

import { space } from "../../../styles/const";
import {
  getInterestPointByInterestPointId,
  postInterestPoint,
  putInterestPoint,
} from "../../../services/interestPoints/interestPoints.services";
import {
  InterestPoint,
  InterestPointFromApi,
  InterestPointTranslation,
} from "../../../services/types/interestPoints.type";
import { CreateInterestPointForm } from "./components/createInterestPointForm";

const formKey = "interestPointFormState";

const convertToFormInterestPoint = (
  ip: InterestPointFromApi
): InterestPoint => ({
  ...ip,
  latitude: ip.latitude.toString(),
  longitude: ip.longitude.toString(),
  image: undefined,
  audio: undefined,
  tags: ip.tags.map((tag) => ({ tag })),
});

interface InterestPointForm {
  isEditing?: boolean;
  interestPoint?: InterestPointFromApi;
  close: () => void;
}

export const CreateInterestPointModal: FC<InterestPointForm> = ({
  isEditing,
  interestPoint,
  close,
}) => {
  const [allInterestPointsTranslations, setAllInterestPointsTranslations] =
    useState<InterestPointTranslation[]>([]);
  const [translations, setTranslations] = useState<InterestPointTranslation[]>(
    []
  );
  const [newTranslation, setNewTranslation] = useState<string>();
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 41.38879,
    lng: 2.15899,
  });

  const {
    control: controlMainSettings,
    handleSubmit,
    reset,
    watch,
  } = useForm<InterestPoint>({
    defaultValues: interestPoint
      ? convertToFormInterestPoint(interestPoint)
      : {
          duration: "",
          type: "",
          color: "",
          image: undefined,
          latitude: "",
          longitude: "",
        },
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: InterestPoint) => {
      return isEditing ? putInterestPoint(data) : postInterestPoint(data);
    },
    onSuccess: () => {
      sessionStorage.removeItem(formKey);

      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes("interestPoints") ||
          query.queryKey.includes("interestPointsByWalkingTour"),
      });

      close();
    },
  });

  const handleInterestPointTranslation = (
    newTranslation: InterestPointTranslation
  ) => {
    setTranslations((prev) => [...prev, newTranslation]);
  };

  const onSubmit = (data: InterestPoint) => {
    const adjustedData = {
      ...data,
      latitude: location.lat.toString(),
      longitude: location.lng.toString(),
      interestPointTranslation: translations,
    };

    console.log(adjustedData);
    // mutate(adjustedData);
  };

  useEffect(() => {
    const savedFormState = sessionStorage.getItem(formKey);
    if (savedFormState) {
      reset({ ...JSON.parse(savedFormState), image: null });
    }
  }, [reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      sessionStorage.setItem(formKey, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const { data: interestPointByIdData } = useQuery({
    queryKey: ["interestPoints"],
    queryFn: () =>
      interestPoint && getInterestPointByInterestPointId(interestPoint?.uid),
    select: (data): InterestPointFromApi => data?.data,
  });

  return (
    <Dialog.Content onPointerDownOutside={close} maxWidth={"1200px"}>
      <Dialog.Title>
        {isEditing ? "Edit" : "Create"} a new interest point
      </Dialog.Title>
      <Tabs.Root defaultValue="french">
        <Tabs.List color="orange" style={{ marginBottom: space[2] }}>
          <Flex align="center">
            {allInterestPointsTranslations?.map((interestPointTranslation) => {
              return (
                <Tabs.Trigger
                  value={interestPointTranslation.language}
                  key={interestPointTranslation.language}
                  style={{ marginRight: space[2] }}
                >
                  <Text>{interestPointTranslation.language}</Text>
                </Tabs.Trigger>
              );
            })}
            <Tabs.Trigger value="french">
              <TextField.Root
                value={newTranslation}
                onChange={(e) => {
                  setNewTranslation(e.target.value);
                }}
              />
            </Tabs.Trigger>

            <Button
              style={{ marginLeft: space[3] }}
              onClick={() => {
                setAllInterestPointsTranslations([
                  ...allInterestPointsTranslations,
                  {
                    uid: "",
                    language: newTranslation || "english",
                    title: "",
                    subtitle: "",
                    shortDesc: "",
                    longDesc: "",
                    audioDesc: "",
                    tags: [],
                    information: "",
                    audio: "",
                    interestPointId: "",
                  },
                ]);
                setNewTranslation("");
              }}
            >
              Add new language
            </Button>
          </Flex>
        </Tabs.List>
        <form onSubmit={handleSubmit(onSubmit)}>
          {allInterestPointsTranslations?.map((interestPointTranslation, i) => {
            return (
              <Tabs.Content
                key={interestPointTranslation.language}
                value={interestPointTranslation.language}
              >
                <CreateInterestPointForm
                  handleSubmit={handleInterestPointTranslation}
                  isOriginal={i === 0}
                  setLocation={setLocation}
                  location={location}
                  controlMainSettings={controlMainSettings}
                />
              </Tabs.Content>
            );
          })}
        </form>

        <Flex style={{ marginTop: space[4] }} justify="end" gap="2">
          <Button variant="outline" onClick={close}>
            Close
          </Button>
          <Button color="orange" loading={isLoading} disabled={isLoading}>
            {isEditing ? "Edit" : "Create"}
          </Button>
        </Flex>
      </Tabs.Root>
    </Dialog.Content>
  );
};
