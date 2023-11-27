import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccontScreen from '../screens/CreateAccontScreen';
import ScrollViewContainer from '../components/ScrollViewContainer';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <ScrollViewContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="CreateAccont" component={CreateAccontScreen} />
      </Stack.Navigator>
    </ScrollViewContainer>
  );
};

export default AuthNavigator;
