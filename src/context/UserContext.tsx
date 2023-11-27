import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useQuery } from 'urql';
import { GET_USER_PROFILE } from '../requests/user';
import { User } from '../types/user';

type UserContextType = {
  profile: User | null;
  getProfile: () => User | null;
  isVerified: boolean;
  kycStarted: boolean;
  updateProfile: () => void;
  refetchProfile: () => void;
  setAuthenticated: (val: boolean) => void;
  authenticated: boolean;
};
type Props = {
  children: React.ReactNode;
};

export const UserContext = React.createContext<UserContextType>({
  profile: null,
  getProfile: () => null,
  isVerified: false,
  kycStarted: false,
  refetchProfile: () => null,
  updateProfile: () => {},
  setAuthenticated: () => {},
  authenticated: false,
});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = (props: Props) => {
  const [result, refetch] = useQuery({ query: GET_USER_PROFILE });
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const getProfile = useCallback(() => {
    const { data, error } = result;

    if (error) {
      console.error(`Error getting user profile: ${error}`);
    }
    if (data) {
      const _profile = {
        ...data.GetProfile,
        // firstName: 'Andrei',
        // kycStatus: 'NotStarted', // 'NotStarted' | 'Processing' | 'RequireMoreInfo' | 'Verified'
        // kycReason: 'Invalid documents',
      };
      setUserProfile(_profile);
      return _profile;
    }
  }, [result]);

  useEffect(() => {
    getProfile();
  }, [getProfile, authenticated]);

  const refetchProfile = () => {
    refetch({
      requestPolicy: 'network-only',
    });
  };

  const kycStarted = useMemo(() => {
    const kycDoneStatuses: (string | undefined | null)[] = [
      'RequireMoreInfo',
      'Processing',
      'Verified',
    ];
    return kycDoneStatuses.includes(userProfile?.kycStatus);
  }, [userProfile?.kycStatus]);

  const isVerified = useMemo(() => {
    return userProfile?.kycStatus === 'Verified';
  }, [userProfile?.kycStatus]);

  const updateProfile = () => {};

  const contextValue = {
    profile: userProfile || getProfile(),
    isVerified,
    kycStarted,
    getProfile,
    refetchProfile,
    updateProfile,
    setAuthenticated,
    authenticated,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
