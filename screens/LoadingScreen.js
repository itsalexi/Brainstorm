import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BackgroundImage from '../components/BackgroundGradient';
import logo from '../assets/images/logo.png';

const LoadingScreen = () => {
    return (
        <BackgroundImage style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={logo}
                />
            </View>
            <ActivityIndicator
                style={styles.loading}
                size={'large'}
                color="white"
            />
        </BackgroundImage>
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    loading: {},
    imageContainer: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
    },
});
