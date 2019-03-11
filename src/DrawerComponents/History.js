import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image,ActivityIndicator } from 'react-native';
import Header from './Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from './HistoryBase';
import config from '../config/index';
import { connect } from 'react-redux';
import styles from '../styles/index';
class History extends Base {
	static navigationOptions = {
		drawerLabel: 'History',
		drawerIcon: ({ tintColor }) => (
			// <Image source={require('./chats-icon.png')} style={[ styles.icon, { tintColor: tintColor } ]} />
			<Icon name={'history'} size={25} color={'black'} />
		)
	};
	openDrawer = () => {
		this.props.navigation.openDrawer();
	};
	render() {
		let historyList = this.state.historyList;
		return (
			<View style={{ flex: 1 }}>
				<Header title={'History'} openDrawer={this.openDrawer} />
				{console.log('before FlatList')}
				{this.state.loading===false?
				<FlatList
					scrollsToTop={true}
					onEndReached={() => {
						this.onEndReached();
					}}
					onEndReachedThreshold={0.01}
					data={historyList}
					keyExtractor={(item, index) => {
						return item._id + Math.random();
					}}
					renderItem={({ item, index }) => {
						console.log('in the render item of lat list', item);
						return (
							<View
								style={{
									height: 200,
									width: '90%',
									marginTop: 20,
									borderBottomWidth: 1,
									borderBottomColor: 'grey',
									alignSelf: 'center',
									paddingBottom:15
									// marginLeft: 15
								}}
							>
								<View style={{ flexDirection: 'row' }}>
									<Image
										source={{ uri: 'mipmap/amb_history' }}
										style={{ height: 40, width: 40 }}
										resizeMode={'contain'}
									/>
									<Text style={{ fontSize: 18, color: 'black', marginLeft: 20, marginTop: 5 }}>
										{`${new Date(item.updatedAt).getDate()}/${new Date(item.updatedAt).getMonth()}/${new Date(item.updatedAt).getFullYear()},${new Date(item.updatedAt).getHours()>12?new Date(item.updatedAt).getHours()%12:new Date(item.updatedAt).getHours()}:${new Date(item.updatedAt).getMinutes()} ${new Date(item.updatedAt).getHours()>12?"PM":"AM"}`}
									</Text>
								</View>

								<View
									style={{
										width: '80%',
										justifyContent: 'center',
										alignItems:"center",
										height: 22,
										flexDirection:"row",
										marginHorizontal:10
									}}
								>
									<Text style={{ fontSize: 17, color: 'grey' }} numberOfLines={1}>
										{item.driverId.userId.fullname}
									</Text>
									<Text>|</Text>
									<Text style={{ fontSize: 17, color: 'grey' }} numberOfLines={1}>{item.vehicleNo}</Text>
								</View>
								<View style={{ flexDirection: 'row', marginTop: 20,flex:1 }}>
									<Image
										source={{ uri: 'mipmap/group_3' }}
										style={{ height: 70, width: 30, marginTop: 5 }}
										resizeMode="contain"
									/>
									<View
										style={{
											marginLeft: 25,
											width: '68%',
											marginRight: 3,
										}}
									>
										<Text style={{ fontSize: 15, color: 'black' }} numberOfLines={2}>{item.driverAddress}</Text>
										<Text style={{ fontSize: 15, color: 'black', marginTop: 10 }} numberOfLines={2}>
											{item.patientAddress}
										</Text>
									</View>
									<View
										style={{
											height: 50,
											width: 50,
											borderRadius: 50,
											alignSelf: 'flex-end',
											marginRight: 30,
											marginBottom: 5,
											borderColor: 'white'
										}}
									>
										<Image
											source={{
												uri: item.driverId.userId
												.picture?`${config.SERVER_URL}/v1/daffo/file/${item.driverId.userId
													.picture}`:'asset:/icon/def.png'
											}}
											style={{ height: 50, width: 50, borderRadius: 50 }}
										/>
									</View>
								</View>
							</View>
						);
					}}
				/>
				:
				<View style={[ styles.f2, styles.center ]}>
				<ActivityIndicator size="large" color="#000" />
			</View>}
			</View>
		);
	}
}
function mapStateToProps(state) {
	console.warn("Patient Data",state)
	return {
		user: state.user,
		token: state.token,
		patient: state.patient
	};
}
export default connect(mapStateToProps)(History);
