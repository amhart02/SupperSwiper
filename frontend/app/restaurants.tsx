import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, Animated } from "react-native";
import { useRouter } from "expo-router";
// Importing to use for swipe features
import { PanGestureHandler, State } from "react-native-gesture-handler";

// Define TypeScript type for restaurant data
type Restaurant = {
  id: string;
  restaurant: string;
  url: string;
}

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeResult, setSwipeResult] = useState<string | null>(null);
  const router = useRouter();
  const translateX = new Animated.Value(0); // Image starts at position 0

// Fetch data from the API
useEffect(() => {
  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:8080/logos');
      const data: Restaurant[] = await response.json();
      setRestaurants(data); // Store the pictures in a list
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  fetchRestaurants();
}, []);

  // Handle swipe gestures
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }], // Update frame position based on finger movement
    { useNativeDriver: true }
  );

  const onHandlerStateChange = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX > 50) {
        // Swiped right
        setSwipeResult("Swiped right: true");
        // Store the response (true) for the current restaurant
        // TODO: Implement network socket to store the response
        setCurrentIndex((prevIndex) => (prevIndex + 1) % restaurants.length); // Show next logo
      } else if (nativeEvent.translationX < -50) {
        // Swiped left
        setSwipeResult("Swiped left: false");
        // Store the response (false) for the current restaurant
        // TODO: Implement network socket to store the response
        setCurrentIndex((prevIndex) => (prevIndex + 1) % restaurants.length); // Show next logo
      }
      Animated.spring(translateX, {
        toValue: 0, // Move the frame back to the center
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
      <View style={styles.container}>
        {restaurants.length > 0 && (
          <Animated.View style={[styles.restaurantContainer, { transform: [{ translateX }] }]}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: restaurants[currentIndex].url }} style={styles.image} />
            </View>
            <Text style={styles.restaurant}>{restaurants[currentIndex].restaurant}</Text>
          </Animated.View>
        )}
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
  restaurantContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  imageContainer: {
    width: 400, 
    height: 300, 
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  restaurant: {
    margin: 40,
    fontSize: 30
  }
});
