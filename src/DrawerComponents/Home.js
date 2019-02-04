import React, { Component } from 'react';
import Header from './Header';

import {
	Platform,
	StyleSheet,
	PermissionsAndroid,
	Text,
	View,
	Dimensions,
	TextInput,
	Image,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator
} from 'react-native';
import { callApi } from '../utilities/serverApi';
import { connect } from 'react-redux';
import { setPatient } from '../redux/index';
const { width, height } = Dimensions.get('window');

let screen = Dimensions.get('window');
const Aspect_Ratio = screen.width / screen.height;
let latitude_Delta = 0.0922;
let longitude_Delta = latitude_Delta * Aspect_Ratio;
import RNGooglePlaces from 'react-native-google-places';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import Store from '../redux/store/index';
import { addLocation } from '../redux/actions/index';
import Button from '../ReusableComponents/Button';
import Base from './HomeBase';
import CallAmbulance from './HomeComponents/CallAmbulance';
import SearchingNearby from './HomeComponents/SearchingNearby';
class Home extends Base {
	render() {
		console.log('Current position', this.state.latitude, this.state.longitude);
		return (
			<View style={{ flex: 1 }}>
				<Header title={'Quick Medic'} openDrawer={this.openDrawer} />

				{this.state.loading ? (
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<ActivityIndicator size="large" color="#000" />
					</View>
				) : (
					<MapView
						provider={PROVIDER_GOOGLE}
						style={[ styles.map ]}
						showsUserLocation={true}
						mapType="standard"
						followsUserLocation={true}
						showsBuildings={true}
						showsTraffic={true}
						loading
						region={{
							latitude: this.state.latitude,
							longitude: this.state.longitude,
							latitudeDelta: latitude_Delta,
							longitudeDelta: longitude_Delta
						}}
						// onRegionChange={this.onRegionChange.bind(this)}
					>
						<MapView.Marker
							coordinate={{
								latitude: this.state.latitude,
								longitude: this.state.longitude,
								latitudeDelta: latitude_Delta,
								longitudeDelta: longitude_Delta
							}}
							title={'Your Location'}
						/>
					</MapView>
				)}
				<View
					style={{
						flexDirection: 'row',
						width: window.width,
						// margin: 30,
						height: 50,
						padding: 5,
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: 5,
						backgroundColor: '#fff',
						elevation: 20,
						position: 'absolute',
						marginTop: 60,
						// marginLeft: 20,
						// marginRight: 20,
						alignSelf: 'center'
					}}
				>
					<ScrollView
						contentContainerStyle={{ alignItems: 'center' }}
						style={{ width: '90%' }}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					>
						<Text
							style={{
								borderBottomWidth: 2,
								borderBottomColor: '#507CFC',
								fontSize: 18
							}}
							onLongPress={this.AutoCom}
						>
							{this.state.currentPlace}
						</Text>
					</ScrollView>
					<View style={{ whidth: '10%' }}>
						<Image source={{ uri: 'mipmap/map' }} style={{ height: 19, width: 19 }} resizeMode="contain" />
					</View>
				</View>
				{this.state.callAmbulance === false ? (
					<View
						style={{
							position: 'absolute',
							alignSelf: 'flex-end',
							bottom: 0,
							marginVertical: 10,
							width: '100%'
						}}
					>
						<Button title={'Call Ambulance'} backgroundColor={'#f6263f'} onSave={this.callAmbulance} />
					</View>
				) : this.state.requestAmbulance === true ? (
					<SearchingNearby />
				) : (
					<CallAmbulance
						advancedSupport={this.state.advancedSupport}
						basicSupport={this.state.basicSupport}
						onAdvancedSupport={this.onAdvancedSupport}
						onBasicSupport={this.onBasicSupport}
						onRequestAmbulance={this.onRequestAmbulance}
					/>
				)}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		// ...StyleSheet.absoluteFillObject
		flex: 1,
		flexDirection: 'column',
		alignItems: 'flex-end',
		backgroundColor: 'yellow'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	},
	map: {
		// ...StyleSheet.absoluteFillObject
		flexGrow: 1
	}
});
function mapStateToProps(state) {
	console.warn('I am the stateeeeeeeeeeeeeeeeeeeeeeeeeeee', state.user);
	return {
		user: state.user,
		token: state.token,
		location: state.Location
	};
}
export default connect(mapStateToProps)(Home);
