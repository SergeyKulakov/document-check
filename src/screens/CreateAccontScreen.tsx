import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import localization from '../localization/en';

const CreateAccontScreen = () => {
  return (
    <View>
      <Text>{localization.auth.createAccount}</Text>
    </View>
  );
};

export default CreateAccontScreen;
