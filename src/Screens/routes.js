import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './Login/login';
import SignUp from './Signup/signup';
import Reset from './reset/reset';
import Drawer from './DrawerNavigator';
const SwitchRouteConfig = {
	Login: Login,
	SignUp: SignUp,
	Reset: Reset,
	Drawer: Drawer
};

const SwitchConfig = {
	initialRouteName: 'Drawer'
};

export default createAppContainer(createSwitchNavigator(SwitchRouteConfig, SwitchConfig));
