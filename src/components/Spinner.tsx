import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';
import { HeaderLogoMain } from '../../assets/images/icons';

type Props = {
  radius?: number;
  logoSize?: number;
  stokeWidth?: number;
};

const Spinner = ({ radius = 60, logoSize = 50, stokeWidth = 8 }: Props) => {
  const theme = useTheme();
  const CIRCLE_LENGTH = Math.PI * 2 * radius;

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => setCount((c) => (c % 100) + 5), 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.spinner}>
        <Svg width={radius * 2} height={radius * 2}>
          <Circle
            cx={radius}
            cy={radius}
            r={radius * 0.9}
            stroke={theme.colors.custom.mainPrimary1}
            strokeWidth={stokeWidth}
          />
          <Circle
            cx={radius}
            cy={radius}
            r={radius * 0.9}
            stroke={theme.colors.custom.mainPrimary6}
            strokeWidth={stokeWidth}
            strokeDashoffset={(-count / 100) * CIRCLE_LENGTH}
            strokeDasharray={[
              (count / 100) * CIRCLE_LENGTH,
              ((100 - count) / 100) * CIRCLE_LENGTH,
            ]}
          />
        </Svg>
      </View>
      <View style={styles.logo}>
        <HeaderLogoMain width={logoSize} height={logoSize} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    position: 'absolute',
    transform: [{ rotateZ: '-90deg' }],
  },
  logo: {
    position: 'absolute',
  },
});

export default Spinner;
