import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { BackArrowBlack, GalleryIcon, CameraIcon } from '../../assets/discover';
import { CustomTheme } from '../../theme';
import localization from '../localization/en';

type ScreenProps = {
  navigation: any;
};

const DescribeSituationScreen = ({ navigation }: ScreenProps) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgBackgroundWrapper}>
        <TouchableOpacity
          style={styles.backIconWrapper}
          onPress={() => navigation.goBack()}>
          <BackArrowBlack />
        </TouchableOpacity>
        <Text style={theme.fonts.custom.subtitle3}>
          {localization.discover.describeSituation}
        </Text>
      </View>
      <View style={styles.content}>
        <ScrollView style={styles.sectionContainer}>
          <View style={styles.textContentWrapper}>
            <Text style={[styles.textContent, theme.fonts.custom.body3]}>
              {localization.discover.shareYourDetailsScreenText}
            </Text>
          </View>
          <TouchableOpacity style={styles.card}>
            <GalleryIcon style={styles.cardIcon} />
            <Text style={theme.fonts.custom.subtitle3}>
              {localization.discover.uploadVideoFromGallery}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <CameraIcon style={styles.cardIcon} />
            <Text style={theme.fonts.custom.subtitle3}>
              {localization.discover.recordVideo}
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => {}}
            style={styles.button}
            testID="tosAcknowledgeButton">
            <Text style={[theme.fonts.custom.body1, styles.buttonLabel]}>
              {localization.discover.next}
            </Text>
          </Button>
          <Button
            onPress={() => {}}
            style={styles.button}
            testID="tosAcknowledgeButton">
            <Text style={[theme.fonts.custom.body1, styles.buttonSkip]}>
              {localization.discover.skipForNow}
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
    },
    imgBackgroundWrapper: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
    },
    backIconWrapper: {
      position: 'absolute',
      left: 24,
      justifyContent: 'center',
      width: 50,
      height: 50,
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
    textContent: {
      width: '100%',
      color: theme.colors.custom.grayDark1,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 64,
      marginBottom: 16,
      paddingLeft: 16,
      borderRadius: 12,
      backgroundColor: theme.colors.custom.grayLight1,
    },
    cardIcon: {
      marginRight: 18,
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

export default DescribeSituationScreen;
