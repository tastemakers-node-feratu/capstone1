import React from 'react';
import { SwitchNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
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


export default createAppContainer(createSwitchNavigator(
    {
        Auth: AuthStack,
        // AuthLoading: AuthLoadingScreen,
        App: BottomTabNavigator,
    },
    {
        initialRouteName: 'AuthStack',
    }
));



//   return (
//     <Stack.Navigator>
//       {state.userToken == null ? (
//         // No token found, user isn't signed in
//         <Stack.Screen
//           name="SignIn"
//           component={SignInScreen}
//           options={{
//             title: 'Sign in',
//             // When logging out, a pop animation feels intuitive
//             // You can remove this if you want the default 'push' animation
//             animationTypeForReplace: state.isSignout ? 'pop' : 'push',
//           }}
//         />
//       ) : (
//         // User is signed in
//         <Stack.Screen name="Home" component={HomeScreen} />
//       )}
//     </Stack.Navigator>
//   );