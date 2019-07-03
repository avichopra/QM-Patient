import React, { Component } from 'react';
import { View, Image, KeyboardAvoidingView, Dimensions, ScrollView } from 'react-native';
import Header from './Header';
import Button from '../ReusableComponents/Button';
import TextField from '../ReusableComponents/TextInput';
import { connect } from 'react-redux';
const height = Dimensions.get('window').height;
import Base from './ChangePasswordBase';
class ChangePassword extends Base {
  openDrawer = () => {
    this.props.navigation.openDrawer();
  };
  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="always"
        >
          <View style={{ flexGrow: 1, alignItems: 'center' }}>
            <View style={{ flexGrow: 1, width: '100%' }}>
              <Header title={'Change Password'} openDrawer={this.openDrawer} />
            </View>
            <View
              style={{
                flexGrow: 1,
                alignSelf: 'center',
                width: '50%'
              }}
            >
              <Image source={{ uri: 'mipmap/aid' }} style={{ height: 140, width: '100%' }} />
            </View>
            <View
              style={{
                height: 270,
                flexGrow: 1,
                borderWidth: 3,
                borderRadius: 2,
                borderColor: 'rgba(178,186,187 	,0.1)',
                borderBottomWidth: 0,
                elevation: 5,
                marginVertical: 30,
                alignItems: 'center'
              }}
            >
              <TextField
                placeholder={'Old Password'}
                icon={'key'}
                onHandleChange={this.onHandleChange}
                value={'oldPassword'}
                error={this.state.oldPasswordError}
                secureTextEntry={true}
                fieldValue={this.state.oldPassword}
              />
              <TextField
                placeholder={'New Password'}
                icon={'key'}
                onHandleChange={this.onHandleChange}
                value={'newPassword'}
                error={this.state.newPasswordError}
                secureTextEntry={true}
                fieldValue={this.state.newPassword}
              />
              <TextField
                placeholder={'Confirm New Password'}
                icon={'key'}
                onHandleChange={this.onHandleChange}
                value={'confirmNewPassword'}
                error={this.state.confirmNewPasswordError}
                secureTextEntry={true}
                fieldValue={this.state.confirmNewPassword}
              />
            </View>
            <View
              style={{
                flexGrow: 1,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginVertical: height * 0.044
              }}
            >
              <Button title={'Save'} backgroundColor={'#2d76d4'} onSave={this.onSave} loading={this.state.loading} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    token: state.token
  };
}
export default connect(mapStateToProps)(ChangePassword);
