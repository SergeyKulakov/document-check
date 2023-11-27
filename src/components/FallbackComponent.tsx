import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import { Text } from 'react-native-paper';

export type Props = { error: Error; resetError: Function };

const FallbackComponent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>An error has occured!</Text>
      </View>
    </SafeAreaView>
  );
};

export default FallbackComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: '300',
    paddingBottom: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000',
  },
  error: {
    paddingVertical: 16,
  },
  button: {
    backgroundColor: '#2196f3',
    borderRadius: 50,
    padding: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});
