import React from 'react';
import { Text, View } from 'react-native';
import renderer from 'react-test-renderer';

import ErrorBoundary from '@sentry/react-native';

describe('ErrorBoundary', () => {
  let consoleErrorSpy;
  let errorMock;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    errorMock = new Error('This is a test error!');
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('when there are no errors', () => {
    it('should render the children', () => {
      const wrapper = renderer.create(() => {
        <ErrorBoundary>
          <Text>Hey!</Text>
        </ErrorBoundary>;
      });

      expect(wrapper).toMatchSnapshot();
      expect(wrapper).not.toBeNull();
    });
  });

  describe('when there is an error', () => {
    describe('when FallbackComponent is not defined as a prop', () => {
      it('should catch the error and render the default FallbackComponent', () => {
        const wrapper = renderer.create(() => {
          <ErrorBoundary>
            <View>{errorMock}</View>
          </ErrorBoundary>;
        });

        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('when FallbackComponent is defined as a prop', () => {
      it('should catch the error and render the props.FallbackComponent', () => {
        const FallbackComponent = () => <Text>Error!</Text>;
        const wrapper = renderer.create(() => {
          <ErrorBoundary fallback={FallbackComponent}>
            <View>{errorMock}</View>
          </ErrorBoundary>;
        });

        expect(wrapper).toMatchSnapshot();
      });
    });

    describe.skip('when onError is defined as a prop', () => {
      it('should catch the error and call props.onError', () => {
        const onError = jest.fn();

        renderer.create(() => {
          <ErrorBoundary onError={onError}>
            <View>{errorMock}</View>
          </ErrorBoundary>;
        });

        expect(onError).toHaveBeenCalled();
        /* expect(onError).toHaveBeenCalledWith(
          expect.any(Error),
          expect.any(String),
        ); */
      });
    });

    describe.skip('when FallbackComponent resetError prop is called', () => {
      it('should clear the error state', () => {
        const wrapper = renderer.create(() => {
          <ErrorBoundary>
            <Text>No errors!</Text>
          </ErrorBoundary>;
        });

        wrapper.getInstance().setState({ error: errorMock });
        wrapper.getInstance().resetError();

        expect(wrapper.getInstance().state.error).toBeNull();
      });
    });
  });
});
