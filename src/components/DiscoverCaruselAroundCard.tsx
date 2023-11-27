import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Svg, Path } from 'react-native-svg';
import { MapMarker } from '../../assets/discover';
import { CustomTheme } from '../../theme';
import localization from '../localization/en';

type SeparatorProps = {
  titleAroundFirst: string;
  location: string;
  styleCard?: object;
  indicatorIndex?: number;
  onPress: Function;
  image: string;
};

const DiscoverCaruselAroundCard = ({
  titleAroundFirst,
  location,
  styleCard,
  indicatorIndex,
  onPress,
  image,
}: SeparatorProps) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const indicators = [
    ['#FCD6DB', '#FF334B', localization.applications.tabs.rejected],
    ['#FFCEB3', '#FF5D00', localization.applications.tabs.pending],
    ['#E7FAEA', '#11CC31', localization.applications.tabs.accepted],
  ];

  return (
    <TouchableOpacity style={[styles.caruselAround, styleCard]} onPress={onPress}>
      <View style={styles.caruselAroundContent}>
        <Image
          source={
            image
              ? { uri: image }
              : require('../../assets/discover/caruselAroundImg.png')
          }
          style={styles.caruselAroundContentImage}
        />
        <View style={styles.caruselAroundContentText}>
          <Text style={[styles.title, theme.fonts.custom.subtitle3]}>
            {titleAroundFirst}
          </Text>
          {typeof indicatorIndex === 'number' && (
            <View style={styles.indicatorWrapper}>
              <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.68 2.32C12.16 0.88 10.16 0 8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 5.84 15.12 3.84 13.68 2.32Z"
                  fill={indicators[indicatorIndex][0]}
                />
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.84 5.16C10.08 4.44 9.08 4 8 4C5.8 4 4 5.8 4 8C4 10.2 5.8 12 8 12C10.2 12 12 10.2 12 8C12 6.92 11.56 5.92 10.84 5.16Z"
                  fill={indicators[indicatorIndex][1]}
                />
              </Svg>
              <Text
                style={[
                  theme.fonts.custom.subtitle4,
                  styles.indicatorText,
                  { color: indicators[indicatorIndex][1] },
                ]}>
                {indicators[indicatorIndex][2]}
              </Text>
            </View>
          )}
          <View style={styles.aroundBottomText}>
            <View style={styles.aroundMapWrapper}>
              <MapMarker style={styles.mapMarkerIcon} />
              <Text style={[styles.title, theme.fonts.custom.subtitle3]}>
                {location}
              </Text>
            </View>
            <Image
              source={require('../../assets/discover/caruselAcoundIcon.png')}
              style={styles.caruselAroundContentIcon}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    caruselAround: {
      flex: 1,
      width: '100%',
      height: 140,
      justifyContent: 'flex-start',
      paddingVertical: 20,
      paddingLeft: 20,

      borderWidth: 1,
      borderRadius: 12,
      borderColor: theme.colors.custom.grayLight3,
    },
    caruselAroundContent: {
      flex: 1,
      flexDirection: 'row',
    },
    caruselAroundContentImage: {
      width: 100,
      height: 100,
      borderRadius: 12,
    },
    caruselAroundContentText: {
      position: 'relative',
      flex: 1,
      marginLeft: 14,
    },
    title: {
      color: theme.colors.custom.grayDark6,
    },
    indicatorWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    indicatorText: {
      marginLeft: 8,
    },
    aroundBottomText: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    aroundMapWrapper: {
      flexDirection: 'row',
    },
    caruselAroundContentIcon: {
      width: 54,
      height: 18,
      marginRight: 16,
    },
    mapMarkerIcon: {
      marginRight: 9,
    },
  });

export default DiscoverCaruselAroundCard;
