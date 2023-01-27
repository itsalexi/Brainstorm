import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import colors from '../constants/colors';

const Input = (props) => {
    const { label, icon, iconSize, IconPack, errorText, onInputChanged, id } =
        props;
    const onChangeText = (text) => {
        onInputChanged(id, text);
    };

    return (
        <View style={{ ...styles.container }}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                {icon && (
                    <IconPack
                        name={icon}
                        size={iconSize || 16}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    {...props}
                    placeholderTextColor={colors.lighterDark}
                    style={styles.input}
                    onChangeText={onChangeText}
                />
            </View>
            {errorText && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorText[0]}</Text>
                </View>
            )}
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        marginVertical: 8,
        fontFamily: 'bold',
        color: 'white',
        letterSpacing: 0.3,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 7,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: colors.lightGrey,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
        color: colors.lighterDark,
    },
    input: {
        flex: 1,
        paddingTop: 0,
    },
    errorContainer: {
        marginVertical: 5,
    },
    errorText: {
        color: 'darkred',
        fontSize: 12,
        fontFamily: 'bold',
        letterSpacing: 0.3,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
});
