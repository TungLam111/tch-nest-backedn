export class LocationResponse {
  id: string;
  address: string;
  name: string;
  latitude: number;
  longitude: number;
  ggPlaceId: string;
  userId: string;
}

export class DeleteLocationResponse {
  id: string;
  address: string;
  name: string;
  latitude: number;
  longitude: number;
  ggPlaceId: string;
  userId: string;
  isDeleted: boolean;
  deletedDate: Date;
}
