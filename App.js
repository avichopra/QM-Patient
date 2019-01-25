import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Store from './src/redux/store/index';
import Model from './src/ReusableComponents/modal';
import Switchnavigator from './src/Screens/routes';
import ModalView from './src/ReusableComponents/modal';
import SplashScreen from 'react-native-splash-screen';
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
				<ModalView id={'Root_App'} />
			</Provider>
		);
	}
}
