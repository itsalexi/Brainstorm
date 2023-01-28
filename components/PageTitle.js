import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

export default PageTitle = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    text: {
        color: colors.text,
        fontSize: 30,
        fontFamily: 'bold',
    },
});
