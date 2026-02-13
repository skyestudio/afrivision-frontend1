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
      // Small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Step 1: Check if onboarding is completed
      const onboardingData = await AsyncStorage.getItem("onboardingData");
      const isOnboardingCompleted = onboardingData !== null;

      console.log("Onboarding completed:", isOnboardingCompleted);

      // Step 2: If onboarding is not completed, go to onboarding
      if (!isOnboardingCompleted) {
        console.log("Onboarding not completed, navigating to OnboardingScreen");
        navigation.replace("OnboardingScreen");
        return;
      }

      // Step 3: Onboarding is completed, check for user session
      const token = await AsyncStorage.getItem("userToken");
      const userRole = await AsyncStorage.getItem("userRole");
      const userDataString = await AsyncStorage.getItem("userData");
      const userData = userDataString ? JSON.parse(userDataString) : null;

      // Step 4: Check if user is logged in (has token and user data)
      if (token && userRole && userData) {
        // User is logged in, navigate based on role
        console.log("User logged in with role:", userRole);

        // Normalize role to lowercase for consistent comparison
        const normalizedRole = userRole.toLowerCase();

        if (normalizedRole === "student") {
          console.log("Navigating to DashboardScreen");
          navigation.replace("DashboardScreen");
        } else if (normalizedRole === "instructor") {
          console.log("Navigating to InsDashboard");
          navigation.replace("InsDashboard");
        } else {
          // Fallback - if role is neither student nor instructor
          console.log("Unknown role, defaulting to DashboardScreen");
          navigation.replace("DashboardScreen");
        }
      } else {
        // Step 5: Onboarding completed but no user session, go to login
        console.log("No valid session, navigating to LoginScreen");
        navigation.replace("LoginScreen");
      }
    } catch (error) {
      console.error("Error checking user status:", error);
      // In case of error, go to onboarding as safe fallback
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
