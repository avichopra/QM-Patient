import React, { Component } from "react";
import axios from "axios";
import {
  checkField,
  isValidEmail,
  isValidContactnumber,
  isValidPassword,
  isValidConfirmPassword
} from "../../utilities/validation";
import { callApi } from "../../utilities/serverApi";
export default class signupBase extends Component {
  constructor() {
    super();
    this.state = {
      FullName: "",
      Email: "",
      contactnumber: "",
      emergencycontactnumber: "",
      password: "",
      confirmpassword: "",
      fullnameerror: "",
      emailerror: "",
      contacterror: "",
      emergencycontacterror: "",
      passworderror: "",
      confirmpassworderror: ""
    };
  }
  checkAllMandatoryField = () => {
    var fullname = checkField(this.state.FullName);
    var email = isValidEmail(this.state.Email);
    var contactnumber = isValidContactnumber(this.state.contactnumber);
    var emergencycontactnumber = isValidContactnumber(
      this.state.emergencycontactnumber
    );
    var password = isValidPassword(this.state.password);
    var confirmpassword = isValidConfirmPassword(
      this.state.password,
      this.state.confirmpassword
    );

    console.log(
      fullname,
      email,
      contactnumber,
      emergencycontactnumber,
      password,
      confirmpassword
    );
    if (email === false) email = "Enter Valid Email id";
    this.setState({
      fullnameerror: fullname,
      emailerror: email,
      contacterror: contactnumber,
      emergencycontacterror: emergencycontactnumber,
      passworderror: password,
      confirmpassworderror: confirmpassword
    });
    if (
      fullname === true &&
      email === true &&
      contactnumber === true &&
      emergencycontactnumber === true &&
      password === true &&
      confirmpassword === true
    ) {
      return true;
    }
    return false;
  };
  ChangeText = (text, name) => {
    this.setState({ [name]: text });
  };
  onSubmit = () => {
    if (this.checkAllMandatoryField()) {
      let data = {
        fullname: this.state.FullName,
        email: this.state.Email,
        contactNo: this.state.contactnumber,
        emergencycontactnumber: this.state.emergencycontactnumber,
        password: this.state.password
      };
      callApi("post", "v1/auth/register", data)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("error");
    }
  };
  componentDidMount() {}
}
