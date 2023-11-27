import React, { useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import * as yup from 'yup';
import { Formik } from 'formik';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import { BackArrowBlack } from '../../assets/discover';
import { useApplySupportFormContext } from '../context/ApplySupportFormContext';
import { CustomTheme } from '../../theme';
import localization from '../localization/en';
import { useUserContext } from '../context/UserContext';

type ScreenProps = {
  navigation: any;
  route: any;
};

type SubmitProps = {
  fullname: string;
  email: string;
  phoneNumber: string;
  adress: string;
  householdIncome: string;
  typeOfStructure: string;
  ownership: string;
  referringAgency: string;
};

const ShareYourDetailsScreen = ({ navigation, route }: ScreenProps) => {
  const formContext = useApplySupportFormContext();
  const theme = useTheme();
  const styles = makeStyles(theme);

  const typesStructuresArray = ['House', 'Apartment', 'Trailer'];
  const ownershipArray = ['Own', 'Rent'];

  const { profile } = useUserContext();

  const onSubmit = ({
    fullname,
    email,
    phoneNumber,
    adress,
    householdIncome,
    typeOfStructure,
    ownership,
    referringAgency,
  }: SubmitProps) => {
    formContext.setData({
      fullname,
      email,
      phoneNumber,
      adress,
      householdIncome,
      typeOfStructure,
      ownership,
      referringAgency,
    });

    navigation.navigate('ShareYourDetailsSecond');
  };

  useEffect(() => {
    formContext.setEventData(route.params.event);
  });

  function validationSchema() {
    return yup.object().shape({
      fullname: yup
        .string()
        .required(localization.validation.fullNameRequired)
        .typeError(localization.validation.stringRequired),
      email: yup
        .string()
        .email(localization.validation.pleaseValidEmail)
        .required(localization.validation.emailAddressRequired)
        .typeError(localization.validation.stringRequired),
      phoneNumber: yup
        .number()
        .test(
          'len',
          localization.validation.phoneNumberInvalid,
          (val) => val?.toString().length === 10,
        )
        .required(localization.validation.phoneNumberRequired)
        .typeError(localization.validation.numberRequired),
      adress: yup
        .string()
        .required(localization.validation.adressRequired)
        .typeError(localization.validation.stringRequired),
      householdIncome: yup
        .number()
        .required(localization.validation.householdIncome)
        .typeError(localization.validation.numberRequired),
      typeOfStructure: yup
        .string()
        .required(localization.validation.typeOfStructure)
        .typeError(localization.validation.stringRequired),
      ownership: yup
        .string()
        .required(localization.validation.ownership)
        .typeError(localization.validation.stringRequired),
      referringAgency: yup
        .string()
        .required(localization.validation.referringAgency)
        .typeError(localization.validation.stringRequired),
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        validateOnMount={true}
        validationSchema={validationSchema}
        initialValues={{
          fullname: profile?.firstName + ' ' + profile?.lastName,
          email: '',
          phoneNumber: '',
          adress: [
            profile?.address?.street,
            profile?.address?.city,
            profile?.address?.state,
            profile?.address?.country,
            profile?.address?.postalCode,
          ].join(', '),
          householdIncome: '',
          typeOfStructure: '',
          ownership: '',
          referringAgency: '',
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
                      {localization.discover.shareYourDetailsScreenText}
                    </Text>
                  </View>
                  <Input
                    name="fullname"
                    placeholder={localization.discover.nameSurname}
                    onChangeText={handleChange('fullname')}
                    onBlur={handleBlur('fullname')}
                    value={values.fullname}
                    marginBottom={16}
                    touched={touched.fullname}
                    errors={errors.fullname}
                    editable={false}
                  />
                  <Input
                    label={localization.discover.emailAddress}
                    name="email"
                    placeholder={localization.discover.emailAddress}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    onReset={() => setFieldValue('email', '')}
                    value={values.email}
                    keyboardType="email-address"
                    marginBottom={16}
                    touched={touched.email}
                    errors={errors.email}
                  />
                  <View style={styles.phoneNumberWrapper}>
                    <View style={styles.flagWrapper}>
                      <Image
                        source={require('../../assets/flags/us.png')}
                        style={styles.flag}
                      />
                      <Text>+1</Text>
                    </View>
                    <View style={styles.phoneInputWrapper}>
                      <Input
                        label={localization.discover.phoneNumber}
                        name="phoneNumber"
                        placeholder={localization.discover.phoneNumber}
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        value={values.phoneNumber}
                        keyboardType="number-pad"
                        marginBottom={16}
                        touched={touched.phoneNumber}
                        errors={errors.phoneNumber}
                      />
                    </View>
                  </View>
                  <Input
                    label={localization.discover.address}
                    name="adress"
                    placeholder={localization.discover.address}
                    onChangeText={handleChange('adress')}
                    onBlur={handleBlur('adress')}
                    onReset={() => setFieldValue('adress', '')}
                    value={values.adress}
                    marginBottom={16}
                    touched={touched.adress}
                    errors={errors.adress}
                    editable={false}
                  />
                  <Input
                    name="householdIncome"
                    keyboardType={'number-pad'}
                    placeholder={localization.discover.householdIncome}
                    onChangeText={handleChange('householdIncome')}
                    onBlur={handleBlur('householdIncome')}
                    value={values.householdIncome}
                    marginBottom={16}
                    touched={touched.householdIncome}
                    errors={errors.householdIncome}
                  />
                  <View style={styles.dropdownsWrapper}>
                    <View style={styles.dropdownContent}>
                      <Dropdown
                        data={typesStructuresArray}
                        placeholder={localization.discover.typeOfStructure}
                        onChangeValue={handleChange('typeOfStructure')}
                        marginBottom={16}
                        touched={touched.typeOfStructure}
                        errors={errors.typeOfStructure}
                      />
                    </View>
                    <View style={styles.dropdownContent}>
                      <Dropdown
                        data={ownershipArray}
                        placeholder={localization.discover.ownership}
                        onChangeValue={handleChange('ownership')}
                        marginBottom={16}
                        touched={touched.ownership}
                        errors={errors.ownership}
                      />
                    </View>
                  </View>
                  <Input
                    name="referringAgency"
                    placeholder={localization.discover.referringAgency}
                    onChangeText={handleChange('referringAgency')}
                    onBlur={handleBlur('referringAgency')}
                    value={values.referringAgency}
                    marginBottom={16}
                    touched={touched.referringAgency}
                    errors={errors.referringAgency}
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
    phoneNumberWrapper: {
      flexDirection: 'row',
      width: '100%',
    },
    phoneInputWrapper: {
      flex: 1,
    },
    flagWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 73,
      height: 56,
      marginRight: 16,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: theme.colors.custom.grayLight1,
    },
    flag: {
      width: 18,
      height: 12,
    },
    dropdownsWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    dropdownContent: {
      width: '47%',
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

export default ShareYourDetailsScreen;
