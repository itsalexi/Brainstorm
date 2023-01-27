import 'react-native-gesture-handler';
import { useEffect, useCallback, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage.clear();

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider style={styles.container}>
                <AppNavigator />
            </SafeAreaProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    label: {
        fontFamily: 'bold',
        fontSize: 16,
    },
});
