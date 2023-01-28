import React, { useEffect, useState } from 'react';
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
const NewChatScreen = (props) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState();
    const [noResultsFound, setNoResultsFound] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');

    const userData = useSelector((state) => state.auth.userData);

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
            headerTitle: 'New Chat',
        });
    }, []);

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
        props.navigation.navigate('ChatList', {
            selectedUserId: userId,
        });
    };

    return (
        <PageContainer style={styles.container}>
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
});

export default NewChatScreen;
