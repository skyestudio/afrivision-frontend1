// App.js
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

// Import all your screens
import SignupScreen from "./App/screens/SignupScreen";
import LoginScreen from "./App/screens/LoginScreen";
import ForgotPasswordScreen from "./App/screens/student/ForgotPasswordScreen";
import OnboardingScreen from "./App/screens/OnboardingScreen";
import LoadingScreen from "./App/screens/LoadingScreen";

// Student screens
import DashboardScreen from "./App/screens/student/DashboardScreen";
import MyCourses from "./App/screens/student/MyCourses";
import CourseContentScreen from "./App/screens/student/CourseContentScreen";
import LessonPlayerScreen from "./App/screens/student/LessonPlayerScreen";
import QuizOverviewScreen from "./App/screens/student/QuizOverviewScreen";
import QuizAttemptScreen from "./App/screens/student/QuizAttemptScreen";
import AccountSettingsScreen from "./App/screens/student/AccountSettingsScreen";

// Instructor screens
import InsDashboard from "./App/screens/instructor/InsDashboard";
import IncMyCoursesScreen from "./App/screens/instructor/IncMyCoursesScreen";
import CreateCourseScreen from "./App/screens/instructor/CreateCourseScreen";
import IncMyStudentsScreen from "./App/screens/instructor/IncMyStudentsScreen";
import InsAssessment from "./App/screens/instructor/InsAssessment";
import InstructorProfileScreen from "./App/screens/instructor/InstructorProfileScreen";
import InsAccountSettingsScreen from "./App/screens/instructor/AccountSettingsScreen";

// Navigation stacks
import StudentStack from "./App/navigation/StudentStack";
import InstructorStack from "./App/navigation/InstructorStack";

const Stack = createStackNavigator();

export default function App() {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const role = await AsyncStorage.getItem("userRole");
      const token = await AsyncStorage.getItem("userToken");

      if (token && role) {
        setUserRole(role);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // DO NOT render LoadingScreen outside NavigationContainer
  // Instead, show a simple loading indicator

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isLoading ? (
          // Show a simple loading screen without useNavigation
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <ActivityIndicator size="large" color="#E7670C" />
          </View>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {userRole ? (
              // User is logged in - show role-specific screens
              <>
                {userRole === "student" ? (
                  <Stack.Screen name="StudentStack" component={StudentStack} />
                ) : (
                  <Stack.Screen
                    name="InstructorStack"
                    component={InstructorStack}
                  />
                )}
              </>
            ) : (
              // User is not logged in - show auth screens
              <>
                <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
                <Stack.Screen
                  name="OnboardingScreen"
                  component={OnboardingScreen}
                />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="SignupScreen" component={SignupScreen} />
                <Stack.Screen
                  name="ForgotPasswordScreen"
                  component={ForgotPasswordScreen}
                />
              </>
            )}

            {/* Keep individual screens available for direct navigation */}
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
            <Stack.Screen name="MyCourses" component={MyCourses} />
            <Stack.Screen
              name="CourseContentScreen"
              component={CourseContentScreen}
            />
            <Stack.Screen
              name="LessonPlayerScreen"
              component={LessonPlayerScreen}
            />
            <Stack.Screen
              name="QuizOverviewScreen"
              component={QuizOverviewScreen}
            />
            <Stack.Screen
              name="QuizAttemptScreen"
              component={QuizAttemptScreen}
            />
            <Stack.Screen
              name="AccountSettingsScreen"
              component={AccountSettingsScreen}
            />
            <Stack.Screen name="InsDashboard" component={InsDashboard} />
            <Stack.Screen
              name="IncMyCoursesScreen"
              component={IncMyCoursesScreen}
            />
            <Stack.Screen
              name="CreateCourseScreen"
              component={CreateCourseScreen}
            />
            <Stack.Screen
              name="IncMyStudentsScreen"
              component={IncMyStudentsScreen}
            />
            <Stack.Screen name="InsAssessment" component={InsAssessment} />
            <Stack.Screen
              name="InstructorProfileScreen"
              component={InstructorProfileScreen}
            />
            <Stack.Screen
              name="InsAccountSettingsScreen"
              component={InsAccountSettingsScreen}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
