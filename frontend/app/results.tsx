import { StyleSheet, View, Text, Image } from "react-native";
import { restaurantList } from './restaurants';
export default function results() {
    return (
        <View style={styles.container}>
            <Text style={styles.matches}>Matches</Text>
            <View style={styles.eachrestaurant}>
                <Image source={{ uri: "https://i.redd.it/2mhrqnmb7s941.jpg" }} style={styles.image} />
                <Text style={styles.restaurant}>Name of Restaurant</Text>
            </View>
            <View style={styles.eachrestaurant}>
                <Image source={{ uri: "https://i.redd.it/2mhrqnmb7s941.jpg" }} style={styles.image} />
                <Text style={styles.restaurant}>Name of Restaurant</Text>
            </View>
            <View style={styles.eachrestaurant}>
                <Image source={{ uri: "https://i.redd.it/2mhrqnmb7s941.jpg" }} style={styles.image} />
                <Text style={styles.restaurant}>Name of Restaurant</Text>
            </View>
            <Text>Made a results page just in case we need it.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: "cover"
    },
    restaurant: {
        marginLeft: 20,
        fontSize: 20,
        flexWrap: "wrap",
    },
    eachrestaurant: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 100
    },
    matches: {
        fontSize: 20
    }
})