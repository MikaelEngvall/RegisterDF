export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  personalNumber: string;
  apartmentIds: string[];
  keyIds: string[];
}

export interface Apartment {
  id: string;
  street: string;
  number: string;
  apartmentNumber: string;
  floor: string;
  postalCode: string;
  city: string;
  tenantIds: string[];
  keyIds: string[];
}

export interface Key {
  id: string;
  type: string;
  number: string;
  amount: number;
  tenantIds: string[];
  apartmentIds: string[];
}