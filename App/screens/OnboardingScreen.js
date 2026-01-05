import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const onboardingSteps = [
    {
      id: 1,
      title: "Welcome to AfriVision",
      description: "Discover amazing content from across Africa",
      image: require("../assets/girl.png"), // Add your images
    },
    {
      id: 2,
      title: "Personalized Feed",
      description: "Get content tailored to your interests",
      image: require("../assets/girl.png"), // Add your images
    },
    {
      id: 3,
      title: "Connect & Share",
      description: "Share your favorite moments with friends",
      image: require("../assets/girl.png"), // Add your images
    },
    {
      id: 4,
      title: "Ready to Explore",
      description: "Start your journey with us today",
      image: require("../assets/girl.png"), // Add your images
    },
  ];

  const handleNext = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handlePrev = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleSkip = () => {
    // Navigate to main app
    console.log("Skip onboarding");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <View style={styles.leftSide}>
          <Image
            source={require("../assets/logo.png")}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>

        {/* Progress Indicator */}
        <View style={styles.centerSide}>
          <View style={styles.progressContainer}>
            {onboardingSteps.map((_, index) => (
              <View key={index} style={styles.progressStep}>
                <View
                  style={[
                    styles.progressCircle,
                    currentStep >= index && styles.progressCircleActive,
                  ]}>
                  <Text
                    style={[
                      styles.progressText,
                      currentStep >= index && styles.progressTextActive,
                    ]}>
                    {index + 1}
                  </Text>
                </View>
                {index < onboardingSteps.length - 1 && (
                  <View
                    style={[
                      styles.progressLine,
                      currentStep > index && styles.progressLineActive,
                    ]}
                  />
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.rightSide}>
          <Image
            source={require("../assets/grouped_stars.png")}
            style={styles.groupedStars}
          />
        </View>
      </View>
      <View></View>

      {/* Main Content */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.imageContainer}>
          <Image
            source={onboardingSteps[currentStep].image}
            resizeMode="contain"
            style={styles.onboardingImage}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{onboardingSteps[currentStep].title}</Text>
          <Text style={styles.description}>
            {onboardingSteps[currentStep].description}
          </Text>
        </View>

        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentStep && styles.dotActive]}
            />
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          {currentStep > 0 && (
            <TouchableOpacity style={styles.backButton} onPress={handlePrev}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.nextButton,
              currentStep === 3 && styles.getStartedButton,
            ]}
            onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentStep === 3 ? "Get Started" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topHeader: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  leftSide: {
    width: 60,
    alignItems: "flex-start",
  },
  centerSide: {
    flex: 1,
    alignItems: "center",
  },
  rightSide: {
    width: 60,
    alignItems: "flex-end",
  },
  logo: {
    width: 50,
    height: 50,
  },
  groupedStars: {
    width: 100,
    height: 100,
  },
  skipText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  progressStep: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  progressCircleActive: {
    backgroundColor: "#fff",
    borderColor: "#4A6FFF",
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
  },
  progressTextActive: {
    color: "#4A6FFF",
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 5,
  },
  progressLineActive: {
    backgroundColor: "#4A6FFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  onboardingImage: {
    width: "100%",
    height: "100%",
    maxHeight: 300,
  },
  textContainer: {
    flex: 0.2,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: "#4A6FFF",
    width: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  backButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
  },
  nextButton: {
    backgroundColor: "#4A6FFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    flex: 1,
    marginLeft: 20,
    alignItems: "center",
  },
  getStartedButton: {
    backgroundColor: "#2ECC71",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  groupedStars: {
    width: 120,
    height: 120,
    alignSelf: "flex-end",
  },
});
