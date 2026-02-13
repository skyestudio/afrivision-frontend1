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
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
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
    email: "user@example.com",
    password: "string",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    loadRememberedEmail();
  }, []);

  const loadRememberedEmail = async () => {
    try {
      const rememberedEmail = await AsyncStorage.getItem("rememberMeEmail");
      if (rememberedEmail) {
        setFormData((prev) => ({ ...prev, email: rememberedEmail }));
        setRememberMe(true);
      }
    } catch (error) {
      console.error("Error loading remembered email:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fill in all fields correctly");
      return;
    }

    setLoading(true);
    try {
      // 1. Login to get token
      const loginResponse = await fetch(
        "https://afrivision-backend.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.message || "Invalid credentials");
      }

      // Assuming the API returns a token
      const token = loginData.token || loginData.accessToken;

      if (!token) {
        throw new Error("No authentication token received");
      }

      // Store token
      await AsyncStorage.setItem("userToken", token);

      // 2. Fetch user profile to get role
      const profileResponse = await fetch(
        "https://afrivision-backend.onrender.com/api/v1/users/me",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const profileData = await profileResponse.json();

      if (!profileResponse.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const userRole = profileData.profile?.role || "student"; // Default to student
      const userData = profileData.profile;

      // Store user data
      await AsyncStorage.setItem("userRole", userRole);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      // Store remember me preference
      if (rememberMe) {
        await AsyncStorage.setItem("rememberMeEmail", formData.email);
      } else {
        await AsyncStorage.removeItem("rememberMeEmail");
      }

      // 3. Navigate based on role
      if (userRole === "student") {
        navigation.navigate("StudentStack");
      } else if (userRole === "instructor" || userRole === "staff") {
        navigation.navigate("InstructorStack");
      } else {
        navigation.navigate("StudentStack"); // Default to student
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Failed", error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPasswordScreen");
  };

  const handleSignUp = () => {
    navigation.navigate("SignupScreen");
  };

  const handleMockLogin = () => {
    // Mock login for testing
    AsyncStorage.setItem("userToken", "mock-token");
    AsyncStorage.setItem("userRole", "student");
    navigation.navigate("StudentStack");
  };

  // Get responsive layout
  const getLayout = () => {
    if (isMobile) {
      return {
        flexDirection: "column",
        imageWidth: "100%",
        formWidth: "100%",
      };
    }
    return {
      flexDirection: "row",
      imageWidth: "50%",
      formWidth: "50%",
    };
  };

  const layout = getLayout();

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        {isMobile ? (
          // Mobile Layout
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Mobile Header */}
            <View style={styles.mobileHeader}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.mobileLogo}
              />
              <Text style={styles.mobileTitle}>Welcome Back!</Text>
              <Text style={styles.mobileSubtitle}>We're Happy to See You</Text>
              <Text style={styles.tagline}>Let's Continue</Text>
            </View>

            {/* Mobile Image */}
            <View style={styles.mobileImageContainer}>
              <Image
                source={require("../assets/girl.png")}
                style={styles.mobileImage}
                resizeMode="cover"
              />
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Email{" "}
                  {!formData.email && <Text style={styles.required}>*</Text>}
                </Text>
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="Please enter your email address"
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

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Password{" "}
                  {!formData.password && <Text style={styles.required}>*</Text>}
                </Text>
                <TextInput
                  style={[styles.input, errors.password && styles.inputError]}
                  placeholder="Please enter your password"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={(text) => handleInputChange("password", text)}
                  editable={!loading}
                />
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {/* Remember Me & Forgot Password */}
              <View style={styles.optionsRow}>
                <TouchableOpacity
                  style={styles.rememberMeContainer}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      rememberMe && styles.checkboxChecked,
                    ]}
                  >
                    {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.rememberMeText}>Remember me</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleForgotPassword}
                  disabled={loading}
                >
                  <Text style={styles.forgotText}>Forgot Account?</Text>
                </TouchableOpacity>
              </View>

              {/* Sign In Button */}
              <TouchableOpacity
                style={[styles.signInButton, loading && styles.disabledButton]}
                onPress={handleSignIn}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.signInText}>Sign in</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.signInButton, loading && styles.disabledButton]}
                onPress={() => navigation.navigate("DashboardScreen")}
                // disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.signInText}>Sign in as student</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.signInButton, loading && styles.disabledButton]}
                onPress={() => navigation.navigate("InsDashboard")}
                // disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.signInText}>Sign in as instructor</Text>
                )}
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't Have Account? </Text>
                <TouchableOpacity onPress={handleSignUp} disabled={loading}>
                  <Text style={styles.signUpLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        ) : (
          // Desktop/Tablet Layout
          <View
            style={[
              styles.container,
              { flexDirection: isMobile ? "column" : "row" },
            ]}
          >
            {/* Left Side - Image */}
            <View
              style={[styles.leftSide, { width: isMobile ? "100%" : "50%" }]}
            >
              <Image
                source={require("../assets/girl.png")}
                style={styles.girlImage}
                resizeMode="cover"
              />
            </View>

            {/* Right Side - Form */}
            <View
              style={[styles.rightSide, { width: isMobile ? "100%" : "50%" }]}
            >
              <ScrollView
                style={styles.formScroll}
                contentContainerStyle={styles.formScrollContent}
                showsVerticalScrollIndicator={false}
              >
                {/* Logo */}
                <View style={styles.logoContainer}>
                  <Image
                    source={require("../assets/logo.png")}
                    style={styles.logoImage}
                  />
                  <Text style={styles.logoText}>Welcome Back!</Text>
                  <View style={styles.subLogoWrapper}>
                    <View style={styles.line} />
                    <Text style={styles.subLogoText}>
                      We're Happy to See You
                    </Text>
                  </View>
                  <Text style={styles.tagline}>Let's Continue</Text>
                </View>

                {/* Form */}
                <View style={styles.formWrapper}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                      Email{" "}
                      {!formData.email && (
                        <Text style={styles.required}>*</Text>
                      )}
                    </Text>
                    <TextInput
                      style={[styles.input, errors.email && styles.inputError]}
                      placeholder="Please enter your email address"
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

                  <View style={styles.inputGroup}>
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
                      placeholder="Please enter your password"
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

                  {/* Options Row */}
                  <View style={styles.optionsRow}>
                    <TouchableOpacity
                      style={styles.rememberMeContainer}
                      onPress={() => setRememberMe(!rememberMe)}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          rememberMe && styles.checkboxChecked,
                        ]}
                      >
                        {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                      </View>
                      <Text style={styles.rememberMeText}>Remember me</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleForgotPassword}
                      disabled={loading}
                    >
                      <Text style={styles.forgotText}>Forgot Account?</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.signInButton,
                      loading && styles.disabledButton,
                    ]}
                    onPress={handleSignIn}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.signInText}>Sign in</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.signInButton]}
                    onPress={() => {
                      navigation.navigate("StudentStack");
                    }}
                  >
                    <Text style={styles.signInText}>Sign in</Text>
                  </TouchableOpacity>

                  {/* Sign Up */}
                  <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Don't Have Account? </Text>
                    <TouchableOpacity onPress={handleSignUp} disabled={loading}>
                      <Text style={styles.signUpLink}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

