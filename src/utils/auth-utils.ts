import * as Keychain from 'react-native-keychain';
import * as ed from '@noble/ed25519';
import { utf8ToBytes } from '@noble/hashes/utils';
import { getUniqueId } from 'react-native-device-info';

import {
  ROOT_URL,
  TOKEN_ENDPOINT,
  CLIENT_ID,
  DID_ENDPOINT,
  AUTH_URL,
} from '@env';
import { useUserContext } from '../context/UserContext';

const APP_KEY = 'kokua-app-keys';
const DID_KEY = 'kokua-app-did';
const TOKENS_KEY = 'kokua-app-tokens';

type KeyPair = {
  pk: string;
  pub: string;
};

type SetSecureValue = (
  key: string,
  value: string,
) => Promise<Keychain.Result | false>;

type GetSecureValue = (key: string) => Promise<string | false>;

const setSecureValue: SetSecureValue = (key, value) =>
  Keychain.setGenericPassword(key, value, {
    service: key,
  });

const getSecureValue: GetSecureValue = async (key) => {
  const result = await Keychain.getGenericPassword({ service: key });
  if (result) {
    return result.password;
  }
  return false;
};

const clearSecureValue = (serviceKey: string) => {
  Keychain.resetGenericPassword({ service: serviceKey }).then((_) =>
    console.log(serviceKey, 'reset'),
  );
};

const generateKeys = async () => {
  const privateKey = ed.utils.randomPrivateKey();
  const publicKey = await ed.getPublicKey(privateKey);

  return { privateKey, publicKey };
};

const getKeys = async (): Promise<KeyPair> => {
  const keysPair = await getSecureValue(APP_KEY);

  if (keysPair) {
    console.debug('Stored key pair found', keysPair);
    return JSON.parse(keysPair);
  } else {
    console.debug('Generating new secrets');
    return generateKeys()
      .then(async ({ privateKey, publicKey }) => {
        const pkHex = ed.utils.bytesToHex(privateKey);
        const pubHex = ed.utils.bytesToHex(publicKey);

        await setSecureValue(
          APP_KEY,
          JSON.stringify({ pk: pkHex, pub: pubHex }),
        );

        return { pk: pkHex, pub: pubHex };
      })
      .catch((error) => {
        throw new Error(`Error generating private/public key pair: ${error}`);
      });
  }
};

const getDid = async (pk: string, pub: string) => {
  const storedDID = await getSecureValue(DID_KEY);
  const device_id = await getUniqueId();
  console.debug('Device id:', device_id);

  if (storedDID) {
    console.debug('Stored DID found:', storedDID);
    return storedDID;
  } else {
    console.debug('Fetching DID, using', device_id, pk + pub);

    return fetch(AUTH_URL + DID_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        device_id,
        device_key: pk + pub,
      }),
    })
      .then(async (res) => {
        const parsedRes = await res.json();
        console.debug('DID response', parsedRes);

        if (parsedRes.id) {
          const did = parsedRes.id;
          setSecureValue(DID_KEY, did);
          return did;
        }
        if (parsedRes.error) {
          console.error('Error parsing DID response:', parsedRes.error);
          return null;
        }
      })
      .catch((err) => console.error(`Error fetching DID ${err}`));
  }
};

type FromBody = {
  [key: string]: string;
};

const fetchTokens = async (formBody: FromBody, delay: number = 1) => {
  let formBodyArray = [];
  for (let prop in formBody) {
    var encodedKey = encodeURIComponent(prop);
    var encodedValue = encodeURIComponent(formBody[prop]);
    formBodyArray.push(encodedKey + '=' + encodedValue);
  }
  const body = formBodyArray.join('&');
  console.debug('formbody:', formBody);
  console.debug('retry delay', delay);

  return fetch(AUTH_URL + TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
    .then(async (res: Response) => {
      const parsedRes = await res.json();
      console.debug('tokens request:', parsedRes);
      const {
        error,
        error_description,
        access_token,
        refresh_token,
        expires_in,
      } = parsedRes;

      if (error) {
        throw new Error(
          `tokens response error: ${error} - ${error_description}`,
        );
      }
      if (access_token && refresh_token) {
        const expirationTime = new Date().getTime() + expires_in;

        const tokens = {
          accessToken: access_token,
          refreshToken: refresh_token,
          expirationTime,
        };
        console.debug('tokens received:', tokens);

        setSecureValue(TOKENS_KEY, JSON.stringify(tokens));
        return tokens;
      }

      throw new Error(
        'Tokens not retrived from storage nor fetched from auth server',
      );
    })
    .catch((error) => {
      console.log('token request error:', error);
      const newDelay = delay * 2;
      return new Promise((resolve) => {
        setTimeout(() => {
          fetchTokens(formBody, newDelay).then((res) => resolve(res));
        }, delay * 1000);
      });
    });
};

const getTokens = async ({
  pk,
  pub,
  did,
}: {
  pk: string;
  pub: string;
  did: string;
}) => {
  const storedTokens = await getSecureValue(TOKENS_KEY);

  if (storedTokens) {
    console.debug('stored tokens found', storedTokens);
    const { expirationTime } = JSON.parse(storedTokens);

    console.debug('expiresOn:', new Date(expirationTime).toUTCString());
    console.debug('is valid:', expirationTime > new Date().getTime());

    return JSON.parse(storedTokens);
  } else {
    const randomString = Math.random().toString(36).slice(2);
    const OTP = utf8ToBytes(randomString);
    const signedOTP: Uint8Array = await ed.sign(OTP, pk);
    const signedOTPHex: string = ed.utils.bytesToHex(signedOTP);

    ed.verify(signedOTP, OTP, pub)
      .then((res) => console.debug('validity of signedOTP:', res))
      .catch((err) => console.error(err));

    const details: FromBody = {
      username: did,
      password: signedOTPHex,
      grant_type: 'password',
      scope: 'read write',
      client_id: CLIENT_ID,
      redirect_uri: ROOT_URL,
      state: randomString,
    };

    return fetchTokens(details);
  }
};

export const doRefreshToken = async (refreshToken: string) => {
  console.log('performing a token refresh');

  const details: FromBody = {
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
    scope: 'read write',
    client_id: CLIENT_ID,
    redirect_uri: ROOT_URL,
    state: 'random-string-here',
  };

  return fetchTokens(details);
};

export const checkAuth = async () => {
  const storedTokens = await getSecureValue(TOKENS_KEY);

  if (storedTokens) {
    console.debug('Check auth successful', storedTokens);
    return JSON.parse(storedTokens);
  }
  return null;
};

export const handleAuth = async () => {
  return getKeys().then(async (keys) => {
    console.debug('using keys:', keys);
    const { pk, pub } = keys;
    return getDid(pk, pub).then(async (did) => {
      console.debug('using did:', did);
      return getTokens({ pk, pub, did });
    });
  });
};

export const clearAuth = async () => {
  clearSecureValue(TOKENS_KEY);
};

export const deleteSecureValue = (key: string) => {
  clearSecureValue(key);
};
