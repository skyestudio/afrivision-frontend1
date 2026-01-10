// InsDashboard.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { BarChart, PieChart, LineChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import InsTopNav from "../../components/InsTopNav";
import { Ionicons } from "@expo/vector-icons";

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
  const { width, height } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  // Choose the appropriate styles based on screen size
  const styles = isMobile
    ? mobileStyles
    : isTablet
    ? tabletStyles
    : desktopStyles;

  // Calculate responsive widths
  const getChartWidth = () => {
    if (isMobile) return width * 1.5; // Wider for horizontal scrolling
    if (isTablet) return width - 160;
    return width - 260;
  };

  const getCardWidth = () => {
    if (isMobile) return 160;
    if (isTablet) return "48%";
    return "18%";
  };

  const getCourseCardWidth = () => {
    if (isMobile) return "100%";
    if (isTablet) return "48%";
    return "22%";
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        <InsTopNav activeNav={"Dashboard"} />
        <View style={styles.spacer}></View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.welcome}>
              Welcome, <Text style={styles.name}>John!</Text>
            </Text>
            <Text style={styles.subtitle}>
              Here's how your courses are performing today.
            </Text>
          </View>

          {/* Stats Row - Responsive */}
          <ScrollView
            horizontal={isMobile}
            showsHorizontalScrollIndicator={true}
            style={styles.statsScrollContainer}
            contentContainerStyle={styles.statsScrollContent}>
            <View style={styles.statsRow}>
              {stats.map((s, i) => (
                <View
                  key={i}
                  style={[
                    styles.statCard,
                    { width: getCardWidth() },
                    isMobile && { marginRight: 12 },
                    isMobile && i === stats.length - 1 && { marginRight: 0 },
                  ]}>
                  <Text style={styles.statLabel}>{s.label}</Text>
                  <Text style={styles.statValue}>{s.value}</Text>
                  <Text style={styles.statChange}>{s.change}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Bar Chart */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitleDark}>
              Student Monthly Engagement
            </Text>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              style={styles.chartScrollView}
              contentContainerStyle={styles.chartScrollContent}>
              <BarChart
                data={barData}
                width={getChartWidth()}
                height={isMobile ? 220 : 260}
                fromZero
                showBarTops={false}
                withInnerLines={false}
                chartConfig={whiteChartConfig}
                style={{ borderRadius: 12 }}
              />
            </ScrollView>
          </View>

          {/* Pie + Line Charts */}
          <View style={styles.chartsRow}>
            <View style={styles.whiteCard}>
              <Text style={styles.chartTitleDark}>Course Completion</Text>
              <PieChart
                data={pieData}
                width={isMobile ? width - 40 : width / 2 - 30}
                height={isMobile ? 180 : 200}
                accessor="population"
                backgroundColor="transparent"
                chartConfig={lightChartConfig}
              />
            </View>

            <View style={[styles.whiteCard, isMobile && { marginTop: 16 }]}>
              <Text style={styles.chartTitleDark}>Student Growth</Text>
              <LineChart
                data={lineData}
                width={isMobile ? width - 40 : width / 2 - 30}
                height={isMobile ? 180 : 200}
                chartConfig={lightChartConfig}
              />
            </View>
          </View>

          {/* Courses Section */}
          <Text style={styles.sectionTitle}>Latest Courses</Text>

          <View style={styles.courseRow}>
            {courses.map((c, i) => (
              <View
                key={i}
                style={[styles.courseCard, { width: getCourseCardWidth() }]}>
                <View style={styles.courseContent}>
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

          {/* Extra space at bottom for better scrolling */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// DESKTOP STYLES (≥ 1024px)
const desktopStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    // flex: 1,
    height: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  spacer: {
    height: 70,
  },
  headerContainer: {
    marginBottom: 20,
  },
  welcome: {
    color: "#000",
    fontSize: 22,
    fontWeight: "600",
  },
  name: {
    color: "#ff7a00",
  },
  subtitle: {
    color: "#aaa",
    marginTop: 4,
  },
  statsScrollContainer: {
    marginBottom: 20,
  },
  statsScrollContent: {
    paddingVertical: 5,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statLabel: {
    color: "#666",
    fontSize: 12,
    marginBottom: 8,
  },
  statValue: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statChange: {
    color: "#00aaff",
    fontSize: 10,
  },
  chartCard: {
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  chartScrollView: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  chartScrollContent: {
    paddingVertical: 10,
  },
  chartsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  whiteCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  chartTitleDark: {
    fontWeight: "600",
    marginBottom: 12,
    fontSize: 16,
    color: "#000",
  },
  sectionTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 16,
  },
  courseRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  courseContent: {
    flex: 1,
  },
  courseTitle: {
    fontWeight: "600",
    fontSize: 15,
    color: "#000",
    marginBottom: 4,
  },
  courseSub: {
    fontSize: 12,
    color: "#666",
  },
  moreIcon: {
    marginLeft: 12,
  },
  bottomSpacer: {
    height: 40,
  },
});

// TABLET STYLES (768px - 1023px)
const tabletStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    //  flex: 1,
    height: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 40,
  },
  spacer: {
    height: 70,
  },
  headerContainer: {
    marginBottom: 20,
  },
  welcome: {
    color: "#000",
    fontSize: 21,
    fontWeight: "600",
  },
  name: {
    color: "#ff7a00",
  },
  subtitle: {
    color: "#aaa",
    marginTop: 4,
    fontSize: 15,
  },
  statsScrollContainer: {
    marginBottom: 20,
  },
  statsScrollContent: {
    paddingVertical: 5,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statLabel: {
    color: "#666",
    fontSize: 11,
    marginBottom: 8,
  },
  statValue: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statChange: {
    color: "#00aaff",
    fontSize: 10,
  },
  chartCard: {
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 12,
    padding: 14,
    marginVertical: 20,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  chartScrollView: {
    marginHorizontal: -14,
    paddingHorizontal: 14,
  },
  chartScrollContent: {
    paddingVertical: 10,
  },
  chartsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  whiteCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    width: "48%",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  chartTitleDark: {
    fontWeight: "600",
    marginBottom: 10,
    fontSize: 15,
    color: "#000",
  },
  sectionTitle: {
    color: "#000",
    fontSize: 17,
    fontWeight: "600",
    marginVertical: 14,
  },
  courseRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  courseContent: {
    flex: 1,
  },
  courseTitle: {
    fontWeight: "600",
    fontSize: 14,
    color: "#000",
    marginBottom: 4,
  },
  courseSub: {
    fontSize: 11,
    color: "#666",
  },
  moreIcon: {
    marginLeft: 12,
  },
  bottomSpacer: {
    height: 40,
  },
});

// MOBILE STYLES (< 768px)
const mobileStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    // flex: 1,
    height: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 40,
  },
  spacer: {
    height: 60,
  },
  headerContainer: {
    marginBottom: 16,
  },
  welcome: {
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
  },
  name: {
    color: "#ff7a00",
  },
  subtitle: {
    color: "#aaa",
    marginTop: 4,
    fontSize: 14,
  },
  statsScrollContainer: {
    marginBottom: 16,
  },
  statsScrollContent: {
    paddingVertical: 5,
    paddingRight: 16,
  },
  statsRow: {
    flexDirection: "row",
  },
  statCard: {
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statLabel: {
    color: "#666",
    fontSize: 11,
    marginBottom: 6,
  },
  statValue: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statChange: {
    color: "#00aaff",
    fontSize: 9,
  },
  chartCard: {
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 12,
    padding: 12,
    marginVertical: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  chartScrollView: {
    marginHorizontal: -12,
    paddingHorizontal: 12,
  },
  chartScrollContent: {
    paddingVertical: 10,
  },
  chartsRow: {
    flexDirection: "column",
    marginBottom: 20,
  },
  whiteCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    width: "100%",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  chartTitleDark: {
    fontWeight: "600",
    marginBottom: 10,
    fontSize: 15,
    color: "#000",
  },
  sectionTitle: {
    color: "#000",
    fontSize: 17,
    fontWeight: "600",
    marginVertical: 12,
  },
  courseRow: {
    flexDirection: "column",
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  courseContent: {
    flex: 1,
  },
  courseTitle: {
    fontWeight: "600",
    fontSize: 14,
    color: "#000",
    marginBottom: 4,
  },
  courseSub: {
    fontSize: 11,
    color: "#666",
  },
  moreIcon: {
    marginLeft: 12,
  },
  bottomSpacer: {
    height: 40,
  },
});
