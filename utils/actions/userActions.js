import { child, get, getDatabase, ref } from 'firebase/database';
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
