import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Connection() {
    const router = useRouter();
    
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Setup connection with other person</Text>
        <Button title="Move to restaurant choices" onPress={() => router.push("/restaurants")}></Button>  
      </View>
    );
  }