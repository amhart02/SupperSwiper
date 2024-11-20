import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";


export default function Wait() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.lobbysection}>
                <Text style={styles.lobbytitle}>Lobby </Text>
                <Text style={styles.lobby}>Lobby Code</Text>
            </View>
            <Text style={styles.participant}>Participants:</Text>
            <Text>Participant 1</Text>
            <Text>Participant 2</Text>
            <TouchableOpacity onPress={() => router.push("/restaurants")}>
                <Text style={styles.begin}>Begin</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        alignItems: "center",
    },
    lobbysection: {
        margin: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    lobbytitle: {
        fontSize: 30,
    },
    lobby: {
        color: "#19be64",
        fontSize: 20,
    },
    participant: {
        marginTop: 20,
        fontSize: 20,
    },
    begin: {
        marginTop: 50, 
        borderWidth: 0,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        textAlign: "center",
        backgroundColor: "#19be64",
        color: "white",
        fontSize: 20
    }
})