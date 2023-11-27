# Kokua App

This application is based on [React Native](https://reactnative.dev/) framework. It was using the React Native CLI, using the Typescript template, as documented [here](https://reactnative.dev/docs/typescript).

## Startup
0. Prerequisites: availability of either an iOS simulator, Android virtual device (recommended for debugging) or physical devices. Using a browser to access the application is not supported.
1. `yarn` - will install all needed code depedencies 
2. `cd ios && pod install` - needed to install iOS specific dependencies via CocoaPods. after running this, return to project root with `cd ..`
3. `yarn start` - starts Metro bundler, a service which will compile the application in an executable bundle and will monitor files for changes, triggering a recompile and hot reloading on the testing device.
4. `yarn ios-sim` for iOS or `yarn android` for Android will install the compiled application on the target device. Note that this iOS startup script overrides the default iOS simulator (iPhone 13) with iPhone 14 Pro Max. A different simulator can be specified by editing the `ios-sim` script in the project's `package.json` file.

### Notable dependencies:
[React Native](https://reactnative.dev/)
[TypeScript](https://www.typescriptlang.org/)
[Apollo](https://www.apollographql.com/) - API is based on [GraphQL](https://graphql.org/), so Apollo client was added to facilitate server communication.
[Paper UI](https://reactnativepaper.com/) - Material Design compliant UI Framework, chosen to help with development of complex components. It was picked for this project because an official React Native implementation of Material UI is not available, and the community alternatives lack proper support.
[Jest](https://jestjs.io/docs/tutorial-react-native) - Unit testing framework
[Appium][https://appium.io/] - Automated E2E testing tool
[Storybook](https://storybook.js.org/tutorials/intro-to-storybook/react-native/en/get-started/) - Will host a demo playground for all components created for this application. Story creation methodology will follow [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/#the-atomic-design-methodology)
[Sentry](https://sentry.io/welcome/) - used for error tracking, crash reporting. Needs configuration.
[Babel](https://babeljs.io/) - Code compiler, expanding compatibility with latest JS versions
[Metro](https://facebook.github.io/metro/) - JS bundler for React Native
[ESLint](eslint.org) / [Prettier](https://prettier.io/) - code formatting/linting tools

### Future integrations
[Firebase](https://firebase.google.com/) - Preferred service to integrate push notifications.

### Dependencies considered, not (yet) used
React Query - Async state management tool, might be added at a later date, pontentially along with client state management tools (Zustand, Jotai considered), if proven to be needed. 

Tailwind - React Native implementation [Nativewind](https://www.nativewind.dev/) is not fully compatible with Tailwind, missing some key features, which determined the choosing of other styling techiques. 

SASS - Was considered as an alternative to Tailwind, but the default React Native StyleSheet method was preferred. 