import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStartedNavigator from './GetStartedNavigator';
import RNBootSplash from 'react-native-bootsplash';
import AuthNavigator from './AuthNavigator';
import DiscoverNavigator from './DiscoverNavigator';
import theme from '../../theme';
import { useUserContext } from '../context/UserContext';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.custom.grayLight0,
  },
};

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { kycStarted } = useUserContext();

  return (
    <NavigationContainer theme={MyTheme} onReady={() => RNBootSplash.hide()}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!kycStarted && (
          <Stack.Screen name="GetStarted" component={GetStartedNavigator} />
        )}
        <Stack.Screen name="Discover" component={DiscoverNavigator} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
