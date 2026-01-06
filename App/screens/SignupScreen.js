import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    gender: "",
    dob: "",
    country: "",
    city: "",
    occupation: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = () => {
    navigation.navigate("LoginScreen");

    console.log("Form Data:", formData);
    // Handle signup logic here
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
        {/* Logo and Header */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>
            Hey, We are glad you chose AfriVision
          </Text>
          <View style={styles.subLogoWrapper}>
            <View style={styles.line} />
            <Text style={styles.subLogoText}>Let's get started</Text>
          </View>
        </View>

        {/* Scrollable Form Fields */}
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.inputContainer}>
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#999"
                value={formData.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />
            </View>

            {/* Mobile Number Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mobile Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={formData.mobile}
                onChangeText={(text) => handleInputChange("mobile", text)}
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => handleInputChange("email", text)}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Create a password"
                placeholderTextColor="#999"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleInputChange("password", text)}
              />
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                placeholderTextColor="#999"
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={(text) =>
                  handleInputChange("confirmPassword", text)
                }
              />
            </View>

            {/* Gender Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.radioContainer}>
                {["Male", "Female", "Other"].map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    style={[
                      styles.radioButton,
                      formData.gender === gender.toLowerCase() &&
                        styles.radioButtonSelected,
                    ]}
                    onPress={() =>
                      handleInputChange("gender", gender.toLowerCase())
                    }>
                    <Text
                      style={[
                        styles.radioText,
                        formData.gender === gender.toLowerCase() &&
                          styles.radioTextSelected,
                      ]}>
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Date of Birth */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#999"
                value={formData.dob}
                onChangeText={(text) => handleInputChange("dob", text)}
              />
            </View>

            {/* Country Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Country</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your country"
                placeholderTextColor="#999"
                value={formData.country}
                onChangeText={(text) => handleInputChange("country", text)}
              />
            </View>

            {/* City Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your city"
                placeholderTextColor="#999"
                value={formData.city}
                onChangeText={(text) => handleInputChange("city", text)}
              />
            </View>

            {/* Occupation Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Occupation</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your occupation"
                placeholderTextColor="#999"
                value={formData.occupation}
                onChangeText={(text) => handleInputChange("occupation", text)}
              />
            </View>

            {/* User Type Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Register as</Text>
              <View style={styles.radioContainer}>
                {["Student", "Instructor"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.radioButton,
                      formData.userType === type.toLowerCase() &&
                        styles.radioButtonSelected,
                    ]}
                    onPress={() =>
                      handleInputChange("userType", type.toLowerCase())
                    }>
                    <Text
                      style={[
                        styles.radioText,
                        formData.userType === type.toLowerCase() &&
                          styles.radioTextSelected,
                      ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Terms and Conditions */}
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By signing up, you agree to our{" "}
                <Text style={styles.linkText}>Terms of Service</Text> and{" "}
                <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Fixed Buttons at Bottom */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
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
    position: "fixed", // This makes it fixed on web
    left: 0,
    top: 0,
    bottom: 0,
  },
  rightSide: {
    width: "50%",
    marginLeft: "50%", // Push content to the right of fixed image
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

  // Logo Section
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  logoText: {
    color: "#000",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 30,
  },
  subLogoWrapper: {
    position: "relative",
    alignItems: "center",
    marginTop: 12,
    width: 200,
  },
  line: {
    position: "absolute",
    height: 1,
    width: "100%",
    backgroundColor: "#000",
    top: "50%",
  },
  subLogoText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
  },

  // Scrollable Content
  scrollContainer: {
    flex: 1,
    maxHeight: "60vh", // Limit scrollable area
  },
  scrollContent: {
    paddingBottom: 120, // Space for fixed buttons
  },
  inputContainer: {
    width: "100%",
  },

  // Form Inputs
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: "#fafafa",
    color: "#333",
    width: "100%",
  },

  // Radio Buttons
  radioContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 6,
  },
  radioButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  radioButtonSelected: {
    borderColor: "#E7670C",
    backgroundColor: "#f0f4ff",
  },
  radioText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  radioTextSelected: {
    color: "#E7670C",
    fontWeight: "600",
  },

  // Terms
  termsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  termsText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    lineHeight: 18,
  },
  linkText: {
    color: "#E7670C",
    fontWeight: "600",
  },

  // Fixed Buttons
  buttonContainer: {
    position: "fixed",
    bottom: 0,
    right: 0,
    width: "50%", // Same as rightSide width
    backgroundColor: "#fff",
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  signUpButton: {
    backgroundColor: "#E7670C",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    width: "50%",
    marginBottom: 16,
    alignSelf: "center",
  },
  signUpText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    fontSize: 14,
    color: "#666",
  },
  signInLink: {
    fontSize: 14,
    color: "#E7670C",
    fontWeight: "600",
  },
});
