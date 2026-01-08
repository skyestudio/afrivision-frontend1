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

const LessonCard = ({ title, type, duration }) => {
  const icon = type === "video" ? "play-outline" : "document-text-outline";

  return (
    <View style={styles.lessonCard}>
      <View style={styles.lessonLeft}>
        <Ionicons name={icon} size={22} color="#000" />
        <View>
          <Text style={styles.lessonTitle}>{title}</Text>
          <Text style={styles.lessonMeta}>
            {type === "video" ? "Video" : "Quiz"} · {duration}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.openBtn}>
        <Text style={styles.openText}>Open</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function CourseContentScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TopNav activeNav={"Dashboard"} />
      <View style={{ width: "100%", height: 80 }}></View>

      <View style={styles.layout}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.courseTitle}>
            Introduction to{"\n"}Python Programming
          </Text>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Courses Material</Text>
              <Ionicons name="chevron-down" size={18} />
            </View>

            <View style={styles.moduleActive}>
              <Text style={styles.moduleText}>Module 1</Text>
            </View>
            <View style={styles.module}>
              <Text style={styles.moduleText}>Module 2</Text>
            </View>
            <View style={styles.module}>
              <Text style={styles.moduleText}>Module 3</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Grades</Text>
              <Ionicons name="chevron-down" size={18} />
            </View>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView style={styles.content}>
          <Text
            style={[
              styles.contentMeta,
              { fontWeight: "bold", color: "#000", marginBottom: 4 },
            ]}>
            Module 1: Pythin Fundamentals
          </Text>
          <Text style={styles.contentMeta}>3 Videos · 40 minutes · 1 quiz</Text>

          <LessonCard
            title="Installing Python & VS Code"
            type="video"
            duration="7 min"
          />
          <LessonCard
            title="Hello World & Basic Syntax"
            type="video"
            duration="10 min"
          />
          <LessonCard
            title="Variables, Data Types, and Input"
            type="video"
            duration="12 min"
          />
          <LessonCard
            title="Quiz: Python Basics"
            type="quiz"
            duration="10 min"
          />
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
  layout: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    // backgroundColor: "red",
    alignSelf: "center",
  },

  /* Sidebar */
  sidebar: {
    width: 260,
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
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: "600",
  },
  moduleActive: {
    backgroundColor: "#eee",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  module: {
    borderWidth: 1,
    borderColor: "#eee",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  moduleText: {
    fontWeight: "500",
  },

  /* Content */
  content: {
    flex: 1,
    padding: 20,
  },
  contentMeta: {
    color: "#ccc",
    marginBottom: 16,
  },

  lessonCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "whitesmoke",
  },
  lessonLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  lessonTitle: {
    fontWeight: "600",
    fontSize: 14,
  },
  lessonMeta: {
    color: "#666",
    fontSize: 12,
    marginTop: 2,
  },
  openBtn: {
    backgroundColor: "#f97316",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 10,
  },
  openText: {
    color: "#fff",
    fontWeight: "300",
  },
});
