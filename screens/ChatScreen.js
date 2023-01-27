import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    TouchableOpacity,
    Platform,
    ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';

import colors from '../constants/colors';

const THEME = 'light';

const ChatScreen = (props) => {
    const [message, setMessage] = useState('');

    const sendMessage = useCallback(() => {
        setMessage('');
    }, [message]);

    return (
        <SafeAreaView
            edges={['right', 'left', 'bottom']}
            style={styles.container}
        >
            <KeyboardAvoidingView
                style={styles.screen}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={100}
            >
                <View style={styles.chatBg}></View>
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.button}>
                        <FontAwesome5
                            name="images"
                            size={24}
                            color={colors.blue}
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.messageBox}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Message"
                        onSubmitEditing={sendMessage}
                        placeholderTextColor={colors.lighterDark}
                    />
                    {message === '' && (
                        <TouchableOpacity style={styles.button}>
                            <FontAwesome5
                                name="camera"
                                size={24}
                                color={colors.blue}
                            />
                        </TouchableOpacity>
                    )}
                    {message !== '' && (
                        <TouchableOpacity
                            style={{ ...styles.button, ...styles.sendButton }}
                            onPress={sendMessage}
                        >
                            <FontAwesome
                                name="send-o"
                                size={24}
                                color={colors.blue}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: THEME == 'light' ? colors.white : colors.dark,
    },
    screen: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
    },
    messageBox: {
        flex: 1,
        backgroundColor: THEME == 'light' ? colors.lightGrey : colors.lightDark,
        borderRadius: 25,
        padding: 5,
        paddingHorizontal: 10,
        marginHorizontal: 15,
        color: THEME == 'light' ? colors.black : colors.white,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
    },
    chatBg: {
        flex: 1,
    },
});
export default ChatScreen;
