// screens/LoginScreen.js
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

export default function LoginScreen({ navigation }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignIn = () => {
    console.log("Login Data:", formData);
    // Handle login logic here
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
          <Text style={styles.logoText}>Welcome Back!</Text>
          <View style={styles.subLogoWrapper}>
            <View style={styles.line} />
            <Text style={styles.subLogoText}>We're Happy to See You</Text>
          </View>
          <Text style={styles.tagline}>Let's Continue</Text>
        </View>

        {/* Scrollable Form Fields */}
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.inputContainer}>
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Please enter your email address"
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
                placeholder="Please enter your password"
                placeholderTextColor="#999"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleInputChange("password", text)}
              />
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity
              style={styles.forgotLink}
              onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.forgotText}>Forgot Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Fixed Buttons at Bottom */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't Have Account: </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signUpLink}>Sign Up</Text>
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
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  logoText: {
    color: "#000",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 34,
  },
  subLogoWrapper: {
    position: "relative",
    alignItems: "center",
    marginTop: 8,
    width: 250,
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
  tagline: {
    fontSize: 18,
    color: "#4a6cf7",
    fontWeight: "600",
    marginTop: 12,
  },
  scrollContainer: {
    flex: 1,
    maxHeight: "50vh",
  },
  scrollContent: {
    paddingBottom: 120,
  },
  inputContainer: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 25,
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
  forgotLink: {
    alignSelf: "flex-end",
    marginTop: 5,
  },
  forgotText: {
    color: "#4a6cf7",
    fontSize: 14,
    fontWeight: "600",
  },
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

  signInButton: {
    backgroundColor: "#E7670C",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    width: "50%",
    marginBottom: 16,
    alignSelf: "center",
  },
  signInText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontSize: 14,
    color: "#666",
  },
  signUpLink: {
    fontSize: 14,
    color: "#4a6cf7",
    fontWeight: "600",
  },
});
