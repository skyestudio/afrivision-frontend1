import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressCircle from "../components/ProgressCircle";

const { width } = Dimensions.get("window");

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Home");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Stats data
  const stats = [
    {
      title: "Courses Completed",
      value: "2",
      change: "% Increase",
      icon: "book",
    },
    {
      title: "Time Spent Learning",
      value: "15h 20m",
      change: "% Increase",
      icon: "time",
    },
    {
      title: "Learning Streak",
      value: "10 days",
      change: "% Increase",
      icon: "flame",
    },
    {
      title: "Goal Progress",
      value: "80%",
      change: "% Increase",
      icon: "trending-up",
    },
  ];

  // Active courses data
  const activeCourses = [
    {
      title: "UI/UX Design Fund",
      instructor: "Amina Yusuf",
      progress: 40,
      icon: "palette",
    },
    {
      title: "Advanced Excel",
      instructor: "Amina Yusuf",
      progress: 60,
      icon: "table",
    },
    {
      title: "Web Development React",
      instructor: "John Adewale",
      progress: 20,
      icon: "code",
    },
    {
      title: "Responsive Web Design",
      instructor: "Dr. Leila Habte",
      progress: 80,
      icon: "web",
    },
  ];

  // Completed courses data
  const completedCourses = [
    { title: "UI/UX Design Beginners", instructor: "Sara Kifle" },
    { title: "Basic Python", instructor: "Michael Desta" },
  ];

  // Upcoming tasks data
  const upcomingTasks = [
    {
      title: "Take Quiz: Design Principles Quiz #2",
      course: "UI/UX Design Fundamentals",
      due: "Due: Today",
    },
    {
      title: "Submit Final Project: Personal Portfolio Website",
      course: "Web Development Bootcamp",
      due: "Due: June 20, 2025",
    },
    {
      title: "Watch Lesson: Building Prompt Templates",
      course: "Prompt Engineering Basics",
      due: "Due: Tomorrow, June 21",
    },
    {
      title: "Complete Lesson 5: UI Animation Principles",
      course: "Advanced UI Design",
      due: "Due: June 22, 2025",
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
    },
    {
      title: "Build AI Chatbots Python",
      instructor: "Sarah Thompson",
      rating: 4.6,
      duration: "8h 10m",
      level: "Intermediate",
    },
    {
      title: "Responsive Web Design",
      instructor: "Dr. Leila Habte",
      rating: 4.7,
      duration: "3h 45m",
      level: "Beginner",
    },
    {
      title: "Data Science Course",
      instructor: "Daniel Assefa",
      rating: 4.9,
      duration: "10h 20m",
      level: "Intermediate",
    },
  ];

  // Profile dropdown items
  const profileDropdownItems = [
    { id: 1, label: "My Profile", icon: "person" },
    { id: 2, label: "Settings", icon: "settings" },
    { id: 3, label: "Billing", icon: "card" },
    { id: 4, label: "Help Center", icon: "help-circle" },
    { id: 5, label: "Logout", icon: "log-out" },
  ];

  // Progress bar component
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

      {/* Top Header with Logo, Search, Notification and Profile */}
      <View style={styles.topHeader}>
        {/* Logo */}
        <Image
          source={require("../assets/logo.png")} // Update with your logo path
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="What do you want to learn"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Navigation Tabs */}
        <View style={styles.navContainer}>
          <TouchableOpacity
            style={[
              styles.navItem,
              activeNav === "Home" && styles.activeNavItem,
            ]}
            onPress={() => setActiveNav("Home")}>
            <Text
              style={[
                styles.navText,
                activeNav === "Home" && styles.activeNavText,
              ]}>
              Home
            </Text>
            {activeNav === "Home" && <View style={styles.navIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navItem,
              activeNav === "Dashboard" && styles.activeNavItem,
            ]}
            onPress={() => setActiveNav("Dashboard")}>
            <Text
              style={[
                styles.navText,
                activeNav === "Dashboard" && styles.activeNavText,
              ]}>
              Dashboard
            </Text>
            {activeNav === "Dashboard" && <View style={styles.navIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navItem,
              activeNav === "My Courses" && styles.activeNavItem,
            ]}
            onPress={() => setActiveNav("My Courses")}>
            <Text
              style={[
                styles.navText,
                activeNav === "My Courses" && styles.activeNavText,
              ]}>
              My Courses
            </Text>
            {activeNav === "My Courses" && <View style={styles.navIndicator} />}
          </TouchableOpacity>
        </View>

        {/* Notification and Profile */}
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileContainer}
            onPress={() => setShowProfileDropdown(!showProfileDropdown)}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitial}>J</Text>
            </View>
            <Ionicons
              name={showProfileDropdown ? "chevron-up" : "chevron-down"}
              size={16}
              color="#666"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Dropdown Modal */}
      <Modal
        visible={showProfileDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowProfileDropdown(false)}>
        <TouchableOpacity
          style={styles.dropdownOverlay}
          activeOpacity={1}
          onPress={() => setShowProfileDropdown(false)}>
          <View style={styles.dropdownContainer}>
            {profileDropdownItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.dropdownItem}
                onPress={() => {
                  setShowProfileDropdown(false);
                  console.log(`${item.label} clicked`);
                }}>
                <Ionicons name={item.icon} size={20} color="#666" />
                <Text style={styles.dropdownText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Dashboard Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressCard}>
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeTitle}>Welcome , John!</Text>
              <Text style={styles.progressDescription}>
                You've completed 3 out of 5 courses this month. Keep it up!
              </Text>
              <View style={styles.nextButtnView}>
                <TouchableOpacity style={styles.nextButton}>
                  <Text style={styles.nextButtonText}>
                    Continue Last Course
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <ProgressCircle percentage={75} size={150} />
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statTitle}>{stat.title}</Text>

              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statChange}>{stat.change}</Text>
            </View>
          ))}
        </View>

        {/* Active Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Active Courses</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Here's what you're currently learning
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}>
            {activeCourses.map((course, index) => (
              <View key={index} style={styles.courseCard}>
                <View style={styles.courseHeader}>
                  <View style={styles.courseIcon}>
                    <Ionicons name={course.icon} size={24} color="#4A6FFF" />
                  </View>
                  <Text style={styles.courseTitle} numberOfLines={2}>
                    {course.title}
                  </Text>
                </View>
                <Text style={styles.courseInstructor}>{course.instructor}</Text>
                <ProgressCircle percentage={75} size={11} />
                <TouchableOpacity style={styles.continueCourseBtn}>
                  <Text style={styles.continueCourseText}>Continue</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity>
            <Text style={styles.seeMoreLink}>See more</Text>
          </TouchableOpacity>
        </View>

        {/* Completed Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Completed Courses</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreLink}>See more</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionSubtitle}>
            You've finished these. Great job!
          </Text>

          <View style={styles.completedList}>
            {completedCourses.map((course, index) => (
              <View key={index} style={styles.completedCard}>
                <View style={styles.completedCourseInfo}>
                  <View style={styles.completedIcon}>
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="#4CAF50"
                    />
                  </View>
                  <View>
                    <Text style={styles.completedTitle}>{course.title}</Text>
                    <Text style={styles.completedInstructor}>
                      {course.instructor}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.certificateBtn}>
                  <Text style={styles.certificateText}>View Certificate</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Upcoming Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Tasks / Deadlines</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreLink}>See more</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionSubtitle}>
            Stay on track with your learning schedule
          </Text>

          <View style={styles.tasksList}>
            {upcomingTasks.map((task, index) => (
              <View key={index} style={styles.taskCard}>
                <View style={styles.taskInfo}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskCourse}>{task.course}</Text>
                  <Text style={styles.taskDue}>{task.due}</Text>
                </View>
                {index === 0 && (
                  <TouchableOpacity style={styles.quizBtn}>
                    <Text style={styles.quizText}>Take Quiz Now</Text>
                  </TouchableOpacity>
                )}
                {index === 1 && (
                  <TouchableOpacity style={styles.uploadBtn}>
                    <Text style={styles.uploadText}>Upload Project</Text>
                  </TouchableOpacity>
                )}
                {index === 2 && (
                  <TouchableOpacity style={styles.watchBtn}>
                    <Text style={styles.watchText}>Watch Now</Text>
                  </TouchableOpacity>
                )}
                {index === 3 && (
                  <TouchableOpacity style={styles.resumeBtn}>
                    <Text style={styles.resumeText}>Resume Lesson</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Recommended Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended Courses</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreLink}>See more</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionSubtitle}>
            Courses handpicked for you, John
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}>
            {recommendedCourses.map((course, index) => (
              <View key={index} style={styles.recommendedCard}>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color="#FFD700" />
                  <Text style={styles.ratingText}>{course.rating}</Text>
                </View>
                <View style={styles.courseInfo}>
                  <Text style={styles.recommendedInstructor}>
                    {course.instructor}
                  </Text>
                  <Text style={styles.recommendedTitle} numberOfLines={2}>
                    {course.title}
                  </Text>
                  <View style={styles.courseDetails}>
                    <Text style={styles.courseDuration}>{course.duration}</Text>
                    <Text
                      style={[
                        styles.courseLevel,
                        course.level === "Intermediate"
                          ? styles.intermediateLevel
                          : styles.beginnerLevel,
                      ]}>
                      {course.level}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 40,
    width: "100%",
    // backgroundColor: "red",
    height: 1,
    marginTop: 70,
  },
  // Top Header Styles
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    justifyContent: "space-around",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 8888,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  searchContainer: {
    // flex: 1,
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: "center",
    width: "30%",
    borderWidth: 1,
    borderColor: "#E7670C",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    paddingVertical: 4,
  },
  searchButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E7670C",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  notificationBtn: {
    position: "relative",
    padding: 8,
  },
  notificationDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF6B6B",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#4A6FFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  profileInitial: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Navigation Styles
  navContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  navItem: {
    marginRight: 30,
    paddingBottom: 8,
    position: "relative",
  },
  activeNavItem: {
    // Active state styling
  },
  navText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  activeNavText: {
    color: "#4A6FFF",
    fontWeight: "600",
  },
  navIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#4A6FFF",
    borderRadius: 1.5,
  },
  // Profile Dropdown Styles
  dropdownOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-start",
    paddingTop: 100,
    paddingRight: 20,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 8,
    position: "absolute",
    top: 100,
    right: 20,
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 12,
    fontWeight: "500",
  },
  // Content Styles
  welcomeSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    //  backgroundColor: "red",
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  progressSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressCard: {
    //  backgroundColor: "#4A6FFF",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  progressDescription: {
    flex: 1,
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
    lineHeight: 22,
    marginRight: 20,
    marginVertical: 10,
  },
  progressCircle: {
    alignItems: "center",
  },
  progressPercentage: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000",
  },
  progressLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginTop: 2,
    color: "#000",
  },
  continueBtn: {
    backgroundColor: "#E7670C",
  },
  continueBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 15,
    marginBottom: 20,
    //  backgroundColor: "red",
    justifyContent: "space-evenly",
    width: "95%",
    alignSelf: "center",
  },
  statCard: {
    width: "23%",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 16,
    margin: 5,
    borderWidth: 1,
    borderColor: "#E7670C",
  },
  statIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F0F5FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 10,
  },
  statChange: {
    fontSize: 11,
    color: "#0063CC",
    fontWeight: "500",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
    backgroundColor: "red",
    width: "100%",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  seeMoreLink: {
    fontSize: 14,
    color: "#4A6FFF",
    fontWeight: "500",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  horizontalScroll: {
    marginHorizontal: -5,
    backgroundColor: "green",
  },
  // Rest of the styles remain the same from previous implementation...
  courseCard: {
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  courseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  courseIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F5FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  courseTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    lineHeight: 20,
  },
  courseInstructor: {
    fontSize: 12,
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
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4A6FFF",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
  },
  continueCourseBtn: {
    backgroundColor: "#F0F5FF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  continueCourseText: {
    color: "#4A6FFF",
    fontSize: 14,
    fontWeight: "500",
  },
  completedList: {
    marginTop: 8,
  },
  completedCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  completedCourseInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  completedIcon: {
    marginRight: 12,
  },
  completedTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  completedInstructor: {
    fontSize: 12,
    color: "#666",
  },
  certificateBtn: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  certificateText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  tasksList: {
    marginTop: 8,
  },
  taskCard: {
    backgroundColor: "#F9F9F9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  taskInfo: {
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
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
  quizBtn: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  uploadBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  watchBtn: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  resumeBtn: {
    backgroundColor: "#9C27B0",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  quizText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  uploadText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  watchText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  resumeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  recommendedCard: {
    width: 180,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    position: "relative",
  },
  ratingBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9E6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#000",
    marginLeft: 4,
  },
  courseInfo: {
    marginTop: 8,
  },
  recommendedInstructor: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  recommendedTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
    lineHeight: 20,
  },
  courseDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  courseDuration: {
    fontSize: 12,
    color: "#666",
  },
  courseLevel: {
    fontSize: 11,
    fontWeight: "500",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  beginnerLevel: {
    backgroundColor: "#E8F5E9",
    color: "#4CAF50",
  },
  intermediateLevel: {
    backgroundColor: "#E3F2FD",
    color: "#2196F3",
  },
  bottomPadding: {
    height: 20,
  },

  nextButton: {
    backgroundColor: "#E7670C",
    paddingVertical: 11,
    paddingHorizontal: 25,
    borderRadius: 5,
    // flex: 1,
    // marginLeft: 20,
    alignItems: "center",
    color: "#fff",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },

  nextButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginRight: 5,
    textAlign: "center",
  },

  nextButtnView: {
    width: "70%",
    //  backgroundColor: "blue",
    //  padding: 10,
  },
});
