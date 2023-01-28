import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import background from '../assets/images/background.png';
import { LinearGradient } from 'expo-linear-gradient';

const BackgroundImage = ({ children }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#59b5e6', '#c672ee', '#4a34bf']}
                start={{ x: 0.5, y: 0.2 }}
                end={{ x: 1, y: 1 }}
                style={styles.backgroundImage}
            >
                {children}
            </LinearGradient>
        </View>
    );
};

export default BackgroundImage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    backgroundImage: {
        flex: 1,
    },
});
