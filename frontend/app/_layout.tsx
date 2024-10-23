import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="connection" />
      <Stack.Screen name="restaurants"/>
      <Stack.Screen name="match"/>
      <Stack.Screen name="results"/>
    </Stack>
  );
}