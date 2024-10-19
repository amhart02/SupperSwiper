import { StyleSheet, Text, View, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { TouchableOpacity, GestureHandlerRootView } from "react-native-gesture-handler";
import { useState } from 'react';


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput 
        style={styles.input}
        value= {email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
        />
        <TextInput 
        style={styles.input}
        value= {password}
        onChangeText={setPassword}
        placeholder="Password"
        autoCapitalize="none"
        placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={() => router.push("/connection")}>
          <Text style={styles.button}>Login</Text>
          </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 40,
    marginBottom: 50,
  },
  input: {
    height: 50,
    width: 200,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "#000",
    fontSize: 16,
  },
  button: {
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 40,
  }
})
