import React, { Component } from 'react';
import { isValidConfirmPassword, isValidPassword, checkField } from '../../utilities/validation';
import { callApi } from '../../utilities/serverApi';
import { Alert } from '../../ReusableComponents/modal';
export default class LoginBase extends Component {
  constructor(props) {
    super(props);
  }
  ChangeText = async (text, name) => {
    await this.setState({ [name]: text });
    if (name === 'password') {
      let password = checkField('Password', this.state.password.trim());
      this.setState({ passworderror: password });
    } else if (name === 'confirmpassword') {
      let cnfpassword = checkField('Confirm Password', this.state.confirmpassword.trim());
      this.setState({ confirmpassworderror: cnfpassword });
    }
  };
  checkAllField = () => {
    console.log(this.state.email);
    var password = isValidPassword(this.state.password);
    var confirmpassword = isValidConfirmPassword(this.state.password, this.state.confirmpassword);
    this.setState({
      passworderror: password,
      confirmpassworderror: confirmpassword
    });
    if (password === true && confirmpassword === true) {
      return true;
    }
    return false;
  };
  onSubmit = () => {
    if (this.checkAllField()) {
      this.setState({ loading: true });
      let data = {
        email: this.state.email,
        resetPasswordToken: this.state.token,
        password: this.state.password
      };
      callApi('post', 'v1/auth/resetPassword', data)
        .then(response => {
          if (response.status === 200)
            Alert({
              title: 'Reset Password',
              message: 'Password Reset successfully',
              buttons: [
                {
                  title: 'Ok',
                  icon: false,
                  backgroundColor: 'blue'
                }
              ]
            });
          this.setState({ loading: false });
          this.props.navigation.navigate('Login');
        })
        .catch(error => {
          this.setState({ loading: false });
        });
    } else {
      console.log('error in validation');
    }
  };
  componentDidMount() {}
}
