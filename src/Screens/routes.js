import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './Login/login';
import SignUp from './Signup/signup';
import Reset from './reset/reset';
import Oauth from './oAuthComponent/oauth';
import Drawer from './drawer';
import OTP from './OTP/otp';
import ResetPassword from './ResetPassword/Reset';
const SwitchRouteConfig = {
  Login: Login,
  SignUp: SignUp,
  Reset: Reset,
  Oauth: Oauth,
  Drawer: Drawer,
  OTP: OTP,
  ResetPassword: ResetPassword
};

const SwitchConfig = {
  initialRouteName: 'Oauth'
};

export default createAppContainer(
  createSwitchNavigator(SwitchRouteConfig, SwitchConfig)
);
