import React, { Component } from 'react';
import { Text, View, Modal, Alert, TouchableOpacity, Dimensions } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
const height = Dimensions.get('window').height;
import { Reasons } from '../../config/constants';
export default class ReasonOfCancellation extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedReason: '' };
  }
  onSelect = value => {
    this.setState({ selectedReason: value });
  };
  render() {
    let { onShowReasons = () => {}, onSubmit = () => {} } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(128,128,128,0.9)',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <View
          style={{
            height: height - 100,
            width: '90%',
            backgroundColor: 'white',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'rgba(128,128,128,0.9)',
            elevation: 3,

            justifyContent: 'space-between'
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              marginTop: 20
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: '#34495E'
              }}
            >
              Reason for cancellation
            </Text>
          </View>
          <ModalDropdown
            options={Reasons}
            onSelect={(index, value) => {
              this.onSelect(value);
            }}
            dropdownStyle={{
              width: 250,
              height: 90,
              backgroundColor: '#34495E',
              borderRadius: 20
            }}
            dropdownTextStyle={{
              color: '#FBFCFC',
              fontSize: 15,
              backgroundColor: '#34495E'
            }}
            dropdownTextHighlightStyle={{ backgroundColor: '#34495E' }}
          >
            <View
              style={{
                height: 40,
                width: 250,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#AAB7B8'
              }}
            >
              <Text
                style={{
                  fontSize: 20
                }}
              >
                Select The Reason.....
              </Text>
            </View>
          </ModalDropdown>
          <View
            style={{
              width: '100%',
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 50
            }}
          >
            <Text style={{ color: '#5D6D7E', fontSize: 18 }} textBreakStrategy="balanced">
              {this.state.selectedReason}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              style={{
                height: 35,
                width: '40%',
                backgroundColor: '#AAB7B8',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10
              }}
              onPress={() => onShowReasons(false)}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            {console.warn('In selected reason')}
            <TouchableOpacity
              style={{
                height: 35,
                width: '40%',
                backgroundColor: '#AAB7B8',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 30
              }}
              disabled={this.state.selectedReason === ''}
              onPress={() => onSubmit(this.state.selectedReason)}
              disabled={this.state.selectedReason == ''}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
