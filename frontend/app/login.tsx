import { Text, View, Button } from "react-native";
import { Link, useRouter } from "expo-router";


export default function Login() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Login Screen</Text>
      <Button title="Move to Connection Screen" onPress={() => router.push("/connection")}></Button>
      {/* <Link href="/test"></Link> */}
    </View>
  );
}
