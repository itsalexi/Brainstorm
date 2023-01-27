import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const SubmitButton = ({ disabled, color, title, onPress, style }) => {
    const enabledColor = color || colors.blue;
    const disabledColor = colors.lighterDark;
    const buttonColor = disabled ? disabledColor : enabledColor;

    return (
        <TouchableOpacity
            style={{
                ...style,
                ...styles.button,
                ...{ backgroundColor: buttonColor },
            }}
            onPress={disabled ? () => {} : onPress}
        >
            <Text
                style={{
                    ...styles.buttonText,
                    color: disabled ? colors.grey : 'white',
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.blue,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'bold',
    },
});

export default SubmitButton;
