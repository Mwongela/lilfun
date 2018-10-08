export interface LocationItem {
  latitude: number;
  longitude: number;
  pageUrl: string;
  mediaUrl: string,

  // More field
  distanceFromUser: number;
  isValid: boolean;
  showPlayer?: boolean;
}
