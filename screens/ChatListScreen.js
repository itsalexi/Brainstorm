import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import CustomHeaderButton from '../components/CustomHeaderButton';
import DataItem from '../components/DataItem';
import PageContainer from '../components/PageContainer';
import PageTitle from '../components/PageTitle';
import colors from '../constants/colors';

const ChatListScreen = (props) => {
    const selectedUser = props.route?.params?.selectedUserId;
    const userData = useSelector((state) => state.auth.userData);
    const storedUsers = useSelector((state) => state.users.storedUsers);

    const userChats = useSelector((state) => {
        const chatsData = state.chats.chatsData;
        return Object.values(chatsData).sort((a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
    });

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            title="New chat"
                            iconName="create-outline"
                            onPress={() => props.navigation.navigate('NewChat')}
                        />
                    </HeaderButtons>
                );
            },
            headerLeft: () => {
                return <PageTitle textStyle={styles.pageTitle} text="Messages" />;
            },
        });
    }, []);

    useEffect(() => {
        if (!selectedUser) {
            return;
        }

        const chatUsers = [selectedUser, userData.userId];

        const navigationProps = {
            newChatData: { users: chatUsers },
        };

        props.navigation.navigate('ChatScreen', navigationProps);
    }, [props.route?.params]);

    return (
        <View style={styles.back}>
            <PageContainer style={styles.front}>
                <View style={styles.container}>
                    <FlatList
                        style={styles.chatList}
                        data={userChats}
                        renderItem={(itemData) => {
                            const chatData = itemData.item;
                            const chatId = chatData.key;

                            const otherUserId = chatData.users.find(
                                (uid) => uid != userData.userId
                            );

                            const otherUser = storedUsers[otherUserId];

                            if (!otherUser) return;
                            const title = `${otherUser.firstName} ${otherUser.lastName}`;
                            const subTitle =
                                chatData.latestMessageText || 'New chat';
                            const image = otherUser.profilePicture;
                            return (
                                <DataItem
                                    title={title}
                                    subTitle={subTitle}
                                    image={image}
                                    size={64}
                                    onPress={() =>
                                        props.navigation.navigate(
                                            'ChatScreen',
                                            { chatId }
                                        )
                                    }
                                />
                            );
                        }}
                    />
                </View>
            </PageContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
    },
    back: {
        backgroundColor: colors.blue,
        flex: 1,
    },
    front: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: 10,
    },
    pageTitle: {
        color: colors.white,
        marginLeft: 20,
    },
    chatList: {
        height: '100%',
    },
});

export default ChatListScreen;
