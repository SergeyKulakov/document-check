import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native-gesture-handler', () => {});
jest.mock('@sentry/react-native', () => ({
  init: () => jest.fn(),
  wrap: () => jest.fn(),
  ReactNativeTracing: () => jest.fn(),
}));
jest.mock('react-native-device-info', () => mockRNDeviceInfo);
