// screens/OnboardingScreen.js
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen({ navigation }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  const options = [
    { id: 1, text: "Learn something new" },
    { id: 2, text: "Advance my career" },
    { id: 3, text: "Master a specific skill" },
    { id: 4, text: "Collaborate or network" },
    { id: 5, text: "Support school/university work" },
  ];

  const toggleOption = (optionId) => {
    setSelectedOptions((prev) => {
      if (prev.includes(optionId)) {
        return prev.filter((id) => id !== optionId);
      } else if (prev.length < 2) {
        return [...prev, optionId];
      }
      return prev;
    });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to next screen or complete onboarding
      console.log("Selected options:", selectedOptions);
      navigation.navigate("Dashboard"); // or wherever you want to go
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepContainer}>
      {[1, 2, 3, 4].map((step) => (
        <View key={step} style={styles.stepRow}>
          <View
            style={[
              styles.stepCircle,
              step === currentStep && styles.stepCircleActive,
              step < currentStep && styles.stepCircleCompleted,
            ]}>
            {step < currentStep ? (
              <Text style={styles.stepCheck}>✓</Text>
            ) : (
              <Text
                style={[
                  styles.stepNumber,
                  step === currentStep && styles.stepNumberActive,
                ]}>
                {step}
              </Text>
            )}
          </View>
          {step < 4 && (
            <View
              style={[
                styles.stepLine,
                step < currentStep && styles.stepLineCompleted,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Text style={styles.question}>What brings you here?</Text>
            <Text style={styles.subtitle}>Select up to 2 options</Text>

            <View style={styles.optionsContainer}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionCard,
                    selectedOptions.includes(option.id) &&
                      styles.optionCardSelected,
                  ]}
                  onPress={() => toggleOption(option.id)}
                  disabled={
                    selectedOptions.length >= 2 &&
                    !selectedOptions.includes(option.id)
                  }>
                  <View style={styles.optionContent}>
                    <View
                      style={[
                        styles.optionRadio,
                        selectedOptions.includes(option.id) &&
                          styles.optionRadioSelected,
                      ]}>
                      {selectedOptions.includes(option.id) && (
                        <View style={styles.optionRadioInner} />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.optionText,
                        selectedOptions.includes(option.id) &&
                          styles.optionTextSelected,
                      ]}>
                      {option.text}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );

      case 2:
        return (
          <>
            <Text style={styles.question}>What are your interests?</Text>
            <Text style={styles.subtitle}>
              Select topics you'd like to explore
            </Text>
            {/* Add interests options here */}
          </>
        );

      case 3:
        return (
          <>
            <Text style={styles.question}>What's your experience level?</Text>
            <Text style={styles.subtitle}>
              Help us personalize your journey
            </Text>
            {/* Add experience level options here */}
          </>
        );

      case 4:
        return (
          <>
            <Text style={styles.question}>Almost done!</Text>
            <Text style={styles.subtitle}>Let's set up your profile</Text>
            {/* Add profile setup here */}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Left Side with Image */}
      <View style={styles.leftSide}>
        <Image
          source={require("../assets/girl.png")}
          style={styles.girlImage}
          resizeMode="cover"
        />
      </View>

      {/* Right Side with Form */}
      <View style={styles.rightSide}>
        {/* Step Indicators */}
        {renderStepIndicator()}

        {/* Content Area */}
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.contentContainer}>{renderStepContent()}</View>
        </ScrollView>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <View style={styles.navButtons}>
            <TouchableOpacity
              style={[styles.navButton, styles.backButton]}
              onPress={handleBack}>
              <Text style={styles.backButtonText}>
                {currentStep === 1 ? "Back" : "Previous"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                styles.nextButton,
                currentStep === 1 &&
                  selectedOptions.length === 0 &&
                  styles.nextButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={currentStep === 1 && selectedOptions.length === 0}>
              <Text style={styles.nextButtonText}>
                {currentStep === 4 ? "Complete" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Skip option for step 1 */}
          {currentStep === 1 && (
            <TouchableOpacity
              style={styles.skipContainer}
              onPress={() => navigation.navigate("Dashboard")}>
              <Text style={styles.skipText}>Skip for now</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  leftSide: {
    width: "50%",
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
  },
  rightSide: {
    width: "50%",
    marginLeft: "50%",
    paddingHorizontal: 40,
    paddingVertical: 30,
    flex: 1,
    height: "100%",
  },
  girlImage: {
    width: "100%",
    height: "90%",
    borderRadius: 16,
    maxWidth: 600,
    maxHeight: 700,
  },

  // Step Indicators
  stepContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  stepCircleActive: {
    borderColor: "#4a6cf7",
    backgroundColor: "#4a6cf7",
  },
  stepCircleCompleted: {
    borderColor: "#4a6cf7",
    backgroundColor: "#4a6cf7",
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
  },
  stepNumberActive: {
    color: "#fff",
  },
  stepCheck: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 8,
  },
  stepLineCompleted: {
    backgroundColor: "#4a6cf7",
  },

  // Content Area
  scrollContainer: {
    flex: 1,
    maxHeight: "60vh",
  },
  scrollContent: {
    paddingBottom: 140,
  },
  contentContainer: {
    width: "100%",
  },
  question: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },

  // Options
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 20,
    backgroundColor: "#fff",
  },
  optionCardSelected: {
    borderColor: "#4a6cf7",
    backgroundColor: "#f0f4ff",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#ddd",
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  optionRadioSelected: {
    borderColor: "#4a6cf7",
    backgroundColor: "#4a6cf7",
  },
  optionRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  optionTextSelected: {
    color: "#4a6cf7",
    fontWeight: "600",
  },

  // Navigation Buttons
  buttonContainer: {
    position: "fixed",
    bottom: 0,
    right: 0,
    width: "50%",
    backgroundColor: "#fff",
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navButton: {
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 32,
    minWidth: 120,
    alignItems: "center",
  },
  backButton: {
    borderWidth: 2,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  nextButton: {
    backgroundColor: "#4a6cf7",
  },
  nextButtonDisabled: {
    backgroundColor: "#a0b4ff",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  skipContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  skipText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
});
