import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  useWindowDimensions,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressCircle from "../../components/ProgressCircle";
import TopNav from "../../components/TopNav";
import StudentBottomNav from "../../components/StudentBottomNav";
import { useNavigation } from "@react-navigation/native";

export default function DashboardScreen() {
  const { width } = useWindowDimensions();
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  // Choose styles based on screen size
  const styles = isMobile
    ? mobileStyles
    : isTablet
      ? tabletStyles
      : desktopStyles;

  // Stats data
  const stats = [
    { title: "Courses Completed", value: "2", change: "+20%", icon: "book" },
    { title: "Time Spent", value: "15h 20m", change: "+15%", icon: "time" },
    {
      title: "Learning Streak",
      value: "10 days",
      change: "+5%",
      icon: "flame",
    },
    {
      title: "Goal Progress",
      value: "80%",
      change: "+10%",
      icon: "trending-up",
    },
  ];

  // Active courses data
  const activeCourses = [
    {
      title: "UI/UX Design Fundamentals",
      instructor: "Amina Yusuf",
      progress: 40,
      image: require("../../assets/course.png"),
    },
    {
      title: "Advanced Excel",
      instructor: "Amina Yusuf",
      progress: 60,
      image: require("../../assets/course.png"),
    },
    {
      title: "Web Development React",
      instructor: "John Adewale",
      progress: 20,
      image: require("../../assets/course.png"),
    },
    {
      title: "Responsive Web Design",
      instructor: "Dr. Leila Habte",
      progress: 80,
      image: require("../../assets/course.png"),
    },
  ];

  // Completed courses data
  const completedCourses = [
    {
      title: "UI/UX Design Beginners",
      instructor: "Sara Kifle",
      image: require("../../assets/course.png"),
    },
    {
      title: "Basic Python",
      instructor: "Michael Desta",
      image: require("../../assets/course.png"),
    },
  ];

  // Upcoming tasks data
  const upcomingTasks = [
    {
      title: "Take Quiz: Design Principles",
      course: "UI/UX Design Fundamentals",
      due: "Today",
      type: "quiz",
    },
    {
      title: "Submit Final Project",
      course: "Web Development Bootcamp",
      due: "Jun 20, 2025",
      type: "project",
    },
    {
      title: "Watch Lesson: Prompt Templates",
      course: "Prompt Engineering",
      due: "Tomorrow",
      type: "lesson",
    },
    {
      title: "Complete Lesson 5",
      course: "Advanced UI Design",
      due: "Jun 22, 2025",
      type: "lesson",
    },
  ];

  // Recommended courses data
  const recommendedCourses = [
    {
      title: "UI/UX Design Fund",
      instructor: "Amina Yusuf",
      rating: 4.8,
      duration: "5h 30m",
      level: "Beginner",
      image: require("../../assets/course.png"),
    },
    {
      title: "Build AI Chatbots Python",
      instructor: "Sarah Thompson",
      rating: 4.6,
      duration: "8h 10m",
      level: "Intermediate",
      image: require("../../assets/course.png"),
    },
    {
      title: "Responsive Web Design",
      instructor: "Dr. Leila Habte",
      rating: 4.7,
      duration: "3h 45m",
      level: "Beginner",
      image: require("../../assets/course.png"),
    },
    {
      title: "Data Science Course",
      instructor: "Daniel Assefa",
      rating: 4.9,
      duration: "10h 20m",
      level: "Intermediate",
      image: require("../../assets/course.png"),
    },
  ];

  // Get responsive card widths
  const getStatCardWidth = () => {
    if (isMobile) return 160;
    if (isTablet) return "23%";
    return "23%";
  };

  const getCourseCardWidth = () => {
    if (isMobile) return 240;
    if (isTablet) return 260;
    return 280;
  };

  const getRecommendedCardWidth = () => {
    if (isMobile) return 220;
    if (isTablet) return 240;
    return 260;
  };

  // Get button text based on task type
  const getTaskButton = (task) => {
    switch (task.type) {
      case "quiz":
        return { text: "Take Quiz", color: "#FF6B6B" };
      case "project":
        return { text: "Upload", color: "#4CAF50" };
      case "lesson":
        return { text: "Watch Now", color: "#2196F3" };
      default:
        return { text: "Start", color: "#ff7a00" };
    }
  };

  // Progress Bar component
  const ProgressBar = ({ progress }) => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressText}>{progress}% Complete</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {!isMobile && <TopNav activeNav={"Dashboard"} />}
      <View style={!isMobile && styles.spacer} />

      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome & Progress Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeCard}>
            <View style={styles.welcomeContent}>
              <Text style={styles.welcomeTitle}>Welcome back, John! 👋</Text>
              <Text style={styles.welcomeSubtitle}>
                You've completed 3 out of 5 courses this month
              </Text>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => navigation.navigate("LessonPlayerScreen")}
              >
                <Text style={styles.continueButtonText}>Continue Learning</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.progressCircleContainer}>
              <ProgressCircle percentage={75} size={isMobile ? 100 : 120} />
              <Text style={styles.progressLabel}>Overall Progress</Text>
            </View>
          </View>
        </View>

        {/* Stats Grid - Responsive */}
        <ScrollView
          horizontal={isMobile}
          showsHorizontalScrollIndicator={false}
          style={styles.statsScrollContainer}
          contentContainerStyle={styles.statsScrollContent}
        >
          <View style={styles.statsRow}>
            {stats.map((stat, index) => (
              <View
                key={index}
                style={[
                  styles.statCard,
                  { width: getStatCardWidth() },
                  isMobile && { marginRight: 12 },
                  isMobile && index === stats.length - 1 && { marginRight: 0 },
                ]}
              >
                <View style={styles.statIconContainer}>
                  <Ionicons name={stat.icon} size={20} color="#ff7a00" />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
                <Text style={styles.statChange}>{stat.change}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Active Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>My Active Courses</Text>
              <Text style={styles.sectionSubtitle}>
                Continue where you left off
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeMoreLink}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {activeCourses.map((course, index) => (
              <View
                key={index}
                style={[
                  styles.courseCard,
                  { width: getCourseCardWidth() },
                  isMobile && { marginRight: 12 },
                ]}
              >
                <Image
                  source={course.image}
                  style={styles.courseImage}
                  resizeMode="cover"
                />
                <View style={styles.courseContent}>
                  <Text style={styles.courseTitle} numberOfLines={1}>
                    {course.title}
                  </Text>
                  <Text style={styles.courseInstructor}>
                    {course.instructor}
                  </Text>
                  <ProgressBar progress={course.progress} />
                  <TouchableOpacity
                    style={styles.continueCourseBtn}
                    onPress={() => navigation.navigate("LessonPlayerScreen")}
                  >
                    <Text style={styles.continueCourseText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
              <Text style={styles.sectionSubtitle}>
                Stay on track with your schedule
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeMoreLink}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tasksGrid}>
            {upcomingTasks.map((task, index) => {
              const button = getTaskButton(task);
              return (
                <View key={index} style={styles.taskCard}>
                  <View style={styles.taskContent}>
                    <View style={styles.taskHeader}>
                      <View
                        style={[
                          styles.taskDot,
                          { backgroundColor: button.color },
                        ]}
                      />
                      <Text style={styles.taskTitle} numberOfLines={1}>
                        {task.title}
                      </Text>
                    </View>
                    <Text style={styles.taskCourse}>{task.course}</Text>
                    <Text style={styles.taskDue}>Due: {task.due}</Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.taskButton,
                      { backgroundColor: button.color },
                    ]}
                  >
                    <Text style={styles.taskButtonText}>{button.text}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        {/* Completed Courses */}
        {!isMobile && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Recently Completed</Text>
                <Text style={styles.sectionSubtitle}>
                  Great job! You've finished these courses
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeMoreLink}>View All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
              contentContainerStyle={styles.horizontalScrollContent}
            >
              {completedCourses.map((course, index) => (
                <View
                  key={index}
                  style={[
                    styles.completedCard,
                    { width: getCourseCardWidth() - 40 },
                    isMobile && { marginRight: 12 },
                  ]}
                >
                  <Image
                    source={course.image}
                    style={styles.completedImage}
                    resizeMode="cover"
                  />
                  <View style={styles.completedContent}>
                    <Text style={styles.completedTitle} numberOfLines={1}>
                      {course.title}
                    </Text>
                    <Text style={styles.completedInstructor}>
                      {course.instructor}
                    </Text>
                    <TouchableOpacity style={styles.certificateBtn}>
                      <Text style={styles.certificateText}>
                        View Certificate
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Recommended Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Recommended For You</Text>
              <Text style={styles.sectionSubtitle}>
                Based on your learning interests
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeMoreLink}>Explore</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {recommendedCourses.map((course, index) => (
              <View
                key={index}
                style={[
                  styles.recommendedCard,
                  { width: getRecommendedCardWidth() },
                  isMobile && { marginRight: 12 },
                ]}
              >
                <Image
                  source={course.image}
                  style={styles.recommendedImage}
                  resizeMode="cover"
                />
                <View style={styles.recommendedContent}>
                  <Text style={styles.recommendedTitle} numberOfLines={1}>
                    {course.title}
                  </Text>
                  <Text style={styles.recommendedInstructor}>
                    {course.instructor}
                  </Text>
                  <View style={styles.courseMeta}>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={12} color="#FFB800" />
                      <Text style={styles.ratingText}>{course.rating}</Text>
                    </View>
                    <Text style={styles.courseDuration}>{course.duration}</Text>
                  </View>
                  <View style={styles.levelContainer}>
                    <Text
                      style={[
                        styles.levelBadge,
                        course.level === "Beginner"
                          ? styles.beginnerLevel
                          : styles.intermediateLevel,
                      ]}
                    >
                      {course.level}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {isMobile && <StudentBottomNav />}
    </SafeAreaView>
  );
}

// DESKTOP STYLES (≥ 1024px)
const desktopStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  spacer: {
    height: 70,
  },
  scrollContent: {
    paddingHorizontal: 32,
    paddingBottom: 40,
    height: 1,
  },
  welcomeSection: {
    marginBottom: 32,
  },
  welcomeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8FAFF",
    borderRadius: 24,
    padding: 32,
  },
  welcomeContent: {
    flex: 1,
    marginRight: 32,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff7a00",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  progressCircleContainer: {
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 12,
  },
  statsScrollContainer: {
    marginBottom: 32,
  },
  statsScrollContent: {
    paddingVertical: 4,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F7FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  statChange: {
    fontSize: 12,
    color: "#ff7a00",
    fontWeight: "600",
  },
  section: {
    marginBottom: 48,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  seeMoreLink: {
    fontSize: 14,
    color: "#ff7a00",
    fontWeight: "600",
  },
  horizontalScroll: {
    marginHorizontal: -32,
  },
  horizontalScrollContent: {
    paddingHorizontal: 32,
    paddingBottom: 8,
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  courseImage: {
    width: "100%",
    height: 140,
    backgroundColor: "#f5f5f5",
  },
  courseContent: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 13,
    color: "#666",
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBackground: {
    height: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    marginBottom: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#087B2E",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: "#666",
  },
  continueCourseBtn: {
    backgroundColor: "#ff7a00",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  continueCourseText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  tasksGrid: {
    flexDirection: "column",
  },
  taskCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  taskContent: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  taskDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  taskCourse: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  taskDue: {
    fontSize: 12,
    color: "#999",
  },
  taskButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 16,
  },
  taskButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  completedCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    overflow: "hidden",
  },
  completedImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#f5f5f5",
  },
  completedContent: {
    padding: 16,
  },
  completedTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  completedInstructor: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
  },
  certificateBtn: {
    backgroundColor: "#ff7a00",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  certificateText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  recommendedCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    overflow: "hidden",
  },
  recommendedImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#f5f5f5",
  },
  recommendedContent: {
    padding: 16,
  },
  recommendedTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  recommendedInstructor: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },
  courseMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  ratingText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  courseDuration: {
    fontSize: 12,
    color: "#666",
  },
  levelContainer: {
    flexDirection: "row",
  },
  levelBadge: {
    fontSize: 11,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  beginnerLevel: {
    backgroundColor: "#E8F5E9",
    color: "#4CAF50",
  },
  intermediateLevel: {
    backgroundColor: "#E3F2FD",
    color: "#2196F3",
  },
  bottomSpacer: {
    height: 40,
  },
});

// TABLET STYLES (768px - 1023px)
const tabletStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  spacer: {
    height: 70,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    height: 1,
  },
  welcomeSection: {
    marginBottom: 28,
  },
  welcomeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8FAFF",
    borderRadius: 20,
    padding: 24,
  },
  welcomeContent: {
    flex: 1,
    marginRight: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 20,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff7a00",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginRight: 6,
  },
  progressCircleContainer: {
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 13,
    color: "#666",
    marginTop: 10,
  },
  statsScrollContainer: {
    marginBottom: 28,
  },
  statsScrollContent: {
    paddingVertical: 4,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F7FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },
  statChange: {
    fontSize: 11,
    color: "#ff7a00",
    fontWeight: "600",
  },
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#000",
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  seeMoreLink: {
    fontSize: 13,
    color: "#ff7a00",
    fontWeight: "600",
  },
  horizontalScroll: {
    marginHorizontal: -24,
  },
  horizontalScrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    overflow: "hidden",
  },
  courseImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#f5f5f5",
  },
  courseContent: {
    padding: 14,
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  progressContainer: {
    marginBottom: 14,
  },
  progressBackground: {
    height: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 2.5,
    marginBottom: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#087B2E",
    borderRadius: 2.5,
  },
  progressText: {
    fontSize: 10,
    color: "#666",
  },
  continueCourseBtn: {
    backgroundColor: "#ff7a00",
    paddingVertical: 11,
    borderRadius: 7,
    alignItems: "center",
  },
  continueCourseText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  tasksGrid: {
    flexDirection: "column",
  },
  taskCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  taskContent: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  taskDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  taskCourse: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  taskDue: {
    fontSize: 11,
    color: "#999",
  },
  taskButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 12,
  },
  taskButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  completedCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    overflow: "hidden",
  },
  completedImage: {
    width: "100%",
    height: 100,
    backgroundColor: "#f5f5f5",
  },
  completedContent: {
    padding: 14,
  },
  completedTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  completedInstructor: {
    fontSize: 11,
    color: "#666",
    marginBottom: 10,
  },
  certificateBtn: {
    backgroundColor: "#ff7a00",
    paddingVertical: 9,
    borderRadius: 6,
    alignItems: "center",
  },
  certificateText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  recommendedCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    overflow: "hidden",
  },
  recommendedImage: {
    width: "100%",
    height: 100,
    backgroundColor: "#f5f5f5",
  },
  recommendedContent: {
    padding: 14,
  },
  recommendedTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  recommendedInstructor: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
  },
  courseMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  ratingText: {
    fontSize: 11,
    color: "#666",
    marginLeft: 3,
  },
  courseDuration: {
    fontSize: 11,
    color: "#666",
  },
  levelContainer: {
    flexDirection: "row",
  },
  levelBadge: {
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  beginnerLevel: {
    backgroundColor: "#E8F5E9",
    color: "#4CAF50",
  },
  intermediateLevel: {
    backgroundColor: "#E3F2FD",
    color: "#2196F3",
  },
  bottomSpacer: {
    height: 40,
  },
});

