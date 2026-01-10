// InsDashboard.js
import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { BarChart, PieChart, LineChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import InsTopNav from "../../components/InsTopNav";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const stats = [
  { label: "Total Students", value: "450", change: "5% increase" },
  { label: "Courses Active", value: "12", change: "3% increase" },
  { label: "Assignments Graded", value: "120", change: "10% increase" },
  { label: "Feedback Received", value: "50", change: "2% increase" },
  { label: "Earnings", value: "$50,000", change: "2% increase" },
];

const barData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [{ data: [70, 80, 45, 85, 110, 78, 98, 88, 115, 75, 95, 80] }],
};

const pieData = [
  { name: "Completed", population: 300, color: "#0057ff", legendFontSize: 10 },
  {
    name: "In Progress",
    population: 120,
    color: "#ff7a00",
    legendFontSize: 10,
  },
  { name: "Not Started", population: 80, color: "#ff0000", legendFontSize: 10 },
];

const lineData = {
  labels: ["Jan", "Feb", "Mar"],
  datasets: [{ data: [150, 450, 380] }],
};

const courses = [
  { title: "UI Design Basics", enrollments: 340 },
  { title: "Data Science Course", enrollments: 275 },
  { title: "Digital Illustration", enrollments: 50 },
  { title: "Advanced Excel", enrollments: 410 },
];

const whiteChartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0,

  // 🔑 Force full opacity ALWAYS
  color: () => "#ff7a00",

  labelColor: () => "#000",
  fillShadowGradient: "#ff7a00",
  fillShadowGradientOpacity: 1,

  barPercentage: 0.6,
  propsForBackgroundLines: {
    strokeOpacity: 0.15,
  },
};

const lightChartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: () => "#ff7a00",
  labelColor: () => "#333",
};

export default function InsDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <InsTopNav activeNav={"Dashboard"} />
      <View style={{ width: "100%", height: 70 }}></View>

      <ScrollView
        style={styles.innerContainer}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.welcome}>
          Welcome, <Text style={styles.name}>John!</Text>
        </Text>
        <Text style={styles.subtitle}>
          Here’s how your courses are performing today.
        </Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          {stats.map((s, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statLabel}>{s.label}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statChange}>{s.change}</Text>
            </View>
          ))}
        </View>

        {/* Bar Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitleDark}>Student Monthly Engagement</Text>

          <BarChart
            data={barData}
            width={width - 260}
            height={260}
            fromZero
            showBarTops={false}
            withInnerLines={false}
            chartConfig={whiteChartConfig}
            style={{ borderRadius: 12 }}
          />
        </View>

        {/* Pie + Line */}
        <View style={styles.row}>
          <View style={styles.whiteCard}>
            <Text style={styles.chartTitleDark}>Course Completion</Text>
            <PieChart
              data={pieData}
              width={width / 2 - 30}
              height={200}
              accessor="population"
              backgroundColor="transparent"
              chartConfig={lightChartConfig}
            />
          </View>

          <View style={styles.whiteCard}>
            <Text style={styles.chartTitleDark}>Student Growth</Text>
            <LineChart
              data={lineData}
              width={width / 2 - 30}
              height={200}
              chartConfig={lightChartConfig}
            />
          </View>
        </View>

        {/* Courses */}
        <Text style={styles.sectionTitle}>Latest Courses</Text>
        <View style={styles.courseRow}>
          {courses.map((c, i) => (
            <View key={i} style={styles.courseCard}>
              <View>
                <Text style={styles.courseTitle}>{c.title}</Text>
                <Text style={styles.courseSub}>
                  Enrollments: {c.enrollments}
                </Text>
              </View>
              <TouchableOpacity style={styles.moreIcon}>
                <Ionicons name="ellipsis-vertical" size={20} color={"#000"} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  innerContainer: { width: "90%", height: 1, alignSelf: "center" },
  welcome: { color: "#000", fontSize: 22, fontWeight: "600" },
  name: { color: "#ff7a00" },
  subtitle: { color: "#aaa", marginBottom: 20 },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 12,
    padding: 12,
    width: "18%",
    marginBottom: 12,
  },
  statLabel: { color: "#000", fontSize: 12, marginBottom: 20 },
  statValue: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statChange: { color: "#00aaff", fontSize: 10 },
  chartCard: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginVertical: 20,
    backgroundColor: "#fff",
  },
  chartTitle: { color: "#000", marginBottom: 10, fontWeight: "600" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  whiteCard: { backgroundColor: "#fff", borderRadius: 12, padding: 10 },
  chartTitleDark: { fontWeight: "600", marginBottom: 5 },
  sectionTitle: { color: "#000", fontSize: 18, marginVertical: 15 },
  courseRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    width: "22%",
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  courseTitle: { fontWeight: "bold" },
  courseSub: { fontSize: 12, color: "#555" },
  moreIcon: {
    alignSelf: "flex-start",
  },
});
