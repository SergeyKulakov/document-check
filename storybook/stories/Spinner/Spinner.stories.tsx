import CenterView from '../CenterView';
import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { number } from '@storybook/addon-knobs';
import Spinner from '../../../src/components/Spinner';
import theme from '../../../theme';
import { Provider as PaperProvider } from 'react-native-paper';
const rangeOptions = {
  range: true,
  min: 1,
  max: 200,
  step: 1,
};

storiesOf('Templates/Spinner', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Normal spinner', () => (
    <PaperProvider theme={theme}>
      <Spinner
        radius={number('radius', 60, rangeOptions)}
        logoSize={number('logo size', 50, rangeOptions)}
        stokeWidth={number('stroke width', 8, { ...rangeOptions, max: 15 })}
      />
    </PaperProvider>
  ));
