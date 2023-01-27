import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Touchable,
    TouchableOpacity,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PageContainer from '../components/PageContainer';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import colors from '../constants/colors';
import logo from '../assets/images/logo.png';
import BackgroundGradient from '../components/BackgroundGradient';
const AuthScreen = (props) => {
    const [isSigningUp, setisSigningUp] = useState(false);

    return (
        <BackgroundGradient>
            <SafeAreaView style={styles.screen}>
                <PageContainer style={styles.screen}>
                    <ScrollView
                        style={{ width: Dimensions.get('window').width * 0.9 }}
                    >
                        <KeyboardAvoidingView
                            style={styles.keyboardView}
                            behavior={
                                Platform.OS === 'ios' ? 'height' : undefined
                            }
                            keyboardVerticalOffset={100}
                        >
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.image}
                                    resizeMode="contain"
                                    source={logo}
                                />
                            </View>

                            {isSigningUp ? <SignUpForm /> : <SignInForm />}

                            <TouchableOpacity
                                style={styles.linkContainer}
                                onPress={() => setisSigningUp(!isSigningUp)}
                            >
                                <Text style={styles.link}>{`${
                                    isSigningUp
                                        ? 'Already have an account? Login!'
                                        : 'Creating an account? Register!'
                                }`}</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </PageContainer>
            </SafeAreaView>
        </BackgroundGradient>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    link: {
        color: colors.white,
        fontFamily: 'medium',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 250,
    },
    image: {
        width: '75%',
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default AuthScreen;
