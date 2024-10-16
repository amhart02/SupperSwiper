import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Match() {
    const router = useRouter();
    return (
        <View
            style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
        <Text>When restaurants match! Yay!!</Text>
        <Button title="Move to results screen" onPress={() => router.push("/results")}></Button>
        </View>
    )
}