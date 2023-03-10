import React, { useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';

import userImage from '../assets/images/userImage.png';
import colors from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { launchImagePicker, uploadImageAsync } from '../utils/ImagePicker';
import { updateUserData } from '../utils/actions/authActions';
import { useDispatch } from 'react-redux';
import { updateUserStateData } from '../store/authSlice';
const ProfileImage = ({
    size,
    uri,
    userId,
    showEditButton,
    showRemoveButton,
    onPress,
    style,
}) => {
    const dispatch = useDispatch();
    const source = uri ? { uri } : userImage;

    const [image, setImage] = useState(source);
    const [loading, setLoading] = useState(false);

    const showEdit = showEditButton && showEditButton === true;
    const showRemove = showRemoveButton && showRemoveButton === true;

    const pickImage = async () => {
        try {
            const tempUri = await launchImagePicker();

            if (!tempUri) return;
            setLoading(true);
            const uploadURL = await uploadImageAsync(tempUri, 'profilePics');
            setLoading(false);
            if (!uploadURL) {
                throw new Error('Could not upload image');
            }
            const newData = { profilePicture: uploadURL };

            await updateUserData(userId, newData);
            dispatch(updateUserStateData({ newData }));
            setImage({ uri: tempUri });
        } catch (error) {
            Alert.alert(error.message);
            setLoading(false);
        }
    };

    const Container = onPress || showEdit ? TouchableOpacity : View;

    return (
        <Container style={style} onPress={onPress || pickImage}>
            {loading ? (
                <View
                    style={styles.loadingContainer}
                    height={size}
                    width={size}
                >
                    <ActivityIndicator size={'large'} color={colors.blue} />
                </View>
            ) : (
                <View>
                    <Image
                        style={{ ...styles.image, height: size, width: size }}
                        source={image}
                    />
                </View>
            )}

            {showEdit && !loading && (
                <View style={styles.editIcon}>
                    <MaterialCommunityIcons
                        name="file-image-plus"
                        size={16}
                        color={colors.grey}
                    />
                </View>
            )}

            {showRemove && !loading && (
                <View style={styles.removeIcon}>
                    <MaterialCommunityIcons
                        name="window-close"
                        size={16}
                        color={colors.grey}
                    />
                </View>
            )}
        </Container>
    );
};

const styles = StyleSheet.create({
    image: {
        borderRadius: 50,
        borderColor: colors.dark,
        borderWidth: 1,
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.white,
        padding: 5,
        borderRadius: 50,
        borderColor: colors.dark,
        borderWidth: 1,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.white,
        padding: 3,
        borderRadius: 50,
        borderColor: colors.dark,
        borderWidth: 1,
    },
});

export default ProfileImage;
