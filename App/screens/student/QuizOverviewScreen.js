import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import TopNav from "../../components/TopNav";

const LessonItem = ({ title, duration, completed, active, type }) => {
  const icon = type === "quiz" ? "document-text-outline" : "play-outline";

  return (
    <View style={[styles.lessonItem, active && styles.lessonActive]}>
      {completed ? (
        <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
      ) : (
        <Ionicons name={icon} size={20} color="#000" />
      )}
      <View>
        <Text style={styles.lessonTitle}>{title}</Text>
        <Text style={styles.lessonTime}>{duration}</Text>
      </View>
    </View>
  );
};

export default function QuizOverviewScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TopNav activeNav={"Dashboard"} />
      <View style={{ width: "100%", height: 100 }}></View>

      {/* Top navigation arrows */}
      <View style={styles.topNav}>
        <Ionicons name="arrow-back" size={22} color="#f97316" />
        <Ionicons name="arrow-forward" size={22} color="#f97316" />
      </View>

      <View style={styles.layout}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.courseTitle}>
            Introduction to Python Programming
          </Text>

          <View style={styles.moduleHeader}>
            <Text style={styles.moduleTitle}>Module 1</Text>
            <Ionicons name="chevron-down" size={18} />
          </View>

          <LessonItem
            title="Installing Python & VS Code"
            duration="7 min"
            completed
            type="video"
          />
          <LessonItem
            title="Hello World & Basic Syntax"
            duration="10 min"
            completed
            type="video"
          />
          <LessonItem
            title="Variables, Data Types, and Input"
            duration="12 min"
            completed
            type="video"
          />
          <LessonItem
            title="Quiz: Python Basics"
            duration="10 min"
            active
            type="quiz"
          />

          <View style={styles.gradesHeader}>
            <Text style={styles.gradesText}>Grades</Text>
            <Ionicons name="chevron-down" size={18} />
          </View>
        </View>

        {/* Main Content */}
        <ScrollView style={styles.content}>
          {/* Quiz Card */}
          <View style={styles.quizCard}>
            <View>
              <Text style={styles.quizTitle}>Quiz: Python Basics</Text>
              <Text style={styles.quizMeta}>
                10 Questions · 20 minutes · 10 points
              </Text>
            </View>

            <TouchableOpacity style={styles.startBtn}>
              <Text style={styles.startText}>Start</Text>
            </TouchableOpacity>
          </View>

          {/* Grade Card */}
          <View style={styles.gradeCard}>
            <Text style={styles.gradeTitle}>Your grade</Text>
            <Text style={styles.gradeText}>
              You haven’t submitted this yet. We keep your highest score.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* Top arrows */
  topNav: {
    position: "absolute",
    top: 16,
    right: 24,
    flexDirection: "row",
    gap: 16,
    zIndex: 10,
  },

  layout: {
    flex: 1,
    flexDirection: "row",
  },

  /* Sidebar */
  sidebar: {
    width: 280,
    backgroundColor: "#fff",
    padding: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
  moduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  moduleTitle: {
    fontWeight: "600",
  },

  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  lessonActive: {
    backgroundColor: "#f2f2f2",
  },
  lessonTitle: {
    fontWeight: "500",
    fontSize: 13,
  },
  lessonTime: {
    fontSize: 12,
    color: "#666",
  },

  gradesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  gradesText: {
    fontWeight: "600",
  },

  /* Content */
  content: {
    flex: 1,
    padding: 24,
  },

  quizCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#f97316",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  quizMeta: {
    color: "#666",
    marginTop: 4,
  },
  startBtn: {
    backgroundColor: "#f97316",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 10,
  },
  startText: {
    color: "#fff",
    fontWeight: "700",
  },

  gradeCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  gradeTitle: {
    fontWeight: "700",
    marginBottom: 6,
  },
  gradeText: {
    color: "#666",
  },
});
