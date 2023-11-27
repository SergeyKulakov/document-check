import React from 'react';
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native';

function handlePress(callback: (time: number) => void) {
  requestAnimationFrame(callback);
}

const TextInputCounterBtn = (props: any) => {
  return Platform.OS === 'ios' ? (
    <TouchableOpacity
      disabled={props.disabled}
      style={props.style}
      onPress={() => handlePress(props.onPress)}>
      {props.children}
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback
      disabled={props.disabled}
      onPress={() => handlePress(props.onPress)}>
      <View style={props.style}>{props.children}</View>
    </TouchableNativeFeedback>
  );
};

export default TextInputCounterBtn;
