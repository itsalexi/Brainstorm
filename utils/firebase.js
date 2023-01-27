import { initializeApp } from 'firebase/app';

export const getFirebaseApp = () => {
    const firebaseConfig = {
        apiKey: 'AIzaSyBzvz-UfzlTHOyGCndBHsq4GSlYGAr3KY4',
        authDomain: 'brainstorm-01.firebaseapp.com',
        projectId: 'brainstorm-01',
        storageBucket: 'brainstorm-01.appspot.com',
        messagingSenderId: '1084624736144',
        appId: '1:1084624736144:web:476a87bcfad3722b2fed15',
        measurementId: 'G-SHN2PWBF2X',
    };

    return initializeApp(firebaseConfig);
};
