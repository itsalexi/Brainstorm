import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import CustomHeaderButton from '../components/CustomHeaderButton';
import PageContainer from '../components/PageContainer';
import colors from '../constants/colors';
import commonStyles from '../constants/commonStyles';
import { searchUsers } from '../utils/actions/userActions';
import DataItem from '../components/DataItem';
import { useDispatch, useSelector } from 'react-redux';
import { setStoredUsers } from '../store/usersSlice';
import ProfileImage from '../components/ProfileImage';

const NewChatScreen = (props) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState();
    const [noResultsFound, setNoResultsFound] = useState(false);
    const [groupChatName, setGroupChatName] = useState('');

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const selectedUsersList = useRef(null);

    const userData = useSelector((state) => state.auth.userData);
    const storedUsers = useSelector((state) => state.users.storedUsers);
    const isGroupChat = props.route.params && props.route.params.isGroupChat;
    const isGroupChatDisabled =
        groupChatName === '' || selectedUsers.length == 0;

    useEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            title="Close"
                            onPress={() => props.navigation.goBack()}
                        />
                    </HeaderButtons>
                );
            },
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        {isGroupChat && (
                            <Item
                                title="Create"
                                disabled={isGroupChatDisabled}
                                color={
                                    isGroupChatDisabled
                                        ? colors.notAsLightGrey
                                        : undefined
                                }
                                onPress={() => {
                                    props.navigation.navigate('ChatList', {
                                        selectedUsers,
                                        chatName: groupChatName,
                                    });
                                }}
                            />
                        )}
                    </HeaderButtons>
                );
            },
            headerTitle: isGroupChat ? 'Add Members' : 'New chat',
        });
    }, [groupChatName, selectedUsers]);

    useEffect(() => {
        const delaySearch = setTimeout(async () => {
            if (!searchTerm || searchTerm === '') {
                setUsers();
                setNoResultsFound(false);
                return;
            }
            setLoading(true);

            const usersResult = await searchUsers(searchTerm);
            delete usersResult[userData.userId];
            setUsers(usersResult);

            if (Object.keys(usersResult).length === 0) {
                setNoResultsFound(true);
            } else {
                setNoResultsFound(false);

                dispatch(setStoredUsers({ newUsers: usersResult }));
            }

            setLoading(false);
        }, 500);

        return () => clearTimeout(delaySearch);
    }, [searchTerm]);

    const userPressed = (userId) => {
        if (isGroupChat) {
            const newSelectedUsers = selectedUsers.includes(userId)
                ? // if user is already there, remove it from the selected users
                  selectedUsers.filter((id) => id !== userId)
                : // Add to selected users
                  selectedUsers.concat(userId);

            setSelectedUsers(newSelectedUsers);
        } else {
            props.navigation.navigate('ChatList', {
                selectedUserId: userId,
            });
        }
    };

    return (
        <PageContainer style={styles.container}>
            {isGroupChat && (
                <>
                    <View style={styles.chatNameContainer}>
                        <View style={styles.nameInputContainer}>
                            <TextInput
                                placeholder="Enter a name for your group chat"
                                autoCorrect={false}
                                autoComplete={false}
                                style={styles.textBox}
                                value={groupChatName}
                                onChangeText={setGroupChatName}
                            />
                        </View>
                    </View>

                    <View style={styles.selectedUsersContainer}>
                        <FlatList
                            style={styles.selectedUsersList}
                            data={selectedUsers}
                            horizontal={true}
                            contentContainerStyle={{ alignItems: 'center' }}
                            keyExtractor={(item) => item}
                            ref={(ref) => (selectedUsersList.current = ref)}
                            onContentSizeChange={() =>
                                selectedUsersList.current.scrollToEnd()
                            }
                            renderItem={(itemData) => {
                                const userId = itemData.item;
                                const userData = storedUsers[userId];
                                return (
                                    <ProfileImage
                                        style={styles.selectedUserStyle}
                                        size={48}
                                        uri={userData.profilePicture}
                                        onPress={() => userPressed(userId)}
                                        showRemoveButton={true}
                                    />
                                );
                            }}
                        />
                    </View>
                </>
            )}
            <View style={styles.searchContainer}>
                <FontAwesome name="search" size={20} color={colors.grey} />
                <TextInput
                    placeholder="Find your friends"
                    style={styles.searchBox}
                    onChangeText={setSearchTerm}
                    autoCapitalize="none"
                    value={searchTerm}
                />
            </View>

            {loading && (
                <View>
                    <ActivityIndicator size={'large'} color={colors.primary} />
                </View>
            )}

            {!loading && !noResultsFound && users && (
                <FlatList
                    data={Object.keys(users)}
                    renderItem={(itemData) => {
                        const userId = itemData.item;
                        const userData = users[userId];
                        return (
                            <DataItem
                                title={`${userData.firstName} ${userData.lastName}`}
                                subTitle={userData.about}
                                image={userData.profilePicture}
                                onPress={() => userPressed(userId)}
                                type={isGroupChat ? 'checkBox' : ''}
                                isChecked={selectedUsers.includes(userId)}
                            />
                        );
                    }}
                />
            )}

            {!loading && !users && (
                <View style={commonStyles.center}>
                    <FontAwesome
                        name="users"
                        size={64}
                        color={colors.lightGrey}
                        style={styles.noResultsIcon}
                    />
                    <Text style={styles.noResultsText}>
                        Enter a name to search for a user!
                    </Text>
                </View>
            )}
            {!loading && noResultsFound && (
                <View style={commonStyles.center}>
                    <FontAwesome5
                        name="users-slash"
                        size={64}
                        color={colors.lightGrey}
                        style={styles.noResultsIcon}
                    />
                    <Text style={styles.noResultsText}>
                        No user with that name was found
                    </Text>
                </View>
            )}
        </PageContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.lightGrey,
        padding: 5,
        height: 36,
        marginVertical: 8,
        borderRadius: 10,
    },
    searchBox: {
        marginLeft: 8,
        fontSize: 20,
        width: '100%',
    },
    noResultsText: {
        color: colors.grey,
    },
    noResultsIcon: {
        marginBottom: 12,
    },
    chatNameContainer: {
        paddingVertical: 10,
    },
    nameInputContainer: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: colors.lightGrey,
        borderRadius: 5,
    },
    textBox: {
        width: '100%',
        fontFamily: 'regular',
    },
    selectedUsersContainer: {
        height: 50,
        justifyContent: 'center',
    },
    selectedUsersList: {
        height: '100%',
    },
    selectedUserStyle: {
        marginRight: 10,
    },
});

export default NewChatScreen;
