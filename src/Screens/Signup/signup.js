import React, { Component } from 'react';
import { View, Image, ScrollView, KeyboardAvoidingView, ImageBackground, ActivityIndicator } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import SignupBase from './signupBase';
import style from '../../styles/index';
import Text from '../../component/CustomComponent/text';
import Button from '../../component/CustomComponent/button';
import Textinput from '../../component/CustomComponent/Textinput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
Gender = ['Male', 'Female'];
BloodGroup = ['A+', 'A-', 'B+', 'B-', 'o+', 'o-', 'AB+', 'AB-'];
export default class Login extends SignupBase {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={style.f1} keyboardShouldPersistTaps="always">
          <ImageBackground source={{ uri: 'asset:/icon/group_2.png' }} style={[style.d1]} resizeMode={'stretch'}>
            <View style={style.d3}>
              <Image source={{ uri: 'asset:/icon/group.png' }} style={[style.a1, style.d2]} />
            </View>
            <View>
              <View style={[style.d4]}>
                <View>
                  <Image source={{ uri: 'asset:/icon/avatar.png' }} style={[style.d6, style.d3]} resizeMode="contain" />
                </View>
                <View style={style.f8}>
                  <Textinput
                    onChangeText={text => {
                      this.ChangeText(text, 'FullName');
                    }}
                    value={this.state.FullName}
                    autoCapitalize="none"
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
                    resizeMode="contain"
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
                    value={this.state.Email}
                    autoCapitalize="none"
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
                    resizeMode="contain"
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
                    value={this.state.contactnumber}
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
                    resizeMode="contain"
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
                    value={this.state.emergencycontactnumber}
                  >
                    Emergency Contact Number
                  </Textinput>
                </View>
              </View>
              <Text style={{ color: 'red' }}>{this.state.emergencycontacterror}</Text>
              <View style={style.d4}>
                <Image
                  source={{ uri: 'asset:/icon/lock.png' }}
                  style={{ width: 40, height: 20, marginVertical: 30 }}
                  resizeMode="contain"
                />

                <View style={style.f8}>
                  <Textinput
                    secureTextEntry={true}
                    onChangeText={text => {
                      this.ChangeText(text, 'password');
                    }}
                    value={this.state.password}
                    autoCapitalize="none"
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
                    resizeMode="contain"
                  />
                </View>
                <View style={style.f8}>
                  <Textinput
                    secureTextEntry={true}
                    onChangeText={text => {
                      this.ChangeText(text, 'confirmpassword');
                    }}
                    value={this.state.confirmpassword}
                    autoCapitalize="none"
                  >
                    Confirm Password
                  </Textinput>
                </View>
              </View>
              <Text style={{ color: 'red' }}>{this.state.confirmpassworderror}</Text>
              <View style={style.d4}>
                {/* <View> */}
                {/* <Image
                  source={{ uri: 'mipmap/relation' }}
                  style={{ width: 40, height: 20, marginVertical: 30 }}
                  resizeMode="contain"
                /> */}
                {/* </View> */}
                <View style={{ marginVertical: 30, marginHorizontal: 5, marginRight: 10, marginBottom: 10 }}>
                  <Icon name="gender-male-female" size={25} color="rgb(255,255,255)" />
                </View>
                <View style={[style.f8, { flexDirection: 'row', justifyContent: 'space-between', top: 27 }]}>
                  <ModalDropdown
                    options={Gender}
                    onSelect={(index, value) => {
                      this.onGenderSelect(value);
                    }}
                    dropdownStyle={{
                      width: 100,
                      height: 80,
                      backgroundColor: '#2d76d4'
                    }}
                    dropdownTextStyle={{
                      color: '#FBFCFC',
                      fontSize: 15,
                      backgroundColor: '#2d76d4',
                      marginLeft: 20
                    }}
                    // dropdownTextHighlightStyle={{ backgroundColor: '#34495E' }}
                  >
                    <Text style={{ marginLeft: 10, color: 'rgb(255,255,255)' }}>
                      {this.state.gender != null ? this.state.gender : 'Gender'}
                    </Text>
                  </ModalDropdown>
                </View>
              </View>
              <Text style={{ color: 'red' }}>{this.state.gendererror}</Text>
              <View style={style.d4}>
                {/* <Image
                  source={{ uri: 'mipmap/blood' }}
                  style={{ width: 40, height: 20, marginVertical: 30 }}
                  resizeMode="contain"
                /> */}
                <View style={{ marginVertical: 30, marginHorizontal: 5, marginRight: 10, marginBottom: 10 }}>
                  <Icons name="whatshot" size={25} color="rgb(255,255,255)" />
                </View>
                <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', top: 27 }]}>
                  <ModalDropdown
                    options={BloodGroup}
                    onSelect={(index, value) => {
                      this.onBloodSelect(value);
                    }}
                    dropdownStyle={{
                      width: 100,
                      height: 120,
                      backgroundColor: '#2d76d4'
                    }}
                    dropdownTextStyle={{
                      color: '#FBFCFC',
                      fontSize: 15,
                      backgroundColor: '#2d76d4',
                      marginLeft: 30
                    }}
                    // dropdownTextHighlightStyle={{ backgroundColor: '#34495E' }}
                  >
                    <Text style={{ marginLeft: 10, color: 'rgb(255,255,255)' }}>
                      {this.state.bloodGroup != null ? this.state.bloodGroup : 'Blood Group'}
                    </Text>
                  </ModalDropdown>
                </View>
              </View>
              <Text style={{ color: 'red' }}>{this.state.bloodGrouperror}</Text>
            </View>
            <View style={style.a9}>
              {this.state.loading === false ? (
                <Button style={style.a10} onPress={this.onSubmit}>
                  <Text style={style.f10}>SIGN UP</Text>
                </Button>
              ) : (
                <View style={style.a10}>
                  <ActivityIndicator size="large" color="#000" />
                </View>
              )}

              <Button
                style={style.a11}
                onPress={() => {
                  this.props.navigation.navigate('Login');
                }}
              >
                <Text style={[style.f10, { color: 'white' }]}>SIGN IN</Text>
              </Button>
            </View>
            {/* <GenericModal
              modalVisible={this.state.modalVisible}
              firstTitle={'Ok'}
              secondTitle={'Resend Email'}
              firstOnPress={this.setModalVisible}
            /> */}
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
