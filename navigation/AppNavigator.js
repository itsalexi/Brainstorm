import { View, Text } from 'react-native';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import MainNavigator from './MainNavigator';
import AuthScreen from '../screens/AuthScreen';
import { useSelector } from 'react-redux';
import StartUpScreen from '../screens/StartUpScreen';

const AppNavigator = (props) => {
    const isAuth = useSelector(
        (state) => state.auth.token !== null && state.auth.token !== ''
    );
    const attemptedAutoLogin = useSelector(
        (state) => state.auth.attemptedAutoLogin
    );

    return (
        <NavigationContainer >
            {isAuth && <MainNavigator />}
            {!isAuth && attemptedAutoLogin && <AuthScreen />}
            {!isAuth && !attemptedAutoLogin && <StartUpScreen />}
        </NavigationContainer>
    );
};

export default AppNavigator;
