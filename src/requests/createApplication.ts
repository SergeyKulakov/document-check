import { gql } from 'urql';

/* type Product = {
  asin: string;
  quantity: number;
};

enum Ownership {
  Rent = 'Rent',
  Own = 'Own',
}

enum Structures {
  House = 'House',
  Apartment = 'Apartment',
  Trailer = 'Trailer',
} */

export const CREATE_APPLICATION = gql`
  mutation CreateApplication(
    $eventID: String!
    $email: String!
    $phoneNumber: String!
    $numberOfAdults: Int!
    $numberOfChildren: Int!
    $products: [ApplicationProductsInput!]!
    $householdIncome: Int!
    $typeOfStructure: TypeOfStructure!
    $ownership: Ownership!
    $referringAgency: String!
    $fema: Float!
    $sba: Float!
    $privateInsurance: Float!
    $otherAssistance: Float!
  ) {
    CreateApplication(
      input: {
        eventID: $eventID
        email: $email
        phoneNumber: $phoneNumber
        numberOfAdults: $numberOfAdults
        numberOfChildren: $numberOfChildren
        products: $products
        householdIncome: $householdIncome
        typeOfStructure: $typeOfStructure
        ownership: $ownership
        fema: $fema
        sba: $sba
        referringAgency: $referringAgency
        privateInsurance: $privateInsurance
        otherAssistance: $otherAssistance
      }
    ) {
      id
    }
  }
`;
