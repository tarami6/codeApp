import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Provider } from 'react-redux';
import MainApp from './screens/mainRouter/mainRouter';

import configure from './store/store';
const store = configure()

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <MainApp/>
        </Provider>

    );
  }
}

