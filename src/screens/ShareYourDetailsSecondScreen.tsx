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
import Input from '../components/Input';
import { BackArrowBlack } from '../../assets/discover';
import { useApplySupportFormContext } from '../context/ApplySupportFormContext';
import { CustomTheme } from '../../theme';
import localization from '../localization/en';

type ScreenProps = {
  navigation: any;
};

type SubmitProps = {
  fema: number;
  sba: number;
  privateInsurance: number;
  otherAssistance: number;
};

const ShareYourDetailsSecondScreen = ({ navigation }: ScreenProps) => {
  const formContext = useApplySupportFormContext();
  const theme = useTheme();
  const styles = makeStyles(theme);

  const onSubmit = ({
    fema,
    sba,
    privateInsurance,
    otherAssistance,
  }: SubmitProps) => {
    formContext.setData({
      fema,
      sba,
      privateInsurance,
      otherAssistance,
    });
    navigation.navigate('ShareYourDetailsThird');
  };

  const validationSchema = () =>
    yup.object().shape({
      fema: yup
        .number()
        .required(localization.validation.FEMANumberRequired)
        .typeError(localization.validation.numberRequired),
      sba: yup
        .number()
        .required(localization.validation.SBA)
        .typeError(localization.validation.numberRequired),
      privateInsurance: yup
        .number()
        .required(localization.validation.privateInsurance)
        .typeError(localization.validation.numberRequired),
      otherAssistance: yup
        .number()
        .required(localization.validation.otherAssistance)
        .typeError(localization.validation.numberRequired),
    });

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        validateOnMount={true}
        validationSchema={validationSchema}
        initialValues={{
          fema: 0,
          sba: 0,
          privateInsurance: 0,
          otherAssistance: 0,
        }}
        onSubmit={onSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => {
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
                      {localization.discover.shareDetailsSecondScreenText}
                    </Text>
                  </View>
                  <Input
                    label={localization.discover.FEMANumber}
                    name="fema"
                    placeholder={localization.discover.FEMANumber}
                    onChangeText={handleChange('fema')}
                    onBlur={handleBlur('fema')}
                    value={values.fema}
                    keyboardType="number-pad"
                    marginBottom={16}
                    touched={touched.fema}
                    errors={errors.fema}
                  />
                  <Input
                    label={localization.discover.SBA}
                    name="sba"
                    placeholder={localization.discover.SBA}
                    onChangeText={handleChange('sba')}
                    onBlur={handleBlur('sba')}
                    value={values.sba}
                    keyboardType="number-pad"
                    marginBottom={16}
                    touched={touched.sba}
                    errors={errors.sba}
                  />
                  <Input
                    label={localization.discover.privateInsurance}
                    name="privateInsurance"
                    placeholder={localization.discover.privateInsurance}
                    onChangeText={handleChange('privateInsurance')}
                    onBlur={handleBlur('privateInsurance')}
                    value={values.privateInsurance}
                    keyboardType="number-pad"
                    marginBottom={16}
                    touched={touched.privateInsurance}
                    errors={errors.privateInsurance}
                  />
                  <Input
                    label={localization.discover.otherAssistance}
                    name="otherAssistance"
                    placeholder={localization.discover.otherAssistance}
                    onChangeText={handleChange('otherAssistance')}
                    onBlur={handleBlur('otherAssistance')}
                    value={values.otherAssistance}
                    keyboardType="number-pad"
                    marginBottom={16}
                    touched={touched.otherAssistance}
                    errors={errors.otherAssistance}
                  />
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
  });

export default ShareYourDetailsSecondScreen;
