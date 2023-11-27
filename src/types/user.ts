export type User = {
  id: string;
  did: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
  dateOfBirth: string | null;
  numberOfFamilyMembers: number | null;
  kycStatus:
    | 'NotStarted'
    | 'Processing'
    | 'RequireMoreInfo'
    | 'Verified'
    | ''
    | null;
  kycReason: string | null;
  createdAt: string;
  updatedAt: string;
  address: {
    street: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    postalCode: string | null;
  } | null;
};
