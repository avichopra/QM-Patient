import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { Dimensions, Animated } from 'react-native';
import PolyLine from '@mapbox/polyline';
import { callApi } from '../utilities/serverApi';
import { setPatient } from '../redux/index';
import RNGooglePlaces from 'react-native-google-places';
import { AnimatedRegion } from 'react-native-maps';
let screen = Dimensions.get('window');
import RNPolyLine from 'rn-maps-polyline'
import call from 'react-native-phone-call';
import _ from 'lodash';
import {unSubscribeSockets} from "../utilities/socket"
import { Alert } from '../ReusableComponents/modal';
// import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import GPSState from 'react-native-gps-state'
import Store from '../redux/store/index';
import { addLocation ,cancelCallAmbulance,addAmbulanceRequest,cancelAllRequest,addPatientLocationCoord,addHospitalLocationCoord,addAmbulanceCoord} from '../redux/actions/index';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
let response1={
	geocoded_waypoints: [
	  {
	geocoder_status: "OK",
	place_id: "ChIJAbgWHwszEjkRgmrYI7wODhk",
	types: [
	  "route"
	],
	},
	  {
	geocoder_status: "OK",
	place_id: "ChIJV1dZdmwzEjkR3IwNlVoXPcA",
	types: [
	  "route"
	],
	}
	],
	routes: [
	  {
	bounds: {
	northeast: {
	lat: 29.14144349999999,
	lng: 75.7566769
	},
	southwest: {
	lat: 29.1323704,
	lng: 75.7430748
	}
	},
	copyrights: "Map data ©2019 Google",
	legs: [
	  {
	distance: {
	text: "2.2 km",
	value: 2239
	},
	duration: {
	text: "8 mins",
	value: 486
	},
	"end_address": "Gurudwara Rd, Model Town, Hisar, Haryana 125011, India",
	"end_location": {
	"lat": 29.1323704,
	"lng": 75.7430748
	},
	"start_address": "Gali Number 11, Surya Nagar, Hisar, Haryana 125005, India",
	"start_location": {
	"lat": 29.1397982,
	"lng": 75.75666079999999
	},
	"steps": [
	  {
	"distance": {
	"text": "54 m",
	"value": 54
	},
	"duration": {
	"text": "1 min",
	"value": 12
	},
	"end_location": {
	"lat": 29.1402793,
	"lng": 75.7566769
	},
	"html_instructions": "Head <b>north</b>",
	"polyline": {
	"points": "wjzpDcfkmM_BC"
	},
	"start_location": {
	"lat": 29.1397982,
	"lng": 75.75666079999999
	},
	"travel_mode": "DRIVING"
	},
	  {
	"distance": {
	"text": "0.1 km",
	"value": 124
	},
	"duration": {
	"text": "1 min",
	"value": 39
	},
	"end_location": {
	"lat": 29.1403797,
	"lng": 75.7554701
	},
	"html_instructions": "Turn <b>left</b> at Happy Kriyana And Confectionery Store",
	"maneuver": "turn-left",
	"polyline": {
	"points": "wmzpDgfkmM?x@?jA@J?\?PA\ADABCBKB"
	},
	"start_location": {
	"lat": 29.1402793,
	"lng": 75.7566769
	},
	"travel_mode": "DRIVING"
	},
	  {
	"distance": {
	"text": "0.6 km",
	"value": 573
	},
	"duration": {
	"text": "2 mins",
	"value": 130
	},
	"end_location": {
	"lat": 29.1412476,
	"lng": 75.7507758
	},
	html_instructions: "Slight <b>right</b><div style='font-size:0.9em'>Pass by Bharat Wooden works (on the left)</div>",
	maneuver: "turn-slight-right",
	polyline: {
	points: "knzpDu~jmMi@AwAC_ADG?C@C@A@?B?DDz@Dn@Dj@Br@FxABt@BvA@fA@bA?`@AfB@b@CjD"
	},
	start_location: {
	lat: 29.1403797,
	lng: 75.7554701
	},
	travel_mode: "DRIVING"
	},
	  {
	distance: {
	text: "0.8 km",
	value: 809
	},
	duration: {
	text: "3 mins",
	value: 158
	},
	end_location: {
	lat: 29.1345812,
	lng: 75.7475285
	},
	html_instructions: "Turn <b>left</b> at Dhaka Bldg Material onto <b>Jindal Chowk - Raipur Rd</b><div style='font-size:0.9em'>Pass by Goswami Ice Cream Point (on the left)</div>",
	maneuver: "turn-left",
	polyline: {
	points: "yszpDkajmMzBz@jA\HNHDTFv@XRA@?D@FBNDx@\BBxD|AhCfAv@ZxAl@XJ~D|AxChAnAf@"
	},
	start_location: {
	lat: 29.1412476,
	lng: 75.7507758
	},
	travel_mode: "DRIVING"
	},
	  {
	distance: {
	text: "0.3 km",
	value: 303
	},
	duration: {
	text: "1 min",
	value: 59
	},
	end_location: {
	lat: 29.135438,
	lng: 75.7446873
	},
	html_instructions: "Turn <b>right</b> at SBM Toilet onto <b>Mall Rd</b>/<b>Sirsa Rd</b><div style='font-size:0.9em'>Pass by SBM Toilet (on the left)</div>",
    maneuver: "turn-right",
	polyline: {
	points: "cjypDamimMNBEV]zCCNI\}@zCkAtD"
	},
	start_location: {
	lat: 29.1345812,
	lng: 75.7475285
	},
	travel_mode: "DRIVING"
	},
	  {
	distance: {
	text: "0.4 km",
	value: 376
	},
	duration: {
	text: "1 min",
	value: 88
	},
	end_location: {
	lat: 29.1323704,
	lng: 75.7430748
	},
	html_instructions: "Turn <b>left</b> onto <b>Gurudwara Rd</b><div style='font-size:0.9em'>Pass by सीए दीपक धनखड़ (on the left)</div><div style='font-size:0.9em'>Destination will be on the left</div>",
	maneuver: "turn-left",
	polyline: {
	points :"ooypDi{hmMt@Zt@TjAj@nBt@~BdARJnBz@`@PVN"
	},
	start_location: {
	lat: 29.135438,
	lng: 75.7446873
	},
	travel_mode: "DRIVING"
	}
	],
	traffic_speed_entry: [],
	via_waypoint: [],
	}
	],
	overview_polyline: {
		"points": "wjzpDcfkmM_BC?x@@vACrAEFKBi@AwAC_ADK@EB?HTjEJnCD~C@pFCjDzBz@jA\\HN^Lv@XRAF@VH`KfEjJrDhFpBNBEVa@jDgAxDkAtDt@Zt@TjAj@nFzBbCfAx@`@"
	},
	summary: "Jindal Chowk - Raipur Rd",
	warnings: [],
	waypoint_order: [],
	}
	],
	status: "OK"
	}
