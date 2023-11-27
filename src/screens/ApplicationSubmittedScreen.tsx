import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { KokuaLogoSmallPurple, Checked } from '../../assets/discover';
// import DiscoverCaruselAroundCard from '../components/DiscoverCaruselAroundCard';
import { CustomTheme } from '../../theme';
import localization from '../localization/en';

type ScreenProps = {
  navigation: any;
};

const ApplicationSubmittedScreen = ({ navigation }: ScreenProps) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const handleNav = (route: string) => {
    navigation.navigate(route);
  };

  const goToApplications = () => {
    navigation.replace('Discover', {
      screen: 'Support application',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KokuaLogoSmallPurple style={styles.headerLogo} />
      <Checked />
      <View style={styles.content}>
        <ScrollView style={styles.sectionContainer}>
          <Text style={[styles.textTitle, theme.fonts.custom.headline1]}>
            {localization.discover.applicationSubmitted}
          </Text>
          <Text style={[styles.textContent, theme.fonts.custom.body3]}>
            {localization.discover.thankYouprovidingInfo}
          </Text>
          {/* <View style={styles.cardWrapper}>
            <DiscoverCaruselAroundCard
              titleAroundFirst={
                localization.discover.caruselAroundContentTitleFirst
              }
              titleAroundSecond={
                localization.discover.caruselAroundContentTitleSecond
              }
              location={localization.discover.kansas}
              indicatorIndex={1}
              onPress={() => handleNav('ApplySupport')}
            />
          </View> */}
          <Text style={[styles.textContent, theme.fonts.custom.body3]}>
            {localization.discover.yourRequestMayTake}
          </Text>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => goToApplications()}
            style={styles.button}
            testID="tosAcknowledgeButton">
            <Text style={[theme.fonts.custom.body1, styles.buttonLabel]}>
              {localization.discover.gotIt}
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerLogo: {
      marginTop: 32,
      marginBottom: 41,
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.custom.white,
      borderRadius: 16,
    },
    sectionContainer: {
      flex: 1,
      flexGrow: 6,
    },
    textContentWrapper: {
      marginVertical: 20,
    },
    textTitle: {
      width: '100%',
      marginTop: 20,
      marginBottom: 12,
      textAlign: 'center',
      color: theme.colors.custom.primary,
    },
    textContent: {
      width: '100%',
      marginBottom: 20,
      textAlign: 'center',
      color: theme.colors.custom.grayDark1,
    },
    cardWrapper: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonContainer: {
      flex: 1,
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingBottom: 16,
    },
    button: {
      height: 56,
      width: 340,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    buttonLabel: {
      color: theme.colors.custom.grayLight0,
      fontWeight: '800',
    },
    buttonSkip: {
      color: theme.colors.custom.grayDark6,
      fontWeight: '800',
    },
  });

export default ApplicationSubmittedScreen;
