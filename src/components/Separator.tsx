import React from 'react';
import { View, StyleSheet } from 'react-native';

type SeparatorProps = {
  height?: number;
  width?: number;
  visible?: boolean;
};

const Separator = (props: SeparatorProps) => {
  const styles = makeStyles(props);
  return <View style={styles.separator} />;
};

const makeStyles = (props: SeparatorProps) =>
  StyleSheet.create({
    separator: {
      height: props.height,
      width: props.width,
      borderWidth: props.visible ? 2 : 0,
    },
  });

export default Separator;
