import React from 'react';
import Header from './Header';
import { Text, View, Image, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import _ from 'lodash';
import styles from '../styles/index';
import { connect } from 'react-redux';
import { PickedPatient } from './HomeComponents/HomeComponent';
import MapView, { PROVIDER_GOOGLE, Marker, Overlay, Polyline } from 'react-native-maps';
import Button from '../ReusableComponents/Button';
import Base from './HomeBase';
import CallAmbulance from './HomeComponents/CallAmbulance';
import SearchingNearby from './HomeComponents/SearchingNearby';
import ShowDriver from './HomeComponents/ShowDriver';
import ReasonOfCancellation from './HomeComponents/ReasonOfCancellation';
import { RippleLoader } from 'react-native-indicator';
import TempStorage from '../utilities/tempStorage';
const height = Dimensions.get('window').height;
class Home extends Base {
	render() {
		const {angle}=this.props.gpsData!=null && this.props.gpsData
		console.log('Current position', this.state.latitude, this.state.longitude);
		return this.state.showReasons === true ? (
			<ReasonOfCancellation onShowReasons={this.onShowReasons} onSubmit={this.onSubmit} />
		) : (
			<View style={[ styles.f2 ]}>
				<Header title={'Quick Medic'} openDrawer={this.openDrawer} />

				{this.state.loading ? (
					<View style={[ styles.f2, styles.center ]}>
						<ActivityIndicator size="large" color="#000" />
					</View>
				) : (
					<MapView
						provider={PROVIDER_GOOGLE}
						style={[ styles.map]}
						showsUserLocation={true}
						mapType="standard"
						followsUserLocation={true}
						showsBuildings={true}
						showsIndoors={true}
						loadingEnabled={true}
						showsPointsOfInterest={true}
						ref={(map) => {
							this.map = map;
						}}
						initialRegion={{
							latitude: this.state.latitude,
							longitude: this.state.longitude,
							latitudeDelta: 0.009,
							longitudeDelta: 0.009
						}}
						onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
						onUserLocationChange={(locationChangedResult) =>
							this.setUserLocation(locationChangedResult.nativeEvent.coordinate)}
					>
					    {/* <View style={{position:"absolute"}}> */}
						{this.props.pickedLocationCoord!=null && (
							<Polyline  coordinates={this.props.pickedLocationCoord} strokeColor={'#1d78e2'} strokeWidth={8} />
						)}
						{this.props.hospitalLocationCoord!=null && (
							<Polyline  coordinates={this.props.hospitalLocationCoord} strokeColor={'#1d78e2'} strokeWidth={8}/>
						)}
						{this.props.pickedLocationCoord!=null && (
							<MapView.Circle fillColor="gray" center={this.props.pickedLocationCoord[this.props.pickedLocationCoord.length-1]} radius={20} strokeColor="#FFFFFF" strokeWidth={8}/>
						)}
						{this.props.pickedLocationCoord!=null && (
							<MapView.Circle fillColor="gray" center={this.props.pickedLocationCoord[0]} radius={20} strokeColor="#FFFFFF" strokeWidth={8}/>
						)}
						{this.props.pickedLocationCoord!=null && (
							<Marker flat={true} title={"Picked Location Distance,Time"} coordinate={this.props.pickedLocationCoord[this.props.pickedLocationCoord.length/2]} >
                             <View style={{width:"100%",height:"100%",backgroundColor:"#FFFFFF",borderRadius:5,borderColor:"black",display:"flex",flexDirection:"row"}}>
                             <Image source={{uri:'mipmap/ambulance'}}style={{width:20,height:20,margin:10}} resizeMode={'contain'}/>
							<Text style={{margin:10}}>{this.props.pickedDuration.distance},{this.props.pickedDuration.duration}</Text>
							 </View>
							</Marker>
						)}
							{this.props.hospitalLocationCoord!=null && (
							<MapView.Circle fillColor="gray" center={this.props.hospitalLocationCoord[this.props.hospitalLocationCoord.length-1]} radius={20} strokeColor="#FFFFFF" strokeWidth={8}/>
						)}
						{this.props.hospitalLocationCoord!=null && (
							<MapView.Circle fillColor="gray" center={this.props.hospitalLocationCoord[0]} radius={20} strokeColor="#FFFFFF" strokeWidth={8}/>
						)}
						{this.props.hospitalLocationCoord!=null && (
							<Marker flat={true} title={"Hospital Location Distance,Time"} coordinate={this.props.hospitalLocationCoord[this.props.hospitalLocationCoord.length/2]} >
                             <View style={{width:"100%",height:"100%",backgroundColor:"#FFFFFF",borderRadius:5,borderColor:"black",display:"flex",flexDirection:"row"}}>
                            <Image source={{uri:'mipmap/hospital'}}style={{width:20,height:20,margin:10}} resizeMode={'contain'}/>
							<Text style={{margin:10}}>{this.props.hospitalDuration.distance},{this.props.hospitalDuration.duration}</Text>
							 </View>
							</Marker>
						)}
						{/* </View> */}
						{this.props.hospitalLocationCoord!=null && (
								<Marker
								coordinate={{latitude:parseFloat(this.props.trip.hospitalLocation.lat),longitude:parseFloat(this.props.trip.hospitalLocation.long)}}
								title={`Hospital Location,${this.props.trip.hospitalName},${this.props.trip.hospitalAddress}`}					
							    flat={true}
							>
							<Image source={{uri:'mipmap/hospital'}} style={{width:40,height:40}} resizeMode={'contain'}/>
							</Marker>
						)}
						<Marker.Animated
							ref={(marker) => {
								this.marker = marker;
							}}
							coordinate={this.state.coordinate}
							title={'Your Location'}
						>
						</Marker.Animated>
						{this.props.pickedLocationCoord!=null && (
							<Marker
								coordinate={this.props.trip!=null?{latitude:parseFloat(this.props.trip.patientLocation.lat),longitude:parseFloat(this.props.trip.patientLocation.long)}:this.state.pickupLocation}
								title={`PickUp Location,${this.props.trip!=null?this.props.trip.patientAddress:this.state.currentPlace}`}
							>
								<Image source={{ uri: 'mipmap/currentlocation' }} style={{ width: 50, height: 50 }} />
							</Marker>
						)}
						{this.props.trip!=null && (
							<Marker.Animated
								ref={(desmarker) => {
									this.desmarker = desmarker;
									// TempStorage.getInstance().setKey("desmarker", desmarker)
								}}
								coordinate={{latitude:parseFloat(this.props.trip.driverLocation.lat),longitude:parseFloat(this.props.trip.driverLocation.long)}}
								title={`Driver Location,${this.props.trip.driverAddress}`}
								flat={true}
								style={{transform:[{rotate:this.props.gpsData!=null?`${angle}deg`:'0deg'}]}}
							>
								<Image
									source={{ uri: 'mipmap/ambulance' }}
									style={{ width:50, height: 50,transform:[{rotate:'270deg'}] }}
									resizeMode={'contain'}
								/>
							</Marker.Animated>
						)}
					</MapView>
				)}
				<View
					style={[
						styles.center,
						styles.fr,
						{
							width: '96%',
							height: 50,
							padding: 5,
							borderRadius: 5,
							backgroundColor: '#fff',
							elevation: 20,
							position: 'absolute',
							marginTop: 60
						}
					]}
				>
					<ScrollView
						contentContainerStyle={{ alignItems: 'center' }}
						style={{ width: '90%', marginRight: 5 }}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					>
						<Text
							style={{
								borderBottomWidth: 2,
								borderBottomColor: '#507CFC',
								fontSize: 18
							}}
							onPress={this.AutoCom}
						>
							{this.props.trip!=null?this.props.trip.patientAddress:this.state.currentPlace}
						</Text>
					</ScrollView>
					<View style={{ width: '10%' }}>
						<Image source={{ uri: 'mipmap/map' }} style={[ styles.icon19 ]} resizeMode="contain" />
					</View>
				</View>
				{this.props.trip!=null?
				this.props.trip.pickedPatient?
				<PickedPatient patient={this.props.trip} Call={this.Call}/>
				:
				<ShowDriver driverDetails={this.props.trip} Call={this.Call} onShowReasons={this.onShowReasons} />
				:
				this.props.ambulanceRequested!=null?
				<SearchingNearby onCancelRequest={this.onCancelRequest} />
				:this.props.callAmbulance===false?
				<CallAmbulance
						advancedSupport={this.state.advancedSupport}
						basicSupport={this.state.basicSupport}
						onAdvancedSupport={this.onAdvancedSupport}
						onBasicSupport={this.onBasicSupport}
						onRequestAmbulance={this.onRequestAmbulance}
				/>
				:
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
				</View>}
						
						{this.props.ambulanceRequested!=null && this.props.trip===null && <View
						style={{
							width: '100%',
							position: 'absolute',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: 'rgba(174,182,191,0.8)',
							height: height - 190,
							top: 50
						}}
					>
						<RippleLoader size={350} strokeWidth={10} />
					</View>}
			</View>
		);
	}
}
function mapStateToProps(state) {
	console.warn('I am the stateeeeeeeeeeeeeeeeeeeeeeeeeeee', state);
	return {
		user: state.user,
		patient: state.patient,
		token: state.token,
		location: state.Location,
		callAmbulance: state.callAmbulance,
		gpsData:state.gpsData,
		trip:state.trip,
		ambulanceRequested:state.ambulanceRequested,
		pickedLocationCoord:state.pickedLocationCoord,
		hospitalLocationCoord:state.hospitalLocationCoord,
		pickedDuration:state.pickedDuration,
		hospitalDuration:state.hospitalDuration
	};
}
export default connect(mapStateToProps)(Home);
