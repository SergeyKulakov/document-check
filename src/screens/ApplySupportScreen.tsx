import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { BackArrow, MapMarker, Mark } from '../../assets/discover';
import { CustomTheme } from '../../theme';
import localization from '../localization/en';
import { useUserContext } from '../context/UserContext';
import { useQuery } from 'urql';
import { GET_EVENT_DETAILS } from '../requests/events';
import Spinner from '../components/Spinner';

type ScreenProps = {
  navigation: any;
  route: any;
};

type Event = {
  id: string;
  title: string;
  location: string;
  image: string;
  bundle: {
    products: [];
  };
};

const ApplySupportScreen = ({ navigation, route }: ScreenProps) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const theme = useTheme();
  const styles = makeStyles(theme);

  const isVerified = useUserContext().isVerified;

  const eventId = route.params?.eventId;

  const handleApplySupport = () => {
    navigation.navigate('ApplicationSupportForm', {
      screen: 'ShareYourDetails',
      params: {
        event,
      },
    });
    // navigation.navigate('ShareYourDetails', { eventId }); ApplicationSupportForm
  };

  const [result, refetch] = useQuery({
    query: GET_EVENT_DETAILS,
    variables: { id: eventId },
  });
  const { data, error, fetching } = result;
  const [event, setEvent] = useState<Event>();

  useEffect(() => {
    if (error) {
      throw new Error(`Error getting event details: ${error}`);
    }
    if (data) {
      setEvent(data.GetEventDetails);
    }
  }, [data, error]);

  const renderList = () => {
    const listData:
      | {
          product: {
            name: string;
            image: {
              small: {
                url: string;
                height: number;
                width: number;
              };
            };
          };
        }[]
      | undefined = event?.bundle.products;

    return listData?.map((el, index) => (
      <View style={styles.listCard} key={`product-${index}`}>
        <Image
          source={
            el?.product.image.small?.url
              ? { uri: el?.product.image.small?.url }
              : require('../../assets/images/placeholders/product_placeholder.png')
          }
          resizeMode={'contain'}
          style={styles.productThumbnail}
        />
        <View style={styles.listCardText}>
          <Text
            style={[styles.listCardTextTitle, theme.fonts.custom.subtitle3]}>
            {el.product.name}
          </Text>
        </View>
        {index < listData.length - 1 && <View style={styles.listHr} />}
      </View>
    ));
  };

  return fetching ? (
    <Spinner />
  ) : (
    <View style={styles.container}>
      <View style={styles.imgBackgroundWrapper}>
        <Image
          source={
            event?.image
              ? { uri: event?.image }
              : require('../../assets/discover/caruselAroundImg.png')
          }
          resizeMode="cover"
          style={styles.imgBackground}
        />
        <TouchableOpacity
          style={styles.backIconWrapper}
          onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <ScrollView style={styles.sectionContainer}>
          <Text style={[styles.title, theme.fonts.custom.headline1]}>
            {event?.title}
          </Text>
          <View style={styles.subTitle}>
            <View style={styles.aroundMapWrapper}>
              <MapMarker style={styles.mapMarkerIcon} />
              <Text style={[styles.markText, theme.fonts.custom.body3]}>
                {event?.location}
              </Text>
            </View>
            {/* <View style={styles.markWrapper}>
              <View style={styles.markIconWrapper}>
                <Mark />
              </View>
              <Text style={[styles.markText, theme.fonts.custom.body3]}>
                {'DR4637TN'}
              </Text>
            </View> */}
          </View>
          <Text style={[styles.subTitleMarkText, theme.fonts.custom.body3]}>
            {localization.discover.supportProvideYou}
          </Text>
          <View style={styles.productList}>{renderList()}</View>
          <View style={styles.textContentWrapper}>
            <Text style={[styles.textContent, theme.fonts.custom.body3]}>
              {localization.discover.applySupportTextContent}
            </Text>
          </View>
          <View style={styles.checkboxWrapper}>
            <CheckBox
              disabled={false}
              boxType="square"
              value={toggleCheckBox}
              style={styles.checkbox}
              onFillColor={theme.colors.custom.mainPrimary6}
              onCheckColor={theme.colors.custom.grayLight0}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <View style={styles.checkboxTextWrapper}>
              <Text style={theme.fonts.custom.body3}>
                {localization.discover.acceptKokua}{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ToSScreen')}>
                <Text style={styles.privacyPolicy}>
                  {localization.getStarted.privacyPolicyTitle}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            disabled={!toggleCheckBox}
            onPress={handleApplySupport}
            style={styles.button}
            testID="tosAcknowledgeButton">
            <Text style={[theme.fonts.custom.body1, styles.buttonLabel]}>
              {isVerified
                ? localization.getStarted.getStartedButton
                : localization.getStarted.getVerified}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    imgBackgroundWrapper: {
      position: 'relative',
      width: '100%',
      backgroundColor: 'green',
      height: 300,
    },
    imgBackground: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: 300,
    },
    backIconWrapper: {
      position: 'absolute',
      top: 68,
      left: 24,
      width: 50,
      height: 50,
    },
    content: {
      flex: 1,
      marginTop: -20,
      paddingTop: 38,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.custom.white,
      borderRadius: 16,
    },
    sectionContainer: {
      flex: 1,
      flexGrow: 4,
    },
    title: {
      marginBottom: 20,
      color: theme.colors.custom.grayDark6,
    },
    productThumbnail: {
      width: 40,
      height: 40,
      borderRadius: 100,
      overflow: 'hidden',
    },
    delimitator: {
      borderWidth: 1,
      borderColor: theme.colors.custom.grayLight3,
    },
    subTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    subTitleMarkText: {
      marginBottom: 16,
      color: theme.colors.custom.grayDark2,
    },
    aroundMapWrapper: {
      flexDirection: 'row',
    },
    mapMarkerIcon: {
      marginRight: 9,
    },
    markText: {
      color: theme.colors.custom.grayDark2,
    },
    markWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    markIconWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 18,
      height: 18,
      marginRight: 9,
      borderRadius: 50,
      backgroundColor: theme.colors.custom.mainSecondary6,
    },
    productList: {
      marginBottom: 20,
      paddingHorizontal: 16,
      paddingVertical: 4,
      borderRadius: 16,
      backgroundColor: theme.colors.custom.grayLight1,
    },
    listCard: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
    },
    listCardText: {
      marginHorizontal: 12,
      paddingStart: 12,
      paddingEnd: 24,
    },
    listCardTextTitle: {
      color: theme.colors.custom.grayDark6,
    },
    listCardTextSubTitle: {
      color: theme.colors.custom.grayDark2,
    },
    listCardTextInfo: {
      position: 'absolute',
      right: 16,
      color: theme.colors.custom.grayDark6,
    },
    listHr: {
      position: 'absolute',
      bottom: -16,
      width: '100%',
      height: 1,
      backgroundColor: theme.colors.custom.grayLight3,
    },
    textContentWrapper: {},
    textContent: {
      width: '100%',
      color: theme.colors.custom.grayDark1,
    },
    checkboxWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 32,
    },
    checkbox: {
      marginRight: 12,
      borderWidth: 1,
      borderColor: theme.colors.custom.grayLight3,
      borderRadius: 5,
      overflow: 'hidden',
    },
    checkboxTextWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    privacyPolicy: {
      color: theme.colors.custom.mainPrimary6,
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

export default ApplySupportScreen;
