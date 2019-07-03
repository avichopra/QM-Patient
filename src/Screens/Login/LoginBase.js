import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import Store from '../../redux/store/index';
import { addAmbulanceRequest, addTrip } from '../../redux/actions';
import { isValidEmail, isValidPassword, checkField } from '../../utilities/validation';
import { callApi } from '../../utilities/serverApi';
import { setUserToken, setUser, setPatient, setUserRefreshToken } from '../../redux/index';
import { Alert } from '../../ReusableComponents/modal';
import { get } from 'lodash';
export default class LoginBase extends Component {
  constructor(props) {
    super(props);
  }
  ChangeText = async (text, name) => {
    await this.setState({ [name]: text });
    if (name === 'email') {
      let email = checkField('Email', this.state.email.trim());
      this.setState({ emailerror: email });
    } else if (name === 'password') {
      let password = checkField('Password', this.state.password.trim());
      this.setState({ passworderror: password });
    }
  };
  checkAllField = () => {
    console.log(this.state.email);
    var email = isValidEmail(this.state.email.trim());
    var password = isValidPassword(this.state.password.trim());
    console.log(email, password);
    if (email === false) email = 'Enter Valid Email id';
    this.setState({
      emailerror: email,
      passworderror: password
    });
    if (email === true && password === true) {
      return true;
    }
    return false;
  };
  sendVerifationEmail = () => {
    let data = {
      email: this.state.email.trim()
    };
    console.log('email', data);
    callApi('post', 'v1/daffo/dispatch/resentVerificationEmail', data)
      .then(response => {
        console.log('Response in resend', response);
        this.setState({ email: '', password: '' });
      })
      .catch(error => {
        console.log(error);
      });
  };
  onSubmit = () => {
    Keyboard.dismiss();
    const { navigate } = this.props.navigation;
    if (this.checkAllField()) {
      let data = {
        email: this.state.email.trim().toLowerCase(),
        password: this.state.password.trim(),
        role: 'Patient'
      };
      this.setState({ loading: true });
      let fields = {
        patientId: {
          userId: {
            _id: 1,
            fullname: 1,
            email: 1,
            emergencycontactnumber: 1,
            contactNo: 1,
            picture: 1
          }
        },
        pickedPatient: 1,
        vehicleNo: 1,
        patientAddress: 1,
        driverAddress: 1,
        hospitalName: 1,
        hospitalAddress: 1,
        hospitalNo: 1,
        hospitalLocation: { lat: 1, long: 1 },
        patientLocation: { lat: 1, long: 1 },
        driverLocation: { lat: 1, long: 1 },
        driverId: {
          userId: {
            deleted: 1,
            role: 1,
            createdAt: 1,
            fullname: 1,
            email: 1,
            contactNo: 1,
            emailVerificationCode: 1,
            phoneVerified: 1,
            online: 1,
            deviceId: 1,
            picture: 1
          }
        }
      };
      callApi('post', 'v1/auth/login', data)
        .then(response => {
          console.log('user details', response);
          setUser(response.data.user);
          setUserToken(response.data.token.accessToken);
          setUserRefreshToken(response.data.token);
          this.setState({ loading: false });
          let headers = {
            'content-type': 'application/json',
            Accept: 'application/json',
            authorization: `Bearer ${response.data.token.accessToken}`
          };
          Promise.all([
            callApi(
              'post',
              'v1/daffo/Trips/getOwn',
              {
                perPage: 1,
                fields: fields,
                filter: { status: 'Progress', patientId: response.data.user.id }
              },
              headers
            ),
            callApi(
              'post',
              'v1/daffo/Requests/getOwn',
              {
                perPage: 1,
                filter: {
                  status: 'Pending',
                  requestedBy: response.data.user.id
                }
              },
              headers
            )
          ])
            .then(response => {
              response[0].data.length != 0 && Store.dispatch(addTrip(response[0].data[0]));
              response[1].data.length != 0 && Store.dispatch(addAmbulanceRequest(response[1].data[0]));
              navigate('Drawer');
            })
            .catch(error => {
              console.log('Error', error);
            });
          console.log('token set');
        })
        .catch(error => {
          console.log('Error---->', error.response);
          this.setState({ loading: false });
          if (error.response.data.message === 'Incorrect email') {
            this.setState({ emailerror: 'Incorrect email' });
          } else if (error.response.data.message === 'Incorrect password')
            this.setState({ passworderror: 'Incorrect password' });
          // else if (error.response.data.message.emailVerified===false) {
          // 	console.log('inside verify modal',error.response.data.message);
          // 	Alert({
          // 		title: 'Verify Email',
          // 		message: 'Verify your email',
          // 		buttons: [
          // 			{
          // 				title: 'Cancel',
          // 				icon: false,
          // 				backgroundColor: 'blue'
          // 			},
          // 			{
          // 				title: 'Send Verification Email',
          // 				onPress: this.sendVerifationEmail,
          // 				icon: false,
          // 				backgroundColor: 'blue'
          // 			}
          // 		]
          // 	});
          // }
          else if (error.response.data.message.phoneVerified === false)
            navigate('OTP', {
              email: error.response.data.message.email,
              routeName: 'Drawer',
              currentRoute: 'Login'
            });
          else if (error.response.data.message === 'User Deleted') this.setState({ emailerror: 'User Deleted' });
          else if (error.response.data.message === 'User Blocked') this.setState({ emailerror: 'User Blocked' });
          else {
            console.warn('error in login', error.response.data.message);
            this.setState({ emailerror: 'Unauthorised User' });
          }
        });
    } else {
      console.log('error in validation');
    }
  };
  componentDidMount() {
    Keyboard.dismiss();
  }
}
