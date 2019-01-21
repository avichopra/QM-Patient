import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import Store from './src/redux/store/index';

import Switchnavigator from './src/Screens/routes';

export default class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }
  render() {
    return (
      <Provider store={Store}>
        <Switchnavigator />
      </Provider>
    );
  }
}
