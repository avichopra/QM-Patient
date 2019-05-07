// import { Button } from "react-native-elements";
// import styles from "./../style";
import React, { Fragment } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Loading from '../ReusableComponents/loading';
export default (Button = props => {
  const {
    onPress = () => {},
    title = 'title',
    disabled = false,
    style = {},
    backgroundColor = '',
    styleTitle = {},
    loading = false,
    onSave = () => {}
  } = props;
  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      {loading ? (
        <Loading backgroundColor={backgroundColor} />
      ) : (
        <TouchableOpacity
          disabled={disabled}
          style={[
            {
              height: 50,
              width: '68%',
              borderRadius: 22.5,
              backgroundColor: backgroundColor,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1.5,
              borderColor: 'rgba(215,219,221,0.8)',
              elevation: 1
            },
            style
          ]}
          onPress={onSave}
          // {disabled ? () => {} : onPress}
          // activeOpacity={0.5}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 19,
              fontFamily: 'Nunito-SemiBold',
              letterSpacing: 0.5,
              marginBottom: 4
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
});
