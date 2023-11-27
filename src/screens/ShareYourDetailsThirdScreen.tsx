import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import * as yup from 'yup';
import { Formik } from 'formik';
import TextInputCounter from '../../remoteLibraries/TextInputCounter';
import { BackArrowBlack } from '../../assets/discover';
import { useApplySupportFormContext } from '../context/ApplySupportFormContext';
import { CustomTheme } from '../../theme';
import localization from '../localization/en';

type ScreenProps = {
  navigation: any;
};

type SubmitProps = {
  numberOfAdults: number;
  numberOfChildren: number;
};

const ShareYourDetailsThirdScreen = ({ navigation }: ScreenProps) => {
  const formContext = useApplySupportFormContext();
  const theme = useTheme();
  const styles = makeStyles(theme);

  const onSubmit = ({ numberOfAdults, numberOfChildren }: SubmitProps) => {
    formContext.setData({
      numberOfAdults,
      numberOfChildren,
    });
    navigation.navigate('ShareYourDetailsFourth');
  };

  const validationSchema = () =>
    yup.object().shape({
      numberOfAdults: yup
        .number()
        .required(localization.validation.adults)
        .typeError(localization.validation.numberRequired),
      numberOfChildren: yup
        .number()
        .required(localization.validation.children)
        .typeError(localization.validation.numberRequired),
    });

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        validateOnMount={true}
        validationSchema={validationSchema}
        initialValues={{
          numberOfAdults: 0,
          numberOfChildren: 0,
        }}
        onSubmit={onSubmit}>
        {({ handleSubmit, setFieldValue, values, errors, touched }) => {
          return (
            <>
              <View style={styles.imgBackgroundWrapper}>
                <TouchableOpacity
                  style={styles.backIconWrapper}
                  onPress={() => navigation.goBack()}>
                  <BackArrowBlack />
                </TouchableOpacity>
                <Text style={theme.fonts.custom.subtitle3}>
                  {localization.discover.shareYourDdetails}
                </Text>
              </View>
              <View style={styles.content}>
                <ScrollView style={styles.sectionContainer}>
                  <View style={styles.textContentWrapper}>
                    <Text
                      style={[styles.textContent, theme.fonts.custom.body3]}>
                      {localization.discover.shareDetailsThirdText}
                    </Text>
                  </View>
                  <View style={styles.cardWrapper}>
                    <Text>{localization.discover.adults}</Text>
                    <TextInputCounter
                      onChange={(value) =>
                        setFieldValue('numberOfAdults', value)
                      }
                      totalWidth={98}
                      totalHeight={30}
                      minValue={0}
                      maxValue={100}
                      iconSize={25}
                      valueType="real"
                      rounded
                      textColor="#101719"
                      iconStyle={{ color: 'white' }}
                      rightButtonBackgroundColor={
                        theme.colors.custom.grayLight1
                      }
                      leftButtonBackgroundColor={theme.colors.custom.grayLight1}
                    />
                  </View>
                  <View style={styles.cardWrapper}>
                    <Text>{localization.discover.children}</Text>
                    <TextInputCounter
                      onChange={(value) =>
                        setFieldValue('numberOfChildren', value)
                      }
                      totalWidth={98}
                      totalHeight={30}
                      minValue={0}
                      maxValue={100}
                      iconSize={25}
                      valueType="real"
                      rounded
                      textColor="#101719"
                      iconStyle={{ color: 'white' }}
                      rightButtonBackgroundColor={
                        theme.colors.custom.grayLight1
                      }
                      leftButtonBackgroundColor={theme.colors.custom.grayLight1}
                    />
                  </View>
                </ScrollView>
                <View style={styles.buttonContainer}>
                  <Button
                    mode="contained"
                    disabled={!!Object.keys(errors).length}
                    onPress={handleSubmit}
                    style={styles.button}
                    testID="tosAcknowledgeButton">
                    <Text
                      style={[theme.fonts.custom.body1, styles.buttonLabel]}>
                      {localization.discover.next}
                    </Text>
                  </Button>
                </View>
              </View>
            </>
          );
        }}
      </Formik>
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
    cardWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 64,
      marginBottom: 20,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.custom.grayLight1,
      borderRadius: 12,
    },
  });

export default ShareYourDetailsThirdScreen;
