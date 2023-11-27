import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useEffect } from 'react';
import brandLogo from '../../assets/images/kokua.png';
import {
  IdentityVerificationSheetOptions,
  useStripeIdentity,
} from '@stripe/stripe-identity-react-native';
import { useMutation } from 'urql';
import { KYC_PARAMS } from '../requests/kyc';
import { Button, useTheme } from 'react-native-paper';
import { CustomTheme } from '../../theme';
import { KycBg, FooterLogo } from '../../assets/images/kyc';
import { ChevronLeft, HeaderLogoWhite } from '../../assets/images/icons/';
import localization from '../localization/en';
import Separator from '../components/Separator';
import Spinner from '../components/Spinner';

type ScreenProps = {
  navigation: any; // TODO: replace with proper navigation type
};

const KYCScreen = ({ navigation }: ScreenProps) => {
  const theme: CustomTheme = useTheme();
  const styles = makeStyles(theme);

  const [fetchParamsResult, fetchParams] = useMutation(KYC_PARAMS);

  const getStripeParams =
    async (): Promise<IdentityVerificationSheetOptions> => {
      return fetchParams({})
        .then((result) => {
          const { data, error } = result;

          if (error) {
            throw new Error(`Error in KYC mutation ${error}`);
          }

          if (data.Kyc) {
            console.log('stripe session id:', data.Kyc.SessionID);
            return {
              sessionId: data.Kyc.SessionID,
              ephemeralKeySecret: data.Kyc.EphemeralKeySecret,
              brandLogo: Image.resolveAssetSource(brandLogo),
            };
          }

          throw new Error('KYC mutation failed');
        })
        .catch((err) => {
          throw new Error(`Caught error in KYC mutation ${err}`);
        });
    };

  const { status, present, loading } = useStripeIdentity(getStripeParams);
  const { fetching } = fetchParamsResult;

  useEffect(() => {
    console.log({ status, loading });
    if (status === 'FlowCompleted') {
      navigation.replace('Discover');
    }
  }, [status, loading, navigation]);

  const startKyc = React.useCallback(() => {
    present();
  }, [present]);

  const skipKyc = () => {
    navigation.replace('Discover');
  };
  const goBack = () => {
    navigation.goBack();
  };

  return loading || fetching ? (
    <Spinner />
  ) : (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KycBg width={'100%'} style={styles.backgroundImg} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.headerItem}>
              <TouchableOpacity onPress={goBack} style={styles.headerButton}>
                <ChevronLeft
                  stroke={theme.colors.custom.grayLight0}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.headerItem, styles.center]}>
              <HeaderLogoWhite height={40} />
            </View>
            <View style={styles.headerItem} />
          </View>
        </View>
        <View style={styles.body}>
          {/* <Separator height={80} /> */}
          <Text style={[theme.fonts.custom.headline1, styles.white]}>
            {localization.kyc.headline}
          </Text>
          <Separator height={20} />
          <Text style={[theme.fonts.custom.body3, styles.white]}>
            {localization.kyc.subtitle}
          </Text>
        </View>
        <View style={styles.footer}>
          <Button mode="contained" style={styles.button} onPress={startKyc}>
            <Text style={[theme.fonts.custom.subtitle2, styles.buttonLabel]}>
              {localization.kyc.verifyNowButton}
            </Text>
          </Button>
          <Separator height={16} />
          <Button style={styles.button} onPress={skipKyc}>
            <Text style={[theme.fonts.custom.subtitle2, styles.buttonLabel]}>
              {localization.kyc.skipButton}
            </Text>
          </Button>
          <Separator height={40} />
          <FooterLogo width="100%" />
          <Separator height={20} />
        </View>
      </View>
    </View>
  );
};

export default KYCScreen;

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.custom.mainPrimary6,
    },
    content: {
      paddingHorizontal: 16,
      paddingVertical: Platform.OS === 'ios' ? 60 : 20,
      flex: 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      flexDirection: 'column',
      alignContent: 'space-between',
    },
    backgroundContainer: {
      flex: 1,
      position: 'relative',
      top: 0,
    },
    backgroundImg: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    header: {
      flex: 1,
      alignItems: 'flex-start',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    headerItem: {
      width: '33%',
    },
    headerButton: {
      width: 25,
      height: 25,
    },
    body: {
      flex: 1,
      alignContent: 'center',
    },
    footer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    white: {
      color: theme.colors.custom.grayLight0,
      textAlign: 'center',
    },
    button: {
      height: 56,
      width: 340,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    buttonLabel: {
      color: theme.colors.custom.grayLight0,
    },
    center: {
      alignItems: 'center',
    },
  });
