import { storiesOf } from '@storybook/react-native';
import { text, select } from '@storybook/addon-knobs';

import CenterView from '../CenterView';
import React from 'react';
import { Text } from 'react-native-paper';
import theme from '../../../theme';
import { StyleProp, TextStyle } from 'react-native';
import {
  SelectTypeKnobValue,
  SelectTypeOptionsProp,
} from '@storybook/addon-knobs/dist/components/types';

const styles = Object.keys(theme.fonts.custom).reduce((a, e) => {
  return {
    ...a,
    [`theme.fonts.custom.${e}`]: theme.fonts.custom[e],
  };
}, {});

storiesOf('Atoms/Text', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add(
    'All custom styles',
    () => (
      <Text
        style={[
          select(
            'Styles',
            styles as SelectTypeOptionsProp<SelectTypeKnobValue>,
            'theme.fonts.custom.body1',
          ) as StyleProp<TextStyle>,
        ]}>
        {text('Text:', 'This is PaperUI Text component')}
      </Text>
    ),
    {},
  );
