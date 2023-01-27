import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch } from 'react-redux';
import colors from '../constants/colors';
import commonStyles from '../constants/commonStyles';
import { authenticate, setAttemptedAutoLogin } from '../store/authSlice';
import { userLogout } from '../utils/actions/authActions';
import { getUserData } from '../utils/actions/userActions';

const StartUpScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const storedAuth = await AsyncStorage.getItem('userData');
            if (!storedAuth) {
                dispatch(setAttemptedAutoLogin());
                return;
            }

            const parsedData = JSON.parse(storedAuth);
            const { token, userId, expiryDate: expiryDateString } = parsedData;

            const expiryDate = new Date(expiryDateString);
            const timeNow = new Date();

            if (expiryDate <= new Date() || !token || !userId) {
                dispatch(setAttemptedAutoLogin());
                return;
            }

            const userData = await getUserData(userId);

            dispatch(authenticate({ token, userData }));
            const msUntilExpiry = expiryDate - timeNow;
            timer = setTimeout(() => {
                dispatch(userLogout());
            }, msUntilExpiry);
        };

        tryLogin();
    }, [dispatch]);

    return (
        <View style={commonStyles.center}>
            <ActivityIndicator
                size="large"
                color={colors.blue}
            ></ActivityIndicator>
        </View>
    );
};

export default StartUpScreen;
