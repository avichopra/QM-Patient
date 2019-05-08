import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StatusBar, PermissionsAndroid, AppState } from 'react-native';
import Store from './src/redux/store/index';
import Switchnavigator from './src/Screens/routes';
import ModalView from './src/ReusableComponents/modal';
import SplashScreen from 'react-native-splash-screen';
import { connectToSocket } from './src/utilities/socket';
import * as Storage from './src/utilities/asyncStorage';
import { callApi } from './src/utilities/serverApi';
console.disableYellowBox = true;
export default class App extends Component {
  componentWillMount() {
    AppState.addEventListener('change', this._handleAppstatechange);
    connectToSocket()
      .then(_ => {})
      .catch(e => {});
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppstatechange = async nextAppState => {
    let email = null;
    await Storage.get('user')
      .then(data => {
        email = data.email;
      })
      .catch(error => {
        console.log('error');
      });
    if (nextAppState === 'active') {
      if (email != null) {
        let data = { email: email, status: true };
        callApi('post', 'v1/daffo/dispatch/updateOnlinestatus', data)
          .then(response => {
            console.log(response);
          })
          .catch(err => {
            console.log(err);
          });
      }
    } else if (nextAppState === 'background') {
      if (email != null) {
        let data = { email: email, status: false };
        callApi('post', 'v1/daffo/dispatch/updateOnlinestatus', data)
          .then(response => {
            console.log(response);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };
  componentDidMount() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location',
        message: 'Access your location'
      }
    ).then(granted => {
      console.log('granted', granted);
    });

    SplashScreen.hide();
  }
  render() {
    return (
      <Provider store={Store}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#2d76d4"
        />
        <Switchnavigator />
        <ModalView id={'Root_App'} />
      </Provider>
    );
  }
}
