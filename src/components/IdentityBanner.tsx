import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { DiscoverVerifyTab, UserIcon } from '../../assets/discover'; // TODO: move assets to shared generic section
import { CustomTheme } from '../../theme';
import { Text, useTheme } from 'react-native-paper';
import localization from '../localization/en';
import { User } from '../types/user';

type Props = {
  kycNavigation: any;
  profile: User | null;
};

const width = Dimensions.get('window').width;

const IdentityBanner = ({ kycNavigation, profile }: Props) => {
  const theme = useTheme();
  const styles = makeStyles({ ...theme, width: width });

  const kycDoneStatuses: (string | undefined | null)[] = [
    'Verified',
    'Processing',
  ];

  const getTexts = (
    status: any,
  ): { top: string; bottom: string | undefined | null } => {
    switch (status) {
      case 'Verified':
        return {
          top: `${localization.discover.verifyIdentity.greeting} ${profile?.firstName}`,
          bottom: null,
        };
      case 'Processing':
        return {
          top: localization.discover.verifyIdentity.verificationPending,
          bottom: localization.discover.verifyIdentity.wait,
        };
      case 'RequireMoreInfo':
        return {
          top: localization.discover.verifyIdentity.moreInfo,
          bottom: profile?.kycReason,
        };
      case 'RequireMoreInfo':
      default:
        return {
          top: localization.discover.verifyYourIdentity,
          bottom: localization.discover.pleaseVerifyYourIdentity,
        };
    }
  };

  return (
    <View style={styles.verifyWraqpper}>
      <DiscoverVerifyTab style={styles.verifyBackground} />
      <View style={styles.verifyContent}>
        <View style={styles.verifyIconWrapper}>
          <UserIcon />
        </View>
        <TouchableOpacity
          disabled={kycDoneStatuses.includes(profile?.kycStatus)}
          onPress={kycNavigation}>
          <View style={styles.textContainer}>
            <Text style={[theme.fonts.custom.headline2, styles.verifyTitle]}>
              {getTexts(profile?.kycStatus).top}
            </Text>
            {profile?.kycStatus !== 'Verified' && (
              <Text style={[theme.fonts.custom.body3, styles.verifyText]}>
                {getTexts(profile?.kycStatus).bottom}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IdentityBanner;

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    verifyWraqpper: {
      position: 'relative',
      width: '100%',
      marginTop: 24,
    },
    verifyBackground: {
      width: '100%',
      height: width / 2.41,
    },
    verifyContent: {
      position: 'absolute',
      top: (width / 2.41) * 0.37 - 32.5,
      left: 19,
      flexDirection: 'row',
    },
    verifyIconWrapper: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: 65,
      height: 65,
      marginRight: 12,
      borderRadius: 100,
      backgroundColor: theme.colors.custom.grayLight0,
      overflow: 'hidden',
    },
    textContainer: {
      height: 65,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    verifyTitle: {
      color: theme.colors.custom.grayLight0,
    },
    verifyText: {
      color: theme.colors.custom.grayLight0,
      opacity: 0.6,
    },
  });
