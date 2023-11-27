import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
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
  [key: string]: number;
};

const ShareYourDetailsThirdScreen = ({ navigation }: ScreenProps) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const formContext = useApplySupportFormContext();

  const onSubmit = (props: SubmitProps) => {
    const products: any[] = Object.values(props);

    formContext.setData({ products });
    formContext.handleSubmit().then(() => {
      navigation.navigate('ApplicationSubmitted');
    });
  };

  const eventData: any = formContext.eventData;
  const bundleProducts = eventData.bundle.products.map((el) => el.product);
  const initialValues = bundleProducts.reduce(
    (acc: {}, el: any) => ({
      ...acc,
      [el.asin]: {
        asin: el.asin,
        quantity: 0,
      },
    }),
    {},
  );

  const [products, setProducts] = useState(Object.values(initialValues));

  const updateField = ({ asin, quantity }) => {
    const newProducts = products.map((e) =>
      e.asin === asin ? { ...e, quantity } : e,
    );
    setProducts(newProducts);
    formContext.setData({ products: newProducts });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                  {localization.discover.applicationForm}
                </Text>
              </View>
              <View style={styles.content}>
                <ScrollView style={styles.sectionContainer}>
                  <View style={styles.textContentWrapper}>
                    <Text
                      style={[styles.textContent, theme.fonts.custom.body3]}>
                      {localization.discover.shareDetailsFourthText}
                    </Text>
                  </View>
                  {bundleProducts.map((prod: any, index: number) => {
                    return (
                      <View style={styles.cardWrapper} key={`prod-${index}`}>
                        <Text>{prod.name}</Text>
                        <TextInputCounter
                          onChange={(value: number) =>
                            updateField({
                              asin: prod.asin,
                              quantity: value,
                            })
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
                          leftButtonBackgroundColor={
                            theme.colors.custom.grayLight1
                          }
                        />
                      </View>
                    );
                  })}
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
