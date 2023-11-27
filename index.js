/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'text-encoding-polyfill';
import bigInt from 'bigint-polyfill';
import crypto from 'crypto';


if (typeof BigInt === 'undefined') {
    console.warn('BigInt not supported, using big-integer polyfill');
    global.BigInt = bigInt;
  }
  global.crypto = crypto;
  self.crypto = undefined;

AppRegistry.registerComponent(appName, () => App);
