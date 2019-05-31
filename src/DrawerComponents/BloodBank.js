import React from 'react';
import Header from './Header';
import { View, Text, ActivityIndicator, CheckBox } from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles/index';
import Base from './BloodBankBase';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
class BloodBank extends Base {
  render() {
    console.log('>>>>>data>>>>>>>>', this.state.bloodBank);
    const { bloodBank, promptPriGov, PriSelected, govtSelected, hospital } = this.state;
    const { params } = this.props.navigation.state;
    return (
      <View style={[styles.f2]}>
        <Header title={'Quick Medic'} openDrawer={this.openDrawer} />
        {this.state.loading ? (
          <View style={[styles.f2, styles.center]}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={[styles.map]}
            showsUserLocation={true}
            mapType="standard"
            followsUserLocation={true}
            showsBuildings={true}
            showsIndoors={true}
            loadingEnabled={true}
            showsPointsOfInterest={true}
            ref={map => {
              this.map = map;
            }}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009
            }}
          >
            {!params.status
              ? bloodBank != null &&
                bloodBank.map(item => (
                  <Marker
                    coordinate={{ latitude: item.bloodBankLocation[0], longitude: item.bloodBankLocation[1] }}
                    title={`${item.bloodBankName},${item.bloodBankAddress}`}
                    // title={'hvjy'}
                  />
                ))
              : hospital != null &&
                hospital.map(item => (
                  <Marker
                    coordinate={{ latitude: item.Location[0], longitude: item.Location[1] }}
                    title={`${item.hospitalName},${item.hospitalAddress}`}
                    pinColor="#FF1493"
                    // title={'hvjy'}
                  />
                ))}
          </MapView>
        )}
        {promptPriGov ? (
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              position: 'absolute',
              alignSelf: 'flex-end',
              bottom: 0,
              left: 0,
              right: 0,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '100%'
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <CheckBox value={PriSelected} onChange={this.privateSelected} />
                <Text style={{ paddingTop: 5, color: 'rgb(255,255,255)' }}>Private</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <CheckBox value={govtSelected} onChange={this.govtSelected} />
                <Text style={{ paddingTop: 5, color: 'rgb(255,255,255)' }}>Govt.</Text>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    token: state.token,
    location: state.Location
  };
}
export default connect(mapStateToProps)(BloodBank);
