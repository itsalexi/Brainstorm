import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import ChatListScreen from '../screens/ChatListScreen';
import ChatSettingsScreen from '../screens/ChatSettingsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ChatScreen from '../screens/ChatScreen';
import NewChatScreen from '../screens/NewChatScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getFirebaseApp } from '../utils/firebase';
import {
    child,
    getDatabase,
    onValue,
    ref,
    querySnapshot,
    off,
    get,
} from 'firebase/database';
import { setChatsData } from '../store/chatSlice';
import LoadingScreen from '../screens/LoadingScreen';
import { setStoredUsers } from '../store/usersSlice';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerTitle: '',
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: colors.secondary,
                },
                tabBarStyle: {
                    backgroundColor: colors.secondary,
                    height: '9%',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                },
                tabBarInactiveTintColor: 'white',
                tabBarActiveTintColor: 'yellow',

                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="ChatList"
                component={ChatListScreen}
                options={{
                    tabBarLabel: 'Chats',
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <MaterialIcons
                                name="chat-bubble-outline"
                                size={size}
                                color={color}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Ionicons
                                name="settings-outline"
                                size={size}
                                color={color}
                            />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#59b5e6',
                },
                headerTintColor: 'white',
            }}
        >
            <Stack.Group>
                <Stack.Screen
                    name="Home"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ChatSettings"
                    component={ChatSettingsScreen}
                    options={{
                        headerTitle: 'Settings',
                        headerBackTitle: 'Back',
                    }}
                />
                <Stack.Screen
                    name="ChatScreen"
                    component={ChatScreen}
                    options={{ headerTitle: '', headerBackTitle: 'Back' }}
                />
            </Stack.Group>
            <Stack.Group
                screenOptions={{
                    presentation: 'containedModal',
                }}
            >
                <Stack.Screen name="NewChat" component={NewChatScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

const MainNavigator = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const userData = useSelector((state) => state.auth.userData);
    const storedUsers = useSelector((state) => state.users.storedUsers);

    useEffect(() => {
        const app = getFirebaseApp();
        const db = ref(getDatabase(app));

        const userChatsRef = child(db, `userChats/${userData.userId}`);
        const refs = [userChatsRef];
        onValue(userChatsRef, (querySnapshot) => {
            const chatIdsData = querySnapshot.val() || {};
            const chatIds = Object.values(chatIdsData);

            const chatsData = {};
            let chatsFoundCount = 0;

            for (let i = 0; i < chatIds.length; i++) {
                const chatId = chatIds[i];
                const chatRef = child(db, `chats/${chatId}`);

                refs.push(chatRef);

                onValue(chatRef, (chatSnapshot) => {
                    chatsFoundCount++;
                    const data = chatSnapshot.val();
                    if (data) {
                        data.key = chatSnapshot.key;

                        data.users.forEach((userId) => {
                            if (storedUsers[userId]) return;

                            const userRef = child(db, `users/${userId}`);

                            get(userRef).then((userSnapshot) => {
                                const userSnapshotData = userSnapshot.val();
                                dispatch(
                                    setStoredUsers({
                                        newUsers: { userSnapshotData },
                                    })
                                );
                            });

                            refs.push(userRef);
                        });

                        chatsData[chatSnapshot.key] = data;
                    }
                    if (chatsFoundCount >= chatIds.length) {
                        dispatch(setChatsData({ chatsData }));
                        setLoading(false);
                    }
                });

                if (chatsFoundCount == 0) {
                    setLoading(false);
                }
            }
        });

        return () => {
            refs.forEach((ref) => off(ref));
        };
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    return <StackNavigator />;
};

export default MainNavigator;
