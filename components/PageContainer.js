import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../constants/colors';

const PageContainer = ({ children, style }) => {
    return <View style={{ ...style, ...styles.container }}>{children}</View>;
};

export default PageContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
});
