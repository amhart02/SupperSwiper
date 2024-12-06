import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button, StyleSheet, Image, Animated } from "react-native";
import { useRouter } from "expo-router";
import { PanGestureHandler, State, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";

type Restaurant = {
  id: string;
  restaurant: string;
  url: string;
};

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeResult, setSwipeResult] = useState<string | null>(null);
  const router = useRouter();
  const translateX = new Animated.Value(0); // For the current image swipe
  const nextImageTranslateX = new Animated.Value(0); // For the next image swipe

  // Fetch data from the API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("https://supperswiper.onrender.com/logos");
        const data: Restaurant[] = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  // Handle swipe gestures
  const onGestureEvent = useCallback((event: PanGestureHandlerGestureEvent) => {
    translateX.setValue(event.nativeEvent.translationX);
  }, []);

  const onHandlerStateChange = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      const swipeThreshold = 50;
      if (nativeEvent.translationX > swipeThreshold) {
        // Swiped right
        setSwipeResult("Swiped right: true");
        setCurrentIndex((prevIndex) => (prevIndex + 1) % restaurants.length);
        animateSwipe("right");
      } else if (nativeEvent.translationX < -swipeThreshold) {
        // Swiped left
        setSwipeResult("Swiped left: false");
        setCurrentIndex((prevIndex) => (prevIndex + 1) % restaurants.length);
        animateSwipe("left");
      } else {
        // Reset if not swiped enough
        resetPosition();
      }
    }
  };

  const animateSwipe = (direction: "right" | "left") => {
    // Slide current image off the screen
    Animated.timing(translateX, {
      toValue: direction === "right" ? 500 : -500,
      duration: 200, // Shorter duration for a faster animation
      useNativeDriver: true,
    }).start();

    // Slide the next image into view
    Animated.timing(nextImageTranslateX, {
      toValue: 0, // Center the next image
      duration: 200,
      useNativeDriver: true,
    }).start();

    // Reset translateX and show the next image in the center after the swipe completes
    setTimeout(() => {
      translateX.setValue(0); // Reset current image
      nextImageTranslateX.setValue(0); // Reset the next image
    }, 200); // Matches the animation duration for smoother transitions
  };

  const resetPosition = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent} 
      onHandlerStateChange={onHandlerStateChange}
    >
      <View style={styles.container}>
        {restaurants.length > 0 && (
          <Animated.View
            style={[styles.restaurantContainer, { transform: [{ translateX }] }]}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: restaurants[currentIndex].url }}
                style={styles.image}
              />
            </View>
            <Text style={styles.restaurant}>{restaurants[currentIndex].restaurant}</Text>
          </Animated.View>
        )}
        {swipeResult && <Text>{swipeResult}</Text>}
        <Button title="Move to Match Screen" onPress={() => router.push("/results")} />
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
    fontSize: 30,
  },
});
