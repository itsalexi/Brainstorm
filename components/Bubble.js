import {
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import React, { useRef } from 'react';
import colors from '../constants/colors';
import {
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from 'react-native-popup-menu';

import * as Clipboard from 'expo-clipboard';

import uuid from 'react-native-uuid';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { starMessage } from '../utils/actions/chatActions';
import { useSelector } from 'react-redux';
import { formatTime } from '../utils/formatTime';

const MenuItem = (props) => {
    const Icon = props.iconPack ?? Feather;

    return (
        <MenuOption onSelect={props.onSelect}>
            <View style={styles.menuItemContainer}>
                <Text style={styles.menuItemText}>{props.text}</Text>
                <Icon name={props.icon} size={18} />
            </View>
        </MenuOption>
    );
};

const Bubble = ({
    text,
    type,
    messageId,
    chatId,
    userId,
    date,
    setReply,
    replyingTo,
    name,
    style,
    imageUrl,
}) => {
    const starredMessages = useSelector(
        (state) => state.messages.starredMessages[chatId] ?? {}
    );

    const storedUsers = useSelector((state) => state.users.storedUsers);

    const bubbleStyle = { ...styles.container };
    const textStyle = { ...styles.text };
    const wrapperStyle = { ...styles.wrapperStyle };
    const timeStyle = { ...styles.timeContainer };
    const bubbleContainer = { ...styles.bubbleContainer };
    const menuRef = useRef(null);
    const id = useRef(uuid.v4());
    let Container = View;
    let isUserMessage = false;

    switch (type) {
        case 'system':
            textStyle.color = colors.white;
            bubbleStyle.backgroundColor = colors.lightDark;
            bubbleStyle.alignItems = 'center';
            bubbleStyle.marginTop = 10;
            break;
        case 'ownMessage':
            wrapperStyle.justifyContent = 'flex-end';
            bubbleStyle.backgroundColor = '#E7FED6';
            bubbleContainer.maxWidth = '90%';
            timeStyle.justifyContent = 'flex-end';
            textStyle.alignSelf = 'flex-end';
            bubbleContainer.alignItems = 'flex-end';
            wrapperStyle.flexDirection = 'row';

            Container = TouchableWithoutFeedback;
            isUserMessage = true;
            break;
        case 'theirMessage':
            wrapperStyle.justifyContent = 'flex-start';
            bubbleContainer.maxWidth = '90%';
            Container = TouchableWithoutFeedback;
            isUserMessage = true;
            timeStyle.justifyContent = 'flex-start';
            bubbleContainer.alignItems = 'flex-start';
            wrapperStyle.flexDirection = 'row';

            break;
        case 'reply':
            bubbleStyle.marginTop = 0;
            break;
        default:
            break;
    }

    const copyToClipboard = async (text) => {
        await Clipboard.setStringAsync(text);
    };

    const isStarred = isUserMessage && starredMessages[messageId] !== undefined;
    const replyingToUser = replyingTo && storedUsers[replyingTo.sentBy];

    return (
        <View style={wrapperStyle}>
            <Container
                onLongPress={() =>
                    menuRef.current.props.ctx.menuActions.openMenu(id.current)
                }
            >
                <View style={{ ...bubbleContainer, ...style }}>
                    <View style={{ ...bubbleStyle }}>
                        {name && <Text style={styles.name}>{name}</Text>}
                        {replyingToUser && (
                            <Bubble
                                type="reply"
                                text={replyingTo.text}
                                name={`${replyingToUser.firstName} ${replyingToUser.lastName}`}
                            />
                        )}

                        {!imageUrl && <Text style={textStyle}>{text}</Text>}
                        {imageUrl && (
                            <Image
                                source={{ uri: imageUrl }}
                                style={styles.image}
                            />
                        )}

                        <Menu name={id.current} ref={menuRef}>
                            <MenuTrigger />
                            <MenuOptions>
                                <MenuItem
                                    text="Copy to clipboard"
                                    onSelect={() => copyToClipboard(text)}
                                    icon="copy"
                                />
                                <MenuItem
                                    text={`${
                                        isStarred ? 'Unstar' : 'Star'
                                    } message`}
                                    onSelect={() =>
                                        starMessage(messageId, chatId, userId)
                                    }
                                    icon="star"
                                />
                                <MenuItem
                                    text="Reply"
                                    onSelect={setReply}
                                    iconPack={Entypo}
                                    icon="reply"
                                />
                            </MenuOptions>
                        </Menu>
                    </View>
                    {date && (
                        <View style={timeStyle}>
                            {isStarred && (
                                <Feather
                                    name="star"
                                    size={8}
                                    style={{ marginRight: 5 }}
                                />
                            )}
                            <Text style={styles.time}>{formatTime(date)}</Text>
                        </View>
                    )}
                </View>
            </Container>
        </View>
    );
};

export default Bubble;

const styles = StyleSheet.create({
    wrapperStyle: {
        marginBottom: 5,
    },
    text: {
        fontFamily: 'regular',
        fontSize: 18,
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 6,
        marginBottom: 3,
        marginTop: 10,
    },
    menuItemContainer: {
        flexDirection: 'row',
        padding: 5,
        borderBottomColor: colors.notAsLightGrey,
        borderBottomWidth: 1,
    },
    menuItemText: {
        flex: 1,
        fontFamily: 'regular',
        fontSize: 16,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    time: {
        fontFamily: 'regular',
        color: colors.grey,
        fontSize: 10,
    },
    bubbleContainer: {
        flexDirection: 'column',
    },
    name: {
        fontFamily: 'medium',
    },
    image: {
        width: 300,
        height: 300,
    },
});
