import {
    child,
    get,
    getDatabase,
    ref,
    query,
    orderByChild,
    endAt,
    startAt,
} from 'firebase/database';
import { getFirebaseApp } from '../firebase';

export const getUserData = async (userId) => {
    try {
        const app = getFirebaseApp();
        const db = ref(getDatabase(app));
        const user = child(db, `users/${userId}`);

        const snapshot = await get(user);
        return snapshot.val();
    } catch (error) {
        console.log(error);
    }
};

export const searchUsers = async (queryTerm) => {
    const searchTerm = queryTerm.toLowerCase();

    try {
        const app = getFirebaseApp();
        const db = ref(getDatabase(app));
        const users = child(db, 'users');

        const queryRef = query(
            users,
            orderByChild('fullName'),
            startAt(searchTerm),
            endAt(searchTerm + '\uf8ff')
        );

        const snapshot = await get(queryRef);
        if (snapshot.exists()) {
            return snapshot.val();
        }
        return {};
    } catch (error) {
        console.log(error);
        throw error;
    }
};
