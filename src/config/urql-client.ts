import { ROOT_URL, GRAPHQL_ENDPOINT } from '@env';

import {
  createClient,
  dedupExchange,
  cacheExchange,
  makeOperation,
  fetchExchange,
} from '@urql/core';
import { authExchange } from '@urql/exchange-auth';
import { handleAuth } from '../utils/auth-utils';
import { devtoolsExchange } from '@urql/devtools';
import { useUserContext } from '../context/UserContext';

type Token = {
  accessToken: string;
  refreshToken: string;
  expirationTime: number;
};

export const useURQLClient = () => {
  const userContext = useUserContext();
  return createClient({
    url: ROOT_URL + GRAPHQL_ENDPOINT,
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange,
      authExchange({
        async getAuth({ authState }: { authState: Token | null }) {
          if (authState) {
            return authState; // TODO: refresh token instead?
          } else {
            console.debug('auth state not loaded, searching for tokens');
            const tokens = await handleAuth();
            console.debug('in getAuth, token = ', tokens);
            if (tokens && tokens.accessToken && tokens.refreshToken) {
              userContext.setAuthenticated(true);
              return tokens;
            }
          }

          // if token is found, refresh it?
          /* const refreshedTokens = await doRefreshToken(authState!.refreshToken);
          if (refreshedTokens?.accessToken && refreshedTokens?.refreshToken) {
            return refreshedTokens;
          } */

          // This is where auth has gone wrong and we PANIK!
          // clearAuth();
        },
        addAuthToOperation({ authState, operation }) {
          if (!authState || !authState.accessToken) {
            return operation;
          }

          const fetchOptions =
            typeof operation.context.fetchOptions === 'function'
              ? operation.context.fetchOptions()
              : operation.context.fetchOptions || {};

          return makeOperation(operation.kind, operation, {
            ...operation.context,
            fetchOptions: {
              ...fetchOptions,
              headers: {
                ...fetchOptions.headers,
                Authorization: `Bearer ${authState.accessToken}`,
              },
            },
          });
        },
        didAuthError({ error }) {
          // TODO force an unauthorized error to test handler
          console.debug('did auth error', error);
          return error.graphQLErrors.some(
            (e) => e.extensions?.code === 'UNAUTHORIZED',
          );
        },
        willAuthError({ authState }: { authState: Token }) {
          const tokenIsValid = authState?.expirationTime < new Date().getTime();
          /* console.debug(
            'will NOT auth error',
            !!authState.accessToken,
            tokenIsValid,
            authState?.expirationTime,
            new Date().getTime(),
          ); */
          // if token exists and is in its validity period auth will not error
          return !(authState.accessToken && tokenIsValid);
        },
      }),
      fetchExchange,
    ],
  });
};
