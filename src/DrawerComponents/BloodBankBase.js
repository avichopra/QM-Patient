import React, { Component } from 'react';
import { callApi } from '../utilities/serverApi';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import RNGooglePlaces from 'react-native-google-places';
import GPSState from 'react-native-gps-state';
export default class HomeBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bloodBank: null,
      promptPriGov: false,
      PriSelected: true,
      govtSelected: false,
      hospital: null,
      loading: true,
      latitude: 29.1336826,
      longitude: 75.7485779
    };
  }
  openDrawer = () => {
    this.props.navigation.openDrawer();
  };
  checkLocationEnabled = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000
    }).then(data => {
      RNGooglePlaces.getCurrentPlace().then(results => {
        const { latitude, longitude } = results[0];
        this.fetchData(latitude, longitude);
        this.setState({
          latitude,
          longitude,
          loading: false
        });
      });
    });
  };
  fetchData = (latitude, longitude) => {
    const { params } = this.props.navigation.state;
    const { location } = this.props;
    let data = {
      location: { lat: latitude, long: longitude },
      status: params.status,
      PriSelected: this.state.PriSelected,
      govtSelected: this.state.govtSelected
    };
    let headers = {
      'Content-type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${this.props.token}`
    };
    callApi('post', 'v1/daffo/dispatch/getBloodBank', data, headers)
      .then(async response => {
        let coordinate;
        if (response.data.length != 0) {
          if (!params.status) {
            this.setState({ bloodBank: response.data });
            coordinate = await response.data.map(data => {
              return { latitude: data.bloodBankLocation[0], longitude: data.bloodBankLocation[1] };
            });
          } else {
            this.setState({ hospital: response.data });
            coordinate = await response.data.map(data => {
              return { latitude: data.Location[0], longitude: data.Location[1] };
            });
          }
          this.map.fitToCoordinates(coordinate);
        } else {
          this.setState({ hospital: null, bloodBank: null });
        }
      })
      .catch(error => {
        console.warn('Error>>>>', error);
      });
  };
  componentWillUnmount() {
    GPSState.removeListener();
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;
    params.status && this.setState({ promptPriGov: true });
    this.checkLocationEnabled();
    GPSState.addListener(status => {
      if (status === 1) {
        this.checkLocationEnabled();
      }
    });
  }
  privateSelected = () => {
    this.setState({ PriSelected: !this.state.PriSelected, govtSelected: !this.state.govtSelected }, () => {
      this.checkLocationEnabled();
    });
  };
  govtSelected = () => {
    this.setState({ govtSelected: !this.state.govtSelected, PriSelected: !this.state.PriSelected }, () => {
      this.checkLocationEnabled();
    });
  };
}
