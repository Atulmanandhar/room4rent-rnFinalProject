export type IProperty = {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  numOfBathrooms: string;
  numOfBedrooms: string;
  userId: string;
  price: number;
};

export type IUserCollection = {
  name: string;
  email: string;
  createdAt: string;
  address: string;
  phone: string;
};

export type ISavedRoomsCollection = {
  propertyId: string;
  savedBy: string;
} & IProperty;
