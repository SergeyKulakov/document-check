import { gql } from 'urql';

export const GET_EVENT_DETAILS = gql`
  query ($id: String!) {
    GetEventDetails(id: $id) {
      id
      title
      location
      description
      image
      bundle {
        products {
          product {
            asin
            name
            image {
              small {
                url
              }
            }
          }
          category
        }
      }
    }
  }
`;
