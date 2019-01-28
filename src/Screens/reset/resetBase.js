import { Component } from 'react';
import { isValidEmail, checkField } from '../../utilities/validation';
import { callApi } from '../../utilities/serverApi';
import { Alert } from '../../ReusableComponents/modal';
export default class resetBase extends Component {
  checkAllMandatoryField = () => {
    var email = isValidEmail(this.state.email);

    console.log(email);
    if (email === false) email = 'Enter Valid Email id';
    this.setState({
      emailerror: email
    });
    if (email === true) {
      return true;
    }
    return false;
  };
  ChangeText = async (text, name) => {
    await this.setState({ [name]: text });
    if (name === 'email') {
      let email = checkField('Email', this.state.email.trim());
      this.setState({ emailerror: email });
    }
  };
  onSubmit = () => {
    if (this.checkAllMandatoryField()) {
      let data = {
        email: this.state.email
      };
      callApi('post', 'v1/auth/forget', data)
        .then(response => {
          if (response.status === 200) {
            this.setState({email:""})
            Alert({
              message: 'Password reset link has been sent to your email'
            });
            console.log('response', response);
            // alert('Password Reset Link has been sent to your email');
          }
          // console.log(response);
        })
        .catch(error => {
          if (error.response.data.code === 400) {
            this.setState({ emailerror: 'user not found' });
          }
          console.log('Error', error.response.data);
        });
    } else {
      console.log('error');
    }
  };
}
