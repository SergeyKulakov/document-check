import React from 'react';

import {
  View,
  StyleSheet,
  Image,
  ImageResolvedAssetSource,
  StatusBar,
  Platform,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import localization from '../localization/en';
import { Logo } from '../../assets/images';
import Separator from '../components/Separator';
import { CustomTheme } from '../../theme';
import { useTheme } from 'react-native-paper';
import TextReplacer from '../components/TextReplacer';
// import { deleteSecureValue } from '../utils/auth-utils';
import { useUserContext } from '../context/UserContext';
import Spinner from '../components/Spinner';

type ScreenProps = {
  navigation: any; // TODO: replace with proper navigation type
};

const GetStartedScreen = ({ navigation }: ScreenProps) => {
  const theme: CustomTheme = useTheme();
  const styles = makeStyles(theme);

  const navigateToKYC = async () => {
    navigation.push('KYCScreen');

    // // // deleteSecureValue('kokua-app-keys'); // DANGEROUS!!! DO NOT ENABLE UNLESS YOU KNOW WHAT YOU'RE DOING
    // deleteSecureValue('kokua-app-did');
    // deleteSecureValue('kokua-app-tokens');
  };

  const navigateToTos = () => {
    navigation.push('ToSScreen');
  };

  const backgroundImg: ImageResolvedAssetSource = Image.resolveAssetSource(
    require('../../assets/images/onboarding.png'),
  );

  const userProfile = useUserContext().profile;

  if (!userProfile) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <View style={styles.backgroundContainer}>
        <Image
          source={backgroundImg}
          style={styles.backgroundImg}
          resizeMode={'contain'}
        />
      </View>
      <View style={styles.content}>
        <Logo />
        <Separator height={25} />
        <Text style={theme.fonts.custom.headline2}>
          {localization.getStarted.welcomeToKokua}
        </Text>
        <Separator height={15} />
        <Text style={[theme.fonts.custom.body3, styles.introText]}>
          {localization.getStarted.intro}
        </Text>
        <Text style={[theme.fonts.custom.body3, styles.introText]}>
          {localization.getStarted.intro2}
        </Text>
        <Separator height={60} />
        <Button
          mode="contained"
          style={styles.button}
          onPress={navigateToKYC}
          testID="getStartedButton">
          <Text style={[theme.fonts.custom.body1, styles.buttonLabel]}>
            {localization.getStarted.getStartedButton}
          </Text>
        </Button>
        <Separator height={60} />
        <TextReplacer
          placeholder={localization.getStarted.tos}
          style={[theme.fonts.custom.body4, styles.tosText]}>
          <Text
            style={[theme.fonts.custom.body4, styles.link]}
            onPress={navigateToTos}>
            {}
          </Text>
          <Text
            style={[theme.fonts.custom.body4, styles.link]}
            onPress={navigateToTos}>
            {}
          </Text>
        </TextReplacer>
        <Separator height={20} />
      </View>
    </View>
  );
};

export default GetStartedScreen;

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: Platform.OS === 'ios' ? 60 : 20,
      width: '100%',
    },
    backgroundContainer: {
      flex: 1,
      flexGrow: 2,
    },
    backgroundImg: {
      flex: 1,
      width: '100%',
    },
    content: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    buttonLabel: {
      color: theme.colors.custom.grayLight0,
      fontWeight: '800',
    },
    introText: {
      color: theme.colors.custom.grayDark2,
    },
    tosText: {
      color: theme.colors.custom.grayDark2,
      textAlign: 'center',
    },
    link: {
      color: theme.colors.custom.mainPrimary6,
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: theme.colors.custom.mainPrimary6,
    },
    button: {
      width: 340,
      height: 56,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });
