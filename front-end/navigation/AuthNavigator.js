import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import PreScreen from '../screens/PreScreen';

const Stack = createStackNavigator();

function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName={"PreScreen"} headerMode='none'
            // screenOptions={{
            //     headerStyle: {
                //   backgroundColor: '#034f84'
        //         }, 
        //         title: ''
        // }}
        >
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
            <Stack.Screen name="PreScreen" component={PreScreen} />
        </Stack.Navigator>

    );
}

export default AuthNavigator;
