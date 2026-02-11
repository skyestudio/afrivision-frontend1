// navigation/StudentStack.js
import { createStackNavigator } from "@react-navigation/stack";
import DashboardScreen from "../screens/student/DashboardScreen";
import MyCourses from "../screens/student/MyCourses";
import CourseContentScreen from "../screens/student/CourseContentScreen";
import LessonPlayerScreen from "../screens/student/LessonPlayerScreen";
import QuizOverviewScreen from "../screens/student/QuizOverviewScreen";
import QuizAttemptScreen from "../screens/student/QuizAttemptScreen";
import AccountSettingsScreen from "../screens/student/AccountSettingsScreen";


const Stack = createStackNavigator();

export default function StudentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StudentDashboard" component={DashboardScreen} />
      <Stack.Screen name="MyCourses" component={MyCourses} />
      <Stack.Screen
        name="CourseContentScreen"
        component={CourseContentScreen}
      />
      <Stack.Screen name="LessonPlayerScreen" component={LessonPlayerScreen} />
      <Stack.Screen name="QuizOverviewScreen" component={QuizOverviewScreen} />
      <Stack.Screen name="QuizAttemptScreen" component={QuizAttemptScreen} />
      <Stack.Screen
        name="AccountSettingsScreen"
        component={AccountSettingsScreen}
      />
    </Stack.Navigator>
  );
}
