// App.tsx
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "./App/screens/SignupScreen";
import LoginScreen from "./App/screens/LoginScreen";
import ForgotPasswordScreen from "./App/screens/ForgotPasswordScreen";
import OnboardingScreen from "./App/screens/OnboardingScreen";
import DashboardScreen from "./App/screens/DashboardScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />

          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />

          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />

          <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
