import { StyleSheet, Text, View, Image } from "react-native";
import { useRouter } from "expo-router";
import { TouchableOpacity, GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";

export default function Login() {
  const router = useRouter();

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>

        {/* logo */}
        <Image source={require("../assets/images/supper_swiper_logo.png")} style={styles.image} />
        
        {/* start button */}
        <TouchableOpacity onPress={() => router.push("/restaurants")}>
          <Text style={styles.button}>Start</Text>
          </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20
  },
  button: {
    marginTop: 30,
    borderWidth: 0,
    borderRadius: 5,
    borderColor: "none",
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: "center",
    backgroundColor: "#19be64",
    color: "white",
    fontSize: 25
  },
  image: {
    width: 300,
    height: 300
  }
})
