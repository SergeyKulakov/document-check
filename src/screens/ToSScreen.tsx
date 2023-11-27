import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import { Tos } from '../../assets/images';
import localization from '../localization/en';
import { Button, useTheme } from 'react-native-paper';
import { CustomTheme } from '../../theme';
import Separator from '../components/Separator';
import { HeaderLogoMain, ChevronLeft } from '../../assets/images/icons';

type ScreenProps = {
  navigation: any; // ## replace with proper navigation type
};

const ToSScreen = ({ navigation }: ScreenProps) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const acknowledge = () => {
    navigation.pop();
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <View style={styles.screenHeader}>
        <View style={styles.headerRow}>
          <View style={styles.headerItem}>
            <TouchableOpacity onPress={goBack} style={styles.headerButton}>
              <ChevronLeft
                stroke={theme.colors.custom.grayDark6}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.headerItem, styles.center]}>
            <HeaderLogoMain height={40} />
          </View>
          <View style={styles.headerItem} />
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Tos width="100%" height="100%" />
        </View>
        <Separator height={35} />
        <Text style={[styles.title, theme.fonts.custom.headline1]}>
          {localization.getStarted.tosTitle}
        </Text>
        <Separator height={20} />
        <Text style={[styles.text, theme.fonts.custom.body3]}>
          {localization.getStarted.tosText}
        </Text>
        <Separator height={15} />
        <Text style={[styles.text, theme.fonts.custom.body3]}>
          {localization.getStarted.tosText2}
        </Text>
        <Separator height={40} />
        <Text style={[styles.title, theme.fonts.custom.headline1]}>
          {localization.getStarted.privacyPolicyTitle}
        </Text>
        <Separator height={20} />
        <Text style={[styles.text, theme.fonts.custom.body3]}>
          {localization.getStarted.privacyPolicyText}
        </Text>
        <Text style={[styles.text, theme.fonts.custom.body3]}>
          {localization.getStarted.privacyPolicyText2}
        </Text>
        <Separator height={20} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={acknowledge}
          style={styles.button}
          testID="tosAcknowledgeButton">
          <Text style={[theme.fonts.custom.body1, styles.buttonLabel]}>
            {localization.getStarted.acknowledgeButton}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default ToSScreen;

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: Platform.OS === 'ios' ? 45 : 10,
      alignContent: 'space-between',
    },
    headerContainer: {
      aspectRatio: 1.8,
    },
    screenHeader: {
      height: 40,
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
      height: 25,
    },
    center: {
      alignItems: 'center',
    },
    title: {
      color: theme.colors.custom.grayDark6,
    },
    text: {
      color: theme.colors.custom.grayDark2,
    },
    scrollView: {
      flex: 1,
      flexGrow: 6,
    },
    buttonContainer: {
      flex: 1,
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
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
  });
