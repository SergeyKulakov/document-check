import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { BackArrowBlack } from '../../assets/discover';
import TextArea from '../components/TextArea';
import { CustomTheme } from '../../theme';
import localization from '../localization/en';

type ScreenProps = {
  navigation: any;
};

const AdditionalDetailsScreen = ({ navigation }: ScreenProps) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [textAreaValue, setTextAreaValue] = useState('');

  const onSubmit = () => {
    navigation.navigate('ApplicationSubmitted');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgBackgroundWrapper}>
        <TouchableOpacity
          style={styles.backIconWrapper}
          onPress={() => navigation.goBack()}>
          <BackArrowBlack />
        </TouchableOpacity>
        <Text style={theme.fonts.custom.subtitle3}>
          {localization.discover.additionalDetails}
        </Text>
      </View>
      <View style={styles.content}>
        <ScrollView style={styles.sectionContainer}>
          <View style={styles.textContentWrapper}>
            <Text style={[styles.textContent, theme.fonts.custom.body3]}>
              {localization.discover.shareYourDetailsScreenText}
            </Text>
          </View>
          <TextArea
            name="socialSecurityNumber"
            placeholder={localization.discover.description}
            onChangeText={setTextAreaValue}
            value={textAreaValue}
            keyboardType="number-pad"
            marginBottom={32}
          />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={onSubmit}
            style={styles.button}
            testID="tosAcknowledgeButton">
            <Text style={[theme.fonts.custom.body1, styles.buttonLabel]}>
              {localization.discover.next}
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
  });

export default AdditionalDetailsScreen;
