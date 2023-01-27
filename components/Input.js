import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import colors from '../constants/colors';

const Input = ({ label, icon, iconSize, IconPack, errorText }) => {
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
                <TextInput style={styles.input} />
            </View>
            {errorText && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorText}</Text>
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
        color: 'darkGray',
        letterSpacing: 0.3,
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
        color: 'red',
        fontSize: 12,
        fontFamily: 'regular',
        letterSpacing: 0.3,
    },
});
