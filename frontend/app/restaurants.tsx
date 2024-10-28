import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
// Importing to use for swipe features
import { PanGestureHandler } from "react-native-gesture-handler";

export default function Restaurants() {
  const [swipeResult, setSwipeResult] = useState<string | null>(null);
  const router = useRouter();

  // Swiper event
  const onGestureEvent = (event: any) => {
    const { translationX } = event.nativeEvent;

    if (translationX > 0) {
      // Swiped right
      setSwipeResult("Swiped right: true");
    } else if (translationX < 0) {
      // Swiped left
      setSwipeResult("Swiped left: false");
    }
  };

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <View style={styles.container}>
        <Image source={{ uri: "https://i.redd.it/2mhrqnmb7s941.jpg"}} style={styles.image} />
        <Text style={styles.restaurant}>Name of Restaurant</Text>
        {swipeResult && <Text>{swipeResult}</Text>}
        <Button title="Move to Match Screen" onPress={() => router.push("/match")} />
      </View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "cover"
  },
  restaurant: {
    margin: 40,
    fontSize: 30
  }
});
