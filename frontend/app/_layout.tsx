import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false}} />
      <Stack.Screen name="connection" options={{ headerShown: false}}/>
      <Stack.Screen name="restaurants" options={{ headerShown: false}}/>
      <Stack.Screen name="match" options={{ headerShown: false}}/>
      <Stack.Screen name="results" options={{ headerShown: false}}/>
    </Stack>
  );
}