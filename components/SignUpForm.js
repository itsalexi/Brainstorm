import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useReducer } from 'react';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import Input from './Input';
import SubmitButton from './SubmitButton';

import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../reducers/formReducer';

const initialState = {
    inputValidities: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
    },
    formIsValid: false,
};

const SignUpForm = () => {
    const [formState, dispatchFormState] = useReducer(reducer, initialState);

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue);
            dispatchFormState({ inputId, validationResult: result });
        },
        [dispatchFormState]
    );

    return (
        <>
            <Input
                id="firstName"
                icon="user"
                iconSize={24}
                IconPack={AntDesign}
                label="First Name"
                onInputChanged={inputChangedHandler}
                autoCapitalize="none"
                errorText={formState.inputValidities['firstName']}
                placeholder="John"
            />
            <Input
                id="lastName"
                icon="user"
                iconSize={24}
                IconPack={AntDesign}
                label="Last Name"
                onInputChanged={inputChangedHandler}
                autoCapitalize="none"
                errorText={formState.inputValidities['lastName']}
                placeholder="Doe"
            />
            <Input
                id="email"
                icon="email-outline"
                iconSize={24}
                IconPack={MaterialCommunityIcons}
                label="Email"
                onInputChanged={inputChangedHandler}
                keyboardType="email-address"
                autoCapitalize="none"
                errorText={formState.inputValidities['email']}
                placeholder="johndoe@yahoo.com"
            />
            <Input
                id="password"
                icon="lock"
                iconSize={24}
                IconPack={AntDesign}
                label="Password"
                autoCapitalize="none"
                secureTextEntry
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['password']}
                placeholder="Must be atleast 6 characters long"
            />

            <SubmitButton
                style={{ marginTop: 15 }}
                title="Sign up"
                disabled={!formState.formIsValid}
            />
        </>
    );
};

export default SignUpForm;
