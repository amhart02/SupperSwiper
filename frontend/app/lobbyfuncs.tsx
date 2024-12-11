// import supabase from "../../backend/config/supa_client.js"

// // Function to create a 4-digit code
// const generateLobbyCode = () => {
//     return Math.floor(1000 + Math.random() * 9000).toString();
//   };
  
//   // Function to create a new lobby table
//   async function generateLobby(str: setLobbyId) {
//     const lobbyId = generateLobbyCode();
  
//     // Check for any previous table with this ID and delete
//     const { data: existingLobbies, error: fetchError } = await supabase
//       .from('lobbies')
//       .select('*')
//       .eq('lobby_id', lobbyId);
  
//     if (fetchError) {
//       console.error('Error fetching lobbies:', fetchError);
//       return;
//     }
  
//     if (existingLobbies.length > 0) {
//       // Delete any previous tables with this ID if they exist
//       await supabase.from('lobbies').delete().eq('lobby_id', lobbyId);
//     }
  
//     // Create a new lobby
//     const { data, error } = await supabase.from('lobbies').insert([
//       { lobby_id: lobbyId }
//     ]);
  
//     if (error) {
//       console.error('Error creating lobby:', error);
//     } else {
//       console.log('Lobby created with ID:', lobbyId);
//       setLobbyId(lobbyId); // Pass the lobby ID to the app state for display
//     }
//   }

  

//   async function joinLobby(inputLobbyId, setMessage) {
//     // Check if the lobby with this ID exists
//     const { data: lobby, error } = await supabase
//       .from('lobbies')
//       .select('*')
//       .eq('lobby_id', inputLobbyId)
//       .single();
  
//     if (error || !lobby) {
//       console.error('Error finding lobby:', error);
//       setMessage('Lobby not found.');
//       return;
//     }
  
//     // Subscribe to the lobby in real-time
//     supabase
//       .from(`lobbies:lobby_id=eq.${inputLobbyId}`)
//       .on('INSERT', payload => {
//         console.log('New entry:', payload.new);
//         // Trigger your condition here if needed, e.g., if users match on 'yes'
//       })
//       .subscribe();
  
//     // Notify the user
//     setMessage('Lobby has been joined!');
//   }

  

//   ///////////////////////Front end////////////////////////////////
//   import React, { useState } from 'react';
// import { View, Text, Button, TextInput } from 'react-native';

// export default function LobbyScreen() {
//   const [lobbyId, setLobbyId] = useState('');
//   const [inputLobbyId, setInputLobbyId] = useState('');
//   const [message, setMessage] = useState('');

//   return (
//     <View>
//       <Button title="Generate Lobby" onPress={() => generateLobby(setLobbyId)} />
//       {lobbyId && <Text>Lobby ID: {lobbyId}</Text>}
      
//       <TextInput
//         placeholder="Enter Lobby ID"
//         value={inputLobbyId}
//         onChangeText={setInputLobbyId}
//       />
//       <Button title="Join Lobby" onPress={() => joinLobby(inputLobbyId, setMessage)} />
//       {message && <Text>{message}</Text>}
//     </View>
//   );
// }
