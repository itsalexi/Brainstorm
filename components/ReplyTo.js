import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../constants/colors';
import { AntDesign } from '@expo/vector-icons';

const ReplyTo = ({ text, user, onCancel }) => {
    const name = `${user.firstName} ${user.lastName}`;

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.name}>
                    <Text style={{ color: 'black' }}>Replying to </Text>
                    {name}
                </Text>
                <Text numberOfLines={1} style={styles.text}>
                    {text}
                </Text>
            </View>
            <TouchableOpacity onPress={onCancel}>
                <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default ReplyTo;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightGrey,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderLeftColor: colors.blue,
        borderLeftWidth: 6,
    },
    textContainer: {
        flex: 1,
        marginRight: 5,
    },
    name: {
        fontFamily: 'medium',
        color: colors.blue,
        fontSize: 18,
    },
    text: {
        fontSize: 18,
    },
});
