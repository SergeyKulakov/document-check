import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';
import { Applications, Location } from '../../assets/images/icons';
import { CustomTheme } from '../../theme';
import Separator from '../components/Separator';
import localization from '../localization/en';
import { GET_APPLICATIONS } from '../requests/applications';
import { useQuery } from 'urql';
import Spinner from '../components/Spinner';

import TextReplacer from '../components/TextReplacer';

type TabsProps = {
  children: React.ReactNode[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
};

type TabProps = {
  index: string;
  active: boolean;
  title: string;
  onPress: any;
};

type BundleProduct = {
  asin: string;
  quantity: number;
};

type Bundle = {
  products: BundleProduct[];
};

type Product = {
  product: {
    asin: string;
    name: string;
    image: any; // TODO: define image type
  };
  category: string;
};

type CardProps = {
  application: ApplicationType;
};

type AgencyType = {
  logo: string;
};

type EventType = {
  id: string;
  title: string;
  location: string;
  image: string;
  agency: AgencyType;
  bundle: {
    products: Product[];
  };
};

type ApplicationType = {
  id: string;
  statusReason?: string;
  status: string;
  event: EventType;
  bundle?: Bundle;
  products: BundleProduct[];
  orderStatus: 'Pending' | 'Accepted' | 'Rejected' | null;
};

type ScreenProps = {
  navigation: any;
};

const SupportApplicationScreen = ({ navigation }: ScreenProps) => {
  const theme = useTheme();
  const texts = localization.applications;
  const styles = makeStyles(theme);

  const [refreshing] = useState(false);

  const reapply = (eventId: string) => {
    navigation.navigate('ShareYourDetails', { eventId });
  };

  const [applications, setApplications] = useState<ApplicationType[]>();

  const [result, refetch] = useQuery({ query: GET_APPLICATIONS });

  const { data, error, fetching } = result;

  const refresh = () => {
    refetch({
      requestPolicy: 'network-only',
    });
  };

  useEffect(() => {
    if (error) {
      throw new Error(`Error getting applications: ${error}`);
    }
    if (data) {
      const applicationList: ApplicationType[] = data.ListApplications; // placeholderData.applications;
      setApplications(applicationList);

      /* const acceptedApplications: ApplicationType[] = applicationList.filter(
        (app) => app.status === 'Accepted',
      ); */
    }
  }, [data, error]);

  const RejectionSection = ({
    application,
  }: {
    application: ApplicationType;
  }) => {
    const { statusReason, event } = application;
    return (
      <View style={styles.rejectionContainer}>
        <Text style={[theme.fonts.custom.body3, styles.grayDark1]}>
          {statusReason}
        </Text>
        <Separator height={16} />
        <Button
          mode="outlined"
          style={styles.reapplyButton}
          onPress={() => reapply(event.id)}
          buttonColor={theme.colors.custom.grayLight0}>
          <Text style={[theme.fonts.custom.headline3, styles.buttonLabel]}>
            {localization.applications.applyAgain}
          </Text>
        </Button>
      </View>
    );
  };

  const AcceptedSection = ({
    application,
  }: {
    application: ApplicationType;
  }) => {
    const { products } = application;
    const { bundle } = application.event;

    const bundledProducts = products.map((p) => ({
      ...p,
      ...bundle.products.find((bp) => bp.product.asin === p.asin)?.product,
    }));

    // TODO: Accordeon
    return (
      <View style={styles.acceptedSectionContainer}>
        <View style={styles.acceptedSectionHeadline}>
          <Text style={[theme.fonts.custom.body3, styles.grayDark1]}>
            {localization.applications.listOfGoods}
          </Text>
        </View>
        <View style={styles.bundleBackground}>
          <View style={styles.deliveryStatusContainer}>
            <Text style={[theme.fonts.custom.body4, styles.grayDark1]}>
              {localization.applications.deliveryStatus}
            </Text>

            {/* TODO: switch style according to possible delivery types */}
            <Text style={[theme.fonts.custom.subtitle3, styles.statusAccepted]}>
              {application.orderStatus}
            </Text>
          </View>
          {bundledProducts?.map((p, i) => (
            <View key={`product-${i}`} style={styles.productContainer}>
              <View style={styles.productPresentation}>
                <Image
                  source={
                    p.image.small?.url
                      ? { uri: p.image.small?.url }
                      : require('../../assets/images/placeholders/product_placeholder.png')
                  }
                  resizeMode={'contain'}
                  style={styles.productThumbnail}
                />
                <Separator width={8} />
                <Text style={theme.fonts.custom.subtitle3}>{p.name}</Text>
              </View>
              <Text style={theme.fonts.custom.subtitle3}>{p.quantity}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const Card: React.FC<CardProps> = (props: CardProps) => {
    const { application } = props;
    const tempImg = require('../../assets/images/placeholders/hurricane_rescue.png');
    const tempImg2 = require('../../assets/images/placeholders/american_red_cross.png');

    let statusStyle: {};
    let indicatorBgColor: string;
    let indicatorFgColor: string;
    let aftSection: React.ReactNode;

    switch (application.status) {
      case 'Rejected':
        statusStyle = styles.statusRejected;
        indicatorBgColor = theme.colors.custom.pink;
        indicatorFgColor = theme.colors.custom.systemError;
        aftSection = <RejectionSection application={application} />;
        break;
      case 'Accepted':
        statusStyle = styles.statusAccepted;
        indicatorBgColor = theme.colors.custom.mainSecondary1;
        indicatorFgColor = theme.colors.custom.mainSecondary6;
        aftSection = <AcceptedSection application={application} />;
        break;
      case 'Pending':
      default:
        statusStyle = styles.statusPending;
        indicatorBgColor = theme.colors.custom.mainAdditional1;
        indicatorFgColor = theme.colors.custom.mainAdditional6;
        aftSection = null;
        break;
    }

    const statuses: {
      [statusKey: string]: string;
    } = localization.applications.applicationStatus;

    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardRow}>
          <Image
            style={styles.cardImage}
            source={
              application.event.image
                ? { uri: application.event.image }
                : tempImg
            }
          />
          <View style={styles.cardBlock}>
            <Text style={theme.fonts.custom.subtitle3}>
              {application.event.title}
            </Text>
            <View style={styles.applicationStatus}>
              <Svg height={16} width={16}>
                <Circle cx={8} cy={8} r={8} fill={indicatorBgColor} />
                <Circle cx={8} cy={8} r={4} fill={indicatorFgColor} />
              </Svg>
              <Separator width={6} />
              <Text style={[theme.fonts.custom.subtitle4, statusStyle]}>
                {statuses[application.status]}
              </Text>
            </View>
            <View style={styles.halfRow}>
              <View style={styles.eventLocation}>
                <Location />
                <Separator width={6} />
                <Text
                  style={[
                    theme.fonts.custom.subtitle4,
                    styles.grayDark2,
                    styles.semibold,
                  ]}>
                  {application.event.location}
                </Text>
              </View>
              <Image
                style={styles.eventAgencyLogo}
                resizeMode={'contain'}
                source={
                  application.event.agency?.logo
                    ? { uri: application.event.agency?.logo }
                    : tempImg2
                }
              />
            </View>
          </View>
        </View>
        <View style={styles.aftSection}>{aftSection}</View>
      </View>
    );
  };

  const Tab: React.FC<TabProps> = (props: TabProps) => {
    const { title, active } = props;
    return (
      <TouchableOpacity onPress={props.onPress} style={styles.tab}>
        <Text
          style={[
            theme.fonts.custom.body1,
            styles.grayDark2,
            active && styles.activeTab,
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const Tabs: React.FC<TabsProps> = (props: TabsProps) => {
    return <View style={styles.tabsHeader}>{props.children}</View>;
  };

  const [activeTab, setActiveTab] = useState<string>('all');

  const createTab = (type: string) => {
    const filteredApplications = applications?.filter(
      (e) => type === 'all' || e.status === type,
    );

    if (filteredApplications?.length === 0) {
      const filterTexts: { [key: string]: string } = {
        all: ' ',
        Accepted: texts.filterAccepted,
        Pending: texts.filterPending,
        Rejected: texts.filterRejected,
      };

      const filterText = filterTexts[type];
      return (
        <View style={styles.emptySection}>
          <Separator height={160} />
          <Applications />
          <Separator height={20} />
          <TextReplacer
            style={[theme.fonts.custom.body3, styles.grayDark2]}
            placeholder={texts.noApplicationsFound}
            replacePlaceholder={true}>
            <Text style={[theme.fonts.custom.body3, styles.grayDark2]}>
              {filterText}
            </Text>
          </TextReplacer>
        </View>
      );
    }

    return (
      <>
        {filteredApplications?.map((app) => (
          <Card key={`app-${app.id}`} application={app} />
        ))}
      </>
    );
  };

  return fetching ? (
    <Spinner />
  ) : (
    <View style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <Text style={theme.fonts.custom.headline1}>{texts.pageTitle}</Text>
      <Separator height={40} />
      <View style={styles.contentWrapper}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
          <Tab
            active={activeTab === 'all'}
            index={'all'}
            title={texts.tabs.all}
            onPress={() => setActiveTab('all')}
          />
          <Tab
            active={activeTab === 'Accepted'}
            index={'accepted'}
            title={texts.tabs.accepted}
            onPress={() => setActiveTab('Accepted')}
          />
          <Tab
            active={activeTab === 'Rejected'}
            index={'rejected'}
            title={texts.tabs.rejected}
            onPress={() => setActiveTab('Rejected')}
          />
          <Tab
            active={activeTab === 'Pending'}
            index={'pending'}
            title={texts.tabs.pending}
            onPress={() => setActiveTab('Pending')}
          />
        </Tabs>
        <Separator height={20} />
        <ScrollView
          style={styles.tabContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }>
          {createTab(activeTab)}
        </ScrollView>
      </View>
    </View>
  );
};

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: Platform.OS === 'ios' ? 60 : 20,
      marginBottom: 90,
    },
    scrollView: {
      flex: 1,
    },
    tabsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    tab: {
      flexGrow: 1,
    },
    activeTab: {
      fontWeight: '800',
      color: theme.colors.custom.grayDark6,
    },
    contentWrapper: {},
    tabContent: {
      flexGrow: 1,
    },
    cardContainer: {
      width: '100%',
      borderRadius: 12,
      borderColor: theme.colors.custom.grayLight2,
      borderWidth: 1,
      marginBottom: 16,
    },
    cardRow: {
      flexDirection: 'row',
      alignContent: 'space-between',
    },
    halfRow: {
      flex: 1,
      flexGrow: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardImage: {
      width: 120,
      height: 120,
      borderRadius: 12,
      margin: 16,
    },
    cardBlock: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginRight: 15,
      marginVertical: 18,
    },
    applicationStatus: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statusRejected: {
      color: theme.colors.custom.systemError,
    },
    statusAccepted: {
      color: theme.colors.custom.mainSecondary6,
    },
    statusPending: {
      color: theme.colors.custom.mainAdditional6,
    },
    grayDark2: {
      color: theme.colors.custom.grayDark2,
    },
    grayDark1: {
      color: theme.colors.custom.grayDark1,
    },
    semibold: {
      fontWeight: '500',
    },
    eventLocation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    eventFoundation: {},
    location: {},
    logoContainer: {},
    eventAgencyLogo: {
      maxWidth: 50,
      height: 18,
    },
    aftSection: {},
    rejectionContainer: {
      margin: 16,
      paddingVertical: 16,
      marginTop: 0,
      borderTopWidth: 1,
      borderTopColor: theme.colors.custom.grayLight3,
    },
    reapplyButton: {
      borderColor: theme.colors.custom.grayLight3,
      height: 56,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    buttonLabel: {
      color: theme.colors.custom.grayDark6,
    },
    acceptedSectionContainer: {},
    acceptedSectionHeadline: {
      borderTopWidth: 1,
      borderTopColor: theme.colors.custom.grayLight3,
      paddingVertical: 16,
      marginHorizontal: 16,
    },
    bundleBackground: {
      backgroundColor: theme.colors.custom.grayLight1,
      padding: 16,
    },
    deliveryStatusContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    productContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: theme.colors.custom.grayLight3,
      paddingVertical: 16,
    },
    productPresentation: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    emptySection: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    productThumbnail: {
      width: 40,
      height: 40,
      borderRadius: 100,
      overflow: 'hidden',
    },
  });

export default SupportApplicationScreen;
