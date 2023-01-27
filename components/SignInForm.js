import { StyleSheet, Text, View } from 'react-native';
import React, { useReducer, useCallback } from 'react';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import Input from './Input';
import SubmitButton from './SubmitButton';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../reducers/formReducer';

const initialState = {
    inputValidities: {
        email: false,
        password: false,
    },
    formIsValid: false,
};
const SignInForm = () => {
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
                id="email"
                icon="email-outline"
                iconSize={24}
                IconPack={MaterialCommunityIcons}
                label="Email"
                onInputChanged={inputChangedHandler}
                keyboardType="email-address"
                errorText={formState.inputValidities['email']}
            />
            <Input
                id="password"
                icon="lock"
                iconSize={24}
                IconPack={AntDesign}
                label="Password"
                autoCapitalize="none"
                onInputChanged={inputChangedHandler}
                secureTextEntry
            />

            <SubmitButton
                style={{ marginTop: 15 }}
                title="Login"
                disabled={!formState.formIsValid}
            />
        </>
    );
};

export default SignInForm;
