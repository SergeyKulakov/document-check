import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShareYourDetailsScreen from '../screens/ShareYourDetailsScreen';
import ShareYourDetailsSecondScreen from '../screens/ShareYourDetailsSecondScreen';
import ShareYourDetailsThirdScreen from '../screens/ShareYourDetailsThirdScreen';
import ShareYourDetailsFourthScreen from '../screens/ShareYourDetailsFourthScreen';
import AdditionalDetailsScreen from '../screens/AdditionalDetailsScreen';
import DescribeSituationScreen from '../screens/DescribeSituationScreen';
import ApplicationSubmittedScreen from '../screens/ApplicationSubmittedScreen';
import { ApplySupportFormContextProvider } from '../context/ApplySupportFormContext';

const Stack = createNativeStackNavigator();

const ApplicationSupportFormNavigator = () => {
  return (
    <ApplySupportFormContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="ShareYourDetails"
          component={ShareYourDetailsScreen}
        />
        <Stack.Screen
          name="ShareYourDetailsSecond"
          component={ShareYourDetailsSecondScreen}
        />
        <Stack.Screen
          name="ShareYourDetailsThird"
          component={ShareYourDetailsThirdScreen}
        />
        <Stack.Screen
          name="ShareYourDetailsFourth"
          component={ShareYourDetailsFourthScreen}
        />
        <Stack.Screen
          name="AdditionalDetails"
          component={AdditionalDetailsScreen}
        />
        <Stack.Screen
          name="DescribeSituation"
          component={DescribeSituationScreen}
        />
        <Stack.Screen
          name="ApplicationSubmitted"
          component={ApplicationSubmittedScreen}
        />
      </Stack.Navigator>
    </ApplySupportFormContextProvider>
  );
};

export default ApplicationSupportFormNavigator;
