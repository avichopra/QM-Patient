import React, { Component } from 'react';
import { Text, View, Keyboard } from 'react-native';
import { callApi } from '../utilities/serverApi';
import ImageResizer from 'react-native-image-resizer';
import SplashScreen from 'react-native-splash-screen';
import ImagePicker from 'react-native-image-picker';
import { setUser, setPatient } from '../redux/index';
import { Alert } from '../ReusableComponents/modal';
import { checkEmpty } from '../utilities/validation';
export default class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GeneralInfoPressed: true,
      AdditionalInfoPressed: false,
      GeneralInfo: {
        email: '',
        contactNo: '',
        emergencyContactNo: '',
        contactNoError: '',
        emergencyContactNoError: ''
      },
      AdditionalInfo: {
        address: '',
        bloodGroup: '',
        emergencyContactNo: '',
        relationWithPatient: '',
        gender: ''
      },
      imageSelected: false,
      profileImage: '',
      userName: '',
      avatarSource: null,
      picture: '',
      userName: '',
      loading: false,
      contactNoError: ''
    };
  }

  onHandleChange = (name, value, field) => {
    if (field) {
      this.state[field][name] = value;
      this.setState({});
    } else {
      this.state[name] = value;
      this.setState({});
    }
  };
  openDrawer = () => {
    this.props.navigation.openDrawer();
  };
  checkPhoneVerified = () => {
    console.warn('phn vrr', this.props.user.phoneVerified);
    if (this.props.user.phoneVerified === false) {
      Alert({
        title: 'Verify Number',
        message: 'Your new contact number is not verified please verify it',
        buttons: [
          {
            title: 'Verify Number',
            icon: false,
            backgroundColor: 'blue',
            onPress: this.goToOtp
          }
        ]
      });
    }
  };
  goToOtp = () => {
    this.props.navigation.navigate('OTP', {
      contactNo: this.props.user.newContactNo,
      email: this.props.user.email,
      routeName: 'MyProfile'
    });
  };
  clearName = () => {
    this.setState({ userName: '' });
  };
  componentDidMount() {
    this.state.userName = this.props.user.fullname;
    this.state.GeneralInfo.email = this.props.user.email;
    this.state.GeneralInfo.contactNo = this.props.user.contactNo;
    this.state.picture = this.props.user.picture;
    this.state.AdditionalInfo.bloodGroup = this.props.patient.bloodGroup;
    this.state.AdditionalInfo.gender = this.props.patient.gender;
    this.state.AdditionalInfo.relationWithPatient = this.props.patient.realtionWithPatient;
    this.state.AdditionalInfo.address = this.props.patient.address;
    this.state.GeneralInfo.emergencyContactNo = this.props.user.emergencycontactnumber;
    this.state.AdditionalInfo.emergencyContactNo = this.props.user.emergencycontactnumber;
    this.setState({});
    this.checkPhoneVerified();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }
  checkLength = () => {
    if (this.state.GeneralInfo.contactNo.length !== 10) {
      this.setState({
        contactNoError: 'Contact No length should be equal to  10'
      });
      return true;
    } else {
      return false;
    }
  };
  onSave = () => {
    Keyboard.dismiss();
    let contactNo = this.state.GeneralInfo.contactNo;
    let contactNoError = checkEmpty(contactNo);
    contactNoError && true ? this.setState({ contactNoError: 'Contact Number Cannot be empty' }) : '';
    contactNoError === false ? (contactNoError = this.checkLength()) : '';
    if (contactNoError === false) {
      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: `Bearer ${this.props.token}`
      };
      if (this.state.GeneralInfo.contactNo !== this.props.user.contactNo) {
        let data = {
          fullname: this.state.userName,
          email: this.state.GeneralInfo.email,
          newContactNo: this.state.GeneralInfo.contactNo,
          phoneVerified: false,
          emergencycontactnumber: this.state.GeneralInfo.emergencyContactNo,
          address: this.state.AdditionalInfo.address,
          bloodGroup: this.state.AdditionalInfo.bloodGroup,
          realtionWithPatient: this.state.AdditionalInfo.relationWithPatient,
          emergencyContactNo: this.state.AdditionalInfo.emergencyContactNo,
          gender: this.state.AdditionalInfo.gender
        };
        this.setState({ loading: true });
        callApi('post', 'v1/daffo/dispatch/updatePatient', data, headers)
          .then(result => {
            this.setState({ loading: false });
            setUser(result.data.updatedUser);
            setPatient(result.data.updatedPatient);
            this.props.navigation.navigate('OTP', {
              contactNo: this.state.GeneralInfo.contactNo,
              email: this.state.GeneralInfo.email,
              routeName: 'MyProfile'
            });
          })
          .catch(err => {
            console.warn('error from myProfile Base ', err.response, err.status, err);
          });
      } else {
        let data = {
          fullname: this.state.userName,
          email: this.state.GeneralInfo.email,
          emergencycontactnumber: this.state.GeneralInfo.emergencyContactNo,
          address: this.state.AdditionalInfo.address,
          bloodGroup: this.state.AdditionalInfo.bloodGroup,
          realtionWithPatient: this.state.AdditionalInfo.relationWithPatient,
          emergencyContactNo: this.state.AdditionalInfo.emergencyContactNo,
          picture: this.state.picture,
          gender: this.state.AdditionalInfo.gender
        };
        console.warn('token before save', this.props.token);

        this.setState({ loading: true });
        callApi('post', 'v1/daffo/dispatch/updatePatient', data, headers)
          .then(result => {
            console.log('useeeeeeeeeeeeeeeeeeeeeeeeee', result);
            this.setState({ loading: false });
            setUser(result.data.updatedUser);
            setPatient(result.data.updatedPatient);
          })
          .catch(err => {
            console.warn('error from myProfile Base ', err.response, err.status, err);
          });
      }
    }
  };
  cameraClicked = () => {
    const options = {
      title: 'Select Avatar'
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        let data = new FormData();
        ImageResizer.createResizedImage(response.uri, 164, 164, 'JPEG', 100, 0).then(result => {
          data.append('file', {
            uri: result.uri,
            type: 'image/jpeg',
            name: result.name
          });
          data.append('bucket', 'public');
          let headers = {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            authorization: `Bearer ${this.props.token}`
          };
          callApi('post', 'v1/daffo/dispatch/upload', data, headers)
            .then(result1 => {
              this.setState({ picture: result1.data[0].file.filename });
            })
            .catch(err => {});
        });
      }
    });
  };

  GeneralInfoPressed = () => {
    this.setState({ GeneralInfoPressed: true, AdditionalInfoPressed: false });
  };
  AdditionalInfoPressed = () => {
    this.setState({ GeneralInfoPressed: false, AdditionalInfoPressed: true });
  };
}
