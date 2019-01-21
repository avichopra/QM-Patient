import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default (TextField = (props) => {
	let { placeholder } = props;
	return (
		<View
			style={{
				borderBottomWidth: 1.5,
				height: 50,
				borderBottomColor: 'rgba(141,141,141,0.5)',
				flexDirection: 'row',
				marginTop: 15,
				width: '90%',
				marginLeft: 10,
				marginRight: 10,
				marginHorizontal: 5
			}}
		>
			<Image
				source={{ uri: `mipmap/${props.icon}` }}
				style={{ height: 20, width: 20, marginTop: 10, marginRight: 10, marginLeft: 5 }}
				resizeMode={'contain'}
			/>
			{/* <Icon name={'key'} size={25} color={'#8D8D8D'}  /> */}
			<TextInput
				style={{ width: '82%', fontSize: 15 }}
				placeholder={placeholder}
				onChangeText={(text) => {
					props.onHandleChange(props.value, text, props.field);
				}}
			/>
		</View>
	);
});