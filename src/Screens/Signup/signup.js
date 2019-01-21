import React, { Component } from 'react';
import {
  View,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
  StatusBar,
  Linking
} from 'react-native';
import SignupBase from './signupBase';
import style from '../../styles/index';
import Text from '../../component/CustomComponent/text';
import Button from '../../component/CustomComponent/button';
import Textinput from '../../component/CustomComponent/Textinput';
import SplashScreen from 'react-native-splash-screen';
export default class Login extends SignupBase {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    Linking.getInitialURL().then(url => {
      this.navigate(url);
    });
    setTimeout(() => {
      SplashScreen.hide();
    }, 5000);
  }
  handleOpenURL = event => {
    this.navigate(event.url);
  };
  navigate = url => {
    console.log('Linking ', url);
    // E
    // const { navigate } = this.props.navigation;
    // const route = url.replace(/.*?:\/\//g, '');
    // const id = route.match(/\/([^\/]+)\/?$/)[1];
    // const routeName = route.split('/')[0];

    // // if (routeName === 'people') {
    // //   navigate('People', { id, name: 'chris' });
    // // }
    // console.log('Navigate', routeName);
  };
  render() {
    return (
      <ScrollView contentContainerStyle={style.f1}>
        <StatusBar
          barStyle='light-content'
          hidden={true}
          backgroundColor='blue'
        />
        <ImageBackground
          source={{ uri: 'asset:/icon/group_2.png' }}
          style={style.d1}
          resizeMode={'stretch'}
        >
          <View style={style.d3}>
            <Image
              source={{ uri: 'asset:/icon/group.png' }}
              style={[style.a1, style.d2]}
            />
          </View>
          <View>
            <View style={[style.d4]}>
              <View>
                <Image
                  source={{ uri: 'asset:/icon/avatar.png' }}
                  style={[style.d6, style.d3]}
                  resizeMode='contain'
                />
              </View>
              <View style={style.f8}>
                <Textinput
                  onChangeText={text => {
                    this.ChangeText(text, 'FullName');
                  }}
                >
                  Full Name
                </Textinput>
              </View>
            </View>
            <Text style={{ color: 'red' }}>{this.state.fullnameerror}</Text>
            <View style={style.d4}>
              <View>
                <Image
                  source={{ uri: 'asset:/icon/mail_copy.png' }}
                  style={{ width: 40, height: 15, marginVertical: 30 }}
                  resizeMode='contain'
                />
              </View>
              <View
                style={[
                  style.f8,
                  {
                    flexDirection: 'column'
                  }
                ]}
              >
                <Textinput
                  keyboardType={'email-address'}
                  onChangeText={text => {
                    this.ChangeText(text, 'Email');
                  }}
                >
                  Email
                </Textinput>
              </View>
            </View>
            <Text style={{ color: 'red' }}>{this.state.emailerror}</Text>
            <View style={style.d4}>
              <View>
                <Image
                  source={{ uri: 'asset:/icon/shape_copy.png' }}
                  style={{ width: 40, height: 20, marginVertical: 30 }}
                  resizeMode='contain'
                />
              </View>
              <View
                style={[
                  style.f8,
                  {
                    flexDirection: 'column'
                  }
                ]}
              >
                <Textinput
                  keyboardType={'numeric'}
                  maxLength={10}
                  onChangeText={text => {
                    this.ChangeText(text, 'contactnumber');
                  }}
                >
                  Contact Number
                </Textinput>
              </View>
            </View>
            <Text style={{ color: 'red' }}>{this.state.contacterror}</Text>
            <View style={style.d4}>
              <View>
                <Image
                  source={{ uri: 'asset:/icon/shape_copy.png' }}
                  style={{ width: 40, height: 20, marginVertical: 30 }}
                  resizeMode='contain'
                />
              </View>
              <View
                style={[
                  style.f8,
                  {
                    flexDirection: 'column'
                  }
                ]}
              >
                <Textinput
                  keyboardType={'numeric'}
                  maxLength={10}
                  onChangeText={text => {
                    this.ChangeText(text, 'emergencycontactnumber');
                  }}
                >
                  Emergency Contact Number
                </Textinput>
              </View>
            </View>
            <Text style={{ color: 'red' }}>
              {this.state.emergencycontacterror}
            </Text>
            <View style={style.d4}>
              <Image
                source={{ uri: 'asset:/icon/lock.png' }}
                style={{ width: 40, height: 20, marginVertical: 30 }}
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
            <Text style={{ color: 'red' }}>{this.state.passworderror}</Text>
            <View style={style.d4}>
              <View>
                <Image
                  source={{ uri: 'asset:/icon/lock.png' }}
                  style={{ width: 40, height: 20, marginVertical: 30 }}
                  resizeMode='contain'
                />
              </View>
              <View style={style.f8}>
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
            <Text style={{ color: 'red' }}>
              {this.state.confirmpassworderror}
            </Text>
          </View>
          <View style={style.a9}>
            <Button style={style.a10} onPress={this.onSubmit}>
              <Text style={style.f10}>SIGN UP</Text>
            </Button>

            <Button
              style={style.a11}
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}
            >
              <Text style={[style.f10, { color: 'white' }]}>SIGN IN</Text>
            </Button>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}
