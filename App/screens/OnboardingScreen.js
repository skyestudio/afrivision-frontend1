import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [step1Selections, setStep1Selections] = useState([]);
  const [step2Selections, setStep2Selections] = useState([]);
  const [step3Selection, setStep3Selection] = useState(null);
  const [step4Selection, setStep4Selection] = useState(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Check if onboarding data already exists
    AsyncStorage.getItem("onboardingData")
      .then((data) => {
        if (data) {
          // If data exists, skip onboarding
          navigation.navigate("LoginScreen");
        }
      })
      .catch((error) => {
        console.error("Error checking onboarding data:", error);
      });
  }, []);

  // Step 1: What brings you here
  const step1Options = [
    { id: 1, title: "Learn something new", icon: "add" },
    { id: 2, title: "Advance my career", icon: "add" },
    { id: 3, title: "Master a specific skill", icon: "add" },
    { id: 4, title: "Collaborate or network", icon: "add" },
    { id: 5, title: "Support school/university work", icon: "add" },
  ];

  // Step 2: Interests
  const step2Categories = [
    {
      id: 1,
      title: "Tech",
      options: [
        { id: 1, title: "Web Dev", icon: "code-slash-outline" },
        { id: 2, title: "Mobile Dev", icon: "phone-portrait-outline" },
        { id: 3, title: "UI/UX", icon: "color-palette-outline" },
        { id: 4, title: "AI", icon: "hardware-chip-outline" },
        { id: 5, title: "Cybersecurity", icon: "shield-checkmark-outline" },
      ],
    },
    {
      id: 2,
      title: "Business",
      options: [
        { id: 6, title: "Marketing", icon: "megaphone-outline" },
        { id: 7, title: "Finance", icon: "cash-outline" },
        { id: 8, title: "Entrepreneurship", icon: "rocket-outline" },
      ],
    },
    {
      id: 3,
      title: "Creative",
      options: [
        { id: 9, title: "Design", icon: "brush-outline" },
        { id: 10, title: "Animation", icon: "film-outline" },
        { id: 11, title: "Writing", icon: "create-outline" },
      ],
    },
    {
      id: 4,
      title: "Academic",
      options: [
        { id: 12, title: "Math", icon: "calculator-outline" },
        { id: 13, title: "Science", icon: "flask-outline" },
        { id: 14, title: "Languages", icon: "language-outline" },
      ],
    },
  ];

  // Step 3: Current Role
  const step3Options = [
    { id: 1, title: "Student", icon: "add" },
    { id: 2, title: "Working Professional", icon: "add" },
    { id: 3, title: "Intern / Trainee", icon: "add" },
    { id: 4, title: "Freelancer / Self-employed", icon: "add" },
    { id: 5, title: "Job Seeker", icon: "add" },
    { id: 6, title: "Other", icon: "add" },
  ];

  // Step 4: Education Level
  const step4Options = [
    { id: 1, title: "Less than high school diploma" },
    { id: 2, title: "High school diploma" },
    { id: 3, title: "Bachelor's degree" },
    { id: 4, title: "Master's degree" },
    { id: 5, title: "Doctorate degree" },
  ];

  const onboardingSteps = [
    {
      id: 1,
      title: "What brings you here?",
      subtitle: "Select up to 2 options",
    },
    {
      id: 2,
      title: "Pick your areas of interest",
      subtitle: "Select up to 5 options",
    },
    {
      id: 3,
      title: "Your Current Role",
      subtitle: "Select 1 option",
    },
    {
      id: 4,
      title: "What's your highest level of education?",
      subtitle: "",
    },
  ];

  const handleNext = () => {
    // Validate current step before proceeding
    if (currentStep === 0 && step1Selections.length === 0) {
      alert("Please select at least 1 option");
      return;
    }
    if (currentStep === 1 && step2Selections.length === 0) {
      alert("Please select at least 1 interest");
      return;
    }
    if (currentStep === 2 && !step3Selection) {
      alert("Please select your current role");
      return;
    }
    if (currentStep === 3 && !step4Selection) {
      alert("Please select your education level");
      return;
    }

    if (currentStep < 3) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep((prev) => prev + 1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    } else {
      // On last step, finish onboarding
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep((prev) => prev - 1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handleStep1Select = (optionId) => {
    setStep1Selections((prev) => {
      if (prev.includes(optionId)) {
        return prev.filter((id) => id !== optionId);
      } else {
        if (prev.length < 2) {
          return [...prev, optionId];
        }
        return prev;
      }
    });
  };

  const handleStep2Select = (optionId) => {
    setStep2Selections((prev) => {
      if (prev.includes(optionId)) {
        return prev.filter((id) => id !== optionId);
      } else {
        if (prev.length < 5) {
          return [...prev, optionId];
        }
        return prev;
      }
    });
  };

  const handleStep3Select = (optionId) => {
    setStep3Selection(optionId);
  };

  const handleStep4Select = (optionId) => {
    setStep4Selection(optionId);
  };

  const handleFinish = async () => {
    const userData = {
      purpose: step1Selections,
      interests: step2Selections,
      role: step3Selection,
      education: step4Selection,
    };

    console.log("User onboarding data:", userData);

    try {
      // Save onboarding data
      await AsyncStorage.setItem("onboardingData", JSON.stringify(userData));

      // Also save the user role separately for easy access
      if (step3Selection) {
        await AsyncStorage.setItem("userRole", step3Selection.toLowerCase());
      }

      console.log("Onboarding data saved to AsyncStorage");

      // Navigate to login
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error saving onboarding data:", error);
    } finally {
      navigation.navigate("LoginScreen");
    }
  };

  const handleSkip = () => {
    // Skip to next step or finish
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ScrollView
            contentContainerStyle={styles.stepContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.optionsContainer}>
              {step1Options.map((option) => {
                const isSelected = step1Selections.includes(option.id);
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      isSelected && styles.optionButtonSelected,
                    ]}
                    onPress={() => handleStep1Select(option.id)}
                    disabled={!isSelected && step1Selections.length >= 2}
                  >
                    <View style={styles.optionContent}>
                      <View style={styles.optionIconContainer}>
                        <Ionicons
                          name={option.icon}
                          size={24}
                          color={isSelected ? "#E7670C" : "#F9A22F"}
                        />
                      </View>
                      <Text
                        style={[
                          styles.optionButtonText,
                          isSelected && styles.optionButtonTextSelected,
                        ]}
                      >
                        {option.title}
                      </Text>
                      {/**  <Ionicons
                        name={
                          isSelected
                            ? "checkmark-circle"
                            : "checkmark-circle-outline"
                        }
                        size={24}
                        color={isSelected ? "#E7670C" : "#ddd"}
                      /> */}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={styles.selectionHint}>
              {step1Selections.length}/2 selected
            </Text>
          </ScrollView>
        );

      case 1:
        return (
          <ScrollView
            contentContainerStyle={styles.stepContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.optionsContainer}>
              {step2Categories.map((category) => (
                <View key={category.id} style={styles.categoryContainer}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <View style={styles.categoryOptions}>
                    {category.options.map((option) => {
                      const isSelected = step2Selections.includes(option.id);
                      return (
                        <TouchableOpacity
                          key={option.id}
                          style={[
                            styles.interestOption,
                            isSelected && styles.interestOptionSelected,
                          ]}
                          onPress={() => handleStep2Select(option.id)}
                          disabled={!isSelected && step2Selections.length >= 5}
                        >
                          <Ionicons
                            name={option.icon}
                            size={20}
                            color={isSelected ? "#E7670C" : "#666"}
                          />
                          <Text
                            style={[
                              styles.interestOptionText,
                              isSelected && styles.interestOptionTextSelected,
                            ]}
                          >
                            {option.title}
                          </Text>
                          {/**   {isSelected && (
                            <Ionicons
                              name="checkmark"
                              size={16}
                              color="#E7670C"
                              style={styles.interestCheckmark}
                            />
                          )} */}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              ))}
            </View>
            <View style={{ width: "100%", height: 200 }}></View>
          </ScrollView>
        );

      case 2:
        return (
          <ScrollView
            contentContainerStyle={styles.stepContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.optionsContainer}>
              <View style={styles.roleOptionContainer}>
                {step3Options.map((option) => {
                  const isSelected = step3Selection === option.id;
                  return (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.roleOption,
                        isSelected && styles.roleOptionSelected,
                      ]}
                      onPress={() => handleStep3Select(option.id)}
                    >
                      <View style={styles.roleOptionContent}>
                        <View style={styles.roleIconContainer}>
                          <Ionicons
                            name={option.icon}
                            size={20}
                            color={isSelected ? "#E7670C" : "#666"}
                          />
                        </View>
                        <Text
                          style={[
                            styles.roleOptionText,
                            isSelected && styles.roleOptionTextSelected,
                          ]}
                        >
                          {option.title}
                        </Text>
                        {/**   <Ionicons
                        name={
                          isSelected ? "radio-button-on" : "radio-button-off"
                        }
                        size={24}
                        color={isSelected ? "#E7670C" : "#ddd"}
                      /> */}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        );

      case 3:
        return (
          <ScrollView
            contentContainerStyle={styles.stepContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.optionsContainer}>
              <View style={styles.optionsContainerPremier}>
                {step4Options.map((option) => {
                  const isSelected = step4Selection === option.id;
                  return (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.educationOption,
                        isSelected && styles.educationOptionSelected,
                      ]}
                      onPress={() => handleStep4Select(option.id)}
                    >
                      <View style={styles.educationOptionContent}>
                        <Text
                          style={[
                            styles.educationOptionText,
                            isSelected && styles.educationOptionTextSelected,
                          ]}
                        >
                          {option.title}
                        </Text>
                        <Ionicons
                          name={
                            isSelected ? "radio-button-on" : "radio-button-off"
                          }
                          size={24}
                          color={isSelected ? "#E7670C" : "#ddd"}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        );

      default:
        return null;
    }
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
                  ]}
                >
                  <Text
                    style={[
                      styles.progressText,
                      currentStep >= index && styles.progressTextActive,
                    ]}
                  >
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

      {/* Main Content */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{onboardingSteps[currentStep].title}</Text>
          {onboardingSteps[currentStep].subtitle && (
            <Text style={styles.subtitle}>
              {onboardingSteps[currentStep].subtitle}
            </Text>
          )}
        </View>

        {renderStepContent()}

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          {currentStep > 0 && (
            <TouchableOpacity style={styles.backButton} onPress={handlePrev}>
              <Ionicons name="arrow-back" size={20} color="#000" />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.nextButton,
              currentStep === 3 && styles.finishButton,
            ]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === 3 ? "Finished" : "Next"}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
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
  skipText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  groupedStars: {
    width: 110,
    height: 110,
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
    backgroundColor: "#E7670C",
    borderColor: "#E7670C",
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
  },
  progressTextActive: {
    color: "#fff",
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 5,
  },
  progressLineActive: {
    backgroundColor: "#E7670C",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  stepContent: {
    paddingBottom: 20,
    // backgroundColor: "red",
    width: "100%",
    height: 1,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
  },
  optionsContainerPremier: {
    /// flexWrap: "wrap",
    marginBottom: 40,
    justifyContent: "center",
    width: "60%",
    alignSelf: "center",
  },
  optionButton: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#F9A22F",
    backgroundColor: "#fff",
    margin: 5,
  },
  optionButtonSelected: {
    borderColor: "#F9A22F",
    backgroundColor: "#F0F5FF",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionIconContainer: {
    width: 40,
    alignItems: "center",
  },
  optionButtonText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginLeft: 5,
    marginRight: 10,
  },
  optionButtonTextSelected: {
    color: "#E7670C",
    fontWeight: "600",
  },
  selectionHint: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  categoryContainer: {
    marginBottom: 25,
    //  backgroundColor: "red",
    width: "75%",
    alignSelf: "center",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  categoryOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "center",
  },
  interestOption: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 4,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#F9A22F",
    backgroundColor: "#fff",
    margin: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  interestOptionSelected: {
    borderColor: "#E7670C",
    backgroundColor: "#F0F5FF",
  },
  interestOptionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    //  marginTop: 8,
    paddingHorizontal: 10,
  },
  interestOptionTextSelected: {
    color: "#E7670C",
    fontWeight: "600",
  },
  interestCheckmark: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  roleOptionContainer: {
    width: "80%",
    flexDirection: "row",
    // backgroundColor: "blue",
    flexWrap: "wrap",
  },
  roleOption: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },
  roleOptionSelected: {
    borderColor: "#E7670C",
    backgroundColor: "#F0F5FF",
  },
  roleOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  roleIconContainer: {
    width: 40,
    alignItems: "center",
  },
  roleOptionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginLeft: 0,
    marginRight: 10,
  },
  roleOptionTextSelected: {
    color: "#E7670C",
    fontWeight: "600",
  },
  educationOption: {
    padding: 18,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  educationOptionSelected: {
    borderColor: "#E7670C",
    borderWidth: 1,
    //  backgroundColor: "#F0F5FF",
  },
  educationOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  educationOptionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  educationOptionTextSelected: {
    color: "#000",
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 40,
    paddingTop: 10,
    // backgroundColor: "red",
  },
  backButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  nextButton: {
    backgroundColor: "#E7670C",
    paddingVertical: 11,
    paddingHorizontal: 25,
    borderRadius: 5,
    // flex: 1,
    // marginLeft: 20,
    alignItems: "center",
    color: "#fff",
    flexDirection: "row",
  },
  finishButton: {
    backgroundColor: "#E7670C",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 5,
  },
});
