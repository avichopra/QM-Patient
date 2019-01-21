import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from 'react-native';
import Textinput from '../../component/CustomComponent/Textinput';
import style from '../../styles/index';
import Base from './ResetBase';
import SplashScreen from 'react-native-splash-screen';
export default class Reset extends Base {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmpassword: '',
      passworderror: '',
      confirmpassworderror: ''
    };
  }
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }
  render() {
    return (
      <ScrollView contentContainerStyle={style.f1}>
        <ImageBackground
          source={{ uri: 'asset:/icon/group_2.png' }}
          style={style.d1}
          resizeMode={'stretch'}
        >
          <View style={style.f1}>
            <Image
              source={{ uri: 'asset:/icon/group.png' }}
              style={[style.d2, style.d3, style.a1]}
            />
          </View>
          <View style={style.f1}>
            <View style={style.d4}>
              <Image
                source={{ uri: 'asset:/icon/lock.png' }}
                style={style.d5}
                resizeMode='contain'
              />

              <View style={style.f8}>
                <Textinput
                  secureTextEntry={true}
                  onChangeText={text => {
                    this.ChangeText(text, 'password');
                  }}
                >
                  Password
                </Textinput>
              </View>
            </View>
            <Text style={style.c1}>{this.state.passworderror}</Text>
            <View style={style.d4}>
              <Image
                source={{ uri: 'asset:/icon/lock.png' }}
                style={[style.d6, style.d3]}
                resizeMode='contain'
              />

              <View style={style.f3}>
                <Textinput
                  secureTextEntry={true}
                  onChangeText={text => {
                    this.ChangeText(text, 'confirmpassword');
                  }}
                >
                  Confirm Password
                </Textinput>
              </View>
            </View>
            <Text style={style.c1}>{this.state.confirmpassworderror}</Text>
          </View>
          <View style={[style.j1, style.f1]}>
            <TouchableOpacity style={style.c2} onPress={this.onSubmit}>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 13,
                  fontSize: 14,
                  color: '#2948ff',
                  fontFamily: 'Nunito Bold'
                }}
              >
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}
