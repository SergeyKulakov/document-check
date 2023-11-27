import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStartedScreen from '../screens/GetStartedScreen';
import ToSScreen from '../screens/ToSScreen';
import KYCScreen from '../screens/KYCScreen';
import ScrollViewContainer from '../components/ScrollViewContainer';

const Stack = createNativeStackNavigator();

const GetStartedNavigator = () => {
  return (
    <ScrollViewContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
        <Stack.Screen name="ToSScreen" component={ToSScreen} />
        <Stack.Screen name="KYCScreen" component={KYCScreen} />
      </Stack.Navigator>
    </ScrollViewContainer>
  );
};

export default GetStartedNavigator;
