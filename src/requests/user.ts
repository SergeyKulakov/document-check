import { gql } from 'urql';

export const GET_USER_PROFILE = gql`
  query {
    GetProfile {
      id
      did
      firstName
      lastName
      email
      phoneNumber
      dateOfBirth
      numberOfFamilyMembers
      kycStatus
      kycReason
      address {
        street
        city
        state
        country
        postalCode
      }
      createdAt
      updatedAt
    }
  }
`;
