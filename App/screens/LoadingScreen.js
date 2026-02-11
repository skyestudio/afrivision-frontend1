// screens/LoadingScreen.js
import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoadingScreen({ navigation }) {
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const styles = isMobile
    ? mobileStyles
    : isTablet
      ? tabletStyles
      : desktopStyles;

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      // Get user data from AsyncStorage
      const token = await AsyncStorage.getItem("userToken");
      const userRole = await AsyncStorage.getItem("userRole");
      const userDataString = await AsyncStorage.getItem("userData");
      const userData = userDataString ? JSON.parse(userDataString) : null;

      // Small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (token && userRole && userData) {
        // User is logged in, navigate based on role
        console.log("User logged in with role:", userRole);

        if (userRole === "student" || userRole === "Student") {
          navigation.replace("StudentStack");
        } else if (
          userRole === "instructor" ||
          userRole === "staff" ||
          userRole === "teacher" ||
          userRole === "Instructor"
        ) {
          navigation.replace("InstructorStack");
        } else {
          navigation.replace("StudentStack");
        }
      } else {
        // No valid session found, go to onboarding
        console.log("No valid session, navigating to onboarding");
        navigation.replace("OnboardingScreen");
      }
    } catch (error) {
      console.error("Error checking user status:", error);
      navigation.replace("OnboardingScreen");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logoImage}
        />
        <Text style={styles.appName}>AfriVision</Text>
      </View>

      {/* Loading Indicator */}
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E7670C" />
        <Text style={styles.loadingText}>Loading your experience...</Text>
      </View>

      {/* Bottom Text */}
      <Text style={styles.tagline}>Empowering African Learners</Text>
    </View>
  );
}


// DESKTOP STYLES (≥ 1024px)
const desktopStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  logoImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    marginTop: 16,
    letterSpacing: 1,
  },
  loadingContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
    marginTop: 20,
    fontWeight: "500",
  },
  tagline: {
    fontSize: 16,
    color: "#351414ff",
    fontWeight: "600",
    position: "absolute",
    bottom: 40,
  },
});

// TABLET STYLES (768px - 1023px)
const tabletStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  logoImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    marginTop: 14,
    letterSpacing: 0.8,
  },
  loadingContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginTop: 16,
    fontWeight: "500",
  },
  tagline: {
    fontSize: 14,
    color: "#351414ff",
    fontWeight: "600",
    position: "absolute",
    bottom: 30,
  },
});

// MOBILE STYLES (< 768px)
const mobileStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginTop: 12,
    letterSpacing: 0.5,
  },
  loadingContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  loadingText: {
    fontSize: 15,
    color: "#666",
    marginTop: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  tagline: {
    fontSize: 14,
    color: "#351414ff",
    fontWeight: "600",
    position: "absolute",
    bottom: 25,
  },
});
