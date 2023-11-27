import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiscoverBottomTab from './DiscoverBottomTab';
import DiscoverInfoScreen from '../screens/DiscoverInfoScreen';
import WalletScreen from '../screens/WalletScreen';
import SupportApplicationScreen from '../screens/SupportApplicationScreen';
import IdentityScreen from '../screens/IdentityScreen';

const Tab = createBottomTabNavigator();

const DiscoverTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <DiscoverBottomTab {...props} />}>
      <Tab.Screen name="DiscoverInfo" component={DiscoverInfoScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen
        name="Support application"
        component={SupportApplicationScreen}
      />
      <Tab.Screen name="Identity" component={IdentityScreen} />
    </Tab.Navigator>
  );
};

export default DiscoverTabNavigator;
