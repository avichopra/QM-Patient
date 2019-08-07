import React, { Component } from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { saveSubscriptionInfo, unSubscribeSockets } from '../utilities/socket';
import { connect } from 'react-redux';
import Home from '../DrawerComponents/Home';
import History from '../DrawerComponents/History';
import MyProfile from '../DrawerComponents/MyProfile';
import ChangePassword from '../DrawerComponents/ChangePassword';
import Logout from '../DrawerComponents/Logout';
import DrawerContent from '../DrawerComponents/DrawerContent';
import BloodBank from '../DrawerComponents/BloodBank';
const Stack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    MyProfile: {
      screen: MyProfile
    },
    ChangePassword: {
      screen: ChangePassword
    },
    History: {
      screen: History
    },
    Logout: {
      screen: Logout
    },
    BloodBank: {
      screen: BloodBank
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
    navigationOptions: {
      headerVisible: false
    }
  }
);
const MyDrawerNavigator = createDrawerNavigator(
  {
    Stack: {
      screen: Stack
    }
  },
  {
    initialRouteName: 'Stack',
    drawerWidth: 300,
    contentComponent: DrawerContent
  }
);
class DrawerNavigaterWrapper extends Component {
  static router = MyDrawerNavigator.router;
  componentWillMount() {
    saveSubscriptionInfo('DrawerNavigater', [this.props.user.id]);
    this.props.trip != null && saveSubscriptionInfo('OnAccept', [this.props.trip.deviceId]);
  }
  componentWillUnmount() {
    unSubscribeSockets('DrawerNavigater');
  }
  render() {
    return <MyDrawerNavigator navigation={this.props.navigation} />;
  }
}
function mapStateToProps(state) {
  console.log('user in state of drawernavigater', state);
  return {
    user: state.user,
    trip: state.trip
  };
}
export default connect(mapStateToProps)(DrawerNavigaterWrapper);
