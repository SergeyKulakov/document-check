import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Compass, File, Fingerprint, Wallet } from '../../assets/tab-bottom';
import { CustomTheme } from '../../theme';

type DiscoverBottomTab = {
  state: any;
  descriptors: any;
  navigation: any;
};

const DiscoverBottomTab = ({
  state,
  descriptors,
  navigation,
}: DiscoverBottomTab) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = makeStyles(theme);

  const renderImage = (label: string, color: string) => {
    switch (label) {
      case 'DiscoverInfo':
        return <Compass stroke={color} strokeWidth={2} />;
      case 'Wallet':
        return <Wallet stroke={color} strokeWidth={2} />;
      case 'Support application':
        return <File stroke={color} strokeWidth={2} />;
      case 'Identity':
        return <Fingerprint stroke={color} strokeWidth={2} />;
    }
  };

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const disableTabs = ['Wallet'];
        const isDisabled = disableTabs.includes(label);

        return (
          <TouchableOpacity
            key={'tab-' + index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            disabled={isDisabled}
            style={[
              styles.tabBtn,
              isFocused && styles.selectedTabBtn,
              isDisabled && styles.disabledTab,
            ]}>
            {renderImage(
              label,
              isFocused ? colors.custom.mainPrimary6 : colors.primary,
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default DiscoverBottomTab;

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: theme.colors.custom.grayLight0,
      height: 50,
      marginHorizontal: 30,
      marginBottom: 42,
      borderRadius: 50,
      shadowColor: theme.colors.custom.mainPrimary6,
      shadowOffset: {
        width: 0,
        height: 14,
      },
      shadowOpacity: 0.08,
      shadowRadius: 3,
      elevation: 5,
      zIndex: 10,
    },
    tabBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 72,
      height: 44,
      borderRadius: 89,
    },
    selectedTabBtn: {
      backgroundColor: theme.colors.custom.mainPrimary1,
    },
    disabledTab: {
      opacity: 0.2,
    },
  });
