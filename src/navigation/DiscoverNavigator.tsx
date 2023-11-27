import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiscoverTabNavigator from './DiscoverTabNavigator';
import ApplySupportScreen from '../screens/ApplySupportScreen';
import ToSScreen from '../screens/ToSScreen';
import ApplicationSupportFormNavigator from './ApplicationSupportFormNavigator';

const Stack = createNativeStackNavigator();

const DiscoverNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DiscoverTab" component={DiscoverTabNavigator} />
      <Stack.Screen name="ToSScreen" component={ToSScreen} />
      <Stack.Screen name="ApplySupport" component={ApplySupportScreen} />
      <Stack.Screen
        name="ApplicationSupportForm"
        component={ApplicationSupportFormNavigator}
      />
    </Stack.Navigator>
  );
};

export default DiscoverNavigator;