// MOBILE STYLES (< 768px)
const mobileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 16,
    height: 1,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeCard: {
    flexDirection: "column",
    backgroundColor: "#F8FAFF",
    borderRadius: 16,
    padding: 20,
  },
  welcomeContent: {
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff7a00",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 6,
  },
  progressCircleContainer: {
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
  },
  statsScrollContainer: {
    marginBottom: 24,
  },
  statsScrollContent: {
    paddingVertical: 4,
    paddingRight: 16,
  },
  statsRow: {
    flexDirection: "row",
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F0F7FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
  },
  statChange: {
    fontSize: 10,
    color: "#ff7a00",
    fontWeight: "600",
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  seeMoreLink: {
    fontSize: 12,
    color: "#ff7a00",
    fontWeight: "600",
  },
  horizontalScroll: {
    marginHorizontal: -16,
  },
  horizontalScrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  courseImage: {
    width: "100%",
    height: 100,
    backgroundColor: "#f5f5f5",
  },
  courseContent: {
    padding: 12,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 11,
    color: "#666",
    marginBottom: 8,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBackground: {
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    marginBottom: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#087B2E",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    color: "#666",
  },
  continueCourseBtn: {
    backgroundColor: "#ff7a00",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  continueCourseText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  tasksGrid: {
    flexDirection: "column",
  },
  taskCard: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  taskContent: {
    width: "100%",
    marginBottom: 12,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  taskDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  taskTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
    flex: 1,
  },
  taskCourse: {
    fontSize: 11,
    color: "#666",
    marginBottom: 4,
  },
  taskDue: {
    fontSize: 10,
    color: "#999",
  },
  taskButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  taskButtonText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  recommendedCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    overflow: "hidden",
  },
  recommendedImage: {
    width: "100%",
    height: 100,
    backgroundColor: "#f5f5f5",
  },
  recommendedContent: {
    padding: 12,
  },
  recommendedTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  recommendedInstructor: {
    fontSize: 11,
    color: "#666",
    marginBottom: 6,
  },
  courseMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  ratingText: {
    fontSize: 10,
    color: "#666",
    marginLeft: 3,
  },
  courseDuration: {
    fontSize: 10,
    color: "#666",
  },
  levelContainer: {
    flexDirection: "row",
  },
  levelBadge: {
    fontSize: 9,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  beginnerLevel: {
    backgroundColor: "#E8F5E9",
    color: "#4CAF50",
  },
  intermediateLevel: {
    backgroundColor: "#E3F2FD",
    color: "#2196F3",
  },
  bottomSpacer: {
    height: 80,
  },
});
