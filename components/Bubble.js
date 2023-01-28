import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../constants/colors';

const Bubble = ({ text, type }) => {
    const bubbleStyle = { ...styles.container };
    const textStyle = { ...styles.text };

    switch (type) {
        case 'system':
            textStyle.color = colors.white;
            bubbleStyle.backgroundColor = colors.lightDark;
            bubbleStyle.alignItems = 'center';
            bubbleStyle.marginTop = 10;
            break;
        default:
            break;
    }

    return (
        <View style={styles.wrapperStyle}>
            <View style={bubbleStyle}>
                <Text style={textStyle}>{text}</Text>
            </View>
        </View>
    );
};

export default Bubble;

const styles = StyleSheet.create({
    wrapperStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'regular',
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 5,
        marginBottom: 10,
    },
});
