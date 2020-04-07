import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';

const AppStack = createStackNavigator();

function AppNavigator() {
    return (
        <AppStack.Navigator initialRouteName={"Auth"} headerMode='none'>
            <AppStack.Screen name="Auth" component={AuthNavigator} />
            <AppStack.Screen name="Home" component={BottomTabNavigator} />
        </AppStack.Navigator>
    );
}

export default AppNavigator;
