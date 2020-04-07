import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from '../screens/SignUpScreen';
import PreScreen from '../screens/PreScreen';

const Stack = createStackNavigator();

function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName={"PreScreen"} headerMode='none'
        >
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="PreScreen" component={PreScreen} />
        </Stack.Navigator>

    );
}

export default AuthNavigator;
