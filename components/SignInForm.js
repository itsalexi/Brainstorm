import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import Input from './Input';
import SubmitButton from './SubmitButton';

const SignInForm = () => {
    return (
        <>
            <Input
                icon="email-outline"
                iconSize={24}
                IconPack={MaterialCommunityIcons}
                label="Email"
            />
            <Input
                icon="lock"
                iconSize={24}
                IconPack={AntDesign}
                label="Password"
            />

            <SubmitButton
                style={{ marginTop: 15 }}
                title="Login"
                disabled={false}
            />
        </>
    );
};

export default SignInForm;
