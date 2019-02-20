import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { CirclesLoader, PulseLoader, TextLoader, DotsLoader, RippleLoader } from 'react-native-indicator';

export default (CallAmbulance = (props) => {
	const { onCancelRequest = () => {} } = props;
	return (
		<View>
			<View
				style={{
					height: 120,
					width: '100%',
					backgroundColor: 'white',
					position: 'absolute',
					bottom: 0,
					borderWidth: 1,
					borderColor: 'rgba(215,219,221,0.7)'
				}}
			>
				<TouchableOpacity
					style={{ flexDirection: 'row', alignSelf: 'center', marginRight: 5, marginTop: 5 }}
					onPress={onCancelRequest}
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
							fontFamily: 'NunitoSans-SemiBold',
							textDecorationLine: 'underline'
						}}
					>
						Cancel Request
					</Text>
				</TouchableOpacity>
				<View style={{ marginTop: 20 }}>
					<Button title={'Searching Nearby...'} backgroundColor={'#f6263f'} />
				</View>
			</View>
		</View>
	);
});
