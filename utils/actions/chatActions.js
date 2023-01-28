import { child, getDatabase, push, ref, update } from 'firebase/database';
import { getFirebaseApp } from '../firebase';

export const createChat = async (loggedinUserId, chatData) => {
    const newChatData = {
        ...chatData,
        createdBy: loggedinUserId,
        updatedBy: loggedinUserId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const app = getFirebaseApp();
    const db = ref(getDatabase(app));
    const newChat = await push(child(db, `chats`), newChatData);

    const chatUsers = newChatData.users;
    for (let i = 0; i < chatUsers.length; i++) {
        const userId = chatUsers[i];
        await push(child(db, `userChats/${userId}`), newChat.key);
    }

    return newChat.key;
};

export const sendTextMessage = async (chatId, senderId, messageText) => {
    const app = getFirebaseApp();
    const db = ref(getDatabase(app));
    const messagesRef = child(db, `messages/${chatId}`);

    const messageData = {
        sentBy: senderId,
        sentAt: new Date().toISOString(),
        text: messageText,
    };

    await push(messagesRef, messageData);

    const chatRef = child(db, `chats/${chatId}`);

    await update(chatRef, {
        updatedBy: senderId,
        updatedAt: new Date().toISOString(),
        latestMessageText: messageText,
    });
};
