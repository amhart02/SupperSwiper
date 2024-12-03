import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Animated, Image, Button, ActivityIndicator } from "react-native";
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
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();
  const translateX = new Animated.Value(0); // For the current image swipe

  // Fetch data from the API
  useEffect(() => {
    const fetchAndPreloadImages = async () => {
      try {
        const response = await fetch("https://supperswiper.onrender.com/logos");
        const data: Restaurant[] = await response.json();
  
        setRestaurants(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setLoading(false);
      }
    };
  
    fetchAndPreloadImages();
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
    }).start(() => {
      // Reset translateX and show the next image in the center after the swipe completes
      translateX.setValue(0);
      setImageLoaded(false); // Reset image loaded state for the next image
    });
  };

  const resetPosition = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <View style={styles.container}>
        {restaurants.length > 0 && (
          <Animated.View
            style={[
              styles.restaurantContainer,
              { transform: [{ translateX }] },
            ]}
          >
            <View style={styles.imageContainer}>
              {!imageLoaded && <ActivityIndicator size="large" color="#0000ff" />}
              <Image
                source={{ uri: restaurants[currentIndex].url }}
                style={styles.image}
                onLoad={handleImageLoad}
              />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
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