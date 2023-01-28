import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Text } from 'react-native';
import colors from '../constants/colors';
import ProfileImage from './ProfileImage';
const DataItem = (props) => {
    const { title, subTitle, image, onPress } = props;

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <ProfileImage uri={image} size={40} />

                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.title}>
                        {title}
                    </Text>
                    <Text numberOfLines={1} style={styles.subTitle}>
                        {subTitle}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 7,
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
        alignItems: 'center',
        minHeight: 50,
    },
    textContainer: {
        marginLeft: 12,
    },
    title: {
        fontFamily: 'medium',
        fontSize: 18,
    },
    subTitle: {
        fontFamily: 'regular',
        fontSize: 11,
    },
});

export default DataItem;
