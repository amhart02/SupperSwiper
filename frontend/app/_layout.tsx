import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="login">
      <Stack.Screen name="login" />
      <Stack.Screen name="connection" />
      <Stack.Screen name="restaurants"/>
      <Stack.Screen name="match"/>
      <Stack.Screen name="results"/>
    </Stack>
  );
}