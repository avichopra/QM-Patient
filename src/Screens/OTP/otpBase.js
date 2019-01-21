import { Component } from 'react';
import axios from 'axios';
import { isValidOTP } from '../../utilities/validation';
import { callApi } from '../../utilities/serverApi';
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
  ChangeText = (text, name) => {
    this.setState({ [name]: text });
  };
  onSubmit = () => {
    if (this.checkAllMandatoryField()) {
      console.log('OTP Verified');
      //   let data = {
      //     email: this.state.email
      //   };
      //   callApi('post', 'v1/dispatch/forgotpassword', data)
      //     .then(response => {
      //       console.log(response);
      //     })
      //     .catch(error => {
      //       console.log(error);
      //     });
    } else {
      console.log('error');
    }
  };
}
