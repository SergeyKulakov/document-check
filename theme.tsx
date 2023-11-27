import { MD3LightTheme as DefaultTheme, Theme } from 'react-native-paper';
import { MD3Type } from 'react-native-paper/lib/typescript/types';

const theme: CustomTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1A1921',
    custom: {
      mainPrimary6: '#5F0EE6',
      mainPrimary1: '#F6F1FF',
      mainSecondary6: '#11CC31',
      mainSecondary1: '#E7FAEA',
      mainAdditional6: '#FF5D00',
      mainAdditional1: '#FFCEB3',
      grayLight1: '#F6F6F8',
      grayLight2: '#F0F1F5',
      grayLight3: '#E0E2E9',
      grayDark1: '#848DA9',
      grayDark2: '#616D87',
      grayLight0: '#FFFFFF',
      grayDark6: '#1A1921',
      systemError: '#FF334B',
      // non-standard (outside figma summary) colors:
      tapNavShadowColor: '#6717e7',
      pink: 'rgb(250,210,215)',
    },
  },
  fonts: {
    ...DefaultTheme.fonts,
    custom: {
      headline1: {
        fontFamily: 'Manrope',
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 34,
        letterSpacing: 0,
      },
      headline2: {
        fontFamily: 'Manrope',
        fontSize: 20,
        fontWeight: '800',
        lineHeight: 28,
        letterSpacing: 0,
      },
      headline3: {
        fontFamily: 'Manrope',
        fontSize: 16,
        fontWeight: '800',
        lineHeight: 22,
        letterSpacing: 0,
      },
      subtitle1: {
        fontFamily: 'Manrope',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 27,
        letterSpacing: 0,
      },
      subtitle2: {
        fontFamily: 'Manrope',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        letterSpacing: 0,
      },
      subtitle3: {
        fontFamily: 'Manrope',
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 21,
        letterSpacing: 0,
      },
      subtitle4: {
        fontFamily: 'Manrope',
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 27,
        letterSpacing: 0,
      },
      body1: {
        fontFamily: 'Manrope',
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 27,
        letterSpacing: 0,
      },
      body2: {
        fontFamily: 'Manrope',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        letterSpacing: 0,
      },
      body3: {
        fontFamily: 'Manrope',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 21,
        letterSpacing: 0,
      },
      body4: {
        fontFamily: 'Manrope',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 17,
        letterSpacing: 0,
      },
      body5: {
        fontFamily: 'Manrope',
        fontSize: 10,
        fontWeight: '500',
        lineHeight: 14,
        letterSpacing: 0,
      },
    },
  },
};

export declare type CustomTheme = Theme & {
  colors: {
    custom: {
      [key: string]: string;
    };
  };
  fonts: {
    custom: {
      [key: string]: MD3Type;
    };
  };
};

export default theme;
