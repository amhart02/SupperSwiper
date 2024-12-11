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

        {/* name text and input */}
        <View style={styles.sections}>
          <Text style={styles.name}>Name</Text>
          <TextInput style={styles.input} placeholder="Please enter name" placeholderTextColor={"#D3D3D3"}/>
        </View>

        {/* host button and input */}
        <View style={styles.sections}>
        <TouchableOpacity onPress={() => generateLobby()}>
          <Text style={styles.hostjoin}>Host</Text>
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="Displayed Code" placeholderTextColor={"#D3D3D3"}/>
        </View>

        {/* join button and input */}
        <View style={styles.sections}>
        <TouchableOpacity onPress={() => router.push("/wait")}>
          <Text style={styles.hostjoin}>Join</Text>
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="Enter code" placeholderTextColor={"#D3D3D3"}/>
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