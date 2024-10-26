import { StyleSheet, View, Text, Button, Image } from "react-native";
import { useRouter } from "expo-router";


export default function Match() {
    const router = useRouter();
    return (
        <View style={styles.container}>
        <Image source={{ uri: "https://i.redd.it/2mhrqnmb7s941.jpg"}} style={styles.image} />
        <Text style={styles.restaurant}>Name of Restaurant</Text>
        <Text style={styles.match}>It's a match!</Text>
        <Button title="Move to results screen" onPress={() => router.push("/results")}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    match: {
        fontSize: 30
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: "cover"
    },
    restaurant: {
        margin: 40,
        fontSize: 30
    }
})