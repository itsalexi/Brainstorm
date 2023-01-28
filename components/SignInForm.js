import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import React, { useReducer, useCallback, useState, useEffect } from 'react';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import Input from './Input';
import SubmitButton from './SubmitButton';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../reducers/formReducer';
import { login } from '../utils/actions/authActions';
import { useDispatch } from 'react-redux';
import colors from '../constants/colors';

const testMode = true;

const initialState = {
    inputValues: {
        email: testMode ? 'test@alexi.life' : '',
        password: testMode ? 'password' : '',
    },

    inputValidities: {
        email: testMode,
        password: testMode,
    },
    formIsValid: testMode,
};
const SignInForm = () => {
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (error) {
            console.log(error);
            Alert.alert('An error has occurred', error);
        }
    }, [error]);

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

    const signInHandler = useCallback(async () => {
        try {
            setLoading(true);
            const action = login(
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
                id="email"
                icon="email-outline"
                iconSize={24}
                IconPack={MaterialCommunityIcons}
                label="Email"
                onInputChanged={inputChangedHandler}
                keyboardType="email-address"
                errorText={formState.inputValidities['email']}
                placeholder="Enter your email"
                autoCapitalize="none"
                initialValue={formState.inputValues.email}
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
                placeholder="Enter your password"
                initialValue={formState.inputValues.password}
            />
            {!loading ? (
                <SubmitButton
                    style={{ marginTop: 15 }}
                    title="Log in"
                    disabled={!formState.formIsValid}
                    onPress={signInHandler}
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

export default SignInForm;
