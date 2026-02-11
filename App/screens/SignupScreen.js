// screens/SignupScreen.js
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { api } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignupScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const styles = isMobile
    ? mobileStyles
    : isTablet
      ? tabletStyles
      : desktopStyles;

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    gender: "",
    dob: new Date(),
    country: "",
    city: "",
    occupation: "",
  });

  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname.trim())
      newErrors.firstname = "First name is required";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.role) newErrors.role = "Please select a role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields correctly",
      );
      return;
    }

    setLoading(true);
    try {
      // Prepare data for API
      const signupData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phoneNumber: formData.mobile,
        gender: formData.gender,
        dob: formatDate(formData.dob),
        country: formData.country,
        city: formData.city,
        bio: formData.occupation,
        avatarUrl: "", // You can add image upload later
      };

      // Call signup API
      const response = await api.post("/auth/register", signupData);

      if (response.success) {
        Alert.alert(
          "Success!",
          "Account created successfully. Please login to continue.",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("LoginScreen"),
            },
          ],
        );
      } else {
        Alert.alert(
          "Registration Failed",
          response.message || "Something went wrong",
        );
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert(
        "Registration Error",
        error.message || "Failed to create account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange("dob", selectedDate);
    }
  };

  const onDatePress = () => {
    setShowDatePicker(true);
  };

  // Get responsive layout
  const getFormLayout = () => {
    if (isMobile) {
      return { flexDirection: "column", padding: 16 };
    }
    if (isTablet) {
      return { flexDirection: "row", padding: 24 };
    }
    return { flexDirection: "row", padding: 0 };
  };

  const getImageStyle = () => {
    if (isMobile) {
      return { width: "100%", height: 200, borderRadius: 0 };
    }
    return styles.girlImage;
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          {!isMobile && (
            <View style={styles.headerContainer}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.headerLogo}
              />
              <Text style={styles.headerTitle}>Create Your Account</Text>
            </View>
          )}

          <View style={[styles.contentContainer, getFormLayout()]}>
            {/* Left Side - Only show on desktop/tablet */}
            {!isMobile && (
              <View style={styles.leftSide}>
                <Image
                  source={require("../assets/girl.png")}
                  style={getImageStyle()}
                  resizeMode="cover"
                />
                <View style={styles.imageOverlay}>
                  <Text style={styles.overlayTitle}>Join AfriVision</Text>
                  <Text style={styles.overlayText}>
                    Start your learning journey with us today
                  </Text>
                </View>
              </View>
            )}

            {/* Right Side - Form */}
            <View style={styles.rightSide}>
              {/* Mobile Header */}
              {isMobile && (
                <View style={styles.mobileHeader}>
                  <Image
                    source={require("../assets/logo.png")}
                    style={styles.mobileLogo}
                  />
                  <Text style={styles.mobileTitle}>
                    Hey, We are glad you chose AfriVision
                  </Text>
                </View>
              )}

              <ScrollView
                style={styles.formScroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.formScrollContent}
              >
                <Text style={styles.formTitle}>
                  {isMobile ? "Let's get started" : "Create Account"}
                </Text>

                {/* Name Fields - Responsive Layout */}
                <View style={isMobile ? styles.nameColumn : styles.nameRow}>
                  <View
                    style={[
                      styles.inputGroup,
                      isMobile ? styles.fullWidth : styles.halfWidth,
                    ]}
                  >
                    <Text style={styles.label}>
                      First Name{" "}
                      {!formData.firstname && (
                        <Text style={styles.required}>*</Text>
                      )}
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        errors.firstname && styles.inputError,
                      ]}
                      placeholder="Enter first name"
                      placeholderTextColor="#999"
                      value={formData.firstname}
                      onChangeText={(text) =>
                        handleInputChange("firstname", text)
                      }
                      editable={!loading}
                    />
                    {errors.firstname && (
                      <Text style={styles.errorText}>{errors.firstname}</Text>
                    )}
                  </View>

                  <View
                    style={[
                      styles.inputGroup,
                      isMobile ? styles.fullWidth : styles.halfWidth,
                    ]}
                  >
                    <Text style={styles.label}>
                      Last Name{" "}
                      {!formData.lastname && (
                        <Text style={styles.required}>*</Text>
                      )}
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        errors.lastname && styles.inputError,
                      ]}
                      placeholder="Enter last name"
                      placeholderTextColor="#999"
                      value={formData.lastname}
                      onChangeText={(text) =>
                        handleInputChange("lastname", text)
                      }
                      editable={!loading}
                    />
                    {errors.lastname && (
                      <Text style={styles.errorText}>{errors.lastname}</Text>
                    )}
                  </View>
                </View>

                {/* Email */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    Email Address{" "}
                    {!formData.email && <Text style={styles.required}>*</Text>}
                  </Text>
                  <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    placeholder="Enter your email address"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(text) => handleInputChange("email", text)}
                    editable={!loading}
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                {/* Mobile Number */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    Mobile Number{" "}
                    {!formData.mobile && <Text style={styles.required}>*</Text>}
                  </Text>
                  <TextInput
                    style={[styles.input, errors.mobile && styles.inputError]}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    value={formData.mobile}
                    onChangeText={(text) => handleInputChange("mobile", text)}
                    editable={!loading}
                  />
                  {errors.mobile && (
                    <Text style={styles.errorText}>{errors.mobile}</Text>
                  )}
                </View>

                {/* Passwords - Responsive Layout */}
                <View
                  style={isMobile ? styles.passwordColumn : styles.passwordRow}
                >
                  <View
                    style={[
                      styles.inputGroup,
                      isMobile ? styles.fullWidth : styles.halfWidth,
                    ]}
                  >
                    <Text style={styles.label}>
                      Password{" "}
                      {!formData.password && (
                        <Text style={styles.required}>*</Text>
                      )}
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        errors.password && styles.inputError,
                      ]}
                      placeholder="Create a password"
                      placeholderTextColor="#999"
                      secureTextEntry
                      value={formData.password}
                      onChangeText={(text) =>
                        handleInputChange("password", text)
                      }
                      editable={!loading}
                    />
                    {errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>

                  <View
                    style={[
                      styles.inputGroup,
                      isMobile ? styles.fullWidth : styles.halfWidth,
                    ]}
                  >
                    <Text style={styles.label}>
                      Confirm Password{" "}
                      {!formData.confirmPassword && (
                        <Text style={styles.required}>*</Text>
                      )}
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        errors.confirmPassword && styles.inputError,
                      ]}
                      placeholder="Confirm your password"
                      placeholderTextColor="#999"
                      secureTextEntry
                      value={formData.confirmPassword}
                      onChangeText={(text) =>
                        handleInputChange("confirmPassword", text)
                      }
                      editable={!loading}
                    />
                    {errors.confirmPassword && (
                      <Text style={styles.errorText}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </View>
                </View>

                {/* Gender Selection */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    Gender{" "}
                    {!formData.gender && <Text style={styles.required}>*</Text>}
                  </Text>
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
                        }
                        disabled={loading}
                      >
                        <Text
                          style={[
                            styles.radioText,
                            formData.gender === gender.toLowerCase() &&
                              styles.radioTextSelected,
                          ]}
                        >
                          {gender}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {errors.gender && (
                    <Text style={styles.errorText}>{errors.gender}</Text>
                  )}
                </View>

                {/* Date of Birth */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Date of Birth</Text>
                  <TouchableOpacity onPress={onDatePress} disabled={loading}>
                    <TextInput
                      style={styles.input}
                      placeholder="DD/MM/YYYY"
                      placeholderTextColor="#999"
                      value={formatDate(formData.dob)}
                      editable={false}
                      pointerEvents="none"
                    />
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={formData.dob}
                      mode="date"
                      display={isMobile ? "spinner" : "default"}
                      onChange={handleDateChange}
                      maximumDate={new Date()}
                    />
                  )}
                </View>

                {/* Location - Responsive Layout */}
                <View
                  style={isMobile ? styles.locationColumn : styles.locationRow}
                >
                  <View
                    style={[
                      styles.inputGroup,
                      isMobile ? styles.fullWidth : styles.halfWidth,
                    ]}
                  >
                    <Text style={styles.label}>Country</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your country"
                      placeholderTextColor="#999"
                      value={formData.country}
                      onChangeText={(text) =>
                        handleInputChange("country", text)
                      }
                      editable={!loading}
                    />
                  </View>

                  <View
                    style={[
                      styles.inputGroup,
                      isMobile ? styles.fullWidth : styles.halfWidth,
                    ]}
                  >
                    <Text style={styles.label}>City</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your city"
                      placeholderTextColor="#999"
                      value={formData.city}
                      onChangeText={(text) => handleInputChange("city", text)}
                      editable={!loading}
                    />
                  </View>
                </View>

                {/* Occupation */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Occupation</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your occupation"
                    placeholderTextColor="#999"
                    value={formData.occupation}
                    onChangeText={(text) =>
                      handleInputChange("occupation", text)
                    }
                    editable={!loading}
                  />
                </View>

                {/* User Type Selection */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    Register as{" "}
                    {!formData.role && <Text style={styles.required}>*</Text>}
                  </Text>
                  <View style={styles.roleContainer}>
                    {["student", "instructor"].map((type) => (
                      <TouchableOpacity
                        key={type}
                        style={[
                          styles.roleButton,
                          formData.role === type && styles.roleButtonSelected,
                        ]}
                        onPress={() => handleInputChange("role", type)}
                        disabled={loading}
                      >
                        <Text
                          style={[
                            styles.roleText,
                            formData.role === type && styles.roleTextSelected,
                          ]}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Text>
                        <Text style={styles.roleDescription}>
                          {type === "student"
                            ? "Learn from experts"
                            : "Teach and earn"}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {errors.role && (
                    <Text style={styles.errorText}>{errors.role}</Text>
                  )}
                </View>

                {/* Terms and Conditions */}
                <View style={styles.termsContainer}>
                  <Text style={styles.termsText}>
                    By signing up, you agree to our{" "}
                    <Text style={styles.linkText}>Terms of Service</Text> and{" "}
                    <Text style={styles.linkText}>Privacy Policy</Text>
                  </Text>
                </View>

                {/* Sign Up Button */}
                <TouchableOpacity
                  style={[
                    styles.signUpButton,
                    loading && styles.disabledButton,
                  ]}
                  onPress={handleSignUp}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.signUpText}>Create Account</Text>
                  )}
                </TouchableOpacity>

                {/* Already have account */}
                <View style={styles.signInContainer}>
                  <Text style={styles.signInText}>
                    Already have an account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("LoginScreen")}
                    disabled={loading}
                  >
                    <Text style={styles.signInLink}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// DESKTOP STYLES (≥ 1024px)
const desktopStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  contentContainer: {
    flex: 1,
    height: "100%",
  },
  leftSide: {
    width: "40%",
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    position: "relative",
  },
  girlImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  imageOverlay: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 20,
    borderRadius: 12,
  },
  overlayTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  overlayText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
  },
  rightSide: {
    width: "60%",
    paddingHorizontal: 40,
    paddingVertical: 30,
    flex: 1,
  },
  formScroll: {
    flex: 1,
  },
  formScrollContent: {
    paddingBottom: 40,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    marginBottom: 30,
  },
  nameRow: {
    flexDirection: "row",
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  fullWidth: {
    width: "100%",
  },
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
  required: {
    color: "#ff4444",
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
  inputError: {
    borderColor: "#ff4444",
    backgroundColor: "#fff5f5",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 12,
    marginTop: 4,
  },
  radioContainer: {
    flexDirection: "row",
    gap: 12,
  },
  radioButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  radioButtonSelected: {
    borderColor: "#E7670C",
    backgroundColor: "#fff5f0",
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
  passwordRow: {
    flexDirection: "row",
    gap: 16,
  },
  locationRow: {
    flexDirection: "row",
    gap: 16,
  },
  roleContainer: {
    flexDirection: "row",
    gap: 16,
  },
  roleButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  roleButtonSelected: {
    borderColor: "#E7670C",
    backgroundColor: "#fff5f0",
  },
  roleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 4,
  },
  roleTextSelected: {
    color: "#E7670C",
  },
  roleDescription: {
    fontSize: 13,
    color: "#999",
    textAlign: "center",
  },
  termsContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  termsText: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  linkText: {
    color: "#E7670C",
    fontWeight: "600",
  },
  signUpButton: {
    backgroundColor: "#E7670C",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#E7670C80",
    opacity: 0.7,
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

// TABLET STYLES (768px - 1023px)
const tabletStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerLogo: {
    width: 36,
    height: 36,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  contentContainer: {
    flex: 1,
    height: "100%",
  },
  leftSide: {
    width: "40%",
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  girlImage: {
    width: "100%",
    height: "80%",
    borderRadius: 12,
  },
  imageOverlay: {
    marginTop: 20,
  },
  overlayTitle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  overlayText: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
  },
  rightSide: {
    width: "60%",
    paddingHorizontal: 24,
    paddingVertical: 20,
    flex: 1,
  },
  formScroll: {
    flex: 1,
  },
  formScrollContent: {
    paddingBottom: 30,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 24,
  },
  nameRow: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  fullWidth: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  required: {
    color: "#ff4444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: "#fafafa",
    color: "#333",
    width: "100%",
  },
  inputError: {
    borderColor: "#ff4444",
    backgroundColor: "#fff5f5",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 11,
    marginTop: 4,
  },
  radioContainer: {
    flexDirection: "row",
    gap: 10,
  },
  radioButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  radioButtonSelected: {
    borderColor: "#E7670C",
    backgroundColor: "#fff5f0",
  },
  radioText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  radioTextSelected: {
    color: "#E7670C",
    fontWeight: "600",
  },
  passwordRow: {
    flexDirection: "row",
    gap: 12,
  },
  locationRow: {
    flexDirection: "row",
    gap: 12,
  },
  roleContainer: {
    flexDirection: "row",
    gap: 12,
  },
  roleButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  roleButtonSelected: {
    borderColor: "#E7670C",
    backgroundColor: "#fff5f0",
  },
  roleText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666",
    marginBottom: 4,
  },
  roleTextSelected: {
    color: "#E7670C",
  },
  roleDescription: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  termsContainer: {
    marginTop: 16,
    marginBottom: 24,
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
  signUpButton: {
    backgroundColor: "#E7670C",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: "#E7670C80",
    opacity: 0.7,
  },
  signUpText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    fontSize: 13,
    color: "#666",
  },
  signInLink: {
    fontSize: 13,
    color: "#E7670C",
    fontWeight: "600",
  },
});

// MOBILE STYLES (< 768px)
const mobileStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    //flex: 1,
    height: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mobileHeader: {
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 10,
  },
  mobileLogo: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  mobileTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    lineHeight: 24,
  },
  rightSide: {
    width: "100%",
  },
  formScroll: {
    flex: 1,
  },
  formScrollContent: {
    paddingBottom: 30,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  nameColumn: {
    flexDirection: "column",
    gap: 12,
  },
  passwordColumn: {
    flexDirection: "column",
    gap: 12,
  },
  locationColumn: {
    flexDirection: "column",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  fullWidth: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  required: {
    color: "#ff4444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: "#fafafa",
    color: "#333",
    width: "100%",
  },
  inputError: {
    borderColor: "#ff4444",
    backgroundColor: "#fff5f5",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 11,
    marginTop: 4,
  },
  radioContainer: {
    flexDirection: "row",
    gap: 8,
  },
  radioButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  radioButtonSelected: {
    borderColor: "#E7670C",
    backgroundColor: "#fff5f0",
  },
  radioText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  radioTextSelected: {
    color: "#E7670C",
    fontWeight: "600",
  },
  roleContainer: {
    flexDirection: "column",
    gap: 12,
  },
  roleButton: {
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  roleButtonSelected: {
    borderColor: "#E7670C",
    backgroundColor: "#fff5f0",
  },
  roleText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666",
    marginBottom: 4,
  },
  roleTextSelected: {
    color: "#E7670C",
  },
  roleDescription: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  termsContainer: {
    marginTop: 16,
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
  signUpButton: {
    backgroundColor: "#E7670C",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: "#E7670C80",
    opacity: 0.7,
  },
  signUpText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    fontSize: 13,
    color: "#666",
  },
  signInLink: {
    fontSize: 13,
    color: "#E7670C",
    fontWeight: "600",
  },
});
