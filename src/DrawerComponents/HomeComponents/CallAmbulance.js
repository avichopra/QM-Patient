import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
export default (CallAmbulance = props => {
  const {
    onBasicSupport = () => {},
    onAdvancedSupport = () => {},
    onRequestAmbulance = () => {},
    advancedSupport = false,
    basicSupport = false
  } = props;
  return (
    <View
      style={{
        height: 210,
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderWidth: 1,
        borderColor: 'rgba(215,219,221,0.7)'
      }}
    >
      <Text
        style={{
          color: 'black',
          fontSize: 13,
          alignSelf: 'center',
          marginTop: 5,
          fontFamily: 'NunitoSans-SemiBold'
        }}
      >
        Select support type
      </Text>
      <View
        style={{
          height: 120,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'stretch'
        }}
      >
        <TouchableOpacity style={{ height: 100, width: '50%', alignItems: 'center' }} onPress={onAdvancedSupport}>
          <Image
            style={{ height: 70, width: 70 }}
            source={{
              uri: advancedSupport === false ? 'mipmap/support1' : 'mipmap/support'
            }}
          />
          <Text style={{ fontFamily: 'NunitoSans-Regular', fontSize: 14 }}>Advanced Life</Text>
          <Text style={{ fontFamily: 'NunitoSans-Regular', fontSize: 14 }}>Support</Text>
        </TouchableOpacity>
        <View
          style={{
            height: 90,
            width: 0.5,
            backgroundColor: 'rgba(215,219,221,0.7)',
            marginTop: 10
          }}
        />
        <TouchableOpacity style={{ height: 100, width: '50%', alignItems: 'center' }} onPress={onBasicSupport}>
          <Image
            style={{ height: 70, width: 70 }}
            source={{
              uri: basicSupport === false ? 'mipmap/support1' : 'mipmap/support'
            }}
          />
          <Text style={{ fontFamily: 'NunitoSans-Regular', fontSize: 14 }}>Basic Life</Text>
          <Text style={{ fontFamily: 'NunitoSans-Regular', fontSize: 14 }}>Support</Text>
        </TouchableOpacity>
      </View>
      <Button title={'Request Ambulance'} backgroundColor={'#f6263f'} onSave={onRequestAmbulance} />
    </View>
  );
});
