import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNav from "../components/TopNav";

export default function MyCourses() {
  const courses = [
    {
      id: 1,
      title: "Introduction to Python Programming",
      modules: 3,
      hours: 7,
      completed: true,
      certificate: true,
      modulesList: [
        {
          title: "Module 1: Python Fundamentals",
          progress: 100,
          status: "completed",
        },
        {
          title: "Module 2: Control Flow in Python",
          progress: 100,
          status: "completed",
        },
        {
          title: "Module 3: Project – Build a Simple App",
          progress: 100,
          status: "completed",
        },
      ],
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      modules: 6,
      hours: 5,
      completed: false,
      certificate: false,
      modulesList: [
        {
          title: "Module 1: Introduction to UI/UX Design",
          progress: 100,
          status: "completed",
        },
        { title: "Module 2: UX Research", progress: 60, status: "in-progress" },
        {
          title: "Module 3: Wireframing Basics",
          progress: 30,
          status: "in-progress",
        },
        {
          title: "Module 4: UI Principles",
          progress: 0,
          status: "not-started",
        },
        {
          title: "Module 5: Prototyping in Figma",
          progress: 0,
          status: "not-started",
        },
        {
          title: "Module 6: Final Project",
          progress: 0,
          status: "not-started",
        },
      ],
    },
  ];

  const filters = [
    { label: "All", count: 7, active: true },
    { label: "In Progress", count: 3, active: false },
    { label: "Completed", count: 2, active: false },
    { label: "Not Started", count: 2, active: false },
  ];

  const getModuleButton = (status, progress) => {
    switch (status) {
      case "completed":
        return (
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        );
      case "in-progress":
        return (
          <TouchableOpacity style={styles.resumeButton}>
            <Text style={styles.resumeButtonText}>Resume</Text>
          </TouchableOpacity>
        );
      case "not-started":
        return (
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "in-progress":
        return "#f59e0b";
      case "not-started":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  const getModuleBackground = (status) => {
    switch (status) {
      case "completed":
        return "#f0fdf4";
      case "in-progress":
        return "#fffbeb";
      case "not-started":
        return "#f9fafb";
      default:
        return "#f9fafb";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TopNav activeNav={"My Courses"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollScreen}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>What do you want to learn</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.pageTitle}>My Courses</Text>

          {/* Filter Section */}
          <View style={styles.filterSection}>
            <TouchableOpacity style={styles.sortButton}>
              <Text style={styles.sortButtonText}>Sort</Text>
            </TouchableOpacity>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterScroll}>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.label}
                  style={[
                    styles.filterButton,
                    filter.active && styles.activeFilterButton,
                  ]}>
                  <Text
                    style={[
                      styles.filterText,
                      filter.active && styles.activeFilterText,
                    ]}>
                    {filter.label}
                  </Text>
                  <View
                    style={[
                      styles.countBadge,
                      filter.active && styles.activeCountBadge,
                    ]}>
                    <Text
                      style={[
                        styles.countText,
                        filter.active && styles.activeCountText,
                      ]}>
                      {filter.count}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Courses List */}
          <View style={styles.coursesContainer}>
            {courses.map((course) => (
              <View key={course.id} style={styles.courseCard}>
                {/* Course Header */}
                <View style={styles.courseHeader}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <View style={styles.courseMeta}>
                    <Text style={styles.courseMetaText}>
                      {course.modules} Modules
                    </Text>
                    <Text style={styles.courseMetaText}>•</Text>
                    <Text style={styles.courseMetaText}>
                      {course.hours} hours
                    </Text>
                  </View>
                </View>

                {/* Congratulations Message for Completed Course */}
                {course.completed && course.certificate && (
                  <View style={styles.congratsContainer}>
                    <Text style={styles.congratsText}>
                      Congratulations on completing and earning your{" "}
                      {course.title} Certificate!
                    </Text>
                  </View>
                )}

                {/* Modules List */}
                <View style={styles.modulesContainer}>
                  {course.modulesList.map((module, index) => (
                    <View
                      key={index}
                      style={[
                        styles.moduleItem,
                        { backgroundColor: getModuleBackground(module.status) },
                      ]}>
                      <View style={styles.moduleInfo}>
                        <Text style={styles.moduleTitle}>{module.title}</Text>
                      </View>
                      <View style={styles.moduleActions}>
                        <Text
                          style={[
                            styles.progressText,
                            { color: getProgressColor(module.status) },
                          ]}>
                          {module.progress === 0
                            ? "Not Started"
                            : `${module.progress}% Complete`}
                        </Text>
                        {getModuleButton(module.status, module.progress)}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollScreen: {
    width: "100%",
    height: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  navContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 20,
  },
  navItem: {
    paddingVertical: 12,
    paddingHorizontal: 0,
    marginRight: 30,
  },
  activeNavItem: {
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb",
  },
  navText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  activeNavText: {
    color: "#2563eb",
  },
  content: {
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
  },
  filterSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    borderRadius: 6,
    marginRight: 20,
  },
  sortButtonText: {
    color: "#374151",
    fontSize: 14,
  },
  filterScroll: {
    flex: 1,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    borderRadius: 20,
    marginRight: 12,
  },
  activeFilterButton: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  filterText: {
    fontSize: 14,
    color: "#374151",
    marginRight: 6,
  },
  activeFilterText: {
    color: "white",
  },
  countBadge: {
    backgroundColor: "rgba(55, 65, 81, 0.1)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  activeCountBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  countText: {
    fontSize: 12,
    color: "#374151",
  },
  activeCountText: {
    color: "white",
  },
  coursesContainer: {
    marginBottom: 40,
  },
  courseCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  courseHeader: {
    marginBottom: 16,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  courseMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  courseMetaText: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
  },
  congratsContainer: {
    backgroundColor: "#f0f9ff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  congratsText: {
    color: "#0369a1",
    fontSize: 14,
    fontWeight: "500",
  },
  modulesContainer: {
    gap: 12,
  },
  moduleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  moduleInfo: {
    flex: 1,
    marginRight: 12,
  },
  moduleTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  moduleActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "500",
  },
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#2563eb",
    backgroundColor: "white",
    borderRadius: 6,
  },
  viewButtonText: {
    color: "#2563eb",
    fontSize: 12,
    fontWeight: "500",
  },
  resumeButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "#2563eb",
    borderRadius: 6,
  },
  resumeButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  startButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "#10b981",
    borderRadius: 6,
  },
  startButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
});
