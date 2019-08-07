import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
export default class DrawerItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigateToScreen = () => {}, name } = this.props;
    return (
      <View style={styles.DrawerItem}>
        <TouchableOpacity onPress={() => navigateToScreen(this.props.route, name === 'hospital_1' && true)}>
          <View style={styles.Container}>
            <View style={styles.Icon}>
              <Image
                source={{ uri: `mipmap/${this.props.name}` }}
                style={{ height: 27, width: 25 }}
                resizeMode={'contain'}
              />
            </View>
            <View style={styles.Screen}>
              <Text style={styles.title}> {this.props.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  DrawerItem: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Container: { flexDirection: 'row', width: '70%' },
  Icon: { height: 27, width: '25%' },
  Screen: { height: 30, width: '70%' },
  title: { color: '#383838', fontSize: 15, marginTop: 3 }
});