// DESKTOP STYLES (≥ 1024px)
const desktopStyles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#fff" },
  safeArea: { flex: 1 },
  container: { flex: 1 },
  leftSide: {
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    position: "relative",
  },
  girlImage: {
    width: "100%",
    height: "80%",
    borderRadius: 16,
    maxWidth: 600,
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
    paddingHorizontal: 40,
    paddingVertical: 30,
    justifyContent: "center",
  },
  formScroll: { flex: 1 },
  formScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
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
    color: "#351414ff",
    fontWeight: "600",
    marginTop: 12,
  },
  formWrapper: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
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
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    borderColor: "#E7670C",
    backgroundColor: "#E7670C",
  },
  checkmark: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  rememberMeText: {
    fontSize: 14,
    color: "#666",
  },
  forgotText: {
    fontSize: 14,
    color: "#E7670C",
    fontWeight: "500",
  },
  signInButton: {
    backgroundColor: "#E7670C",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: "#E7670C80",
    opacity: 0.7,
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
    marginTop: 20,
  },
  signUpText: {
    fontSize: 14,
    color: "#666",
  },
  signUpLink: {
    fontSize: 14,
    color: "#E7670C",
    fontWeight: "600",
    marginLeft: 4,
  },
});

// TABLET STYLES (768px - 1023px)
const tabletStyles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#fff" },
  safeArea: { flex: 1 },
  container: { flex: 1 },
  leftSide: {
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  girlImage: {
    width: "100%",
    height: "70%",
    borderRadius: 12,
    maxWidth: 400,
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
    paddingHorizontal: 30,
    paddingVertical: 20,
    justifyContent: "center",
  },
  formScroll: { flex: 1 },
  formScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoImage: {
    width: 70,
    height: 70,
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
    marginTop: 8,
    width: 220,
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
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  tagline: {
    fontSize: 16,
    color: "#351414ff",
    fontWeight: "600",
    marginTop: 10,
  },
  formWrapper: {
    width: "100%",
    maxWidth: 350,
    alignSelf: "center",
  },
  inputGroup: {
    marginBottom: 20,
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
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    borderColor: "#E7670C",
    backgroundColor: "#E7670C",
  },
  checkmark: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  rememberMeText: {
    fontSize: 13,
    color: "#666",
  },
  forgotText: {
    fontSize: 13,
    color: "#E7670C",
    fontWeight: "500",
  },
  signInButton: {
    backgroundColor: "#E7670C",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  disabledButton: {
    backgroundColor: "#E7670C80",
    opacity: 0.7,
  },
  signInText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  signUpText: {
    fontSize: 13,
    color: "#666",
  },
  signUpLink: {
    fontSize: 13,
    color: "#E7670C",
    fontWeight: "600",
    marginLeft: 4,
  },
});

// MOBILE STYLES (< 768px)
const mobileStyles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#fff" },
  safeArea: { flex: 1 },
  scrollView: {
    // flex: 1,
    height: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  mobileHeader: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  mobileLogo: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  mobileTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginBottom: 4,
  },
  mobileSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: "#351414ff",
    fontWeight: "600",
    textAlign: "center",
  },
  mobileImageContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  mobileImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
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
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    borderColor: "#E7670C",
    backgroundColor: "#E7670C",
  },
  checkmark: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  rememberMeText: {
    fontSize: 13,
    color: "#666",
  },
  forgotText: {
    fontSize: 13,
    color: "#E7670C",
    fontWeight: "500",
  },
  signInButton: {
    backgroundColor: "#E7670C",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#E7670C80",
    opacity: 0.7,
  },
  signInText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  signUpText: {
    fontSize: 13,
    color: "#666",
  },
  signUpLink: {
    fontSize: 13,
    color: "#E7670C",
    fontWeight: "600",
    marginLeft: 4,
  },
  socialLoginContainer: {
    alignItems: "center",
  },
  socialLoginText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 12,
  },
  socialButtons: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  socialButtonText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },
});
