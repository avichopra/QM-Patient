import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {StatusBar} from "react-native"
import Store from './src/redux/store/index';
import Model from './src/ReusableComponents/modal';
import Switchnavigator from './src/Screens/routes';
import ModalView from './src/ReusableComponents/modal';
import SplashScreen from 'react-native-splash-screen';
export default class App extends Component {
	componentDidMount() {
		
			SplashScreen.hide();
		
	}
	render() {
		return (
			<Provider store={Store}>
			<StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#2d76d4"/>
				<Switchnavigator />
				<ModalView id={'Root_App'} />
			</Provider>
		);
	}
}
