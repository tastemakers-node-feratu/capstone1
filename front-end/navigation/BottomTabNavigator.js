import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import LoginScreen from '../screens/LoginScreen';
import CheckInScreen from '../screens/CheckInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SnapShotsScreen from '../screens/SnapShotsScreen';
import FriendsScreen from '../screens/FriendsScreen';
import OneSnapScreen from '../screens/OneSnapScreen'


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={LoginScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      {/* <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'Resources',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      /> */}
      <BottomTab.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: 'SignUp',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
      <BottomTab.Screen
        name="AllSnapShots"
        component={SnapShotsScreen}
        options={{
          title: 'AllSnapShots',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
      <BottomTab.Screen
        name="AllFriends"
        component={FriendsScreen}
        options={{
          title: 'Friends',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-list-box" />,
        }}
      />
      <BottomTab.Screen
        name="Check In"
        component={CheckInScreen}
        options={{
          title: 'Check In',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-list-box" />,
        }}
      />
      <BottomTab.Screen
        name="SnapShot"
        component={OneSnapScreen}
        options={{
          title: 'SnapShot',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-list-box" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

initialRouteName = { INITIAL_ROUTE_NAME }
function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return '';
    case 'Links':
      return '';
  }
}
