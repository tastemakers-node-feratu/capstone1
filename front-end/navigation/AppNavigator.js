import * as React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import BottomTabNavigator from './BottomTabNavigator'
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';


const AuthStack = createStackNavigator();
function AuthNavigator() {
    return (
        < AuthStack.Navigator initialRouteName={"Login"}
            headerMode="none">
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        </AuthStack.Navigator >
    )
}

const AppStack = createStackNavigator();

function AppNavigator() {
    return (
        <AppStack.Navigator initialRouteName={"Home"}>
            <AppStack.Screen name="Home" component={AuthNavigator} />
            <AppStack.Screen name="Main" component={BottomTabNavigator} />
        </AppStack.Navigator >
    )
}
export default AppNavigator