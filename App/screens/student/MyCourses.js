import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNav from "../../components/TopNav";
import StudentBottomNav from "../../components/StudentBottomNav";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const STATUS_COLORS = {
  completed: "#22c55e",
  inprogress: "#f97316",
  notstarted: "#ef4444",
};

const CourseCard = ({ title, progress, status, action }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  const navigation = useNavigation();

  const styles = isMobile
    ? mobileStyles
    : isTablet
      ? tabletStyles
      : desktopStyles;

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
          <Text style={styles.cardTitle} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: STATUS_COLORS[status] }]}
          onPress={() => navigation.navigate("LessonPlayerScreen")}
        >
          <Text style={styles.actionText}>{action}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.progressText}>{progress}% Complete</Text>

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress}%`,
                backgroundColor: STATUS_COLORS[status],
              },
            ]}
          />
        </View>
        <Text style={styles.progressPercentage}>{progress}%</Text>
      </View>
    </View>
  );
};

export default function MyCourses() {
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const styles = isMobile
    ? mobileStyles
    : isTablet
      ? tabletStyles
      : desktopStyles;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {!isMobile && <TopNav activeNav={"My Courses"} />}
      <View style={!isMobile && styles.spacer} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Filters */}
        <View style={styles.filters}>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons
              name="swap-vertical"
              size={isMobile ? 12 : 14}
              color="#666"
            />
            <Text style={styles.filterText}>Sort</Text>
            <Ionicons
              name="chevron-down"
              size={isMobile ? 12 : 14}
              color="#666"
              style={styles.filterChevron}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons
              name="grid-outline"
              size={isMobile ? 12 : 14}
              color="#666"
            />
            <Text style={styles.filterText}>Category</Text>
            <Ionicons
              name="chevron-down"
              size={isMobile ? 12 : 14}
              color="#666"
              style={styles.filterChevron}
            />
          </TouchableOpacity>

          {!isMobile && (
            <TouchableOpacity style={styles.filterBtn}>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.filterText}>Duration</Text>
              <Ionicons
                name="chevron-down"
                size={14}
                color="#666"
                style={styles.filterChevron}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Status Pills */}
        <ScrollView
          horizontal={isMobile}
          showsHorizontalScrollIndicator={false}
          style={styles.pillsScroll}
          contentContainerStyle={styles.pillsContainer}
        >
          <TouchableOpacity style={[styles.pill, styles.pillActive]}>
            <Text style={[styles.pillText, styles.pillTextActive]}>All 7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pill}>
            <Text style={styles.pillText}>🟠 In Progress 3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pill}>
            <Text style={styles.pillText}>🟢 Completed 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pill}>
            <Text style={styles.pillText}>🔴 Not Started 2</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Course Progress Banner */}
        <TouchableOpacity style={styles.progressBanner}>
          <View style={styles.bannerContent}>
            <View style={styles.bannerIconContainer}>
              <Text style={styles.bannerIcon}>🎓</Text>
            </View>
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerTitle}>
                Introduction to Python Programming
              </Text>
              <Text style={styles.bannerMeta}>
                3 Modules · 7 hours · 70% Complete
              </Text>
            </View>
          </View>
          <View style={styles.bannerProgress}>
            <View style={styles.bannerProgressBar}>
              <View style={[styles.bannerProgressFill, { width: "70%" }]} />
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* Certificate Banner */}
        <View style={styles.certificateBanner}>
          <View style={styles.bannerContent}>
            <View
              style={[
                styles.bannerIconContainer,
                { backgroundColor: "#E8F5E9" },
              ]}
            >
              <Ionicons name="ribbon" size={24} color="#22c55e" />
            </View>
            <View style={styles.bannerTextContainer}>
              <Text style={styles.certificateTitle}>Congratulations! 🎉</Text>
              <Text style={styles.certificateText}>
                You earned your Introduction to Python Programming Certificate!
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.viewCertificateBtn}>
            <Text style={styles.viewCertificateText}>View Certificate</Text>
          </TouchableOpacity>
        </View>

        {/* Courses Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Modules</Text>
          <Text style={styles.sectionSubtitle}>
            {isDesktop
              ? "Track your progress across all modules"
              : "Continue your learning journey"}
          </Text>
        </View>

        {/* Python Course Modules */}
        <View style={styles.coursesGrid}>
          <CourseCard
            title="Module 1: Python Fundamentals"
            progress={100}
            status="completed"
            action="Review"
          />
          <CourseCard
            title="Module 2: Control Flow in Python"
            progress={100}
            status="completed"
            action="Review"
          />
          <CourseCard
            title="Module 3: Project – Build a Simple App"
            progress={100}
            status="completed"
            action="Review"
          />

          <CourseCard
            title="Module 1: Introduction to UI/UX Design"
            progress={100}
            status="completed"
            action="Review"
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
  content: {
    paddingHorizontal: 90,
    paddingVertical: 32,
    height: 1,
  },
  filters: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  filterBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  filterText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  filterChevron: {
    marginLeft: 12,
  },
  pillsScroll: {
    marginBottom: 32,
  },
  pillsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  pillActive: {
    backgroundColor: "#ff7a00",
    borderColor: "#ff7a00",
  },
  pillText: {
    fontSize: 14,
    color: "#666",
  },
  pillTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  progressBanner: {
    backgroundColor: "#F8FAFF",
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  bannerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bannerIcon: {
    fontSize: 24,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  bannerMeta: {
    fontSize: 13,
    color: "#666",
  },
  bannerProgress: {
    width: 120,
    marginRight: 16,
  },
  bannerProgressBar: {
    height: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    overflow: "hidden",
  },
  bannerProgressFill: {
    height: "100%",
    backgroundColor: "#ff7a00",
    borderRadius: 3,
  },
  certificateBanner: {
    backgroundColor: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)",
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#A5D6A5",
  },
  certificateTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 4,
  },
  certificateText: {
    fontSize: 14,
    color: "#388E3C",
  },
  viewCertificateBtn: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  viewCertificateText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  sectionHeader: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  coursesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    width: "31.5%",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: 15,
    color: "#000",
    flex: 1,
  },
  actionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  progressText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
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
  content: {
    paddingHorizontal: 32,
    paddingVertical: 24,
    height: 1,
  },
  filters: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  filterBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  filterText: {
    color: "#666",
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 6,
  },
  filterChevron: {
    marginLeft: 8,
  },
  pillsScroll: {
    marginBottom: 24,
  },
  pillsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  pillActive: {
    backgroundColor: "#ff7a00",
    borderColor: "#ff7a00",
  },
  pillText: {
    fontSize: 13,
    color: "#666",
  },
  pillTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  progressBanner: {
    backgroundColor: "#F8FAFF",
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  bannerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bannerIcon: {
    fontSize: 22,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  bannerMeta: {
    fontSize: 12,
    color: "#666",
  },
  bannerProgress: {
    width: 100,
    marginRight: 14,
  },
  bannerProgressBar: {
    height: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 2.5,
    overflow: "hidden",
  },
  bannerProgressFill: {
    height: "100%",
    backgroundColor: "#ff7a00",
    borderRadius: 2.5,
  },
  certificateBanner: {
    backgroundColor: "#E8F5E9",
    borderRadius: 14,
    padding: 20,
    marginBottom: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#C8E6C9",
  },
  certificateTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 4,
  },
  certificateText: {
    fontSize: 13,
    color: "#388E3C",
  },
  viewCertificateBtn: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  viewCertificateText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#666",
  },
  coursesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    width: "48.5%",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: 14,
    color: "#000",
    flex: 1,
  },
  actionBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 11,
  },
  progressText: {
    fontSize: 11,
    color: "#666",
    marginBottom: 6,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 2.5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2.5,
  },
  progressPercentage: {
    fontSize: 11,
    fontWeight: "600",
    color: "#666",
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
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 80,
    height: 1,
  },
  filters: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  filterBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  filterText: {
    color: "#666",
    fontSize: 12,
    marginLeft: 4,
  },
  filterChevron: {
    marginLeft: 4,
  },
  pillsScroll: {
    marginBottom: 20,
  },
  pillsContainer: {
    flexDirection: "row",
    gap: 8,
    paddingRight: 16,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  pillActive: {
    backgroundColor: "#ff7a00",
    borderColor: "#ff7a00",
  },
  pillText: {
    fontSize: 12,
    color: "#666",
  },
  pillTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  progressBanner: {
    backgroundColor: "#F8FAFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  bannerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bannerIcon: {
    fontSize: 20,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  bannerMeta: {
    fontSize: 11,
    color: "#666",
  },
  bannerProgress: {
    width: 80,
    marginRight: 12,
  },
  bannerProgressBar: {
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    overflow: "hidden",
  },
  bannerProgressFill: {
    height: "100%",
    backgroundColor: "#ff7a00",
    borderRadius: 2,
  },
  certificateBanner: {
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
    borderWidth: 1,
    borderColor: "#C8E6C9",
  },
  certificateTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 2,
  },
  certificateText: {
    fontSize: 12,
    color: "#388E3C",
  },
  viewCertificateBtn: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: "stretch",
  },
  viewCertificateText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  coursesGrid: {
    flexDirection: "column",
    gap: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: 13,
    color: "#000",
    flex: 1,
  },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 11,
  },
  progressText: {
    fontSize: 11,
    color: "#666",
    marginBottom: 6,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  progressPercentage: {
    fontSize: 11,
    fontWeight: "600",
    color: "#666",
  },
  bottomSpacer: {
    height: 80,
  },
});
