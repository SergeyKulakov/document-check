import { gql } from 'urql';

export const KYC_PARAMS = gql`
  mutation KycParams {
    Kyc {
      SessionID
      EphemeralKeySecret
    }
  }
`;
