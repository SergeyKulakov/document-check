import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import localization from '../localization/en';

const WalletScreen = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <Text style={theme.fonts.custom.headline1}>
        {localization.discover.wallet}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 60 : 20,
  },
});

export default WalletScreen;
