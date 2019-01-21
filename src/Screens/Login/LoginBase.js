import React, { Component } from 'react';
import { isValidEmail, isValidPassword } from '../../utilities/validation';
import { callApi } from '../../utilities/serverApi';
import { setUserToken, setUser } from '../../redux/index';
import { get } from 'lodash';
export default class LoginBase extends Component {
  constructor(props) {
    super(props);
  }
  ChangeText = (text, name) => {
    this.setState({ [name]: text });
  };
  checkAllField = () => {
    console.log(this.state.email);
    var email = isValidEmail(this.state.email);
    var password = isValidPassword(this.state.password);
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
  onSubmit = () => {
    const { navigate } = this.props.navigation;
    if (this.checkAllField()) {
      let data = {
        email: this.state.email,
        password: this.state.password
      };
      let result = callApi('post', 'v1/auth/login', data)
        .then(response => {
          console.log(
            'access token',
            response.data.token.accessToken,
            'user',
            response.data.user
          );
          setUser(response.data.user);
          setUserToken(response.data.token.accessToken);
          navigate('Oauth');
          console.log('token set');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('error in validation');
    }
  };
  componentDidMount() {}
}
