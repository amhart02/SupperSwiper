import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text} from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const SignOutButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push("/")}>
      <Text style={{ color: 'blue', padding: 10 }}>Sign Out</Text>
    </TouchableOpacity>
  );
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false}} />
        <Stack.Screen name="connection" options={{
          title: "",
          headerLeft: () => <SignOutButton/>
        }} />
        <Stack.Screen name="restaurants" options={{ headerShown: false}}/>
        <Stack.Screen name="match" options={{ headerShown: false}}/>
        <Stack.Screen name="results" options={{ headerShown: false}}/>
      </Stack>
    </GestureHandlerRootView>
  );
}