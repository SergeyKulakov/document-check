import React, { useEffect } from 'react';
import { useUserContext } from '../context/UserContext';

// import Spinner from './Spinner';

type Props = {
  children: React.ReactNode;
};

const ApplicationLifecycle = (props: Props) => {
  // const [isLoading, setIsLoading] = useState(false);

  const userContext = useUserContext();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (userContext.profile?.kycStatus === 'Processing') {
      console.log('scheduling profile refetch in 30s');
      timeout = setTimeout(() => userContext.refetchProfile(), 30 * 1000);
    }
    return () => clearTimeout(timeout);
  }, [userContext, userContext.profile]);

  // TODO: tie loading state to .. something?
  return /* isLoading ? <Spinner /> : */ <>{props.children}</>;
};

export default ApplicationLifecycle;
