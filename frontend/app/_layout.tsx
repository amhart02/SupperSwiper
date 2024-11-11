import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text} from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const SignOutButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push("/")}>
      <Text style={{ color: 'blue', padding: 10 }}>Exit</Text>
    </TouchableOpacity>
  );
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false, animation: 'slide_from_left'}} />
        <Stack.Screen name="connection" options={{title: "", headerLeft: () => <SignOutButton/>}} />
        <Stack.Screen name="wait" options={{title: "", headerLeft: () => <SignOutButton/>}} />
        <Stack.Screen name="restaurants" options={{title: "", headerLeft: () => <SignOutButton/>}}/>
        <Stack.Screen name="match" options={{title: "", headerLeft: () => <SignOutButton/>}}/>
        <Stack.Screen name="results" options={{title: "", headerLeft: () => <SignOutButton/>}}/>
      </Stack>
    </GestureHandlerRootView>
  );
}