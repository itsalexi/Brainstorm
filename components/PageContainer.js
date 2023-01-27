import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const PageContainer = ({ children, style }) => {
    return <View style={{ ...styles.container, ...style }}>{children}</View>;
};

export default PageContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
});
