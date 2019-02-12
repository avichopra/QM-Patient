import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import config from '../../config/index';
export default (ShowDriver = (props) => {
	const {
		driver = {
			fullname: '',
			vehicleNo: '',
			picture: '',
			contactNo: ''
		},
		Call = () => {},
		onShowReasons = () => {}
	} = props;
	return (
		<View
			style={{
				height: 150,
				width: '100%',
				backgroundColor: 'white',
				position: 'absolute',
				bottom: 0,
				borderWidth: 1,
				borderColor: 'rgba(215,219,221,0.7)'
			}}
		>
			{console.warn('driverrrrrrrrrrrrrrrrrrrrrrrrr', driver.picture)}
			<View
				style={{
					flexDirection: 'row',
					width: '90%',
					alignSelf: 'center',
					height: 80,
					marginTop: 10
				}}
			>
				<Image
					source={{ uri: `${config.SERVER_URL}/v1/daffo/file/${driver.picture}` }}
					style={{ height: 60, width: 60, borderRadius: 30 }}
				/>
				<View style={{ marginTop: 8, marginLeft: 5 }}>
					<Text style={{ fontSize: 15, marginBottom: 5 }}>{driver.fullname}</Text>
					<Text style={{ fontSize: 15 }}>{driver.vehicleNo}</Text>
				</View>
				<TouchableOpacity
					style={{
						height: 30,
						width: '25%',
						backgroundColor: '#76d015',
						borderRadius: 30,
						flexDirection: 'row',
						alignItems: 'center',
						// justifyContent: 'center',
						marginLeft: 70,
						marginTop: 10
					}}
					onPress={() => Call(driver.contactNo)}
				>
					<Image
						source={{ uri: 'mipmap/telephone' }}
						style={{ height: 20, width: 20, marginRight: 10, marginLeft: 10 }}
					/>
					<Text style={{ color: 'white', fontFamily: 'NunitoSans-SemiBold', fontSize: 18 }}>Call</Text>
				</TouchableOpacity>
			</View>
			<View style={{ height: 1, backgroundColor: 'rgba(215,219,221,0.7)', width: '100%' }} />
			<View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: 60 }}>
				<TouchableOpacity
					style={{ flexDirection: 'row', alignSelf: 'center', marginRight: 5 }}
					onPress={() => {
						onShowReasons(true);
					}}
				>
					<Image
						source={{ uri: 'mipmap/cancel' }}
						style={{
							height: 18,
							width: 18,
							fontFamily: 'NunitoSans-Regular',
							fontSize: 11,
							marginTop: 3,
							marginRight: 2
						}}
						resizeMode={'contain'}
					/>
					<Text
						style={{
							color: '#f6263f',
							fontSize: 18,
							fontFamily: 'NunitoSans-SemiBold'
						}}
					>
						Cancel
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
});
