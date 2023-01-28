import { getFirebaseApp } from '../firebase';
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { child, getDatabase, ref, set, update } from 'firebase/database';
import { authenticate, logout } from '../../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from './userActions';

let timer;

export const signUp = (firstName, lastName, email, password) => {
    return async (dispatch) => {
        const app = getFirebaseApp();
        const auth = getAuth(app);

        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const { uid, stsTokenManager } = result.user;
            const { accessToken, expirationTime } = stsTokenManager;

            const expiryDate = new Date(expirationTime);
            const timeNow = new Date();
            const msUntilExpiry = expiryDate - timeNow;
            const userData = await createUser(firstName, lastName, email, uid);

            dispatch(authenticate({ token: accessToken, userData }));
            saveDataToStorage(accessToken, uid, expiryDate);

            timer = setTimeout(() => {
                dispatch(userLogout());
            }, msUntilExpiry);
        } catch (err) {
            console.log(err);
            const errorCode = err.code;

            let message = 'Something went wrong, try again.';

            if (errorCode === 'auth/email-already-in-use') {
                message = 'This email is already in use';
            }

            throw new Error(message);
        }
    };
};

export const login = (email, password) => {
    return async (dispatch) => {
        const app = getFirebaseApp();
        const auth = getAuth(app);
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const { uid, stsTokenManager } = result.user;
            const { accessToken, expirationTime } = stsTokenManager;

            const expiryDate = new Date(expirationTime);
            const timeNow = new Date();
            const msUntilExpiry = expiryDate - timeNow;

            const userData = await getUserData(uid);

            dispatch(authenticate({ token: accessToken, userData }));
            saveDataToStorage(accessToken, uid, expiryDate);
            timer = setTimeout(() => {
                dispatch(userLogout());
            }, msUntilExpiry);
        } catch (err) {
            console.log(err);
            const errorCode = err.code;

            let message = 'Something went wrong, try again.';

            if (
                errorCode === 'auth/user-not-found' ||
                errorCode === 'auth/wrong-password'
            ) {
                message = 'The email or password was incorrect';
            }

            throw new Error(message);
        }
    };
};

export const userLogout = () => {
    return async (dispatch) => {
        AsyncStorage.clear();
        clearTimeout(timer);
        dispatch(logout());
    };
};

export const updateUserData = async (userId, newData) => {
    const fullName = `${newData.firstName} ${newData.lastName}`.toLowerCase();
    newData.fullName = fullName;

    try {
        const db = ref(getDatabase());
        const user = child(db, `users/${userId}`);
        await update(user, newData);
    } catch (error) {
        let message = 'Something went wrong, try again.';
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode === 'PERMISSION_DENIED') {
            message =
                'You are not allowed to do this. Try logging back in again.';
        }
        throw new Error(message);
    }
};

const createUser = async (firstName, lastName, email, userId) => {
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    const userData = {
        firstName,
        lastName,
        fullName,
        email,
        userId,
        signUpDate: new Date().toISOString(),
    };

    const db = ref(getDatabase());
    const childRef = child(db, `users/${userId}`);
    await set(childRef, userData);
    return userData;
};

const saveDataToStorage = (token, userId, expiryDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token,
            userId,
            expiryDate: expiryDate.toISOString(),
        })
    );
};
