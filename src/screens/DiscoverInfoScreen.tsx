import React, { useEffect, useState, useRef } from 'react';
import {
  RefreshControl,
  Dimensions,
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import { NoMapMark } from '../../assets/discover';
import DiscoverCaruselAroundCard from '../components/DiscoverCaruselAroundCard';
import { CustomTheme } from '../../theme';
import IdentityBanner from '../components/IdentityBanner';
import localization from '../localization/en';
import Separator from '../components/Separator';
import { useUserContext } from '../context/UserContext';
import { GET_DISCOVER_MAIN } from '../requests/discover';
import { useQuery } from 'urql';
import Spinner from '../components/Spinner';

const width = Dimensions.get('window').width;

type ScreenProps = {
  navigation: any;
};
type Agency = {
  name: string;
  description: string;
  logo: string;
};
type Event = {
  id: string;
  title: string;
  location: string;
  image: string;
  agency: Agency;
};

function DiscoverInfoScreen({ navigation }: ScreenProps) {
  const theme = useTheme();
  const styles = makeStyles({ ...theme, width: width });

  const userContext = useUserContext();

  const [events, setEvents] = useState<Event[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);

  const [getHomeScreen, refetchHomeScreen] = useQuery({
    query: GET_DISCOVER_MAIN,
  });
  const { data, fetching, error } = getHomeScreen;

  const refetchedUserProfile = useRef(false);

  useEffect(() => {
    if (error) {
      throw new Error(`Error getting main screen data: ${error}`);
    }
    if (data) {
      setEvents(data.ListEvents);
      setAgencies(data.ListAgencies);
    }
  }, [data, error]);

  useEffect(() => {
    if (refetchedUserProfile.current) {
      return;
    }

    userContext.refetchProfile();
    refetchedUserProfile.current = true;
  });

  const goToKyc = () => {
    navigation.push('GetStarted', {
      screen: 'KYCScreen',
    });
  };

  const goToEventDetails = (event: { id: string }) => {
    navigation.navigate('ApplySupport', { eventId: event.id });
  };

  const userProfile = userContext.profile;

  const [refreshing] = useState(false);

  const refresh = () => {
    refetchHomeScreen({
      requestPolicy: 'network-only',
    });
  };

  if (fetching) {
    return <Spinner />;
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <View style={styles.discoverTitleWrapper}>
        <Text style={[styles.title, theme.fonts.custom.headline1]}>
          {localization.discover.discover}
        </Text>
        {/* <View style={styles.discoveIconsWrapper}>
          <QrCode style={styles.qrCodeIcon} />
          <Bell />
        </View> */}
      </View>
      <IdentityBanner kycNavigation={goToKyc} profile={userProfile} />
      <View style={styles.aroundWrapper}>
        <View style={styles.aroundTitleWrapper}>
          <Text style={[styles.title, theme.fonts.custom.subtitle1]}>
            {localization.discover.aroundYou}
          </Text>
          {events.length > 0 && (
            <View style={styles.aroundNumber}>
              <Text style={styles.aroundNumberText}>{events.length}</Text>
            </View>
          )}
        </View>
        <View style={styles.aroundContentWrapper}>
          {events.length ? (
            <View style={styles.caruselWrapper}>
              <Carousel
                loop={false}
                width={325}
                data={[...new Array(events.length).keys()]}
                style={styles.carusel}
                renderItem={({ index }) => {
                  return (
                    <DiscoverCaruselAroundCard
                      titleAroundFirst={events[index].title}
                      location={events[index].location}
                      onPress={() => goToEventDetails(events[index])}
                      image={events[index].image}
                    />
                  );
                }}
              />
            </View>
          ) : (
            <>
              <NoMapMark style={styles.noMapMarkIcon} />
              <Text style={[styles.text, theme.fonts.custom.body3]}>
                {localization.discover.weCantFindAnySupportsAroundYou}
              </Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.organizationsTitlesWrapper}>
        <Text style={[styles.title, theme.fonts.custom.subtitle1]}>
          {localization.discover.organizations}
        </Text>
        {/* <Text style={styles.viewAllText}>{localization.discover.viewAll}</Text> */}
      </View>
      <View style={styles.caruselWrapper}>
        <Carousel
          loop={false}
          width={156}
          data={agencies}
          snapEnabled={false}
          style={styles.carusel}
          renderItem={({ index }) => {
            const { logo, name } = agencies[index];
            return (
              <View style={styles.caruselContent}>
                <Image
                  source={
                    logo
                      ? { uri: logo }
                      : require('../../assets/discover/caruselIcon1.png')
                  }
                  style={styles.caruselImg}
                />
                <Text style={styles.caruselText}>{name}</Text>
              </View>
            );
          }}
        />
      </View>
      <Separator height={70} />
    </ScrollView>
  );
}

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: Platform.OS === 'ios' ? 60 : 20,
    },
    scrollView: {
      flex: 1,
    },
    discoverTitleWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    discoveIconsWrapper: {
      flexDirection: 'row',
    },
    qrCodeIcon: {
      marginRight: 30,
    },
    title: {
      color: theme.colors.custom.grayDark6,
    },
    text: {
      color: theme.colors.custom.grayDark2,
    },
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
      marginRight: 19,
      borderRadius: 100,
      backgroundColor: theme.colors.custom.grayLight0,
      overflow: 'hidden',
    },
    verifyTitle: {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: '800',
      fontSize: 20,
      lineHeight: 32,
      color: theme.colors.custom.grayLight0,
    },
    verifyText: {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.01,
      color: theme.colors.custom.grayLight0,
      opacity: 0.6,
    },
    discoverCaruselAroundCard: {
      width: 307,
    },
    aroundWrapper: {
      marginTop: 30,
    },
    aroundTitleWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    aroundNumber: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 23,
      height: 23,
      marginLeft: 7,
      borderRadius: 35,
      backgroundColor: theme.colors.custom.mainAdditional6,
    },
    aroundNumberText: {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 21,
      color: theme.colors.custom.grayLight0,
    },
    aroundContentWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 28.6,
    },
    noMapMarkIcon: {
      marginRight: 19,
    },
    organizationsTitlesWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: 46,
      marginBottom: 24,
    },
    viewAllText: {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 20.56,
      color: theme.colors.custom.mainPrimary6,
    },
    caruselWrapper: {
      width: 400,
      height: 142,
    },
    carusel: {
      width: '100%',
    },
    caruselContent: {
      flex: 1,
      width: 140,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 25,
      borderWidth: 1,
      borderRadius: 12,
      borderColor: theme.colors.custom.grayLight3,
    },
    caruselImg: {
      width: 48,
      height: 48,
    },
    caruselText: {
      position: 'absolute',
      bottom: 24,
    },
  });

export default DiscoverInfoScreen;
