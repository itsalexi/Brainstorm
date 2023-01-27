import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import Input from './Input';
import SubmitButton from './SubmitButton';

import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../reducers/formReducer';
import { signUp } from '../utils/actions/authActions';
import colors from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
    inputValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    },

    inputValidities: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
    },
    formIsValid: false,
};

const SignUpForm = () => {
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue);
            dispatchFormState({
                inputId,
                validationResult: result,
                inputValue,
            });
        },
        [dispatchFormState]
    );

    useEffect(() => {
        if (error) {
            console.log(error);
            Alert.alert('An error has occurred', error);
        }
    }, [error]);

    const signUpHandler = useCallback(async () => {
        try {
            setLoading(true);
            const action = signUp(
                formState.inputValues.firstName,
                formState.inputValues.lastName,
                formState.inputValues.email,
                formState.inputValues.password
            );
            setError(null);
            await dispatch(action);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }, [dispatch, formState]);

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

            {!loading ? (
                <SubmitButton
                    style={{ marginTop: 15 }}
                    title="Sign up"
                    disabled={!formState.formIsValid}
                    onPress={signUpHandler}
                />
            ) : (
                <ActivityIndicator
                    size={'small'}
                    color={colors.blue}
                    style={{ marginTop: 20 }}
                />
            )}
        </>
    );
};

export default SignUpForm;
