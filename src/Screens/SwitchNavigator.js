import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './login';
import SignUp from './signup';
import Reset from './reset';
import MyApp from './DrawerNavigator';
const SwitchRouteConfig = {
	Login: Login,
	SignUp: SignUp,
	Reset: Reset,
	MyApp: MyApp
	// Logout: Logout
};

const SwitchConfig = {
	initialRouteName: 'MyApp'
};

export default createAppContainer(createSwitchNavigator(SwitchRouteConfig, SwitchConfig));
