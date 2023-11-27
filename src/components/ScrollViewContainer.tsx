import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';

type Props = { children: any };

const ScrollViewContainer = ({ children }: Props) => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="never"
      style={styles.sectionContainer}
      contentContainerStyle={styles.scrollContentContainer}>
      {children}
    </ScrollView>
  );
};

export default ScrollViewContainer;

const styles = StyleSheet.create({
  sectionContainer: {
    height: '100%',
    width: '100%',
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
});
