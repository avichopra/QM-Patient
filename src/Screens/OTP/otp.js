import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	ImageBackground,
	ScrollView,
	KeyboardAvoidingView,
	ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Textinput from '../../component/CustomComponent/Textinput';
import style from '../../styles/index';
import Icon from 'react-native-vector-icons/AntDesign';

import Base from './otpBase';
export default class OTP extends Base {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			otp: '',
			otperror: '',
			loading: false
		};
	}

	componentDidMount() {
		const { navigation } = this.props;
		// const email = navigation.getParam('email');
		console.warn('did mount>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', navigation.state.params.email);
		if (navigation.state.params.contactNo) {
			console.warn('inside ifffffffffffffffffffffffffffffffffffff');
			// const user = navigation.getParam('user');
			this.resendOTP(navigation.state.params.email);
		}
	}

	render() {
		const { navigation } = this.props;
		return (
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
					<ImageBackground
						source={{ uri: 'asset:/icon/group_2.png' }}
						style={[ style.d1 ]}
						resizeMode={'stretch'}
					>
						<View>
							<Icon name={'arrowleft'} size={25} onPress={() => this.props.navigation.goBack()} />

							<View style={style.d3}>
								<Image
									source={{ uri: 'asset:/icon/lock_1.png' }}
									style={{ width: 50, height: 70, alignSelf: 'center' }}
								/>
							</View>

							<View style={{ marginVertical: 10, flexGrow: 0.5 }}>
								<Text style={[ style.i1, style.a1 ]}>Enter OTP</Text>
							</View>
							<View style={style.d4}>
								<Image
									source={{ uri: 'asset:/icon/lock.png' }}
									style={{ width: 40, height: 20, marginVertical: 30 }}
									resizeMode="contain"
								/>

								<View style={style.f3}>
									<Textinput
										keyboardType={'numeric'}
										maxLength={6}
										onChangeText={(text) => {
											this.ChangeText(text, 'otp');
										}}
									>
										OTP
									</Textinput>
								</View>
								<Text
									style={{ fontSize: 12, color: 'white', marginVertical: 20 }}
									onPress={() => {
										this.resendOTP(this.props.navigation.state.params.email);
									}}
								>
									Resend OTP
								</Text>
							</View>
							<Text style={style.c1}>{this.state.otperror}</Text>
							<View style={[ style.f1, style.j1 ]}>
								{this.state.loading === false ? (
									<TouchableOpacity style={style.c2} onPress={this.onSubmit}>
										<Text
											style={{
												textAlign: 'center',
												marginTop: 10,
												fontSize: 14,
												color: '#2948ff'
											}}
										>
											Submit
										</Text>
									</TouchableOpacity>
								) : (
									<View style={style.c2}>
										<ActivityIndicator size="large" color="#000" />
									</View>
								)}
							</View>
						</View>
					</ImageBackground>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}
