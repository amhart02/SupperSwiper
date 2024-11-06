import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput} from "react-native";
import { useRouter } from "expo-router";

export default function Connection() {
    const router = useRouter();

    function generateLobby() {
      // figure this out later 
    }

    function joinLobby() {
      // also figure this out later
    }
    
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => generateLobby()}>
          <Text style={styles.hostjoin}>Host</Text>
        </TouchableOpacity>
        <Text style={styles.or}>OR</Text>
        <TouchableOpacity onPress={() => joinLobby()}>
          <Text style={styles.hostjoin}>Join</Text>
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="Enter code"/>
        <Button title="Move to restaurant choices" onPress={() => router.push("/restaurants")}></Button>  
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    alignItems: "center"
  },
  or: {
    margin: 30,
    fontSize: 20,
  },
  hostjoin: {
    backgroundColor: "#74C365",
    paddingVertical: 20, 
    paddingHorizontal: 30,
    fontSize: 20,
    color: "white"
  },
  input: {
    margin: 30,
    height: 50,
    width: 200,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "#000",
    fontSize: 16,
  }
})