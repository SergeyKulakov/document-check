import React, { useEffect } from 'react';
import * as Sentry from '@sentry/react-native';
import { ErrorBoundary } from '@sentry/react-native';
// import StorybookUI from './storybook';
import { SENTRY_DSN, ENABLE_SENTRY } from '@env';

import { ScrollView, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useURQLClient } from './src/config/urql-client';
import { Client, Provider as URQLProvider } from 'urql';
import SplashScreen from 'react-native-splash-screen';

import ApplicationLifecycle from './src/components/ApplicationLifecycle';
import FallbackComponent from './src/components/FallbackComponent';
import Navigation from './src/navigation';
import theme from './theme';
import { UserContextProvider } from './src/context/UserContext';
if (ENABLE_SENTRY === 'true') {
  Sentry.init({
    dsn: SENTRY_DSN,
    debug: true,
    integrations: [
      new Sentry.ReactNativeTracing({
        tracingOrigins: ['localhost', /^\//, /^https:\/\//],
      }),
    ],
  });
}
const App = () => {

  useEffect(()=>{
    SplashScreen.hide();
  },[])

  return (
    <PaperProvider theme={theme}>
      <ErrorBoundary fallback={FallbackComponent}>
        <URQLProvider value={useURQLClient() as Client}>
          <UserContextProvider>
            <ApplicationLifecycle>
              <GestureHandlerRootView style={styles.gestureViewCntainer}>
                <Navigation />
              </GestureHandlerRootView>
            </ApplicationLifecycle>
          </UserContextProvider>
        </URQLProvider>
      </ErrorBoundary>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  gestureViewCntainer: {
    flex: 1,
  },
});

export default Sentry.wrap(App);
// export default StorybookUI;
