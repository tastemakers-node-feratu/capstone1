import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
// import LoginScreen from '../screens/LoginScreen';
// import SignUpScreen from '../screens/SignUpScreen';
import CheckInScreen from '../screens/CheckInScreen';
import SnapShotsScreen from '../screens/SnapShotsScreen';
import FriendsScreen from '../screens/FriendsScreen';
import OneSnapScreen from '../screens/OneSnapScreen'
import { createStackNavigator } from '@react-navigation/stack';
import SingleFriendScreen from '../screens/SingleFriendScreen';

import Icon from 'react-native-vector-icons/FontAwesome';
import UserProfileScreen from '../screens/UserProfileScreen';
import UserProfileSnapView from '../components/UserProfileSnapView'
import MySnaps from '../screens/MySnaps'

const BottomTab = createBottomTabNavigator();

const INITIAL_ROUTE_NAME = 'Home';
const FeedTab = createStackNavigator();
const FriendTab = createStackNavigator();
const ProfileTab = createStackNavigator();

function Feed() {
  return (
    <FeedTab.Navigator initialRouteName="MainFeed"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#034f84',
        },
        title: ''
      }}
    >
      <FeedTab.Screen name="MainFeed" component={SnapShotsScreen} />
      <FeedTab.Screen name="SingleSnap" component={OneSnapScreen} />
      <FeedTab.Screen name="SingleFriend" component={SingleFriendScreen} />
    </FeedTab.Navigator >
  );
}

function Friends() {
  return (< FriendTab.Navigator initialRouteName="All Friends"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#034f84',
      },
      title: ''
    }}
  >
    <FriendTab.Screen name="All Friends" component={FriendsScreen} />
    <FriendTab.Screen name="SingleFriend" component={SingleFriendScreen} />
    <FriendTab.Screen name="SingleSnap" component={OneSnapScreen} />
  </FriendTab.Navigator>)
}

function Profile() {
  return (
    <ProfileTab.Navigator initialRouteName="Profile"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#034f84',
        },
        title: ''
      }}
    >
      <ProfileTab.Screen name="Profile" component={UserProfileScreen} />
      <ProfileTab.Screen name="All Friends" component={Friends} />
      <ProfileTab.Screen name="My Pins" component={MySnaps} />
      {/* <ProfileTab.Screen name="Settings" component={Settings} /> */}
    </ProfileTab.Navigator>
  )
}

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Check In"
        component={CheckInScreen}
        options={{
          title: 'Check In',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-photos" />
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
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Icon name="user" size={30} color="#900" />
          )
        }}
      />
    </BottomTab.Navigator >
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
