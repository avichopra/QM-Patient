import React, { Component, Fragment } from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import DrawerItem from '../ReusableComponents/DrawerItem';
import { connect } from 'react-redux';
import * as Storage from '../utilities/asyncStorage';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Svg, { Path, Ellipse } from 'react-native-svg';
const width = Dimensions.get('window').width;
class DrawerContent extends Component {
	navigateToScreen = (route) => {
		const navigateAction = StackActions.reset({
			index: 0,
			actions: [ NavigationActions.navigate({ routeName: route }) ]
		});
		this.props.navigation.dispatch(navigateAction);
		this.props.navigation.closeDrawer();
	};
	onPressLogout = async () => {
		this.props.navigation.closeDrawer();
		await Storage.remove('token');
		await Storage.remove('user');
		this.props.navigation.navigate('Login');
	};
	render() {
		let { picture } = this.props.user;
		return (
			<View style={styles.DrawerContent}>
				<View>
					<Svg width={'100%'} height={200} style={{ backgroundColor: 'transparent' }}>
						<Ellipse cx={150} cy={45} rx={200} ry={110} fill={'#E8F0FD'} />
					</Svg>
				</View>
				<DrawerItem
					title={'Call Ambulance'}
					navigateToScreen={this.navigateToScreen}
					route={'Home'}
					// icon={<Foundation name={'home'} size={25} color={'#383838'} />
					name={'home'}
				/>
				<DrawerItem
					title={'My Profile'}
					navigateToScreen={this.navigateToScreen}
					route={'MyProfile'}
					// icon={<FontAwesome name={'user'} size={25} color={'#383838'} />}
					name={'profile'}
				/>
				<DrawerItem
					title={'Change Password'}
					navigateToScreen={this.navigateToScreen}
					route={'ChangePassword'}
					// icon={<Octicons name={'key'} size={25} color={'#383838'} />}
					name={'drawer_key'}
				/>
				<DrawerItem
					title={'History'}
					navigateToScreen={this.navigateToScreen}
					route={'History'}
					// icon={<FontAwesome name={'history'} size={25} color={'#383838'} />}
					name={'history'}
				/>
				{/* <TouchableOpacity onPress={this.onPressLogout}> */}
				<DrawerItem
					title={'Logout'}
					navigateToScreen={this.onPressLogout}
					route={'Logout'}
					// icon={<FontAwesome name={'history'} size={25} color={'#383838'} />}
					name={'logout'}
				/>
				{/* </TouchableOpacity> */}
				<View style={{ position: 'absolute', width: '100%', alignItems: 'center' }}>
					<View
						style={{
							height: 100,
							width: 100,
							borderRadius: 50,
							backgroundColor: 'transparent',
							alignSelf: 'center',
							alignItems: 'center',
							marginTop: 20
							// borderColor: 'white',
							// borderWidth: 2
						}}
					>
						<Image
							source={{ uri: `http://192.168.100.141:3000/v1/daffo/file/${picture}` }}
							style={{
								height: 90,
								width: 90,
								borderRadius: 50,
								backgroundColor: 'transparent',
								borderWidth: 2,
								borderColor: 'white',
								// borderColor: 'white',
								borderWidth: 2
							}}
							// resizeMode={'contain'}
						/>
					</View>

					<Text style={{ color: 'black' }}>
						{this.props.user.fullname ? this.props.user.fullname : 'Name'}
					</Text>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	DrawerContent: { height: 800, backgroundColor: 'transparent' }
});
function mapStateToProps(state) {
	return {
		user: state.user
	};
}
export default connect(mapStateToProps)(DrawerContent);
