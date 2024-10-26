import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Connection() {
    const router = useRouter();
    
    return (
      <View style={styles.container}
      >
        <Text>Setup connection with other person</Text>
        <Button title="Move to restaurant choices" onPress={() => router.push("/restaurants")}></Button>  
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})