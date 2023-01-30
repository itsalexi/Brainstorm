import React from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Text,
    Dimensions,
} from 'react-native';
import colors from '../constants/colors';
import ProfileImage from './ProfileImage';
import { Ionicons } from '@expo/vector-icons';

const DataItem = (props) => {
    const {
        title,
        subTitle,
        image,
        onPress,
        size,
        updatedAt,
        type,
        isChecked,
    } = props;

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <ProfileImage uri={image} size={size ? size : 56} />

                    <View style={styles.textContainer} numberOfLines={1}>
                        <View style={styles.titleContainer}>
                            <Text numberOfLines={1} style={styles.title}>
                                {title}
                            </Text>
                            {updatedAt && (
                                <View style={styles.time}>
                                    <Text style={styles.timeText}>
                                        {updatedAt}
                                    </Text>
                                </View>
                            )}
                        </View>

                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.subTitle}
                        >
                            {subTitle}
                        </Text>
                    </View>
                </View>
                {type === 'checkBox' && (
                    <View
                        style={{
                            ...styles.iconContainer,
                            ...(isChecked && styles.checkedStyle),
                        }}
                    >
                        <Ionicons
                            name="checkmark"
                            size={24}
                            color={
                                isChecked
                                    ? styles.checkedStyle.color
                                    : colors.notAsLightGrey
                            }
                        />
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
        flex: 1,
    },
    textContainer: {
        marginLeft: 12,
        flex: 1,
    },
    title: {
        fontFamily: 'medium',
        fontSize: 20,
    },
    subTitle: {
        fontFamily: 'regular',
        color: colors.lighterDark,
        fontSize: 13,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: '1',
    },
    time: {
        backgroundColor: 'transparent',
    },
    timeText: {
        fontSize: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        borderWidth: 1,
        borderRadius: 50,
        borderColor: colors.grey,
        backgroundColor: 'white',
    },
    checkedStyle: {
        backgroundColor: colors.blue,
        borderColor: 'transparent',
        color: colors.white,
    },
});

export default DataItem;
