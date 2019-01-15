/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TextInput } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { createSwitchNavigator } from "react-navigation";
import Login from "./src/Screens/login";
import store from "./src/redux";
// const Navigator = createSwitchNavigator(
//   {
//     Login: {
//       screen: Login,
//       navigationOptions: ({ navigation }) => ({
//         header: null
//       })
//     }
//   },
//   {
//     headerMode: "screen",
//     initialRouteName: "Login"
//   }
// );
export default class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 15000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
