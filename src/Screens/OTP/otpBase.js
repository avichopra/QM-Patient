import { Component } from 'react';
import { isValidOTP, checkField } from '../../utilities/validation';
import { callApi } from '../../utilities/serverApi';
import { setUserToken, setUser, setUserRefreshToken } from '../../redux/index';
export default class resetBase extends Component {
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
      this.setState({ loading: true });
      const { navigation } = this.props;
      let data;
      if (navigation.state.params.contactNo !== undefined) {
        data = {
          email: navigation.state.params.email,
          otp: this.state.otp,
          contactNo: navigation.state.params.contactNo
        };
      } else {
        data = {
          email: this.props.navigation.state.params.email,
          otp: this.state.otp
        };
      }
      callApi('post', 'v1/daffo/dispatch/otpVerification', data)
        .then(response => {
          setUser(response.data.user);
          setUserToken(response.data.token.accessToken);
          setUserRefreshToken(response.data.token);
          this.setState({ loading: false });
          this.props.navigation.navigate(
            this.props.navigation.state.params.routeName ? this.props.navigation.state.params.routeName : 'Drawer'
          );
        })
        .catch(error => {
          this.setState({
            otperror: error.response.data.message,
            loading: false
          });
          console.log(error);
        });
    } else {
      console.log('error');
    }
  };
  resendOTP = email => {
    let data = { email: email };
    callApi('post', 'v1/daffo/dispatch/reSendOtp', data)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            otperror: 'OTP has been sent, Please verify your number',
            loading: false
          });
        }
        console.log('Response in resend otp', response);
      })
      .catch(error => {
        console.log('inside error', error.response.data);
      });
  };
}
