import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native';

import { Text, View, Dimensions, PermissionsAndroid, Animated } from 'react-native';
// import Geolib from "geo-lib"
import PolyLine from '@mapbox/polyline';
import { callApi } from '../utilities/serverApi';
import { setPatient } from '../redux/index';
import RNGooglePlaces from 'react-native-google-places';
import { AnimatedRegion } from 'react-native-maps';
let screen = Dimensions.get('window');
import call from 'react-native-phone-call';
const Aspect_Ratio = screen.width / screen.height;
let latitude_Delta = 0.0922;
let longitude_Delta = latitude_Delta * Aspect_Ratio;
let latitude_delta = 0.009,
	longitude_delta = 0.009;
import _ from 'lodash';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import Store from '../redux/store/index';
import { addLocation, addDriver, requestAmbulance ,cancelCallAmbulance} from '../redux/actions/index';

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
					'g_ypD}sjmM_BSc@jEaCdTkAxKmDwAqGeCiN{F{Am@gAe@_@MQAiA]yBq@BWBkD?kCGeGUoFKuBDCJA~@EDsD|@@pA??y@~AB'
			},
			summary: 'Sirsa Rd and Jindal Chowk - Raipur Rd',
			warnings: [],
			waypoint_order: []
		}
	],
	status: 'OK'
};

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
		this.timer = null;
		// this.RotateValueHolder = new Animated.Value(0);
	}
	Call = (Type) => {
		const args = {
			number: Type === 'CN' ? this.props.patient.contactNo : this.props.patient.emergencyContactNo, // String value with the number to call
			prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
		};
		call(args).catch(console.error);
	};
	onCancelRequest = () => {
		Store.dispatch(cancelCallAmbulance(false))
		this.setState({ advancedSupport: false, basicSupport: false });
		Store.dispatch(requestAmbulance(false));
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		let data = {
			cancelAllDrivers: true
		};
		callApi('post', 'v1/daffo/dispatch/requestAmbulance', data, headers).then((response) => {
			console.log('response', response);
		});
	};
	onShowReasons = (value) => {
		console.warn('this.onShowReasons');
		this.setState({ showReasons: value });
	};
	onSubmit = (value) => {
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		console.warn('patient>>>>>>>>>>>>>>>>>>>>>>>', JSON.stringify(this.props.driver.userId));

		let data = {
			id: this.props.driver.userId,
			showPatient: false
		};
		callApi('post', 'v1/daffo/dispatch/requestAmbulance', data, headers).then((response) => {
			console.log('response', response);
		});
		this.setState({
			showReasons: false,
			callAmbulance: false,
			advancedSupport: false,
			basicSupport: false
		});
		Store.dispatch(requestAmbulance(false));

		Store.dispatch(addDriver(false, {}));
		data = {
			setter: {
				$set: {
					cancellationMessage: value,
					cancelledBy: this.props.user.id
				}
			},
			filter: { patientId: this.props.patient._id }
		};
		callApi('patch', 'v1/daffo/Trips/update', data, headers).then((result) => {
			console.warn('resultttttttttttttttttttttttttttttt getOwn', result.data);
		});
	};
	async componentWillReceiveProps(nextProps){
	  if(nextProps.requestAmbulance && nextProps.showDriver && nextProps.driverLocation!=null && this.props.pickedUpPatient===false)
	  {  
		  console.warn("driver location",nextProps.driverLocation)
		  await this.setState({destination:{latitude: nextProps.driverLocation.latitude,longitude:nextProps.driverLocation.longitude }})
	  console.warn("driver ",this.state.destination)
		  this.getRouteDirection();
		}
		else if(this.props.pickedUpPatient)
		{
			this.setState({destination:{latitude:response.routes[0].legs[0].end_location.lat,longitude:response.routes[0].legs[0].end_location.lng}})
			this.getRouteDirection();
		}
		
	}
	callAmbulance = () => {
		// this.setState({ callAmbulance: !this.state.callAmbulance });
		Store.dispatch(cancelCallAmbulance(true))
	};
	animateAmbulace=()=>{
		let i = 0;
		this.timer = setInterval(() => {
			if(this.props.pickedUpPatient===false)
			{
				this.desmarker &&
				this.state.pointCoords[i] &&
					this.desmarker._component.animateMarkerToCoordinate(
						{
							latitude: this.state.pointCoords[i].latitude,
							longitude: this.state.pointCoords[i].longitude
						},
						2000
					);
			}
		else if(this.props.pickedUpPatient)
		{let point=[...this.state.pointCoords].reverse();
			this.desmarker &&
			point[i] &&
				this.desmarker._component.animateMarkerToCoordinate(
					{
						latitude: point[i].latitude,
						longitude: point[i].longitude
					},
					2000
				);
		}
			// console.warn("inside timer",pointcoord[i]);
			if (this.state.pointCoords[i] === undefined) clearInterval(this.timer);
			i++;
		}, 3000);
	}
	Call = (contactNo) => {
		const args = {
			number: contactNo,
			prompt: false
		};
		call(args).catch(console.error);
	};
	componentWillMount() {
		DeviceEventEmitter.addListener('locationProviderStatusChange', function(status) {
			// only trigger when "providerListener" is enabled
			if (status.status === 'disabled') {
				LocationServicesDialogBox.checkLocationServicesIsEnabled({
					message:
						'<h3>Use Location?</h3> \
								This app wants to change your device settings:<br/><br/>\
								Use GPS for location<br/><br/>',
					ok: 'YES',
					cancel: 'NO',
					providerListener: true
				}).then(() => {
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
								currentPlace: `${results[0].name},${results[0].address}`,
								latitude: results[0].latitude,
								longitude: results[0].longitude
							});
							// this.getRouteDirection();
							console.log('current place', results);
						})
						.catch((error) => console.warn(error.message));
				});
			}
		});
		// LocationServicesDialogBox.addEventListener('changeeeeeeee', () => {
		// 	console.warn('changeeeeeeeeeeeeeeeeeeeeed');
		// });

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
		console.warn('timer killed', this.timer);
		if (this.timer) {
			clearInterval(this.timer);
			console.warn('timer killed', this.timer);
		}

		navigator.geolocation.clearWatch(this.watchID);
	}
	openDrawer = () => {
		this.props.navigation.openDrawer();
	};
	componentDidMount() {
		LocationServicesDialogBox.checkLocationServicesIsEnabled({
			message:
				'<h3>Use Location?</h3> \
						This app wants to change your device settings:<br/><br/>\
						Use GPS for location<br/><br/>',
			ok: 'YES',
			cancel: 'NO',
			providerListener: true
		}).then(() => {
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
						currentPlace: `${results[0].name},${results[0].address}`,
						latitude: results[0].latitude,
						longitude: results[0].longitude
					});
					// this.getRouteDirection();
					console.log('current place', results);
				})
				.catch((error) => console.warn(error.message));
		});
		this.watchID = navigator.geolocation.watchPosition(
			(position) => {
				// Create the object to update this.state.mapRegion through the onRegionChange function
				console.warn('Region', position);

				// if (this.marker) {
				// 	this.marker._component.animateMarkerToCoordinate(
				// 	  newCoordinate,
				// 	  500
				// 	);
				//   }
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				});
				// this.onRegionChange(region, region.latitude, region.longitude);
				// this._map.animateToRegion(region, 100);
			},
			(error) => console.log(error)
			// { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
		console.warn('destination', this.state.destination);
	}
	e = this;

	setUserLocation = (Coordinate) => {
		//   console.warn("location changed",Coordinate)
		const { latitude, longitude } = Coordinate;
		const newCoordinate = {
			latitude,
			longitude
		};
		if (this.marker) {
			this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
		}
		//    this.map.fitToCoordinates(this.state.pointCoords)
		// this.getRouteDirection()

		  
		// // this.setState({
		// 			routeCoordinates: this.state.routeCoordinates.concat([newCoordinate])
		// 		});
	};
	onRegionChangeComplete = (region) => {
		latitude_delta = region.latitudeDelta;
		longitude_delta = region.longitudeDelta;
		//  console.warn("Completed region",region)
		//  this.setState({latitudeDelta:region.latitudeDelta,longitudeDelta:region.longitudeDelta})
	};
	StartImageRotateFunction() {
		this.RotateValueHolder.setValue(0);
		Animated.timing(this.RotateValueHolder, {
			toValue: 1,
			duration: 3000,
			easing: Easing.linear
		}).start(() => this.StartImageRotateFunction());
	}
	AutoCom = async () => {
		// await this.setState({showRegion:true})
		RNGooglePlaces.openAutocompleteModal({
			country: 'IN',
			latitude: 53.544389,
			longitude: -113.490927,
			radius: 10
		})
			.then((place) => {
				console.log('places data', place);
				// console.warn("destintion",response.routes[0].legs[0].end_location)
				this.setState({
					currentPlace: place.address,
					showdes: true,
					latitude:place.latitude,
					longitude:place.longitude,
					pickupLocation:{latitude:place.latitude,longitude:place.longitude}
				});
				this.getRouteDirection();
				// this.StartImageRotateFunction();
				console.warn('destination', this.state.destination);
			
				// let result=Geolib.distance([[this.state.latitude,this.state.longitude],[place.latitude,place.longitude]])
				// console.warn("distance between these two points is",result);
				// place represents user's selection from the
				// suggestions and it is a simplified Google Place object.
			})
			.catch((error) => console.log(error.message));
	};
	getRouteDirection = async () => {
		try {
			// this.setState({showdes:true})
			//   const response=await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.latitude},${this.state.longitude}&destination=Universal+Studios+Hollywood&key=AIzaSyD9fameWCeX54X9WwqIKmp6x_S13v9a49g`)

			//   const json=response.json();
			//   console.log("response for map")
			//   console.log("in json",json)
			// console.log('inside route direction', response1.results.trips[0].pts);
			console.log('data in response', response.routes[0]);
			const points = PolyLine.decode(response.routes[0].overview_polyline.points);
			console.log('Polyline points', points);
			let pointCoords = points.map((point) => {
				return { latitude: point[0], longitude: point[1] };
			});
			//   console.log("state for route",this.state.pointCoords)
			let destination = {
				latitude: response.routes[0].legs[0].end_location.lat,
				longitude: response.routes[0].legs[0].end_location.lng
			};
			this.setState({ pointCoords: pointCoords, destination });
			console.log('points coords in state', this.state.pointCoords);
			console.log('points coord', pointCoords);
			this.map.fitToCoordinates(pointCoords);
			if(this.props.requestAmbulance && this.props.showDriver)
			   this.animateAmbulace()
			// let pointcoord = [ ...pointCoords ].reverse();
			// // pointcoord.map((points,index)=>{
			// let i = 0;
			// this.timer = setInterval(() => {
			// 	this.desmarker &&
			// 	pointCoords[i] &&
			// 		this.desmarker._component.animateMarkerToCoordinate(
			// 			{
			// 				latitude: pointCoords[i].latitude,
			// 				longitude: pointCoords[i].longitude
			// 			},
			// 			2000
			// 		);
			// 	// console.warn("inside timer",pointcoord[i]);
			// 	if (pointCoords[i] === undefined) clearInterval(this.timer);
			// 	i++;
			// }, 3000);
			//   console.warn("inside map timer", +new Date());
			// })
		} catch (error) {
			console.log(error);
		}
	};
	onRequestAmbulance = () => {
		let { latitude = '', longitude = '', currentPlace = '' } = this.state;
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		// this.setState({ requestAmbulance: true });
		Store.dispatch(requestAmbulance(true));
		console.warn('patient>>>>>>>>>>>>>>>>', this.props.patient);
		let data = {
			ambulanceSupport: this.state.advancedSupport ? 'AdvanceSupport' : 'BasicSupport',
			id: this.props.patient._id,
			location: { currentPlace: currentPlace, latitude: latitude, longitude: longitude }
		};
		callApi('post', 'v1/daffo/dispatch/requestAmbulance', data, headers).then((response) => {
			console.log('response', response);
		});
	};
	onAdvancedSupport = () => {
		console.log('advanced support>>>>>>>>>>>>>');
		this.setState({ advancedSupport: true, basicSupport: false });
	};
	onBasicSupport = () => {
		this.setState({ basicSupport: true, advancedSupport: false });
	};
}
