import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { getFirebaseApp } from './firebase';
import uuid from 'react-native-uuid';
import {
    getDownloadURL,
    ref,
    uploadBytesResumable,
    getStorage,
} from 'firebase/storage';

export const launchImagePicker = async () => {
    await checkMediaPermissions();

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });

    if (!result.canceled) {
        return result.assets[0].uri;
    }
};

export const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
        console.log('No permission to access the camera');
    }
    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });

    if (!result.canceled) {
        return result.assets[0].uri;
    }
};
export const uploadImageAsync = async (uri, path) => {
    // Snippet from https://github.com/expo/examples/blob/master/with-firebase-storage-upload/App.js
    const app = getFirebaseApp();

    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send();
    });

    const storageRef = ref(getStorage(app), `${path}/${uuid.v4()}`);

    await uploadBytesResumable(storageRef, blob);
    blob.close();

    return await getDownloadURL(storageRef);
};

const checkMediaPermissions = async () => {
    if (Platform.OS !== 'web') {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            return Promise.reject(
                "We don't have permission to access your media"
            );
        }
        return Promise.resolve();
    }
};
