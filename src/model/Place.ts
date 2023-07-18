export interface Place {
  id?: string;
  name: string;
  address: string;
  image?: string;
  description?: string;
  type: PlaceType;
}

export enum PlaceType {
  HOT_PLACES = "Hot places",
  FOR_YOU = "For you",
  FEATURED_EXPERIENCE = "Featured Experience",
}
