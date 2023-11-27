import { gql } from 'urql';

export const GET_DISCOVER_MAIN = gql`
  query {
    ListEvents {
      id
      title
      description
      image
      location
      agency {
        name
        description
        logo
      }
    }
    ListAgencies {
      id
      name
      logo
    }
  }
`;
