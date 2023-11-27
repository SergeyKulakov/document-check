import { gql } from 'urql';

export const GET_APPLICATIONS = gql`
  query {
    ListApplications {
      id
      event {
        id
        image
        title
        location
        agency {
          name
          logo
        }
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
      products {
        asin
        quantity
      }
      status
      statusReason
      orderStatus
    }
  }
`;
