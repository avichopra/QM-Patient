import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from "react-native";
import Textinput from "../../component/CustomComponent/Textinput";
import style from "../../styles/index";
import FloatingLabel from "react-native-floating-labels";
import SplashScreen from "react-native-splash-screen";
import Base from "./resetBase";
export default class Reset extends Base {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailerror: ""
    };
  }

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 5000);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          source={{ uri: "asset:/icon/group_2.png" }}
          style={[style.d1]}
          resizeMode={"stretch"}
        >
          <View style={style.d3}>
            <Image
              source={{ uri: "asset:/icon/lock_1.png" }}
              style={{ width: 50, height: 70, alignSelf: "center" }}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={[style.i1, style.a1]}>Forget Password</Text>
          </View>
          <View style={{ flexGrow: 0.5 }}>
            <Text style={[style.i1, { fontSize: 12 }]}>
              We just need your registered e-mail address to
            </Text>

            <Text style={[style.i1, style.a1, { fontSize: 12 }]}>
              send you password reset link
            </Text>
          </View>
          <View style={style.d4}>
            <Image
              source={{ uri: "asset:/icon/mail_copy.png" }}
              style={{ width: 40, height: 20, marginVertical: 30 }}
              resizeMode="contain"
            />

            <View style={style.f3}>
              <Textinput
                onChangeText={text => {
                  this.ChangeText(text, "email");
                }}
              >
                Email
              </Textinput>
            </View>
          </View>
          <Text style={style.c1}>{this.state.emailerror}</Text>
          <View style={[style.f1, style.j1]}>
            <View style={style.d7}>
              <Text
                style={{
                  color: "white",
                  fontSize: 13
                }}
              >
                I have an account?&nbsp;
              </Text>
              <Text
                style={{ fontSize: 15, color: "white" }}
                onPress={() => {
                  this.props.navigation.navigate("Login");
                }}
              >
                Sign In
              </Text>
            </View>
            <TouchableOpacity style={style.c2} onPress={this.onSubmit}>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  fontSize: 14,
                  color: "#2948ff"
                }}
              >
                Reset Password
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}