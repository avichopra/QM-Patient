import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
import FloatingLabel from "react-native-floating-labels";
import SplashScreen from "react-native-splash-screen";
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      color: "black"
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
        <View style={styles.container}>
          <View style={{ marginVertical: 20 }}>
            <Image
              source={require("../../assets/logo1.png")}
              style={{ width: 100, height: 120, alignSelf: "center" }}
            />
            <Text style={{ fontSize: 20, color: "white", padding: 10 }}>
              Quick Medic
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                width: Dimensions.get("window").width - 30,
                height: 60
              }}
            >
              <View style={{ flex: 1 }}>
                <Image
                  source={require("../../assets/user3_icon.png")}
                  style={{ width: 40, height: 20, marginVertical: 25 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 6, flexDirection: "column" }}>
                <FloatingLabel
                  labelStyle={{ color: "white", fontSize: 13 }}
                  inputStyle={{ borderWidth: 0, fontSize: 15, color: "white" }}
                >
                  Full Name
                </FloatingLabel>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                width: Dimensions.get("window").width - 30,
                height: 60,
                marginVertical: 20
              }}
            >
              <View style={{ flex: 1 }}>
                <Image
                  source={require("../../assets/email1_icon.png")}
                  style={{ width: 40, height: 20, marginVertical: 25 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 6, flexDirection: "column" }}>
                <FloatingLabel
                  labelStyle={{ color: "white", fontSize: 13 }}
                  inputStyle={{ borderWidth: 0, fontSize: 15, color: "white" }}
                >
                  Email
                </FloatingLabel>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                width: Dimensions.get("window").width - 30,
                height: 60,
                marginVertical: 20
              }}
            >
              <View style={{ flex: 1 }}>
                <Image
                  source={require("../../assets/contact2_icon.png")}
                  style={{ width: 40, height: 20, marginVertical: 20 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 6, flexDirection: "column" }}>
                <FloatingLabel
                  labelStyle={{ color: "white", fontSize: 13 }}
                  inputStyle={{ borderWidth: 0, fontSize: 15, color: "white" }}
                >
                  Contact Number
                </FloatingLabel>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                width: Dimensions.get("window").width - 30,
                height: 60,
                marginVertical: 20
              }}
            >
              <View style={{ flex: 1 }}>
                <Image
                  source={require("../../assets/contact2_icon.png")}
                  style={{ width: 40, height: 20, marginVertical: 20 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 6, flexDirection: "column" }}>
                <FloatingLabel
                  labelStyle={{ color: "white", fontSize: 13 }}
                  inputStyle={{ borderWidth: 0, fontSize: 15, color: "white" }}
                >
                  Emergency Contact Number
                </FloatingLabel>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 20,
                height: 60
              }}
            >
              <View style={{ flex: 1 }}>
                <Image
                  source={require("../../assets/password2_icon.png")}
                  style={{ width: 40, height: 20, marginVertical: 20 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 6 }}>
                <FloatingLabel
                  labelStyle={{ color: "white", fontSize: 13 }}
                  inputStyle={{ borderWidth: 0, fontSize: 15, color: "white" }}
                  secureTextEntry={true}
                >
                  Password
                </FloatingLabel>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 20,
                height: 60
              }}
            >
              <View style={{ flex: 1 }}>
                <Image
                  source={require("../../assets/password2_icon.png")}
                  style={{ width: 40, height: 20, marginVertical: 20 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 6 }}>
                <FloatingLabel
                  labelStyle={{ color: "white", fontSize: 13 }}
                  inputStyle={{ borderWidth: 0, fontSize: 15, color: "white" }}
                  secureTextEntry={true}
                >
                  Confirm Password
                </FloatingLabel>
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              flexGrow: 1,
              marginVertical: 20,
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                borderRadius: 1,
                width: Dimensions.get("window").width / 2 - 30,
                height: 45,
                margin: 10
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  fontSize: 15,
                  color: "blue"
                }}
              >
                SIGN UP
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "white",
                borderRadius: 1,
                width: Dimensions.get("window").width / 2 - 30,
                height: 45,
                margin: 10
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  fontSize: 15,
                  color: "blue"
                }}
              >
                SIGN IN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00008b",
    alignItems: "center",
    justifyContent: "center"
  }
});
