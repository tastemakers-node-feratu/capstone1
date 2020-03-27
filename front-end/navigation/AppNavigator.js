import React from 'react';
import { SwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import BottomTabNavigator from './BottomTabNavigator';
// import AuthLoadingScreen from '../screens/AuthLoadingScreen';


import { MonoText } from '../components/StyledText';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

// function AuthStack({ navigation, route }) {
//     // Set the header title on the parent stack navigator depending on the
//     // currently active tab. Learn more in the documentation:
//     // https://reactnavigation.org/docs/en/screen-options-resolution.html
//     navigation.setOptions({ headerTitle: getHeaderTitle(route) });

//     return (
//         <AuthStack.Navigator>
//             <AuthStack.Screen
//                 name="Home"
//                 component={LoginScreen}
//                 options={{
//                     title: 'Home',
//                     tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />,
//                 }}
//             />
//             <AuthStack.Screen
//                 name="SignUp"
//                 component={SignUpScreen}
//                 options={{
//                     title: 'SignUp',
//                     tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />,
//                 }}
//             />
// )}
const AuthTab = createStackNavigator();

function AuthStack({ navigation, route }) {
    return (< AuthTab.Navigator initialRouteName="Home"
        headerMode="none">
        <AuthTab.Screen name="Home" component={LoginScreen} />
        <AuthTab.Screen name="SignUp" component={SignUpScreen} />
    </AuthTab.Navigator >)
}


export default SwitchNavigator(
    {
        Auth: AuthStack,
        // AuthLoading: AuthLoadingScreen,
        App: BottomTabNavigator,
    },
    {
        initialRouteName: 'AuthStack',
    }
);