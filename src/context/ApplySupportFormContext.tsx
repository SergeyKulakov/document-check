import React, {
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useMutation } from 'urql';
import { CREATE_APPLICATION } from '../requests/createApplication';
import { User } from '../types/user';

type Event = {
  id: string;
  bundle: {
    products: any[];
  };
} | null;

type ApplySupportFormContextType = {
  setEventData: (event: Event) => void;
  eventData: Event;
  setData: ({}) => void;
  formData: {};
  handleSubmit: () => Promise<any>; // XXX: maybe return mutation result
};

type Props = {
  children: React.ReactNode;
};

export const ApplySupportFormContext =
  React.createContext<ApplySupportFormContextType>({
    setEventData: () => {},
    eventData: null,
    setData: () => {},
    formData: {},
    handleSubmit: async () => Promise<any>,
  });

export const useApplySupportFormContext = () => {
  return useContext(ApplySupportFormContext);
};

export const ApplySupportFormContextProvider = (props: Props) => {
  const [eventData, setEventData] = useState<Event>(null);

  const [mutationResult, executeMutation] = useMutation(CREATE_APPLICATION);

  const [formData, setFormData] = useState<{}>({});

  const setData = (newData: {}) => {
    setFormData((prev: {}) => ({ ...prev, ...newData }));
  };

  const handleSubmit = async () => {
    console.log('final form', formData);

    executeMutation({ ...formData, eventID: eventData?.id })
      .then((res) => console.log('created application', res))
      .catch((error) => {
        throw new Error(`Error creating application ${error}`);
      });
  };

  const contextValue = {
    setEventData,
    eventData,
    setData,
    formData,
    handleSubmit,
  };

  return (
    <ApplySupportFormContext.Provider value={contextValue}>
      {props.children}
    </ApplySupportFormContext.Provider>
  );
};
