import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import {
    AntDesign,
    MaterialCommunityIcons,
    MaterialIcons,
} from '@expo/vector-icons';

import Input from './Input';
import SubmitButton from './SubmitButton';

const SignUpForm = () => {
    return (
        <>
            <Input
                icon="user"
                iconSize={24}
                IconPack={AntDesign}
                label="First Name"
            />
            <Input
                icon="user"
                iconSize={24}
                IconPack={AntDesign}
                label="Last Name"
            />
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
                title="Sign up"
                disabled={false}
            />
        </>
    );
};

export default SignUpForm;
