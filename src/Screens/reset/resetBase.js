import { Component } from "react";
import axios from "axios";
import { isValidEmail } from "../../utilities/validation";
import { callApi } from "../../utilities/serverApi";
export default class resetBase extends Component {
  checkAllMandatoryField = () => {
    var email = isValidEmail(this.state.email);

    console.log(email);
    if (email === false) email = "Enter Valid Email id";
    this.setState({
      emailerror: email
    });
    if (email === true) {
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
        email: this.state.email
      };
      callApi("post", "v1/dispatch/forgotpassword", data)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      //   axios
      //     .post("http://192.168.100.166:3000/v1/auth/register", {
      //       fullname: "asd",
      //       email: "ashutoshkr@daffodilsw.com",
      //       contactNo: "9045552671",
      //       emergencycontactnumber: "9045552671",
      //       password: "hjvghjv"
      //     })
      //     .then(response => {
      //       console.log(response);
      //     })
      //     .catch(error => {
      //       console.log(error);
      //     });
    } else {
      console.log("error");
    }
  };
}
