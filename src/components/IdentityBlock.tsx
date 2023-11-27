import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { CustomTheme } from '../../theme';
import { User } from '../types/user';
import {
  Email,
  EmailVerified,
  Kyc,
  KycVerified,
  Phone,
  PhoneVerified,
  Check,
} from '../../assets/images/identity';
import localization from '../localization/en';

type Props = {
  type: string;
  userProfile: User | null;
  navigation: any;
};

const IdentityBlock = ({ type, userProfile, navigation }: Props) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const isDisabled = ['email', 'phone'].includes(type);

  const getIsVerified = (field: string) => {
    if (field === 'kyc') {
      return userProfile?.kycStatus === 'Verified';
    }

    return false;
  };

  const getIsPending = (field: string) => {
    if (field === 'kyc') {
      return userProfile?.kycStatus === 'Processing';
    }

    return false;
  };

  const isVerified = getIsVerified(type);
  const isPending = getIsPending(type);

  const navigateToVerify = () => {
    switch (type) {
      case 'kyc':
        navigation.navigate('GetStarted', {
          screen: 'KYCScreen',
        });
        break;
      default:
        return;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'kyc':
        if (getIsVerified('kyc')) {
          return <KycVerified />;
        }
        return <Kyc />;
      case 'phone':
        if (getIsVerified('phone')) {
          return <PhoneVerified />;
        }
        return <Phone />;
      case 'email':
      default:
        if (getIsVerified('email')) {
          return <EmailVerified />;
        }
        return <Email />;
    }
  };

  const texts: { [key: string]: string } = localization.identity;

  return (
    <TouchableOpacity
      disabled={isDisabled || isVerified || isPending}
      onPress={navigateToVerify}>
      <View
        style={[
          styles.container,
          isDisabled && styles.disabled,
          isVerified && styles.verified,
        ]}>
        <View style={styles.leftSection}>
          <View style={styles.icon}>{getIcon()}</View>
          <View style={styles.body}>
            <Text style={theme.fonts.custom.headline3}>
              {texts[type + 'Headline']}
            </Text>
            <Text
              style={
                (theme.fonts.custom.body3,
                isVerified
                  ? styles.verifiedText
                  : isPending
                  ? styles.pedingText
                  : styles.grayDark1)
              }>
              {isVerified
                ? texts.verified
                : isPending
                ? texts.pending
                : texts[type + 'Body']}
            </Text>
          </View>
        </View>
        {isVerified && <Check />}
      </View>
    </TouchableOpacity>
  );
};

export default IdentityBlock;

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      height: 100,
      borderRadius: 12,
      backgroundColor: theme.colors.custom.grayLight1,
      marginVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    leftSection: {
      flexDirection: 'row',
    },
    disabled: {
      opacity: 0.5,
    },
    verified: {
      backgroundColor: theme.colors.custom.mainSecondary1,
    },
    pedingText: {
      color: theme.colors.custom.mainAdditional6,
      fontWeight: '700',
    },
    verifiedText: {
      color: theme.colors.custom.mainSecondary6,
      fontWeight: '700',
    },
    grayDark1: {
      color: theme.colors.custom.grayDark1,
    },
    body: {
      justifyContent: 'space-evenly',
    },
    icon: { marginRight: 12 },
  });
