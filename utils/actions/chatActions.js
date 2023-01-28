import { child, getDatabase, push, ref } from 'firebase/database';
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
