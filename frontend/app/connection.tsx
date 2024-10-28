<<<<<<< Updated upstream
import { StyleSheet, Text, View, Button } from "react-native";
=======
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from "react-native";
>>>>>>> Stashed changes
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
// Import your database functions (if using a backend API)
import { createLobby } from '../../backend/config/database.js'; // Adjust the path accordingly

export default function Connection() {
    const router = useRouter();
<<<<<<< Updated upstream
    
    return (
      <View style={styles.container}
      >
        <Text>Setup connection with other person</Text>
=======
    const [lobbyCode, setLobbyCode] = useState("");

    async function generateCode() {
      const code = await createLobby(); // Call the function to create a lobby
      if (code) {
        console.log("Lobby created with ID:", code);
        // Optionally, navigate to another screen or display the code to the user
      }
    }

    function joinLobby() {
      // Logic to join the lobby using the entered code
      console.log("Joining lobby with code:", lobbyCode);
      // Implement check with your database
    }
    
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={generateCode}>
          <Text style={styles.hostjoin}>Host</Text>
        </TouchableOpacity>
        <Text style={styles.or}>OR</Text>
        <TouchableOpacity onPress={joinLobby}>
          <Text style={styles.hostjoin}>Join</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Enter code"
          value={lobbyCode}
          onChangeText={setLobbyCode} // Update state on input change
        />
>>>>>>> Stashed changes
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
});
