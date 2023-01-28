import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

const CustomHeaderButton = (props) => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={32}
            color={props.color ?? colors.white}
        />
    );
};

export default CustomHeaderButton;
