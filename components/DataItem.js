import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Text } from 'react-native';
import colors from '../constants/colors';
import ProfileImage from './ProfileImage';
const DataItem = (props) => {
    const { title, subTitle, image, onPress, size, updatedAt } = props;

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <ProfileImage uri={image} size={size ? size : 56} />

                    <View style={styles.textContainer}>
                        <Text numberOfLines={1} style={styles.title}>
                            {title}
                        </Text>
                        <Text numberOfLines={1} style={styles.subTitle}>
                            {subTitle}
                        </Text>
                    </View>
                </View>

                {updatedAt && (
                    <View style={styles.time}>
                        <Text>{updatedAt}</Text>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 20,
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
        alignItems: 'center',
        minHeight: 50,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    textContainer: {
        marginLeft: 12,
    },
    title: {
        fontFamily: 'medium',
        fontSize: 20,
    },
    subTitle: {
        fontFamily: 'regular',
        color: colors.lighterDark,
        fontSize: 16,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default DataItem;
