import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import ImagePicker from 'react-native-image-picker';
export default class MyProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			GeneralInfoPressed: false,
			AdditionalInfoPressed: false,
			GeneralInfo: {
				email: '',
				contactNo: '',
				emergencyContactNo: '',
				emailError: '',
				contactNoError: '',
				emergencyContactNoError: ''
			},
			AdditionalInfo: {
				address: '',
				bloodGroup: '',
				relationWithPatient: '',
				addressError: '',
				bloodGroupError: '',
				relationWithPatientError: ''
			},

			profileImage: '',
			userName: '',
			avatarSource: null
		};
	}
	onHandleChange = (name, value, field) => {
		this.state[field][name] = value;
		this.setState({});
		console.log('stateeeeeeeeeeeeeeeeee', this.state[field]);
	};
	openDrawer = () => {
		this.props.navigation.openDrawer();
	};
	componentDidMount() {
		setTimeout(() => {
			SplashScreen.hide();
		}, 2000);
	}
	cameraClicked = () => {
		console.log('avatarrrrrrrrrrrrrrr clicked called>>>>>>>>>>>>>>>>>>>>>>>>>>>');
		const options = {
			title: 'Select Avatar',
			customButtons: [ { name: 'fb', title: 'Choose Photo from Facebook' } ],
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
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
				const source = { uri: response.uri };

				// You can also display the image using data:
				// const source = { uri: 'data:image/jpeg;base64,' + response.data };

				this.setState({
					avatarSource: source
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
