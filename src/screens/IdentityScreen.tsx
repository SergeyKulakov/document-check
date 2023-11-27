import React from 'react';
import { StyleSheet, Platform, StatusBar, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import localization from '../localization/en';

import { CustomTheme } from '../../theme';
import IdentityBanner from '../components/IdentityBanner';
import IdentityBlock from '../components/IdentityBlock';
import Separator from '../components/Separator';
import { useUserContext } from '../context/UserContext';

type ScreenProps = {
  navigation: any;
};

const IdentityScreen = ({ navigation }: ScreenProps) => {
  const theme: CustomTheme = useTheme();
  const styles = makeStyles({ ...theme });

  const goToKyc = () => {
    navigation.push('GetStarted', {
      screen: 'KYCScreen',
    });
  };

  const blocks = ['email', 'phone', 'kyc'];

  const userProfile = useUserContext().profile;

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <Text style={theme.fonts.custom.headline1}>
        {localization.discover.identity}
      </Text>

      <IdentityBanner kycNavigation={goToKyc} profile={userProfile} />

      <Separator height={40} />
      <Text style={theme.fonts.custom.headline3}>
        {localization.identity.verifyHeadline}
      </Text>
      <Separator height={6} />
      <Text style={[theme.fonts.custom.body3, styles.grayDark1]}>
        {localization.identity.verifyBody}
      </Text>
      <Separator height={16} />
      {blocks.map((e) => (
        <IdentityBlock
          key={`block-${e}`}
          type={e}
          userProfile={userProfile}
          navigation={navigation}
        />
      ))}
      <Separator height={60} />
    </ScrollView>
  );
};

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: Platform.OS === 'ios' ? 60 : 20,
    },
    grayDark1: {
      color: theme.colors.custom.grayDark1,
    },
  });

export default IdentityScreen;
