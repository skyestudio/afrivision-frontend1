import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import TopNav from "../../components/TopNav";

const LessonItem = ({ title, duration, active, type }) => {
  const icon = type === "video" ? "play-outline" : "document-text-outline";

  return (
    <View style={[styles.lessonItem, active && styles.lessonActive]}>
      <Ionicons name={icon} size={20} color="#000" />
      <View style={{ flex: 1 }}>
        <Text style={styles.lessonTitle}>{title}</Text>
        <Text style={styles.lessonTime}>{duration}</Text>
      </View>
    </View>
  );
};

export default function LessonPlayerScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TopNav activeNav={"Dashboard"} />
      <View style={{ width: "100%", height: 80 }}></View>

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
            active
            type="video"
          />
          <LessonItem
            title="Hello World & Basic Syntax"
            duration="10 min"
            type="video"
          />
          <LessonItem
            title="Variables, Data Types, and Input"
            duration="12 min"
            type="video"
          />
          <LessonItem
            title="Quiz: Python Basics"
            duration="10 min"
            type="quiz"
          />

          <View style={styles.gradesHeader}>
            <Text style={styles.gradesText}>Grades</Text>
            <Ionicons name="chevron-down" size={18} />
          </View>
        </View>

        {/* Video Area */}
        <View style={styles.content}>
          <View style={styles.videoCard}>
            {/* Replace with Video component later */}
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1584697964154-3bdf2a99b94d",
              }}
              style={styles.videoImage}
            />

            <View style={styles.playOverlay}>
              <View style={styles.playButton}>
                <Ionicons name="play" size={28} color="#fff" />
              </View>
            </View>
          </View>

          {/* Progress */}
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>
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
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
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

  /* Video Area */
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  videoCard: {
    backgroundColor: "#111",
    borderRadius: 16,
    overflow: "hidden",
  },
  videoImage: {
    width: "100%",
    height: 320,
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#7c3aed",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Progress */
  progressBar: {
    height: 6,
    backgroundColor: "#333",
    borderRadius: 3,
    marginTop: 16,
    overflow: "hidden",
  },
  progressFill: {
    width: "45%",
    height: "100%",
    backgroundColor: "#facc15",
  },
});
