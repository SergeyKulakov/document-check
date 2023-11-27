import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { Pencil } from '../../assets/discover';
import { CustomTheme } from '../../theme';

type InputType = {
  heihgt: number;
  name: any;
  placeholder: string;
  value: any;
  keyboardType: any;
  secureTextEntry: boolean;
  marginBottom: number;
  onChangeText: any;
};

const Input = ({
  heihgt = 160,
  name,
  placeholder,
  value,
  keyboardType = 'default',
  secureTextEntry = false,
  marginBottom = 0,
  onChangeText,
}: InputType) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={[styles.inputWrapper, { marginBottom: marginBottom }]}>
      <TextInput
        name={name}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        multiline
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={[styles.textInput, { height: heihgt }]}
      />
    </View>
  );
};

const makeStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    inputWrapper: {
      width: '100%',
      height: 68,
    },
    textInput: {
      width: '100%',
      paddingVertical: 21,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.custom.grayLight1,
      borderRadius: 12,
      fontFamily: 'Manrope',
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 21,
      letterSpacing: 0,
      color: theme.colors.custom.grayDark1,
      textAlignVertical: 'bottom',
    },
  });

export default Input;
