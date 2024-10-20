import { View, Text, Button} from "react-native";
import { useRouter } from "expo-router";

export default function Restaurants() {
    const router = useRouter();

    return (
        <View
            style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
        <Text>Swipe on Restaurants</Text>
        <Button title="Move to Match Screen" onPress={() => router.push("/match")}></Button>
        </View>
    )
}