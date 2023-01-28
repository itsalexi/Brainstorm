import React, { useCallback, useEffect, useState } from 'react';
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
import BackgroundImage from '../components/BackgroundGradient';
import colors from '../constants/colors';
import { useSelector } from 'react-redux';
import { getUserData } from '../utils/actions/userActions';
import PageContainer from '../components/PageContainer';
import Bubble from '../components/Bubble';
import { createChat } from '../utils/actions/chatActions';

const ChatScreen = (props) => {
    const storedUsers = useSelector((state) => state.users.storedUsers);
    const userData = useSelector((state) => state.auth.userData);

    const [chatUsers, setChatUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [chatId, setChatId] = useState(props.route?.prams?.chatId);
    const chatData = props.route?.params?.newChatData;

    const getChatTitleFromName = () => {
        const otherUserId = chatUsers.find((uid) => uid != userData.id);
        const otherUserData = storedUsers[otherUserId];

        return (
            otherUserData &&
            `${otherUserData.firstName} ${otherUserData.lastName}`
        );
    };

    useEffect(() => {
        props.navigation.setOptions({ headerTitle: getChatTitleFromName() });
        setChatUsers(chatData.users);
    }, [chatUsers]);

    const sendMessage = useCallback(async () => {
        try {
            let id = chatId;
            if (!id) {
                id = await createChat(userData.userId, chatData);
                setChatId(id);
            }
        } catch (error) {}
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
                <BackgroundImage style={styles.chatBg}>
                    <PageContainer style={{}}>
                        {!chatId && (
                            <Bubble
                                text="This is a new chat, don't be shy, say hi!"
                                type="system"
                            />
                        )}
                    </PageContainer>
                </BackgroundImage>

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
        backgroundColor: colors.white,
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
        backgroundColor: colors.lightGrey,
        borderRadius: 25,
        padding: 5,
        paddingHorizontal: 10,
        marginHorizontal: 15,
        color: colors.black,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
    },
    chatBg: {
        flex: 1,
        backgroundColor: 'white',
    },
});
export default ChatScreen;
