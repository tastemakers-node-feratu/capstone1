import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import LoginScreen from '../screens/LoginScreen';
import LinksScreen from '../screens/LinksScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SnapShotsScreen from '../screens/SnapShotsScreen';
import FriendsScreen from '../screens/FriendsScreen';
import OneSnapScreen from '../screens/OneSnapScreen'
import { createStackNavigator } from '@react-navigation/stack';

const BottomTab = createBottomTabNavigator();

const INITIAL_ROUTE_NAME = 'Home';
const FeedTab = createStackNavigator();

function Feed() {
  return (
    <FeedTab.Navigator initialRouteName="MainFeed" headerMode="none"
    // screenOptions={{
    //   headerStyle: {
    //     backgroundColor: '#74b9ff',
    //   }
    // }}
    >
      <FeedTab.Screen name="MainFeed" component={SnapShotsScreen} />
      <FeedTab.Screen name="SingleSnap" component={OneSnapScreen} />
    </FeedTab.Navigator >
  );
}

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
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />,
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'Resources',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
      <BottomTab.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: 'SignUp',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />,
        }}
      />
      <BottomTab.Screen
        name="AllSnapShots"
        component={Feed}
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-photos" />,
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
      {/* <BottomTab.Screen
        name="SnapShot"
        component={SnapShotsStack}
        options={{
          title: 'SnapShot',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-list-box" />,
        }}
      /> */}
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
