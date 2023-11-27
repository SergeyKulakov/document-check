import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Pencil } from '../../assets/discover';
import { CustomTheme } from '../../theme';

type InputType = {
  label: string;
  name: any;
  placeholder: string;
  value: any;
  keyboardType: any;
  secureTextEntry: boolean;
  marginBottom: number;
  touched: boolean | undefined;
  errors: string | undefined;
  onReset: any;
  onChangeText: any;
  onBlur: any;
  editable: boolean;
};

const Input = ({
  label,
  name,
  placeholder,
  value,
  keyboardType = 'default',
  secureTextEntry = false,
  marginBottom = 0,
  touched,
  errors,
  onReset,
  onChangeText,
  onBlur,
  editable = true,
}: InputType) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={[styles.inputWrapper, { marginBottom: marginBottom }]}>
      <TextInput
        name={name}
        autoCapitalize={'none'}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={editable}
        style={[styles.textInput, { paddingTop: label ? 15 : 0 }]}
      />
      {!!label && (
        <Text style={[theme.fonts.custom.body5, styles.label]}>{label}</Text>
      )}
      {/* {!!onReset && (
        <TouchableOpacity onPress={onReset} style={styles.reset}>
          <Pencil />
        </TouchableOpacity>
      )} */}
      {!!errors && touched && <Text style={styles.errorText}>{errors}</Text>}
    </View>
  );
};

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    inputWrapper: {
      position: 'relative',
      width: '100%',
      height: 68,
    },
    label: {
      position: 'absolute',
      top: 11,
      left: 16,
      color: theme.colors.custom.grayDark1,
    },
    reset: {
      position: 'absolute',
      top: 20,
      right: 16,
    },
    textInput: {
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
      color: theme.colors.custom.borderColor,
    },
    errorText: {
      color: 'red',
    },
  });

export default Input;
