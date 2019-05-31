import React, { Component } from 'react';
import { NativeModules } from 'react-native';
import PolyLine from '@mapbox/polyline';
import { callApi } from '../utilities/serverApi';
import { setPatient } from '../redux/index';
import RNGooglePlaces from 'react-native-google-places';
import { AnimatedRegion, Polygon } from 'react-native-maps';
import call from 'react-native-phone-call';
import _ from 'lodash';
import axios from 'axios';
import { unSubscribeSockets } from '../utilities/socket';
import { Alert } from '../ReusableComponents/modal';
import GPSState from 'react-native-gps-state';
import Store from '../redux/store/index';
import {
  addLocation,
  cancelCallAmbulance,
  addAmbulanceRequest,
  cancelAllRequest,
  addPatientLocationCoord,
  addHospitalLocationCoord,
  addPickupLocation
} from '../redux/actions/index';
import { checkField, isValidContactnumber, isValidAge } from '../utilities/validation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
let latitude_delta = 0.009,
  longitude_delta = 0.009;
let CurrentLocation = null;
export default class HomeBase extends Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      currentPlace: '',
      loading: true,
      callAmbulance: false,
      advancedSupport: false,
      basicSupport: true,
      requestAmbulance: false,
      coordinate: new AnimatedRegion({
        latitude: 29.95539,
        longitude: 78.07513
      }),
      destination: new AnimatedRegion({
        latitude: 29.1397982,
        longitude: 75.75666079999999
      }),
      showReasons: false,
      selfSelected: true,
      othersSelected: false,
      otherSelf: false,
      MobileNumber: '',
      Age: '',
      VictimName: '',
      gender: ''
      // MobileNumberError: '',
      // AgeError: '',
      // VictimNameError: '',
      // GenderError: '',
      // otherSelfError: ''
    };
  }
  ChangeText = (value, fieldName) => {
    this.setState({ [fieldName]: value });
  };
  // checkVictim = () => {
  //   // if (this.state.selfSelected || this.state.othersSelected) {
  //   //   if (this.state.selfSelected) {
  //   //   } else {
  //   //     // if (this.checkAllMandatoryField()) {
  //   //     console.warn('true');
  //   //     // }
  //   //   }
  //   // } else {
  //   //   this.setState({ otherSelfError: 'Select Options' });
  //   // }
  // };
  checkAllMandatoryField = () => {
    // console.warn(
    //   'Victimname>>>',
    //   this.state.VictimName,
    //   'gender>>>',
    //   this.state.gender,
    //   'age>>>',
    //   this.state.Age,
    //   'contactno',
    //   this.state.MobileNumber
    // );
    // var victimname = checkField('Victim Name', this.state.VictimName.trim());
    // var contactnumber = isValidContactnumber(this.state.MobileNumber.trim());
    // var age = isValidAge(this.state.Age.trim());
    // var gender = checkField('Gender', this.state.gender.trim());
    // this.setState({
    //   // VictimNameError: victimname,
    //   // MobileNumberError: contactnumber,
    //   // AgeError: age,
    //   GenderError: gender
    // });
    // console.warn('Victimname>>>', victimname, 'gender>>>', gender, 'age>>>', age, 'contactno', contactnumber);
    // if (gender === true) {
    //   return true;
    // }
    // return false;
  };
  EmergencyCall = () => {
    const args = {
      number: '108',
      prompt: false
    };
    call(args).catch(console.error);
  };
  Call = Type => {
    // console.warn('Type>>>>', Type);
    const args = {
      number: Type === 'CN' ? this.props.patient.contactNo : this.props.patient.emergencyContactNo,
      prompt: false
    };
    call(args).catch(console.error);
  };
  selfSelected = () => {
    this.setState({ selfSelected: true, othersSelected: false, otherSelfError: '' });
  };
  othersSelected = () => {
    this.setState({ selfSelected: false, othersSelected: true, otherSelfError: '' });
  };
  onCancelRequest = () => {
    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${this.props.token}`
    };
    let { latitude = '', longitude = '', currentPlace = '' } = this.state;
    let data = {
      cancelAllDrivers: true,
      patientId: this.props.user.id,
      ambulaceSupportType: this.state.advancedSupport ? 'Advance' : 'Basic',
      location: {
        currentPlace: currentPlace,
        latitude: latitude,
        longitude: longitude
      }
    };
    callApi('post', 'v1/daffo/dispatch/cancelAllAmbulanceRequest', data, headers).then(response => {
      console.log('response', response);
    });
    Store.dispatch(cancelAllRequest(true, null, null));
  };
  onShowReasons = value => {
    console.warn('this.onShowReasons');
    this.setState({ showReasons: value });
  };
  checkLocationIsEnabled() {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000
    })
      .then(data => {
        console.warn('location>>>>>>>>>>>>', data);
        RNGooglePlaces.getCurrentPlace()
          .then(results => {
            console.log('current location', results);
            const { latitude, longitude } = results[0];
            Store.dispatch(
              addLocation({
                latitude: results[0].latitude,
                longitude: results[0].longitude
              })
            );
            this.setState({
              loading: false,
              currentPlace:
                this.state.currentPlace.length != 0
                  ? this.state.currentPlace
                  : `${results[0].name},${results[0].address}`,
              latitude: results[0].latitude,
              longitude: results[0].longitude
            });
            console.log('current place', results);
          })
          .catch(error => console.warn(error.message));
      })
      .catch(err => {
        console.warn('Error in location >>>>>>>>>>>>>>>>', err);
      });
  }
  onSubmit = value => {
    Store.dispatch(cancelAllRequest());
    unSubscribeSockets('OnAccept');
    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${this.props.token}`
    };
    let data = {
      patientId: this.props.trip.patientId.userId._id,
      driverId: this.props.trip.driverId.userId._id,
      showPatient: false,
      deviceId: this.props.trip.deviceId
    };
    callApi('post', 'v1/daffo/dispatch/cancelTrip', data, headers).then(response => {
      console.log('response', response);
    });
    this.setState({
      showReasons: false,
      callAmbulance: false,
      advancedSupport: false,
      basicSupport: false
    });
    data = {
      setter: {
        $set: {
          cancellationMessage: value,
          cancelledBy: this.props.user.id,
          status: 'Cancelled'
        }
      },
      filter: {
        patientId: this.props.trip.patientId.userId._id,
        status: 'Progress'
      }
    };
    callApi('patch', 'v1/daffo/Trips/update', data, headers).then(result => {
      console.warn('resultttttttttttttttttttttttttttttt getOwn', result.data);
    });
  };
  componentWillReceiveProps(nextProps) {
    console.warn('Inside Component receive props', this.state.currentPlace);
    if (nextProps.trip != null) {
      console.warn('Inside component receive props for trips', nextProps);
      if (nextProps.pickedLocationCoord === null) {
        if (nextProps.trip.pickedPatient === false) this.getPickupRouteDirection(nextProps.trip.patientLocation, false);
      }
      if (nextProps.hospitalLocationCoord === null) {
        this.getHospitalRouteDirection(nextProps.trip, false);
      }
    }
    if (this.props.gpsData != nextProps.gpsData) {
      console.log('Inside gpsData ambulanace moving');
      if (nextProps.trip.pickedPatient === false) {
        if (nextProps.pickedReRoute != null) {
          this.reRoute(nextProps, false);
        }
      } else {
        if (nextProps.hospitalReRoute != null) {
          this.reRoute(nextProps, true);
        }
      }

      this.desmarker._component.animateMarkerToCoordinate(
        {
          latitude: parseFloat(nextProps.gpsData.latitude),
          longitude: parseFloat(nextProps.gpsData.longitude)
        },
        2000
      );
      let newCoordinate = {
        latitude: parseFloat(nextProps.gpsData.latitude),
        longitude: parseFloat(nextProps.gpsData.longitude),
        latitudeDelta: latitude_delta,
        longitudeDelta: longitude_delta
      };
      this.map.animateToRegion(newCoordinate, 2000);
    }
  }
  reRoute = (data, status) => {
    NativeModules.SLRNGeoFencing.isLocationOnPath(
      {
        lat: parseFloat(data.gpsData.latitude),
        lng: parseFloat(data.gpsData.longitude)
      },
      status ? this.props.hospitalReRoute : this.props.pickedReRoute,
      40,
      response => {
        let customisedData = {
          ...data.trip.patientLocation,
          Gps_Data: data.gpsData
        };
        let customisedData1 = { ...data.trip, Gps_Data: data.gpsData };
        if (!response) {
          if (status) this.getHospitalRouteDirection(customisedData1, true);
          else this.getPickupRouteDirection(customisedData, true);
        }
        console.log('>>>>>>points on polyline >>>>>>', response);
      }
    );
  };
  callAmbulance = async () => {
    this.props.pickupLocation != null &&
      RNGooglePlaces.getCurrentPlace().then(results => {
        this.setState({
          currentPlace: `${results[0].name},${results[0].address}`
        });
      });
    Store.dispatch(cancelCallAmbulance(false));
  };
  Call = contactNo => {
    const args = {
      number: contactNo,
      prompt: false
    };
    call(args).catch(console.error);
  };
  componentWillMount() {
    if (this.props.location != null) {
      this.setState({
        loading: false,
        latitude: this.props.location.latitude,
        longitude: this.props.location.longitude
      });
    }
    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${this.props.token}`
    };
    callApi('post', 'v1/daffo/Patient/getOwn', { perPage: 1, filter: { userId: this.props.user.id } }, headers).then(
      result => {
        result.data[0] ? setPatient(result.data[0]) : '';
      }
    );
  }
  componentWillUnmount() {
    if (this.props.trip === null) {
      Store.dispatch(addPatientLocationCoord(null));
      Store.dispatch(cancelCallAmbulance(true));
    }
    navigator.geolocation.clearWatch(this.watchID);
    GPSState.removeListener();
    Store.dispatch(addPickupLocation(null));
  }
  openDrawer = () => {
    this.props.navigation.openDrawer();
  };
  componentDidMount() {
    // const { params } = this.props.navigation.state;
    // console.warn('>>>>route name>>', params !== undefined ? params.showBloodBank : 'false');
    this.checkLocationIsEnabled();
    GPSState.addListener(status => {
      if (status === 1) {
        this.checkLocationIsEnabled();
      }
    });
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  setUserLocation = Coordinate => {
    const { latitude, longitude } = Coordinate;
    // console.warn('location>>>>', Coordinate);
    CurrentLocation = { latitude, longitude };
    const newCoordinate = {
      latitude,
      longitude
    };
    if (this.marker) {
      this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
    }
    if (this.props.trip === null && this.props.pickedLocationCoord === null) {
      const newCoordinate = {
        latitude,
        longitude,
        latitudeDelta: latitude_delta,
        longitudeDelta: longitude_delta
      };
      this.map.animateToRegion(newCoordinate, 1000);
    }
  };
  onRegionChangeComplete = region => {
    latitude_delta = region.latitudeDelta;
    longitude_delta = region.longitudeDelta;
  };
  AutoCom = async () => {
    if (this.props.trip === null) {
      RNGooglePlaces.openAutocompleteModal({
        country: 'IN',
        latitude: 53.544389,
        longitude: -113.490927,
        radius: 10
      })
        .then(place => {
          this.getPickupRouteDirection({
            lat: place.latitude,
            long: place.longitude
          });
          Store.dispatch(
            addPickupLocation({
              currentPlace: place.address,
              latitude: place.latitude,
              longitude: place.longitude
            })
          );
        })
        .catch(error => console.log(error.message));
    }
  };
  getPickupRouteDirection = async (patientLocation, reRoute) => {
    let method = 'get',
      url = `https://maps.googleapis.com/maps/api/directions/json?origin=${
        reRoute
          ? patientLocation.Gps_Data.latitude
          : CurrentLocation != null
          ? CurrentLocation.latitude
          : this.state.latitude
      },${
        reRoute
          ? patientLocation.Gps_Data.longitude
          : CurrentLocation != null
          ? CurrentLocation.longitude
          : this.state.longitude
      }&destination=${patientLocation.lat},${patientLocation.long}&key=AIzaSyAYl-EN9gKgW4DflxwhYmHIt4RqP5vT-WY`,
      headers = { 'content-type': 'application/json' };
    let option = {
      method,
      url,
      headers
    };
    axios(option).then(response => {
      const points = PolyLine.decode(response.data.routes[0].overview_polyline.points);
      let pointCoords = points.map(point => {
        return { latitude: point[0], longitude: point[1] };
      });
      let Polygon = points.map(point => {
        return { lat: point[0], lng: point[1] };
      });
      Store.dispatch(
        addPatientLocationCoord(
          pointCoords,
          {
            distance: response.data.routes[0].legs[0].distance.text,
            duration: response.data.routes[0].legs[0].duration.text
          },
          Polygon
        )
      );
      console.log('reRouting>>>>>');
      if (this.props.trip === null) this.map.fitToCoordinates(pointCoords);
    });
  };
  getHospitalRouteDirection = async (data, reRoute) => {
    let method = 'get',
      url = `https://maps.googleapis.com/maps/api/directions/json?origin=${
        reRoute ? data.Gps_Data.latitude : data.patientLocation.lat
      },${reRoute ? data.Gps_Data.longitude : data.patientLocation.long}&destination=${data.hospitalLocation.lat},${
        data.hospitalLocation.long
      }&key=AIzaSyAYl-EN9gKgW4DflxwhYmHIt4RqP5vT-WY`,
      headers = { 'content-type': 'application/json' };
    let option = {
      method,
      url,
      headers
    };
    axios(option).then(response => {
      const points = PolyLine.decode(response.data.routes[0].overview_polyline.points);
      let pointCoords = points.map(point => {
        return { latitude: point[0], longitude: point[1] };
      });
      let Polygon = points.map(point => {
        return { lat: point[0], lng: point[1] };
      });
      Store.dispatch(
        addHospitalLocationCoord(
          pointCoords,
          {
            distance: response.data.routes[0].legs[0].distance.text,
            duration: response.data.routes[0].legs[0].duration.text
          },
          Polygon
        )
      );
    });
  };
  showSelfOtherCapture = () => {
    this.setState({ otherSelf: true });
  };
  onRequestAmbulance = () => {
    this.setState({ otherSelf: false });
    let { latitude = '', longitude = '', currentPlace = '' } = this.state;
    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${this.props.token}`
    };
    let data = {
      ambulanceSupport: this.state.advancedSupport ? 'Advance' : 'Basic',
      id: this.props.patient._id,
      location: {
        currentPlace: this.props.pickupLocation != null ? this.props.pickupLocation.currentPlace : currentPlace,
        latitude: this.props.pickupLocation != null ? this.props.pickupLocation.latitude : CurrentLocation.latitude,
        longitude: this.props.pickupLocation != null ? this.props.pickupLocation.longitude : CurrentLocation.longitude
      },
      victimData: {
        victimName: this.state.VictimName,
        age: this.state.Age,
        mobileNo: this.state.MobileNumber,
        gender: this.state.gender,
        victimType: this.state.selfSelected ? 'Self' : 'Others'
      }
    };
    callApi('post', 'v1/daffo/dispatch/requestAmbulance', data, headers)
      .then(response => {
        Store.dispatch(addAmbulanceRequest(response.data.requestData));
      })
      .catch(error => {
        console.log('Error>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.', error.response);
        if (error.response != undefined && error.response.data.code === 404) {
          Alert({
            title: 'Ambulance Request',
            message: 'No any driver found.',
            buttons: [
              {
                title: 'OK',
                icon: false,
                backgroundColor: 'blue'
              }
            ]
          });
        }
        console.log('Network error>>>>>>', error);
      });
  };
  onAdvancedSupport = () => {
    this.setState({ advancedSupport: true, basicSupport: false });
  };
  onBasicSupport = () => {
    this.setState({ basicSupport: true, advancedSupport: false });
  };
}