let response = {
	geocoded_waypoints: [
		{
			geocoder_status: 'OK',
			place_id: 'ChIJhSOe8XMzEjkRf-kr4fM7FnQ',
			types: [ 'bakery', 'establishment', 'food', 'lodging', 'point_of_interest', 'restaurant', 'store' ]
		},
		{
			geocoder_status: 'OK',
			place_id: 'ChIJAbgWHwszEjkRgmrYI7wODhk',
			types: [ 'route' ]
		}
	],
	routes: [
		{
			bounds: {
				northeast: {
					lat: 29.1414377,
					lng: 75.7566769
				},
				southwest: {
					lat: 29.1328376,
					lng: 75.74738710000001
				}
			},
			copyrights: 'Map data ©2019 Google',
			legs: [
				{
					distance: {
						text: '2.3 km',
						value: 2275
					},
					duration: {
						text: '8 mins',
						value: 466
					},
					end_address: 'Gali Number 11, Surya Nagar, Hisar, Haryana 125005, India',
					end_location: {
						lat: 29.1397982,
						lng: 75.75666079999999
					},
					start_address:
						'Opposite Vidyut Sadan O.P. Jindal Marg, Industrial Area, Vidyut Nagar, Hisar, Haryana 125005, India',
					start_location: {
						lat: 29.1328376,
						lng: 75.7537468
					},
					steps: [
						{
							distance: {
								text: '55 m',
								value: 55
							},
							duration: {
								text: '1 min',
								value: 15
							},
							end_location: {
								lat: 29.13332369999999,
								lng: 75.7538471
							},
							html_instructions:
								'Head <b>north</b> toward <b>Sirsa Rd</b><div style="font-size:0.9em">Pass by Mustard By Midtown (on the right)</div>',
							polyline: {
								points: 'g_ypD}sjmMc@G{@K'
							},
							start_location: {
								lat: 29.1328376,
								lng: 75.7537468
							},
							travel_mode: 'DRIVING'
						},
						{
							distance: {
								text: '0.6 km',
								value: 630
							},
							duration: {
								text: '2 mins',
								value: 107
							},
							end_location: {
								lat: 29.1345037,
								lng: 75.7475063
							},
							html_instructions:
								'Turn <b>left</b> at Indian Oil, Industrial Area, Hisar, Haryana onto <b>Sirsa Rd</b><div style="font-size:0.9em">Pass by Pepe Jeans (on the right)</div>',
							maneuver: 'turn-left',
							polyline: {
								points: 'gbypDqtjmMOtAStBW~B]`Dk@zE_@fDSjBK|@e@vE'
							},
							start_location: {
								lat: 29.13332369999999,
								lng: 75.7538471
							},
							travel_mode: 'DRIVING'
						},
						{
							distance: {
								text: '0.8 km',
								value: 828
							},
							duration: {
								text: '3 mins',
								value: 159
							},
							end_location: {
								lat: 29.141272,
								lng: 75.7506647
							},
							html_instructions:
								'Turn <b>right</b> at LG Electronics onto <b>Jindal Chowk - Raipur Rd</b><div style="font-size:0.9em">Pass by Police Booth (on the left)</div>',
							maneuver: 'turn-right',
							polyline: {
								points: 'siypD}limMEVMG[Ow@YkAe@qAi@iCaAo@WEAeDuAaBq@g@SyD_B}@]UIGEOKw@YUGIEQAiA]eBi@SG'
							},
							start_location: {
								lat: 29.1345037,
								lng: 75.7475063
							},
							travel_mode: 'DRIVING'
						},
						{
							distance: {
								text: '0.5 km',
								value: 512
							},
							duration: {
								text: '2 mins',
								value: 116
							},
							end_location: {
								lat: 29.1410273,
								lng: 75.75549579999999
							},
							html_instructions:
								'Turn <b>right</b><div style="font-size:0.9em">Pass by Bharat Wooden works (on the right in 450&nbsp;m)</div>',
							maneuver: 'turn-right',
							polyline: {
								points: '}szpDs`jmMBWBkDAc@@gB?a@AcAAgACwACu@GyACs@Ek@Eo@E{@?E?C@ABABAF?~@E'
							},
							start_location: {
								lat: 29.141272,
								lng: 75.7506647
							},
							travel_mode: 'DRIVING'
						},
						{
							distance: {
								text: '88 m',
								value: 88
							},
							duration: {
								text: '1 min',
								value: 20
							},
							end_location: {
								lat: 29.1410044,
								lng: 75.7563988
							},
							html_instructions: 'Turn <b>left</b>',
							maneuver: 'turn-left',
							polyline: {
								points: 'mrzpD{~jmMDsD'
							},
							start_location: {
								lat: 29.1410273,
								lng: 75.75549579999999
							},
							travel_mode: 'DRIVING'
						},
						{
							distance: {
								text: '81 m',
								value: 81
							},
							duration: {
								text: '1 min',
								value: 23
							},
							end_location: {
								lat: 29.1402774,
								lng: 75.7563945
							},
							html_instructions: 'Turn <b>right</b>',
							maneuver: 'turn-right',
							polyline: {
								points: 'grzpDodkmM|@@pA?'
							},
							start_location: {
								lat: 29.1410044,
								lng: 75.7563988
							},
							travel_mode: 'DRIVING'
						},
						{
							distance: {
								text: '27 m',
								value: 27
							},
							duration: {
								text: '1 min',
								value: 10
							},
							end_location: {
								lat: 29.1402793,
								lng: 75.7566769
							},
							html_instructions: 'Turn <b>left</b>',
							maneuver: 'turn-left',
							polyline: {
								points: 'wmzpDmdkmM?y@'
							},
							start_location: {
								lat: 29.1402774,
								lng: 75.7563945
							},
							travel_mode: 'DRIVING'
						},
						{
							distance: {
								text: '54 m',
								value: 54
							},
							duration: {
								text: '1 min',
								value: 16
							},
							end_location: {
								lat: 29.1397982,
								lng: 75.75666079999999
							},
							html_instructions:
								'Turn <b>right</b> at Happy Kriyana And Confectionery Store<div style="font-size:0.9em">Destination will be on the left</div>',
							maneuver: 'turn-right',
							polyline: {
								points: 'wmzpDgfkmM~AB'
							},
							start_location: {
								lat: 29.1402793,
								lng: 75.7566769
							},
							travel_mode: 'DRIVING'
						}
					],
					traffic_speed_entry: [],
					via_waypoint: []
				}
			],
			overview_polyline: {
				points:
					"g_ypD}sjmM_BSc@jEaCdTkAxKmDwAqGeCiN{F{Am@gAe@_@MQAiA]yBq@BWBkD?kCGeGUoFKuBDCJA~@EDsD|@@pA??y@~AB"
			},
			summary: 'Sirsa Rd and Jindal Chowk - Raipur Rd',
			warnings: [],
			waypoint_order: []
		}
	],
	status: 'OK'
};
let Gps_data;
// export function gps_Data(data){
// 	console.warn("socket data inside homebase",data)
// 	let markerRef = TempStorage.getInstance().getKey("desmarker");
// 	if(markerRef)
// 	markerRef._component.animateMarkerToCoordinate(
// 		{
// 			latitude: data.latitude,
// 			longitude: data.longitude
// 		},
// 		2000
// 	);
// 	}
let latitude_delta=0.009,longitude_delta=0.009;
export default class HomeBase extends Component {
	constructor() {
		super();
		this.state = {
			latitude: 0,
			longitude: 0,
			currentPlace: '',
			loading: true,
			pointCoords: [],
			callAmbulance: false,
			advancedSupport: false,
			basicSupport: false,
			requestAmbulance: false,
			coordinate: new AnimatedRegion({
				latitude: 29.95539,
				longitude: 78.07513
			}),
			destination: new AnimatedRegion({
				latitude: 29.1397982,
				longitude: 75.75666079999999
			}),
			showdes: false,
			showReasons: false,
			pickupLocation:{latitude:null,longitude:null}
		};
	}
	Call = (Type) => {
		const args = {
			number: Type === 'CN' ? this.props.patient.contactNo : this.props.patient.emergencyContactNo,
			prompt: false 
		};
		call(args).catch(console.error);
	};
	onCancelRequest = () => {
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		let { latitude = '', longitude = '', currentPlace = '' } = this.state;
		let data = {
			cancelAllDrivers: true,
			patientId:this.props.user.id,
			ambulaceSupportType:this.state.advancedSupport?"Advance":"Basic",
		    location:{currentPlace:currentPlace,latitude:latitude,longitude:longitude}
		};
		callApi('post', 'v1/daffo/dispatch/cancelAllAmbulanceRequest', data, headers).then((response) => {
			console.log('response', response);
		});
		Store.dispatch(cancelAllRequest(true,null,null))
		this.setState({ advancedSupport: false, basicSupport: false });
	};
	onShowReasons = (value) => {
		console.warn('this.onShowReasons');
		this.setState({ showReasons: value });
	};
	checkLocationIsEnabled(){
		RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
		.then(data => {
			  console.warn("location>>>>>>>>>>>>",data)
			  RNGooglePlaces.getCurrentPlace()
			  .then((results) => {
				  console.log('current location', results);
				  const { latitude, longitude } = results[0];
				  Store.dispatch(
					  addLocation({
						  latitude: results[0].latitude,
						  longitude: results[0].longitude
					  })
				  );
				  this.setState({
					  loading: false,
					  currentPlace: this.state.currentPlace.length!=0?this.state.currentPlace:`${results[0].name},${results[0].address}`,
					  latitude: results[0].latitude,
					  longitude: results[0].longitude
				  });
				  // this.getRouteDirection();
				  console.log('current place', results);
			  })
			  .catch((error) => console.warn(error.message));
	   }).catch(err => {
			 console.warn("Error in location >>>>>>>>>>>>>>>>",err)
				 });
	}
	onSubmit = (value) => {
		Store.dispatch(cancelAllRequest())
		unSubscribeSockets('OnAccept');
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		let data = {
			patientId:this.props.trip.patientId.userId._id,
			driverId: this.props.trip.driverId.userId._id,
			showPatient: false,
			deviceId:this.props.trip.deviceId
		};
		callApi('post', 'v1/daffo/dispatch/cancelTrip', data, headers).then((response) => {
			console.log('response', response);
		});
		this.setState({
			showReasons: false,
			callAmbulance: false,
			advancedSupport: false,
			basicSupport: false
		});
		data = {
			setter: {
				$set: {
					cancellationMessage: value,
					cancelledBy: this.props.user.id,
                    status:"Cancelled"
				}
			},
			filter: { patientId: this.props.trip.patientId.userId._id ,status:"Progress"}
		};
		callApi('patch', 'v1/daffo/Trips/update', data, headers).then((result) => {
			console.warn('resultttttttttttttttttttttttttttttt getOwn', result.data);
		});
	};
	 componentWillReceiveProps(nextProps){
		 console.warn("Inside Component receive props",this.state.currentPlace)
	if(nextProps.trip!=null)
	{console.warn("Inside component receive props for trips",nextProps)
	   if(nextProps.pickedLocationCoord===null)
	   {
		this.getPickupRouteDirection(nextProps.trip.patientLocation)
	   }
	   if(nextProps.hospitalLocationCoord===null)
	   {
		 this.getHospitalRouteDirection(nextProps.trip.hospitalLocation)
	   }
	//    this.props.gpsData===null && this.props.pickedLocationCoord !=null && this.props.hospitalLocationCoord!=null &&  this.map.fitToCoordinates([...nextProps.pickedLocationCoord,...nextProps.hospitalLocationCoord]);
	}
	if(this.props.gpsData!=nextProps.gpsData)
	{
		console.log("Inside gpsData ambulanace moving")
		this.desmarker._component.animateMarkerToCoordinate(
			{
			latitude: parseFloat(nextProps.gpsData.latitude),
		    longitude: parseFloat(nextProps.gpsData.longitude)
			},
		    2000
			);
			let newCoordinate={latitude:parseFloat(nextProps.gpsData.latitude),longitude:parseFloat(nextProps.gpsData.longitude),latitudeDelta:latitude_delta,longitudeDelta:longitude_delta}
			this.map.animateToRegion(newCoordinate, 2000);
	}
	}
	callAmbulance = () => {
		console.warn("currentPlace>>>>>>before",this.state.currentPlace)
		// this.checkLocationIsEnabled();
		Store.dispatch(cancelCallAmbulance(false))
		console.warn("currentPlace>>>>>>",this.state.currentPlace)
	};
	Call = (contactNo) => {
		const args = {
			number: contactNo,
			prompt: false
		};
		call(args).catch(console.error);
	};
	componentWillMount() {
		if (this.props.location != null) {
			this.setState({
				loading: false,
				latitude: this.props.location.latitude,
				longitude: this.props.location.longitude,
				pickupLocation:{latitude:this.props.latitude,longitude:this.props.longitude}
			});
		}
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		console.warn('token', this.props.token);
		callApi(
			'post',
			'v1/daffo/Patient/getOwn',
			{ perPage: 1, filter: { userId: this.props.user.id } },
			headers
		).then((result) => {
			console.warn('resultttttttttttttttttttttttttttttt getOwn', result.data[0]);
			result.data[0] ? setPatient(result.data[0]) : '';
		});
	}
	componentWillUnmount() {
		if(this.props.trip===null)
		{
		Store.dispatch(addPatientLocationCoord(null))
		Store.dispatch(cancelCallAmbulance(true))
		}
		navigator.geolocation.clearWatch(this.watchID);
		GPSState.removeListener()
		// LocationServicesDialogBox.stopListener();
	}
	openDrawer = () => {
		this.props.navigation.openDrawer();
	};
	componentDidMount() {
	this.checkLocationIsEnabled()
	GPSState.addListener((status)=>{
    console.warn("location state",status)
     if(status===1)
     {
	this.checkLocationIsEnabled()
     }
	})
		this.watchID = navigator.geolocation.watchPosition(
			(position) => {
				console.warn('Region', position);
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				});
			},
			(error) => console.log(error),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
		
	}
	// e = this;

	setUserLocation = (Coordinate) => {
		const { latitude, longitude } = Coordinate;
		const newCoordinate = {
			latitude,
			longitude
		};
		if (this.marker) {
			this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
		}
		if(this.props.trip===null && this.props.pickedLocationCoord===null)
		{
			const newCoordinate = {
				latitude,
				longitude,
				latitudeDelta:latitude_delta,
				longitudeDelta:longitude_delta
			};
			this.map.animateToRegion(newCoordinate, 1000);
		}
	};
	onRegionChangeComplete = (region) => {
		latitude_delta = region.latitudeDelta;
		longitude_delta = region.longitudeDelta;
	};
	AutoCom = async () => {
		if(this.props.trip===null)
		{
		RNGooglePlaces.openAutocompleteModal({
			country: 'IN',
			latitude: 53.544389,
			longitude: -113.490927,
			radius: 10
		})
			.then((place) => {
				console.log('places data', place);
				this.setState({
					currentPlace: place.address,
					showdes: true,
					latitude:place.latitude,
					longitude:place.longitude,
					pickupLocation:{latitude:place.latitude,longitude:place.longitude}
				});
				this.getPickupRouteDirection();
				console.warn('destination', this.state.destination);
			})
			.catch((error) => console.log(error.message));
		}
	};
	getPickupRouteDirection=async (data)=>{
	//   const response=await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.latitude},${this.state.longitude}&destination=Universal+Studios+Hollywood&key=AIzaSyD9fameWCeX54X9WwqIKmp6x_S13v9a49g`
			//   const json=response.json();
			// return new Promise((resolve,reject)=>{
			const points = PolyLine.decode(response.routes[0].overview_polyline.points);
			let pointCoords = points.map((point) => {
				return { latitude: point[0], longitude: point[1]};
			});
            // console.warn(">>>>>>>>>distance>>>>",response.routes[0].)
			Store.dispatch(addPatientLocationCoord(pointCoords,{distance:response.routes[0].legs[0].distance.text,duration:response.routes[0].legs[0].duration.text}))
			if(this.props.trip===null)
			this.map.fitToCoordinates(pointCoords);
			// console.log("Point Coords",pointCoords)
			// console.log("Point Coords using Polyline",pointCoords1)
		}
		getHospitalRouteDirection=async (data)=>{
			//   const response=await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.latitude},${this.state.longitude}&destination=Universal+Studios+Hollywood&key=AIzaSyD9fameWCeX54X9WwqIKmp6x_S13v9a49g`
			//   const json=response.json();
			// return new Promise((resolve,reject)=>{
			const points = PolyLine.decode(response1.routes[0].overview_polyline.points);
			let pointCoords = points.map((point) => {
				return { latitude: point[0], longitude: point[1] };
			});
			Store.dispatch(addHospitalLocationCoord(pointCoords,{distance:response1.routes[0].legs[0].distance.text,duration:response1.routes[0].legs[0].duration.text}))
		// resolve(pointCoords)
		// })
		}
	onRequestAmbulance = () => {
		let { latitude = '', longitude = '', currentPlace = '' } = this.state;
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		let data = {
			ambulanceSupport: this.state.advancedSupport ? 'Advance' : 'Basic',
			id: this.props.patient._id,
			location: { currentPlace: currentPlace, latitude: latitude, longitude: longitude }
		};
		callApi('post', 'v1/daffo/dispatch/requestAmbulance', data, headers).then((response) => {
			console.log('response in request ambulance', response);
			Store.dispatch(addAmbulanceRequest(response.data.requestData))
		}).catch(error=>{
			console.log("Error",error.response)
			if(error.response.data.code===404)
			{
				Alert({
					title: 'Ambulance Request',
					message: 'No any driver found.',
					buttons: [
						{
							title: 'OK',
							icon: false,
							backgroundColor: 'blue'
						}
					]
				});
			}
		})
	};
	onAdvancedSupport = () => {
		console.log('advanced support>>>>>>>>>>>>>');
		this.setState({ advancedSupport: true, basicSupport: false });
	};
	onBasicSupport = () => {
		this.setState({ basicSupport: true, advancedSupport: false });
	};
}
