import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import BackgroundImage from '../components/BackgroundGradient';
import colors from '../constants/colors';
import commonStyles from '../constants/commonStyles';
import { authenticate, setAttemptedAutoLogin } from '../store/authSlice';
import { userLogout } from '../utils/actions/authActions';
import { getUserData } from '../utils/actions/userActions';
import * as Font from 'expo-font';
import logo from '../assets/images/logo.png';

const StartUpScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const prepare = async () => {
            console.log('preparing fonts');
            try {
                await Font.loadAsync({
                    black: require('../assets/fonts/Roboto-Black.ttf'),
                    blackItalic: require('../assets/fonts/Roboto-BlackItalic.ttf'),
                    bold: require('../assets/fonts/Roboto-Bold.ttf'),
                    boldItalic: require('../assets/fonts/Roboto-BoldItalic.ttf'),
                    italic: require('../assets/fonts/Roboto-Italic.ttf'),
                    light: require('../assets/fonts/Roboto-Light.ttf'),
                    lightItalic: require('../assets/fonts/Roboto-LightItalic.ttf'),
                    medium: require('../assets/fonts/Roboto-Medium.ttf'),
                    mediumItalic: require('../assets/fonts/Roboto-MediumItalic.ttf'),
                    regular: require('../assets/fonts/Roboto-Regular.ttf'),
                    thin: require('../assets/fonts/Roboto-Thin.ttf'),
                    thinItalic: require('../assets/fonts/Roboto-ThinItalic.ttf'),
                });
            } catch (error) {
                console.log(error);
            } finally {
                const tryLogin = async () => {
                    const storedAuth = await AsyncStorage.getItem('userData');
                    if (!storedAuth) {
                        dispatch(setAttemptedAutoLogin());
                        return;
                    }

                    const parsedData = JSON.parse(storedAuth);
                    const {
                        token,
                        userId,
                        expiryDate: expiryDateString,
                    } = parsedData;

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
                await tryLogin();
            }
        };
        setTimeout(() => prepare(), 2000);
    }, [dispatch]);

    useEffect(() => {});

    return (
        <BackgroundImage>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={logo}
                />
            </View>
        </BackgroundImage>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
    },
});

export default StartUpScreen;
