import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput} from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import supabase from "../../backend/config/supa_client.js"

// Function to create a 4-digit code
const generateLobbyCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };
  
// Function to create a new lobby table
export async function generateLobby() {
  const lobbyId = generateLobbyCode();

  // Check for any previous table with this ID and delete
  const { data: existingLobbies, error: fetchError } = await supabase
    .from('lobbies')
    .select('*')
    .eq('lobby_id', lobbyId);

  if (fetchError) {
    console.error('Error fetching lobbies:', fetchError);
    return;
  }

  if (existingLobbies.length > 0) {
    // Delete any previous tables with this ID if they exist
    await supabase.from('lobbies').delete().eq('lobby_id', lobbyId);
  }

  // Create a new lobby
  const { data, error } = await supabase.from('lobbies').insert([
    { lobby_id: lobbyId }
  ]);

  if (error) {
    console.error('Error creating lobby:', error);
  } else {
    console.log('Lobby created with ID:', lobbyId);
    return lobbyId
  }
}

// variable for the username input field
const [userName, setUserName] = useState("");
// creating a variable to hold the generated lobby id to then display to the user
const [lobbyId, setLobbyId] = useState("0000"); 
// this variable is for the users lobby input that they enter
const [myLobby, setMyLobby] = useState("");






export default function Connection() {
    const router = useRouter();

    return (
      <View style={styles.container}>

        {/* name text and input */}
        <View style={styles.sections}>
          <Text style={styles.name}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            placeholderTextColor={"#D3D3D3"}
            value={userName} // Bind the input value to the state
            onChangeText={setUserName} // Update the state whenever the text changes
          />
        </View>

        {/* host button and input */}
        <View style={styles.sections}>
        <TouchableOpacity onPress={async () => {
            const generatedId = await generateLobby(); // Store the returned lobbyId
            setLobbyId(generatedId ?? "0000"); // Update the state with lobbyId, setting a default to be a string "0000"
          }}>
            <Text style={styles.hostjoin}>Host</Text>
        </TouchableOpacity>
        <Text style={styles.input}>
          {lobbyId} {/* Display the lobbyId that was generated above*/}
        </Text>
        </View>

        {/* join button and input */}
        <View style={styles.sections}>
        <TouchableOpacity onPress={() => router.push("/wait")}>
          <Text style={styles.hostjoin}>Join</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Enter code"
          placeholderTextColor={"#D3D3D3"}
          value={myLobby} // Bind the input value to the state
          onChangeText={setMyLobby} // Update the state whenever the text changes
        />
        </View>
      
      </View>
    );
}




const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 20,
  },
  sections: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  hostjoin: {
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: "center",
    backgroundColor: "#19be64",
    color: "white",
    fontSize: 20
  },
  input: {
    margin: 30,
    height: 50,
    width: 200,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "#333",
    fontSize: 15,
  }
})