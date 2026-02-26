import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        router.replace("/select-type");
      }, 800);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: translateAnim }],
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/logo.png")}
          style={styles.logo}
          contentFit="contain"
        />

        <Text style={styles.brand}>Docka</Text>
        <Text style={styles.tagline}>Marine Concierge</Text>
      </Animated.View>
    </View>
  );
}

const NAVY = "#0E3A5D";
const OFF_WHITE = "#F7F9FA";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: OFF_WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
  },
  brand: {
    marginTop: 28,
    fontSize: 24,
    fontWeight: "600",
    color: NAVY,
    letterSpacing: 2,
  },
  tagline: {
    marginTop: 6,
    fontSize: 13,
    letterSpacing: 1.5,
    color: "#7A8A95",
  },
});
