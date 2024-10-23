import { StyleSheet, View, Text } from "react-native";

export default function results() {
    return (
    <View style={styles.container}>
    <Text>Made a results page just in case we need it.</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})