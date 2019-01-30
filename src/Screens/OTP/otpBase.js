import { Component } from 'react';
import axios from 'axios';
import { isValidOTP, checkField } from '../../utilities/validation';
import { callApi } from '../../utilities/serverApi';
import { setUserToken, setUser,setUserRefreshToken } from '../../redux/index';
export default class resetBase extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    const otp = navigation.getParam('otp');
    const user = navigation.getParam('user');
    console.log('Parameter', otp, user);
  }
  checkAllMandatoryField = () => {
    var otp = isValidOTP(this.state.otp);
    this.setState({
      otperror: otp
    });
    if (otp === true) return true;
    return false;
  };
  ChangeText = async (text, name) => {
    await this.setState({ [name]: text });
    if (name === 'otp') {
      let otp = checkField('OTP', this.state.otp);
      this.setState({ otperror: otp });
    }
  };
  onSubmit = () => {
    
    if (this.checkAllMandatoryField()) {
      this.setState({loading:true})
      // console.log('OTP Verified', this.state.otp, this.state.id);
      let data = {
        email: this.state.email,
        otp: this.state.otp
      };
      callApi('post', 'v1/daffo/dispatch/otpVerification', data)
        .then(response => {
          setUser(response.data.user);
          setUserToken(response.data.token.accessToken);
          setUserRefreshToken(response.data.token)
          this.setState({loading:false})
          console.log('response', response);
          this.props.navigation.navigate('Drawer');
        })
        .catch(error => {
          this.setState({ otperror: error.response.data.message ,loading:false});
          console.log(error);
        });
    } else {
      console.log('error');
    }
  };
  resendOTP = () => {
    this.setState({loading:true})
    let data = { email: this.state.email };
    callApi('post', 'v1/daffo/dispatch/reSendOtp', data)
      .then(response => {
        if (response.status === 200) {
          this.setState({ otperror: 'OTP sent successfully',loading:false });
        }
        console.log('Response in resend otp', response);
      })
      .catch(error => {
        console.log('inside error', error.response.data);
      });
  };
}
