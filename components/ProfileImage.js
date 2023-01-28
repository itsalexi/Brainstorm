import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import userImage from '../assets/images/userImage.png';
import colors from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { launchImagePicker } from '../utils/ImagePicker';

const ProfileImage = ({ size }) => {
    const pickImage = async () => {
        await launchImagePicker();
    };

    return (
        <TouchableOpacity onPress={pickImage}>
            <View>
                <Image
                    style={{ ...styles.image, height: size, width: size }}
                    source={userImage}
                />
            </View>
            <View style={styles.editIcon}>
                <MaterialCommunityIcons
                    name="file-image-plus"
                    size={16}
                    color={colors.grey}
                />
            </View>
        </TouchableOpacity>
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
});

export default ProfileImage;
