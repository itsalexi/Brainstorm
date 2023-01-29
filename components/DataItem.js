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
const DataItem = (props) => {
    const { title, subTitle, image, onPress, size, updatedAt } = props;

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <ProfileImage uri={image} size={size ? size : 56} />

                    <View style={styles.textContainer}>
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
    },
    title: {
        fontFamily: 'medium',
        fontSize: 20,
        maxWidth: Dimensions.get('window').width * 0.5,
    },
    subTitle: {
        fontFamily: 'regular',
        color: colors.lighterDark,
        fontSize: 14,
        width: Dimensions.get('window').width * 0.7,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        width: Dimensions.get('window').width * 0.7,
    },
});

export default DataItem;
