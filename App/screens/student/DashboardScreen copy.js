import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState("Home");

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

  // Progress bar component
  const ProgressBar = ({ progress }) => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressText}>{progress}% Complete</Text>
    </View>
  );

  // Bottom navigation component
  const BottomTab = ({ icon, label, isActive, onPress }) => (
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
      <Ionicons name={icon} size={24} color={isActive ? "#4A6FFF" : "#666"} />
      <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.welcomeTitle}>Welcome , John!</Text>
          <View style={styles.headerSubtitle}>
            <Ionicons name="book-outline" size={16} color="#666" />
            <Text style={styles.subtitleText}>What do you want to learn</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressCard}>
            <Text style={styles.progressDescription}>
              You've completed 3 out of 5 courses this month. Keep it up!
            </Text>
            <View style={styles.progressCircle}>
              <Text style={styles.progressPercentage}>60%</Text>
              <Text style={styles.progressLabel}>Completed</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.continueBtn}>
            <Ionicons name="play-circle" size={20} color="#fff" />
            <Text style={styles.continueBtnText}>Continue Last Course</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons name={stat.icon} size={20} color="#4A6FFF" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
              <Text style={styles.statChange}>{stat.change}</Text>
            </View>
          ))}
        </View>

        {/* Active Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Active Courses</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreLink}>See more</Text>
            </TouchableOpacity>
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
                <ProgressBar progress={course.progress} />
                <TouchableOpacity style={styles.continueCourseBtn}>
                  <Text style={styles.continueCourseText}>Continue</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
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

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <BottomTab
          icon="home-outline"
          label="Home"
          isActive={activeTab === "Home"}
          onPress={() => setActiveTab("Home")}
        />
        <BottomTab
          icon="grid-outline"
          label="Dashboard"
          isActive={activeTab === "Dashboard"}
          onPress={() => setActiveTab("Dashboard")}
        />
        <BottomTab
          icon="book-outline"
          label="My Courses"
          isActive={activeTab === "Courses"}
          onPress={() => setActiveTab("Courses")}
        />
        <BottomTab
          icon="person-outline"
          label="Profile"
          isActive={activeTab === "Profile"}
          onPress={() => setActiveTab("Profile")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 90,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  headerLeft: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  headerSubtitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitleText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  notificationBtn: {
    padding: 8,
    position: "relative",
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
  progressSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressCard: {
    backgroundColor: "#4A6FFF",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  progressDescription: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    lineHeight: 22,
    marginRight: 20,
  },
  progressCircle: {
    alignItems: "center",
  },
  progressPercentage: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  progressLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginTop: 2,
  },
  continueBtn: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  continueBtnText: {
    color: "#4A6FFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 40) / 2,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
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
    marginBottom: 4,
  },
  statChange: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "500",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
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
  },
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
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  activeTabLabel: {
    color: "#4A6FFF",
    fontWeight: "500",
  },
});
