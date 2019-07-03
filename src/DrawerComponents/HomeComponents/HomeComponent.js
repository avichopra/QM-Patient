import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import config from '../../config/index';
import styles, { Palette } from '../../styles/index';
import { get } from 'lodash';
const Calls = props => {
  const { Call = () => {} } = props;
  return (
    <TouchableOpacity style={[styles.center, styles.call]} onPress={() => Call('CN')}>
      <Image source={{ uri: 'mipmap/telephone' }} style={[styles.icon19, { marginRight: 10 }]} />
      <Text style={[styles.f18, styles.bold, { color: 'white' }]}>Call</Text>
    </TouchableOpacity>
  );
};
export const PickedPatient = props => {
  const { patient = {}, Call = () => {} } = props;
  let patientData = get(patient, 'patientId.userId', {
    fullname: '',
    picture: ''
  });
  const { hospitalNo = '', hospitalName = 'Fortris Hospital', hospitalAddress = 'Sector 30, Gurgaon' } = patient;
  return (
    <View style={[styles.h200, styles.wbg]}>
      <View
        style={[
          styles.fr,
          {
            height: 80,
            width: '95%',
            alignItems: 'center'
          }
        ]}
      >
        <View style={[styles.circle50, { marginRight: 15 }]}>
          <Image
            source={{
              uri: patientData.picture
                ? `${config.SERVER_URL}/v1/daffo/file/${patientData.picture}`
                : 'asset:/icon/def.png'
            }}
            style={[styles.circle50]}
          />
        </View>

        <Text style={{ fontSize: 18, color: 'black' }}>{patientData.fullname}</Text>
      </View>
      <View style={styles.divider} />
      <View
        style={[
          styles.frSelf,
          {
            marginTop: 10,
            width: '98%'
          }
        ]}
      >
        <View style={{ marginLeft: 5, height: 50, width: 50, marginTop: 10 }}>
          <Image source={{ uri: `mipmap/hospital` }} style={{ height: 50, width: 50 }} resizeMode="contain" />
        </View>
        <View style={{ width: '58%', marginLeft: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'NunitoSans-SemiBold',
              color: 'black',
              marginBottom: 5,
              width: '96%'
            }}
            numberOfLines={1}
          >
            {hospitalName}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: 'grey',
              width: '98%',
              fontFamily: 'NunitoSans-SemiBold'
            }}
            numberOfLines={3}
          >
            {hospitalAddress}
          </Text>
        </View>
        <TouchableOpacity style={[styles.center, styles.call]} onPress={() => Call(hospitalNo)}>
          <Image source={{ uri: 'mipmap/telephone' }} style={[styles.icon19, { marginRight: 10 }]} />
          <Text style={[styles.f18, styles.bold, { color: 'white' }]}>Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
