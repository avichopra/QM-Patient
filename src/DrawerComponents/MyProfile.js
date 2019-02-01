import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Dimensions, StyleSheet } from 'react-native';
import Header from './Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextField from '../ReusableComponents/TextInput';
import Button from '../ReusableComponents/Button';
import MyProfileBase from './MyProfileBase';
import { connect } from 'react-redux';
class MyProfile extends MyProfileBase {
	static navigationOptions = {
		drawerLabel: 'My Profile',
		drawerIcon: ({ tintColor }) => <Icon name={'user'} size={25} color={'black'} />
	};

	render() {
		const height = Dimensions.get('window').height;
		const { GeneralInfoPressed, AdditionalInfoPressed } = this.state;
		let { bloodGroup = '', address = '', relationWithPatient = '', emergencyContactNo } = this.state.AdditionalInfo;
		let { username = '', email = '', picture = '' } = this.props.user;
		let ECN = this.state.GeneralInfo.emergencyContactNo,ECn=this.state.AdditionalInfo.emergencyContactNo;
		return (
			<KeyboardAvoidingView style={styles.fg}>
				<ScrollView contentContainerStyle={styles.fg} keyboardShouldPersistTaps="always">
					<View style={styles.fg}>
						<View style={styles.ProfileHeaderHeight}>
							<Header
								title={'My Profile'}
								openDrawer={this.openDrawer}
								height={200}
								cameraClicked={this.cameraClicked}
								avatarSource={this.state.picture}
								onHandleChange={this.onHandleChange}
								name="userName"
								fieldValue={this.state.userName}
								clearName={this.clearName}
							/>
						</View>
						<View style={styles.InfoView}>
							<TouchableOpacity style={[ styles.GInfo, styles.center ]} onPress={this.GeneralInfoPressed}>
								<Text
									style={[
										GeneralInfoPressed && true ? { color: 'black' } : { color: '#B1B1B1' },
										{ fontSize: 18 }
									]}
								>
									General Info
								</Text>
								{GeneralInfoPressed && true ? (
									<View
										style={{ height: 1.5, backgroundColor: 'blue', width: '60%', marginTop: 5 }}
									/>
								) : (
									<View style={{ height: 1.5, width: '60%', marginTop: 5 }} />
								)}
							</TouchableOpacity>
							<TouchableOpacity
								style={{ width: '48%', alignItems: 'center', justifyContent: 'center' }}
								onPress={this.AdditionalInfoPressed}
							>
								<Text
									style={[
										AdditionalInfoPressed && true ? { color: 'black' } : { color: '#B1B1B1' },
										{ fontSize: 18 }
									]}
								>
									Additional Info
								</Text>
								{AdditionalInfoPressed && true ? (
									<View
										style={{ height: 1.5, backgroundColor: 'blue', width: '60%', marginTop: 5 }}
									/>
								) : (
									<View style={{ height: 1.5, width: '60%', marginTop: 5 }} />
								)}
							</TouchableOpacity>
						</View>
						{!(AdditionalInfoPressed && true) ? (
							<View
								style={{
									height: 230,
									width: '80%',
									borderWidth: 3,
									borderRadius: 2,
									borderColor: 'rgba(178,186,187 	,0.1)',
									borderBottomWidth: 0,
									elevation: 5,
									marginVertical: 10,
									alignSelf: 'center',

									alignItems: 'center'
								}}
							>
								<TextField
									placeholder={'Email'}
									icon={'envelope'}
									onHandleChange={this.onHandleChange}
									field={'GeneralInfo'}
									value={'email'}
									fieldValue={email}
									editable={false}
								/>
								<TextField
									placeholder={'Contact No.'}
									icon={'call_answer_grey'}
									onHandleChange={this.onHandleChange}
									field={'GeneralInfo'}
									value={'contactNo'}
									fieldValue={this.state.GeneralInfo.contactNo}
									error={this.state.contactNoError}
									keyboardType={'numeric'}
								/>
								<TextField
									placeholder={'Emergency Contact No.'}
									icon={'call_answer_grey'}
									onHandleChange={this.onHandleChange}
									field={'GeneralInfo'}
									value={'emergencyContactNo'}
									error={this.state.GeneralInfo.emergencyContactNoError}
									keyboardType={'numeric'}
									fieldValue={ECN}
								/>
							</View>
						) : (
							<View
								style={{
									height: 300,
									width: '80%',
									borderWidth: 3,
									borderRadius: 2,
									borderColor: 'rgba(178,186,187 	,0.1)',
									borderBottomWidth: 0,
									elevation: 5,
									marginVertical: 10,
									alignSelf: 'center',

									alignItems: 'center'
								}}
							>
								<TextField
									placeholder={'Address'}
									icon={'pin'}
									onHandleChange={this.onHandleChange}
									field={'AdditionalInfo'}
									value={'address'}
									fieldValue={address}
								/>
								<TextField
									placeholder={'Blood Group'}
									icon={'blood'}
									onHandleChange={this.onHandleChange}
									field={'AdditionalInfo'}
									value={'bloodGroup'}
									fieldValue={bloodGroup}
								/>
								<TextField
									placeholder={'Emergency Contact No.'}
									icon={'call_answer_grey'}
									onHandleChange={this.onHandleChange}
									field={'AdditionalInfo'}
									value={'emergencyContactNo'}
									fieldValue={ECn}
									keyboardType={'numeric'}
								/>
								<TextField
									placeholder={'Relation with Patient'}
									icon={'relation'}
									onHandleChange={this.onHandleChange}
									field={'AdditionalInfo'}
									value={'relationWithPatient'}
									fieldValue={relationWithPatient}
								/>
							</View>
						)}
						{this.props.user.phoneVerified===false?<Text style={{color:"red",alignSelf:"center"}} onPress={()=>
						{
							this.goToOtp()
						}}>Click to verify your number</Text>:null}
						<View
							style={{
								flexGrow: 1,
								width: '100%',
								alignItems: 'center',
								justifyContent: 'flex-end',
								marginVertical: 30
							}}
						>
							<Button
								title={'Save'}
								backgroundColor={'#2d76d4'}
								onSave={this.onSave}
								loading={this.state.loading}
							/>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}
function mapStateToProps(state) {
	console.warn('I am the stateeeeeeeeeeeeeeeeeeeeeeeeeeee from myprofile>>>>>>>>>', state);
	return {
		user: state.user,
		token: state.token,
		patient: state.patient
	};
}
const styles = StyleSheet.create({
	fg: { flexGrow: 1 },
	ProfileHeaderHeight: { height: 200 },
	InfoView: {
		height: 60,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center'
		// flexGrow: 1,
	},
	center: { alignItems: 'center', justifyContent: 'center' },
	GInfo: {
		width: '48%',
		borderRightWidth: 1,
		borderRightColor: '#B1B1B1'
		// alignItems: 'center',
		// justifyContent: 'center'
	}
});
export default connect(mapStateToProps)(MyProfile);
