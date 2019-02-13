import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import Header from './Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from './HistoryBase';
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
									width: '100%',
									marginTop: 20,
									borderBottomWidth: 1,
									borderBottomColor: 'grey',
									marginLeft: 15
								}}
							>
								<View style={{ flexDirection: 'row' }}>
									<Image
										source={{ uri: 'mipmap/amb_history' }}
										style={[ styles.icon40 ]}
										resizeMode={'contain'}
									/>
									<Text style={[ styles.f18, { marginLeft: 20, marginTop: 5 } ]}>
										Today, 05:21 AM
									</Text>
								</View>
								<View
									style={[
										styles.fr,
										{
											width: '72%',
											height: 20,
											alignItems: 'center'
										}
									]}
								>
									<View
										style={{
											width: '35%',
											borderRightWidth: 1,
											borderRightColor: 'grey',
											height: 22
										}}
									>
										<Text style={{ fontSize: 18, color: 'grey' }} numberOfLines={1}>
											{item.driverId.userId.fullname}
										</Text>
									</View>
									<View style={{ width: '40%', marginLeft: 8, height: 22 }}>
										<Text style={{ fontSize: 18, color: 'grey' }}>{item.driverId.vehicleNo}</Text>
									</View>
								</View>
								<View style={{ flexDirection: 'row', marginTop: 30 }}>
									<Image
										source={{ uri: 'mipmap/group_3' }}
										style={{ height: 60, width: 30 }}
										resizeMode="contain"
									/>
									<View
										style={{
											marginLeft: 25,
											width: '82%',
											marginRight: 3
										}}
									>
										<Text style={[ styles.f18 ]}>{item.driverAddress}</Text>
										<Text style={[ styles.f18, { marginTop: 10 } ]}>{item.patientAddress}</Text>
									</View>
								</View>
							</View>
						);
					}}
				/>
			</View>
		);
	}
}
function mapStateToProps(state) {
	return {
		user: state.user,
		token: state.token,
		patient: state.patient
	};
}
export default connect(mapStateToProps)(History);
