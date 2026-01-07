import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNav from "../components/TopNav";
import { Ionicons } from "@expo/vector-icons";

const STATUS_COLORS = {
  completed: "#22c55e",
  inprogress: "#f97316",
  notstarted: "#ef4444",
};

const CourseCard = ({ title, progress, status, action }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.titleRow}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: STATUS_COLORS[status] },
            ]}
          />
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>{action}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.progressText}>{progress}% Complete</Text>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

export default function MyCourses() {
  return (
    <SafeAreaView style={styles.container}>
      <TopNav activeNav={"My Courses"} />
      <View style={{ width: "100%", height: 80 }}></View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* Filters */}
        <View style={styles.filters}>
          <View style={styles.filterBtn}>
            <Ionicons name="swap-vertical" size={12} color="#000" />
            <Text style={styles.filterText}>Sort</Text>
            <Ionicons
              name="chevron-down"
              size={12}
              color="#000"
              style={{ marginLeft: 10 }}
            />
          </View>
          <View style={styles.filterBtn}>
            <Ionicons name="grid-outline" size={12} color="#000" />
            <Text style={styles.filterText}>Category</Text>
            <Ionicons
              name="chevron-down"
              size={12}
              color="#000"
              style={{ marginLeft: 10 }}
            />
          </View>
        </View>

        {/* Status Pills */}
        <View style={styles.pills}>
          <Text style={styles.pill}>All 7</Text>
          <Text style={styles.pill}>🟠 In Progress 3</Text>
          <Text style={styles.pill}>🟢 Completed 2</Text>
          <Text style={styles.pill}>🔴 Not Started 2</Text>
        </View>

        {/* Certificate Banner */}
        <TouchableOpacity
          style={[
            styles.banner,
            { borderWidth: 1, borderColor: "whitesmoke" },
          ]}>
          <Text
            style={[
              styles.bannerText,
              { fontWeight: "bold", fontSize: 20, marginLeft: 0 },
            ]}>
            🟢 Introduction to python programming{" "}
            <Text style={[styles.sectionMeta, { fontSize: 12 }]}>
              3 Modules · 7 hours
            </Text>
          </Text>
          <Ionicons name="chevron-down" size={16} color="#000" />
        </TouchableOpacity>

        {/* Certificate Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Congratulations on completing and earning your Introduction to
            Python Programming Certificate!
          </Text>
          <TouchableOpacity style={styles.viewBtn}>
            <Text style={styles.viewText}>View</Text>
          </TouchableOpacity>
        </View>

        {/* Python Course */}

        <CourseCard
          title="Module 1: Python Fundamentals"
          progress={10}
          status="completed"
          action="View"
        />
        <CourseCard
          title="Module 2: Control Flow in Python"
          progress={100}
          status="completed"
          action="View"
        />
        <CourseCard
          title="Module 3: Project – Build a Simple App"
          progress={100}
          status="completed"
          action="View"
        />

        <CourseCard
          title="Module 1: Introduction to UI/UX Design"
          progress={100}
          status="completed"
          action="View"
        />
        <CourseCard
          title="Module 2: UX Research"
          progress={60}
          status="inprogress"
          action="Resume"
        />
        <CourseCard
          title="Module 3: Wireframing Basics"
          progress={30}
          status="inprogress"
          action="Resume"
        />
        <CourseCard
          title="Module 4: UI Principles"
          progress={0}
          status="notstarted"
          action="Start"
        />
        <CourseCard
          title="Module 5: Prototyping in Figma"
          progress={0}
          status="notstarted"
          action="Start"
        />
        <CourseCard
          title="Module 6: Final Project"
          progress={0}
          status="notstarted"
          action="Start"
        />
        <View style={{ width: "100%", height: 200 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
    paddingHorizontal: 90,
    height: 1,
  },

  /* Filters */
  filters: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  filterBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "whitesmoke",
  },
  filterText: {
    color: "#000",
    marginLeft: 5,
  },

  /* Pills */
  pills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  pill: {
    //   backgroundColor: "#111",
    color: "#00",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    fontSize: 12,
    borderWidth: 1,
    borderColor: "whitesmoke",
  },

  /* Banner */
  banner: {
    //  backgroundColor: "#111",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  bannerText: {
    color: "#000",
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 30,
  },
  viewBtn: {
    backgroundColor: "#f97316",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewText: {
    color: "#fff",
    fontWeight: "600",
  },

  sectionMeta: {
    color: "#aaa",
    marginBottom: 8,
    marginTop: 16,
  },

  /* Cards */
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 15,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: 14,
  },
  actionBtn: {
    backgroundColor: "#f97316",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    //  fontSize: 12,
  },
  progressText: {
    marginTop: 8,
    fontSize: 12,
    color: "#666",
  },
  progressBar: {
    height: 6,
    //  backgroundColor: "#e5e5e5",
    borderRadius: 3,
    marginTop: 6,
    overflow: "hidden",
    //   backgroundColor: "red",
    width: "20%",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#22c55e",
  },
});
