// navigation/InstructorStack.js
import { createStackNavigator } from "@react-navigation/stack";
import InsDashboard from "../screens/instructor/InsDashboard";
import IncMyCoursesScreen from "../screens/instructor/IncMyCoursesScreen";
import CreateCourseScreen from "../screens/instructor/CreateCourseScreen";
import IncMyStudentsScreen from "../screens/instructor/IncMyStudentsScreen";
import InsAssessment from "../screens/instructor/InsAssessment";
import InstructorProfileScreen from "../screens/instructor/InstructorProfileScreen";
import InsAccountSettingsScreen from "../screens/instructor/AccountSettingsScreen";


const Stack = createStackNavigator();

export default function InstructorStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InstructorDashboard" component={InsDashboard} />
      <Stack.Screen name="IncMyCoursesScreen" component={IncMyCoursesScreen} />
      <Stack.Screen name="CreateCourseScreen" component={CreateCourseScreen} />
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
  );
}
