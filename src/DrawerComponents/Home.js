import React from 'react';
import Header from './Header';
import {
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Modal,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import ModalDropdown from 'react-native-modal-dropdown';
import _ from 'lodash';
Gender = ['Male', 'Female'];
// import Textinput from '../component/CustomComponent/Textinput';
import style from '../styles/index';
import FloatingLabel from 'react-native-floating-labels';
import styles from '../styles/index';
import { connect } from 'react-redux';
import { PickedPatient } from './HomeComponents/HomeComponent';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import Button from '../ReusableComponents/Button';
import Base from './HomeBase';
import CallAmbulance from './HomeComponents/CallAmbulance';
import SearchingNearby from './HomeComponents/SearchingNearby';
import ShowDriver from './HomeComponents/ShowDriver';
import ReasonOfCancellation from './HomeComponents/ReasonOfCancellation';
import { RippleLoader } from 'react-native-indicator';
const height = Dimensions.get('window').height;
class Home extends Base {
  render() {
    const { angle } = this.props.gpsData != null && this.props.gpsData;
    console.log('Current position', this.state.latitude, this.state.longitude);
    return this.state.showReasons === true ? (
      <ReasonOfCancellation onShowReasons={this.onShowReasons} onSubmit={this.onSubmit} />
    ) : (
      <View style={[styles.f2]}>
        <Header title={'UP 108'} openDrawer={this.openDrawer} />

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
            onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
            onUserLocationChange={locationChangedResult =>
              this.setUserLocation(locationChangedResult.nativeEvent.coordinate)
            }
          >
            {this.props.pickedLocationCoord != null && (
              <Polyline coordinates={this.props.pickedLocationCoord} strokeColor={'#1d78e2'} strokeWidth={8} />
            )}
            {this.props.hospitalLocationCoord != null && (
              <Polyline coordinates={this.props.hospitalLocationCoord} strokeColor={'#1d78e2'} strokeWidth={8} />
            )}
            {this.props.pickedLocationCoord != null && (
              <Marker
                flat={true}
                title={'Picked Location Distance,Time'}
                coordinate={this.props.pickedLocationCoord[parseInt(this.props.pickedLocationCoord.length / 2)]}
              >
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 5,
                    borderColor: 'black',
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <Image
                    source={{ uri: 'mipmap/ambulance' }}
                    style={{ width: 20, height: 20, margin: 10 }}
                    resizeMode={'contain'}
                  />
                  <Text style={{ margin: 10 }}>
                    {this.props.pickedDuration.distance},{this.props.pickedDuration.duration}
                  </Text>
                </View>
              </Marker>
            )}
            {this.props.hospitalLocationCoord != null && (
              <Marker
                flat={true}
                title={'Hospital Location Distance,Time'}
                coordinate={this.props.hospitalLocationCoord[parseInt(this.props.hospitalLocationCoord.length / 2)]}
              >
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 5,
                    borderColor: 'black',
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <Image
                    source={{ uri: 'mipmap/hospital' }}
                    style={{ width: 20, height: 20, margin: 10 }}
                    resizeMode={'contain'}
                  />
                  <Text style={{ margin: 10 }}>
                    {this.props.hospitalDuration.distance},{this.props.hospitalDuration.duration}
                  </Text>
                </View>
              </Marker>
            )}
            {this.props.hospitalLocationCoord != null && (
              <Marker
                coordinate={{
                  latitude: parseFloat(this.props.trip.hospitalLocation.lat),
                  longitude: parseFloat(this.props.trip.hospitalLocation.long)
                }}
                title={`Hospital Location,${this.props.trip.hospitalName},${this.props.trip.hospitalAddress}`}
                flat={true}
              >
                <Image source={{ uri: 'mipmap/hospital' }} style={{ width: 40, height: 40 }} resizeMode={'contain'} />
              </Marker>
            )}
            <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
              title={'Your Location'}
            />
            {this.props.pickedLocationCoord != null && (
              <Marker
                coordinate={
                  this.props.trip != null
                    ? {
                        latitude: parseFloat(this.props.trip.patientLocation.lat),
                        longitude: parseFloat(this.props.trip.patientLocation.long)
                      }
                    : {
                        latitude: this.props.pickupLocation.latitude,
                        longitude: this.props.pickupLocation.longitude
                      }
                }
                title={`PickUp Location,${
                  this.props.trip != null ? this.props.trip.patientAddress : this.props.pickupLocation.currentPlace
                }`}
              >
                <Image source={{ uri: 'mipmap/currentlocation' }} style={{ width: 50, height: 50 }} />
              </Marker>
            )}
            {this.props.trip != null && (
              <Marker.Animated
                ref={desmarker => {
                  this.desmarker = desmarker;
                }}
                coordinate={{
                  latitude: parseFloat(this.props.trip.driverLocation.lat),
                  longitude: parseFloat(this.props.trip.driverLocation.long)
                }}
                title={`Driver Location,${this.props.trip.driverAddress}`}
                flat={true}
                style={{
                  transform: [
                    {
                      rotate: this.props.gpsData != null ? `${angle}deg` : '0deg'
                    }
                  ]
                }}
              >
                <Image
                  source={{ uri: 'mipmap/ambulance' }}
                  style={{
                    width: 50,
                    height: 50,
                    transform: [{ rotate: '270deg' }]
                  }}
                  resizeMode={'contain'}
                />
              </Marker.Animated>
            )}
          </MapView>
        )}
        <TouchableWithoutFeedback onPress={() => this.EmergencyCall()}>
          <View
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              // bottom: 0,
              top: 170,
              width: 80,
              height: 80,
              borderRadius: 60,
              right: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: 'asset:/icon/emergency108.png' }}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.AutoCom}>
          <View
            style={[
              styles.center,
              styles.fr,
              {
                width: '96%',
                height: 50,
                padding: 5,
                borderRadius: 5,
                backgroundColor: '#fff',
                elevation: 20,
                position: 'absolute',
                marginTop: 60
              }
            ]}
          >
            <ScrollView
              contentContainerStyle={{ alignItems: 'center' }}
              style={{ width: '90%', marginRight: 5 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              onStartShouldSetResponder={() => true}
            >
              <Text
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: '#507CFC',
                  fontSize: 18
                }}
              >
                {this.props.trip != null
                  ? this.props.trip.patientAddress
                  : this.props.pickupLocation != null
                  ? this.props.pickupLocation.currentPlace
                  : this.state.currentPlace}
              </Text>
            </ScrollView>
            <View style={{ width: '10%' }}>
              <Image source={{ uri: 'mipmap/map' }} style={[styles.icon19]} resizeMode="contain" />
            </View>
          </View>
        </TouchableWithoutFeedback>
        {!this.state.loading ? (
          this.props.trip != null ? (
            this.props.trip.pickedPatient ? (
              <PickedPatient patient={this.props.trip} Call={this.Call} />
            ) : (
              <ShowDriver driverDetails={this.props.trip} Call={this.Call} onShowReasons={this.onShowReasons} />
            )
          ) : this.props.ambulanceRequested != null ? (
            <SearchingNearby onCancelRequest={this.onCancelRequest} />
          ) : this.props.callAmbulance === false ? (
            <CallAmbulance
              advancedSupport={this.state.advancedSupport}
              basicSupport={this.state.basicSupport}
              onAdvancedSupport={this.onAdvancedSupport}
              onBasicSupport={this.onBasicSupport}
              onRequestAmbulance={this.showSelfOtherCapture}
            />
          ) : (
            <View
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                bottom: 0,
                marginVertical: 10,
                width: '100%'
              }}
            >
              <Button title={'Call Ambulance'} backgroundColor={'#f6263f'} onSave={this.callAmbulance} />
            </View>
          )
        ) : null}

        {this.props.ambulanceRequested != null && this.props.trip === null && (
          <View
            style={{
              width: '100%',
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(174,182,191,0.8)',
              height: height - 190,
              top: 50
            }}
          >
            <RippleLoader size={350} strokeWidth={10} />
          </View>
        )}
        {this.state.otherSelf && (
          <KeyboardAvoidingView style={{ flex: 1, position: 'absolute', bottom: 0, left: 0 }} behavior={'position'}>
            <Modal
              visible={this.state.otherSelf}
              animationType={'fade'}
              transparent={true}
              backdrop={false}
              position={'bottom'}
              entry={'bottom'}
            >
              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View
                  style={{
                    flex: 1,
                    display: 'flex',
                    backgroundColor: 'rgb(255,255,255)',
                    marginTop: this.state.othersSelected ? 100 : 150,
                    marginBottom: this.state.othersSelected ? 30 : 150,
                    marginRight: 30,
                    marginLeft: 30,
                    borderRadius: 2
                  }}
                >
                  <ScrollView contentContainerStyle={style.f1} keyboardShouldPersistTaps="always">
                    <Text style={{ color: 'black', alignSelf: 'center', top: 20 }}>Choose Any one...</Text>
                    <View style={{ flexDirection: 'row', top: 40, flexGrow: 1, marginBottom: 40 }}>
                      <Text style={{ color: this.state.selfSelected ? '#2d76d4' : 'black', marginLeft: 15 }}>Self</Text>
                      <TouchableWithoutFeedback onPress={this.selfSelected}>
                        <View
                          style={[
                            {
                              height: 24,
                              width: 24,
                              borderRadius: 12,
                              borderWidth: 2,
                              borderColor: '#2d76d4',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: 10
                            }
                          ]}
                        >
                          {this.state.selfSelected ? (
                            <View
                              style={{
                                height: 12,
                                width: 12,
                                borderRadius: 6,
                                backgroundColor: '#2d76d4'
                              }}
                            />
                          ) : null}
                        </View>
                      </TouchableWithoutFeedback>
                      <Text style={{ color: this.state.othersSelected ? '#2d76d4' : 'black', marginLeft: 50 }}>
                        Others
                      </Text>
                      <TouchableWithoutFeedback onPress={this.othersSelected}>
                        <View
                          style={[
                            {
                              height: 24,
                              width: 24,
                              borderRadius: 12,
                              borderWidth: 2,
                              borderColor: '#2d76d4',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: 10
                            }
                          ]}
                        >
                          {this.state.othersSelected ? (
                            <View
                              style={{
                                height: 12,
                                width: 12,
                                borderRadius: 6,
                                backgroundColor: '#2d76d4'
                              }}
                            />
                          ) : null}
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                    {this.state.othersSelected && (
                      <View style={[{ flexGrow: 1 }]}>
                        <Text style={{ alignSelf: 'center', top: 10, marginBottom: 10, color: '#2d76d4' }}>
                          Victim Details
                        </Text>
                        <View
                          style={{ borderBottomColor: 'green', borderBottomWidth: 1, marginLeft: 10, marginRight: 10 }}
                        >
                          <FloatingLabel
                            labelStyle={{
                              color: 'black',
                              fontSize: 14,
                              fontFamily: 'Nunito-Bold'
                            }}
                            inputStyle={{
                              borderWidth: 0,
                              fontSize: 14,
                              color: 'black',
                              fontFamily: 'Nunito Regular'
                            }}
                            onChangeText={text => {
                              this.ChangeText(text, 'VictimName');
                            }}
                            value={this.state.VictimName}
                          >
                            Victim Name
                          </FloatingLabel>
                        </View>
                        {/* <Text style={{ color: 'red', marginLeft: 10 }}>{this.state.VictimNameError}</Text> */}
                        <View
                          style={{ borderBottomColor: 'green', borderBottomWidth: 1, marginLeft: 10, marginRight: 10 }}
                        >
                          <FloatingLabel
                            labelStyle={{
                              color: 'black',
                              fontSize: 14,
                              fontFamily: 'Nunito-Bold'
                            }}
                            inputStyle={{
                              borderWidth: 0,
                              fontSize: 14,
                              color: 'black',
                              fontFamily: 'Nunito Regular'
                            }}
                            keyboardType={'numeric'}
                            onChangeText={text => {
                              this.ChangeText(text, 'Age');
                            }}
                            value={this.state.Age}
                          >
                            Age
                          </FloatingLabel>
                        </View>
                        {/* <Text style={{ color: 'red', marginLeft: 10 }}>{this.state.AgeError}</Text> */}
                        <View
                          style={{ borderBottomColor: 'green', borderBottomWidth: 1, marginLeft: 10, marginRight: 10 }}
                        >
                          <FloatingLabel
                            labelStyle={{
                              color: 'black',
                              fontSize: 14,
                              fontFamily: 'Nunito-Bold'
                            }}
                            inputStyle={{
                              borderWidth: 0,
                              fontSize: 14,
                              color: 'black',
                              fontFamily: 'Nunito Regular'
                            }}
                            keyboardType={'numeric'}
                            onChangeText={text => {
                              this.ChangeText(text, 'MobileNumber');
                            }}
                            value={this.state.MobileNumber}
                          >
                            Mobile Number
                          </FloatingLabel>
                        </View>
                        {/* <Text style={{ color: 'red', marginLeft: 10 }}>{this.state.MobileNumberError}</Text> */}
                        <View
                          style={{
                            borderBottomColor: 'green',
                            borderBottomWidth: 1,
                            marginLeft: 10,
                            marginRight: 10,
                            top: 30,
                            marginBottom: 30
                          }}
                        >
                          <ModalDropdown
                            options={Gender}
                            onSelect={(index, value) => {
                              this.ChangeText(value, 'gender');
                            }}
                            dropdownStyle={{
                              width: 100,
                              height: 80,
                              backgroundColor: '#2d76d4'
                            }}
                            dropdownTextStyle={{
                              color: '#FBFCFC',
                              fontSize: 15,
                              backgroundColor: '#2d76d4',
                              marginLeft: 20
                            }}
                            // dropdownTextHighlightStyle={{ backgroundColor: '#34495E' }}
                          >
                            <Text style={{ marginLeft: 10, color: 'black' }}>
                              {this.state.gender !== '' ? this.state.gender : 'Gender'}
                            </Text>
                          </ModalDropdown>
                        </View>
                        {/* <Text style={{ color: 'red', marginLeft: 10 }}>{this.state.GenderError}</Text> */}
                      </View>
                    )}
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly'
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ otherSelf: false, VictimName: '', Age: '', MobileNumber: '', Gender: '' });
                        }}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 5,
                          width: '45%',
                          height: 50,
                          backgroundColor: '#2d76d4',
                          borderRadius: 2
                        }}
                      >
                        <Text style={{ color: 'rgb(255,255,255)' }}>CANCEL</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={this.onRequestAmbulance}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 5,
                          width: '45%',
                          height: 50,
                          backgroundColor: '#2d76d4',
                          borderRadius: 2
                        }}
                      >
                        <Text style={{ color: 'rgb(255,255,255)' }}>PROCEED</Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </KeyboardAvoidingView>
        )}
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    patient: state.patient,
    token: state.token,
    location: state.Location,
    callAmbulance: state.callAmbulance,
    gpsData: state.gpsData,
    trip: state.trip,
    ambulanceRequested: state.ambulanceRequested,
    pickedLocationCoord: state.pickedLocationCoord,
    hospitalLocationCoord: state.hospitalLocationCoord,
    pickedDuration: state.pickedDuration,
    hospitalDuration: state.hospitalDuration,
    pickupLocation: state.pickupLocation,
    pickedReRoute: state.pickedReRoute,
    hospitalReRoute: state.hospitalReRoute
  };
}
export default connect(mapStateToProps)(Home);
