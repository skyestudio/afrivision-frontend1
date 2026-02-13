// App.tsx
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "./App/screens/SignupScreen";
import LoginScreen from "./App/screens/LoginScreen";
import ForgotPasswordScreen from "./App/screens/student/ForgotPasswordScreen";
import DashboardScreen from "./App/screens/student/DashboardScreen";
import MyCourses from "./App/screens/student/MyCourses";
import CourseContentScreen from "./App/screens/student/CourseContentScreen";
import LessonPlayerScreen from "./App/screens/student/LessonPlayerScreen";
import QuizOverviewScreen from "./App/screens/student/QuizOverviewScreen";
import QuizAttemptScreen from "./App/screens/student/QuizAttemptScreen";
import AccountSettingsScreen from "./App/screens/student/AccountSettingsScreen";
import OnboardingScreen from "./App/screens/OnboardingScreen";
import IncMyCoursesScreen from "./App/screens/instructor/IncMyCoursesScreen";
import CreateCourseScreen from "./App/screens/instructor/CreateCourseScreen";
import IncMyStudentsScreen from "./App/screens/instructor/IncMyStudentsScreen";
import InsDashboard from "./App/screens/instructor/InsDashboard";
import InsAssessment from "./App/screens/instructor/InsAssessment";
import InstructorProfileScreen from "./App/screens/instructor/InstructorProfileScreen";
import InsAccountSettingsScreen from "./App/screens/instructor/AccountSettingsScreen";
import LoadingScreen from "./App/screens/LoadingScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />

          <Stack.Screen name="SignupScreen" component={SignupScreen} />

          <Stack.Screen
            name="InsAccountSettingsScreen"
            component={InsAccountSettingsScreen}
          />
          <Stack.Screen
            name="InstructorProfileScreen"
            component={InstructorProfileScreen}
          />
          <Stack.Screen name="InsAssessment" component={InsAssessment} />
          <Stack.Screen
            name="IncMyStudentsScreen"
            component={IncMyStudentsScreen}
          />
          <Stack.Screen
            name="CreateCourseScreen"
            component={CreateCourseScreen}
          />
          <Stack.Screen name="InsDashboard" component={InsDashboard} />
          <Stack.Screen
            name="IncMyCoursesScreen"
            component={IncMyCoursesScreen}
          />
          <Stack.Screen
            name="AccountSettingsScreen"
            component={AccountSettingsScreen}
          />
          <Stack.Screen
            name="QuizAttemptScreen"
            component={QuizAttemptScreen}
          />
          <Stack.Screen
            name="QuizOverviewScreen"
            component={QuizOverviewScreen}
          />
          <Stack.Screen
            name="LessonPlayerScreen"
            component={LessonPlayerScreen}
          />
          <Stack.Screen
            name="CourseContentScreen"
            component={CourseContentScreen}
          />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="MyCourses" component={MyCourses} />
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
