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
    Alert,
    FlatList,
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
import { createChat, sendTextMessage } from '../utils/actions/chatActions';
import ReplyTo from '../components/ReplyTo';

const ChatScreen = (props) => {
    const [chatUsers, setChatUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [chatId, setChatId] = useState(props.route?.params?.chatId);
    const [errorBanner, setErrorBanner] = useState('');
    const [replyingTo, setReplyingTo] = useState();

    const storedUsers = useSelector((state) => state.users.storedUsers);
    const userData = useSelector((state) => state.auth.userData);
    const storedChats = useSelector((state) => state.chats.chatsData);
    const chatMessages = useSelector((state) => {
        if (!chatId) return [];
        const messagesData = state.messages.messagesData[chatId];
        if (!messagesData) return [];
        const messageList = [];
        for (const key in messagesData) {
            const message = messagesData[key];
            messageList.push({
                key,
                ...message,
            });
        }
        return messageList;
    });

    const chatData =
        (chatId && storedChats[chatId]) || props.route?.params?.newChatData;

    const getChatTitleFromName = () => {
        const otherUserId = chatUsers.find((uid) => uid != userData.userId);
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
                id = await createChat(
                    userData.userId,
                    props.route.params.newChatData
                );
                await sendTextMessage(id, userData.userId, message);
                setChatId(id);
                setMessage('');
                return;
            }
            await sendTextMessage(
                chatId,
                userData.userId,
                message,
                replyingTo && replyingTo.key
            );
            setMessage('');
            setReplyingTo(null);
        } catch (error) {
            setErrorBanner('Messaged failed to send: ' + error.code);
            setTimeout(() => {
                setErrorBanner('');
            }, 3000);
        }
    }, [message, chatId]);

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
                <View style={styles.chatBg}>
                    <PageContainer style={{}}>
                        {!chatId && (
                            <Bubble
                                text="This is a new chat, don't be shy, say hi!"
                                type="system"
                            />
                        )}
                        {errorBanner !== '' && (
                            <Bubble text={errorBanner} type="system" />
                        )}

                        {chatId && (
                            <FlatList
                                data={chatMessages}
                                renderItem={(itemData) => {
                                    const message = itemData.item;

                                    const isOwnMessage =
                                        message.sentBy === userData.userId;

                                    const messageType = isOwnMessage
                                        ? 'ownMessage'
                                        : 'theirMessage';

                                    return (
                                        <Bubble
                                            type={messageType}
                                            text={message.text}
                                            messageId={message.key}
                                            userId={userData.userId}
                                            chatId={chatId}
                                            date={message.sentAt}
                                            setReply={() =>
                                                setReplyingTo(message)
                                            }
                                            replyingTo={
                                                message.replyTo &&
                                                chatMessages.find(
                                                    (msg) =>
                                                        msg.key ===
                                                        message.replyTo
                                                )
                                            }
                                        />
                                    );
                                }}
                            />
                        )}
                    </PageContainer>

                    {replyingTo && (
                        <ReplyTo
                            text={replyingTo.text}
                            user={storedUsers[replyingTo.sentBy]}
                            onCancel={() => setReplyingTo(null)}
                        />
                    )}
                </View>

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
        backgroundColor: colors.notAsLightGrey,
    },
});
export default ChatScreen;
