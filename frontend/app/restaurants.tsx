import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
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
        <Text>Swipe on Restaurants</Text>
        {swipeResult && <Text>{swipeResult}</Text>}

        <Button title="Move to Match Screen" onPress={() => router.push("/match")} />
      </View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
