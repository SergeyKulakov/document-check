import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import { DownArrow } from '../../assets/discover';
import { CustomTheme } from '../../theme';

type DropdownType = {
  data: string[];
  placeholder: string;
  marginBottom: number;
  touched: boolean | undefined;
  errors: string | undefined;
  onChangeValue: any;
};

const Dropdown = ({
  data,
  placeholder,
  marginBottom,
  touched,
  errors,
  onChangeValue,
}: DropdownType) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={[styles.dropdownWrapper, { marginBottom: marginBottom }]}>
      <SelectDropdown
        data={data}
        onSelect={(selectedItem) => {
          onChangeValue(selectedItem);
        }}
        defaultButtonText={placeholder}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem;
        }}
        rowTextForSelection={(item) => {
          return item;
        }}
        buttonStyle={styles.dropdownBtnStyle}
        buttonTextStyle={styles.dropdownBtnTxtStyle}
        renderDropdownIcon={(isOpened) => {
          return (
            <DownArrow
              style={[
                styles.dropdownIcon,
                { transform: [{ rotate: isOpened ? '180deg' : '0deg' }] },
              ]}
            />
          );
        }}
        dropdownIconPosition={'right'}
        rowStyle={styles.dropdownRowStyle}
        rowTextStyle={styles.dropdownRowTxtStyle}
      />
      {!!errors && touched && <Text style={styles.errorText}>{errors}</Text>}
    </View>
  );
};

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    dropdownWrapper: {
      position: 'relative',
      width: '100%',
      height: 68,
    },
    dropdownBtnStyle: {
      width: '100%',
      height: 56,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.custom.grayLight1,
      borderRadius: 12,
      fontFamily: 'Manrope',
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 21,
      letterSpacing: 0,
      color: theme.colors.custom.grayDark1,
    },
    dropdownBtnTxtStyle: {
      textAlign: 'left',
      fontFamily: 'Manrope',
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 21,
      letterSpacing: 0,
      color: theme.colors.custom.grayDark1,
    },
    dropdownRowStyle: {
      backgroundColor: '#EFEFEF',
      borderBottomColor: '#C5C5C5',
    },
    dropdownRowTxtStyle: {
      color: '#444',
      textAlign: 'left',
    },
    dropdownIcon: {
      marginTop: 4.25,
    },
    errorText: {
      color: 'red',
    },
  });

export default Dropdown;
