import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import React, {
    useCallback,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    Alert,
    ScrollView,
} from 'react-native';
import Input from '../components/Input';
import PageContainer from '../components/PageContainer';
import PageTitle from '../components/PageTitle';
import { reducer } from '../reducers/formReducer';
import { validateInput } from '../utils/actions/formActions';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../constants/colors';
import SubmitButton from '../components/SubmitButton';
import { updateUserData, userLogout } from '../utils/actions/authActions';
import { updateUserStateData } from '../store/authSlice';
import ProfileImage from '../components/ProfileImage';

const SettingsScreen = (props) => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);

    const firstName = userData.firstName || '';
    const lastName = userData.lastName || '';
    const email = userData.email || '';
    const about = userData.about || '';

    const initialState = {
        inputValues: {
            firstName,
            lastName,
            email,
            about,
        },

        inputValidities: {
            firstName: undefined,
            lastName: undefined,
            email: undefined,
            about: undefined,
        },
        formIsValid: false,
    };

    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (error) {
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

    const saveHandler = useCallback(async () => {
        const updatedValues = formState.inputValues;

        try {
            setLoading(true);
            await updateUserData(userData.userId, updatedValues);
            dispatch(updateUserStateData({ newData: updatedValues }));
            Alert.alert('Saved your changes');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            setError(null);
        }
    }, [dispatch, formState]);

    const hasChanged = () => {
        const currentValues = formState.inputValues;

        return (
            currentValues.firstName != firstName ||
            currentValues.lastName != lastName ||
            currentValues.email != email ||
            currentValues.about != about
        );
    };

    return (
        <PageContainer style={styles.container}>
            <PageTitle text="Settings" />
            <ScrollView contentContainerStyle={styles.formContainer}>
                <ProfileImage size={100} />

                <Input
                    id="firstName"
                    icon="user"
                    iconSize={24}
                    IconPack={AntDesign}
                    label="First Name"
                    onInputChanged={inputChangedHandler}
                    autoCapitalize="none"
                    value={formState.inputValues.firstName}
                    errorText={formState.inputValidities['firstName']}
                    placeholder="John"
                    labelStyle={{ color: 'black' }}
                    initialValue={userData.firstName}
                />
                <Input
                    id="lastName"
                    icon="user"
                    iconSize={24}
                    IconPack={AntDesign}
                    label="Last Name"
                    onInputChanged={inputChangedHandler}
                    autoCapitalize="none"
                    value={formState.inputValues.lastName}
                    errorText={formState.inputValidities['lastName']}
                    placeholder="Doe"
                    labelStyle={{ color: 'black' }}
                    initialValue={userData.lastName}
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
                    value={formState.inputValues.email}
                    errorText={formState.inputValidities['email']}
                    placeholder="johndoe@yahoo.com"
                    labelStyle={{ color: 'black' }}
                    initialValue={userData.email}
                />
                <Input
                    id="about"
                    icon="user"
                    iconSize={24}
                    IconPack={AntDesign}
                    label="Bio"
                    onInputChanged={inputChangedHandler}
                    autoCapitalize="none"
                    value={formState.inputValues.about}
                    errorText={formState.inputValidities['about']}
                    placeholder="Tell us about you"
                    labelStyle={{ color: 'black' }}
                    initialValue={userData.about}
                />

                {!loading ? (
                    hasChanged() && (
                        <SubmitButton
                            style={{ marginTop: 15 }}
                            title="Save Changes"
                            disabled={!formState.formIsValid}
                            onPress={saveHandler}
                        />
                    )
                ) : (
                    <ActivityIndicator
                        size={'small'}
                        color={colors.blue}
                        style={{ marginTop: 20 }}
                    />
                )}
                <SubmitButton
                    style={{ marginTop: 15 }}
                    title="Logout"
                    color={colors.red}
                    onPress={() => dispatch(userLogout())}
                />
            </ScrollView>
        </PageContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    formContainer: {
        alignItems: 'center',
    },
});

export default SettingsScreen;
