import {
  InterestPointFromApi,
  InterestPoint,
} from "../types/interestPoints.type";

export const interestPointReader = (
  json: InterestPointFromApi
): InterestPoint => ({
  uid: json.uid,
  duration: json.duration,
  type: json.type,
  image: null,
  imageUrl: json.image,
  color: json.color,
  latitude: json.latitude,
  longitude: json.longitude,
  guide: json.guide,
  isLinkedToItinerary: json.isLinkedToItinerary,
  translations: json.translations.map((t) => ({
    uid: t.uid,
    language: t.language,
    title: t.title,
    subtitle: t.subtitle,
    shortDesc: t.shortDesc,
    longDesc: t.longDesc,
    audioDesc: t.audioDesc,
    tags: t.tags,
    information: t.information,
    audio: null,
    audioUrl: t.audio,
  })),
});
