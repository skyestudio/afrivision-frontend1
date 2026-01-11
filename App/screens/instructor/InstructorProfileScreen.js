import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import InsTopNav from "../../components/InsTopNav";
import InsBottomNav from "../../components/InsBottomNav";

export default function InstructorProfileScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const styles = isMobile
    ? mobileStyles
    : isTablet
    ? tabletStyles
    : desktopStyles;

  const CourseCard = ({ title, students, status }) => {
    const isPublished = status === "Published";
    const cardWidth = isMobile ? "100%" : isTablet ? "48%" : "23%";

    return (
      <View style={[styles.courseCard, { width: cardWidth }]}>
        <View style={styles.courseHeader}>
          <Text style={styles.courseTitle} numberOfLines={2}>
            {title}
          </Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: isPublished ? "#dcfce7" : "#fef3c7" },
            ]}>
            <Text
              style={{
                fontSize: isMobile ? 10 : 12,
                fontWeight: "600",
                color: isPublished ? "#16a34a" : "#d97706",
              }}>
              {status}
            </Text>
          </View>
        </View>

        <Text style={styles.students}>{students}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isMobile && (
        <>
          <InsTopNav activeNav={"InstructorProfileScreen"} />
          <View style={styles.spacer} />
        </>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.content}
        contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileCard}>
          <View style={styles.profileLeft}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: "https://i.pravatar.cc/150?img=12" }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.avatarEdit}>
                <Ionicons
                  name="pencil"
                  size={isMobile ? 12 : 14}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.name}>Helen Yilma</Text>
              <Text style={styles.role}>UI/UX Instructor</Text>

              <View style={styles.locationRow}>
                <Ionicons
                  name="location-outline"
                  size={isMobile ? 12 : 14}
                  color="#6b7280"
                />
                <Text style={styles.location}>Addis Ababa, Ethiopia</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>
              {isMobile ? "Edit" : "Edit Profile"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>2,130</Text>
            <Text style={styles.statLabel}>Total Students</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>92%</Text>
            <Text style={styles.statLabel}>Completion</Text>
          </View>
        </View>

        {/* About */}
        <View style={styles.aboutCard}>
          <View style={styles.aboutHeader}>
            <Text style={styles.sectionTitle}>About</Text>
            <TouchableOpacity style={styles.iconEdit}>
              <Ionicons name="pencil" size={isMobile ? 12 : 14} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.aboutText}>
            I'm a UI/UX designer with 7+ years of experience in creating
            intuitive and accessible interfaces. I love simplifying complex
            design concepts for beginners.
          </Text>
        </View>

        {/* Contact Info */}
        <View style={styles.formCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <TouchableOpacity style={styles.iconEdit}>
              <Ionicons name="pencil" size={isMobile ? 12 : 14} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={[styles.formRow, isMobile && styles.formRowMobile]}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="helen.yilma@example.com"
                editable={false}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone number</Text>
              <TextInput
                style={styles.input}
                placeholder="+251 912 345 678"
                editable={false}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Preferred Contact Method</Text>
            <TextInput
              style={styles.inputFull}
              placeholder="Email"
              editable={false}
            />
          </View>
        </View>

        {/* Courses */}
        <View style={styles.coursesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Courses created</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.coursesGrid}>
            <CourseCard
              title="UI Design Basics"
              students="1,050 students"
              status="Published"
            />
            <CourseCard
              title="Figma for Beginners"
              students="850 students"
              status="Published"
            />
            <CourseCard
              title="Design Systems 101"
              students="230 students"
              status="Published"
            />
            <CourseCard
              title="Advanced UX Research"
              students="0 students"
              status="Draft"
            />
          </View>
        </View>
      </ScrollView>

      {isMobile && (
        <>
          <InsBottomNav activeNav="Dashboard" />
        </>
      )}
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
    paddingHorizontal: 24,
    width: "90%",
    alignSelf: "center",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  profileLeft: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  profileInfo: {
    flex: 1,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  avatarEdit: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#f97316",
    padding: 8,
    borderRadius: 14,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  role: {
    fontSize: 16,
    color: "#6b7280",
    marginVertical: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  location: {
    fontSize: 14,
    color: "#6b7280",
  },
  editBtn: {
    backgroundColor: "#f97316",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  editBtnText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 14,
  },
  statsRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    height: 100,
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  aboutCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  aboutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  aboutText: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
  },
  iconEdit: {
    backgroundColor: "#f97316",
    padding: 8,
    borderRadius: 12,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  formRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  formRowMobile: {
    flexDirection: "column",
    gap: 12,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#f9fafb",
    color: "#374151",
    fontSize: 14,
  },
  inputFull: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#f9fafb",
    color: "#374151",
    fontSize: 14,
  },
  coursesSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  coursesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 16,
  },
  courseCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  students: {
    fontSize: 14,
    color: "#6b7280",
  },
  viewAllText: {
    color: "#f97316",
    fontWeight: "600",
    fontSize: 14,
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
    paddingHorizontal: 20,
    width: "95%",
    alignSelf: "center",
  },
  scrollContent: {
    paddingBottom: 32,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  profileLeft: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  profileInfo: {
    flex: 1,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarEdit: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#f97316",
    padding: 7,
    borderRadius: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  role: {
    fontSize: 15,
    color: "#6b7280",
    marginVertical: 3,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  location: {
    fontSize: 13,
    color: "#6b7280",
  },
  editBtn: {
    backgroundColor: "#f97316",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editBtnText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 13,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    height: 90,
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 14,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 13,
    color: "#6b7280",
  },
  aboutCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  aboutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  aboutText: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },
  iconEdit: {
    backgroundColor: "#f97316",
    padding: 7,
    borderRadius: 10,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  formRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  formRowMobile: {
    flexDirection: "column",
    gap: 12,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f9fafb",
    color: "#374151",
    fontSize: 13,
  },
  inputFull: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f9fafb",
    color: "#374151",
    fontSize: 13,
  },
  coursesSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  coursesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 14,
    justifyContent: "space-between",
  },
  courseCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 14,
    minHeight: 110,
    marginBottom: 12,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  students: {
    fontSize: 13,
    color: "#6b7280",
  },
  viewAllText: {
    color: "#f97316",
    fontWeight: "600",
    fontSize: 13,
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
    width: "100%",
    height: 1,
    paddingBottom: 200,
  },
  scrollContent: {
    paddingBottom: 24,
    paddingTop: 16,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "column",
    gap: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  profileLeft: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  profileInfo: {
    flex: 1,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  avatarEdit: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#f97316",
    padding: 5,
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  role: {
    fontSize: 14,
    color: "#6b7280",
    marginVertical: 2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  location: {
    fontSize: 12,
    color: "#6b7280",
  },
  editBtn: {
    backgroundColor: "#f97316",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  editBtnText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 14,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    width: "47%",
    height: 80,
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 12,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  aboutCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  aboutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  aboutText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  iconEdit: {
    backgroundColor: "#f97316",
    padding: 6,
    borderRadius: 10,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  formRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  formRowMobile: {
    flexDirection: "column",
    gap: 12,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f9fafb",
    color: "#374151",
    fontSize: 14,
  },
  inputFull: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f9fafb",
    color: "#374151",
    fontSize: 14,
  },
  coursesSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  coursesGrid: {
    flexDirection: "column",
    gap: 12,
    marginTop: 12,
  },
  courseCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  students: {
    fontSize: 14,
    color: "#6b7280",
  },
  viewAllText: {
    color: "#f97316",
    fontWeight: "600",
    fontSize: 14,
  },
});
