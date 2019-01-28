import React, { Component } from 'react';
import { Text, View, Keyboard } from 'react-native';
import { callApi } from '../utilities/serverApi';
import ImageResizer from 'react-native-image-resizer';

import SplashScreen from 'react-native-splash-screen';
import ImagePicker from 'react-native-image-picker';
import { setUser, setPatient } from '../redux/index';

import Axios from 'axios';
export default class MyProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			GeneralInfoPressed: true,
			AdditionalInfoPressed: false,
			GeneralInfo: {
				email: '',
				contactNo: '',
				emergencyContactNo: '',
				contactNoError: '',
				emergencyContactNoError: ''
			},
			AdditionalInfo: {
				address: '',
				bloodGroup: '',
				emergencyContactNo: '',
				relationWithPatient: ''
			},
			imageSelected: false,
			profileImage: '',
			userName: '',
			avatarSource: null,
			picture: '',
			userName: '',
			loading: false
		};
	}

	onHandleChange = (name, value, field) => {
		if (field) {
			this.state[field][name] = value;
			this.setState({});
		} else {
			this.state[name] = value;
			this.setState({});
		}
	};
	openDrawer = () => {
		this.props.navigation.openDrawer();
	};
	componentDidMount() {
		this.state.userName = this.props.user.username;
		this.state.GeneralInfo.email = this.props.user.email;
		this.state.GeneralInfo.contactNo = this.props.user.contactNo;
		this.state.picture = this.props.user.picture;
		this.state.AdditionalInfo.bloodGroup = this.props.patient.bloodGroup;
		this.state.AdditionalInfo.relationWithPatient = this.props.patient.realtionWithPatient;
		this.state.AdditionalInfo.address = this.props.patient.address;
		this.state.GeneralInfo.emergencyContactNo = this.props.user.emergencycontactnumber;
		this.state.AdditionalInfo.emergencyContactNo = this.props.patient.emergencyContactNo;
		this.setState({});
		// console.log('did mount>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', this.props.user.);
		setTimeout(() => {
			SplashScreen.hide();
		}, 2000);
	}

	onSave = () => {
		Keyboard.dismiss();
		// console.log('on save being called>>>>>>>>>>>>>>>>>>>>>>>>>>.');
		// let contactNoError, emergencyContactNoError;
		// if (
		// 	this.state.GeneralInfo.contactNo !== '' &&
		// 	(this.state.GeneralInfo.contactNo.length < 10 || this.state.GeneralInfo.contactNo.length > 10)
		// ) {
		// 	contactNoError = true;
		// 	this.state.GeneralInfo.contactNoError = 'field should be 10 characters long';
		// 	this.setState({});
		// } else {
		// 	contactNoError = false;
		// }
		// if (
		// 	this.state.GeneralInfo.emergencyContactNo !== '' &&
		// 	(this.state.GeneralInfo.emergencyContactNo.length < 10 || this.state.GeneralInfo.emergencyContactNo > 10)
		// ) {
		// 	emergencyContactNoError = true;
		// 	this.state.GeneralInfo.emergencyContactNoError = 'field should be 10 characters long';
		// 	this.setState({});
		// } else {
		// 	emergencyContactNoError = false;
		// }
		// if (emergencyContactNoError && contactNoError === false) {
		let data = {
			username: this.state.userName,
			email: this.state.GeneralInfo.email,
			contactNo: this.state.GeneralInfo.contactNo,
			emergencycontactnumber: this.state.GeneralInfo.emergencyContactNo,
			address: this.state.AdditionalInfo.address,
			bloodGroup: this.state.AdditionalInfo.bloodGroup,
			realtionWithPatient: this.state.AdditionalInfo.relationWithPatient,
			emergencyContactNo: this.state.AdditionalInfo.emergencyContactNo,
			picture: this.state.picture
		};
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		this.setState({ loading: true });
		callApi('post', 'v1/daffo/dispatch/updatePatient', data, headers)
			// Axios.patch('http://192.168.100.141:3000/v1/daffo/User/updateOwn', data, { headers })
			.then((result) => {
				console.log('useeeeeeeeeeeeeeeeeeeeeeeeee', result);
				this.setState({ loading: false });
				setUser(result.data.updatedUser);
				setPatient(result.data.updatedPatient);
			})
			.catch((err) => {
				console.log('error from myProfile Base ', err.response, err.status, err);
			});
		// }
	};
	cameraClicked = () => {
		console.log('avatarrrrrrrrrrrrrrr clicked called>>>>>>>>>>>>>>>>>>>>>>>>>>>');
		const options = {
			title: 'Select Avatar'
		};
		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				let data = new FormData();
				// const source = { uri: response.uri };

				// You can also display the image using data:
				// const source = { uri: 'data:image/jpeg;base64,' + response.data };
				ImageResizer.createResizedImage(response.uri, 164, 164, 'JPEG', 100, 0).then((result) => {
					data.append('file', {
						uri: result.uri,
						type: 'image/jpeg',
						name: result.name
					});
					data.append('bucket', 'public');
					let headers = {
						'Content-Type': 'multipart/form-data',
						Accept: 'application/json',
						authorization: `Bearer ${this.props.token}`
					};
					console.log('Tokennnnnnnnnnnnnnnnnnnnnnnnnnnnn', this.props.token);
					callApi('post', 'v1/daffo/dispatch/upload', data, headers)
						// Axios.post('http://192.168.100.141:3000/v1/daffo/dispatch/upload', data, { headers })
						.then((result1) => {
							console.log('updateddddddddddddddddddd', result1);
							this.setState({ picture: result1.data[0].file.filename });
						})
						.catch((err) => {
							console.log('error from myProfile Base upload image', err.response, err.status, err);
							// this.setState({ loading: false });
						});
				});
			}
		});
	};

	GeneralInfoPressed = () => {
		this.setState({ GeneralInfoPressed: true, AdditionalInfoPressed: false });
	};
	AdditionalInfoPressed = () => {
		this.setState({ GeneralInfoPressed: false, AdditionalInfoPressed: true });
	};
}
