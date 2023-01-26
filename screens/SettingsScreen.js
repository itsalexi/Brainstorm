import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SettingsScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text>Hello I'm at the Settings</Text>
            <Button
                title="Go to home"
                onPress={() => props.navigation.navigate('Home')}
            ></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SettingsScreen;
