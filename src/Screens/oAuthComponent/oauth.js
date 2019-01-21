import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, Linking, View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as Storage from '../../utilities/asyncStorage';
class oauth extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    if (Platform.OS === 'android') {
      console.log('in plateform');
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    }
  }
  tryLogin = async () => {
    const { navigate } = this.props.navigation;
    try {
      let token = await Storage.get('token');
      if (token === null) {
        throw Error('Token not found. Log-in again to proceed.');
      } else {
        let user = await Storage.get('user');
        navigate('Drawer');
      }
    } catch (err) {
      navigate('Login');
    }
  };
  navigate = url => {
    if (url === null) {
      this.tryLogin();
      return;
    }
    console.log('Linking ', url);
    // E
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
    const routeParams = route.split('/');
    let routeName = routeParams[0];

    if (routeName === 'otp') {
      let otp = routeParams[1];
      let user = routeParams[2];
      console.log('User in auth', user);
      navigate('OTP', { otp: otp, user: user });
    }
    if (routeName === 'resetPassword') {
      let user = JSON.parse(routeParams[1]);
      navigate('ResetPassword', { user });
    }
  };
  render() {
    return <View />;
  }
}
function mapStateToProps(state) {
  console.log('State in map state', state);
  return {
    accessToken: state.token,
    user: state.user
  };
}

export default connect(mapStateToProps)(oauth);
