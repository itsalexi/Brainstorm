import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ChatListScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text>Hello I'm at the Chat List</Text>

            <Button
                title="Go to settings"
                onPress={() => props.navigation.navigate('ChatSettings')}
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

export default ChatListScreen;
