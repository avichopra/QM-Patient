import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StatusBar, YellowBox } from 'react-native';
import Store from './src/redux/store/index';
import Model from './src/ReusableComponents/modal';
import Switchnavigator from './src/Screens/routes';
import ModalView from './src/ReusableComponents/modal';
import SplashScreen from 'react-native-splash-screen';
import {connectToSocket} from "./src/utilities/socket"
// console.disableYellowBox=true;
export default class App extends Component {
	componentWillMount(){
		connectToSocket()
		.then(_ => {})
		.catch(e => {});
	}
	componentDidMount() {
			SplashScreen.hide();
	}
	render() {
		return (
			<Provider store={Store}>
				<StatusBar barStyle="light-content" hidden={false} backgroundColor="#2d76d4" />
				<Switchnavigator />
				<ModalView id={'Root_App'} />
			</Provider>
		);
	}
}
