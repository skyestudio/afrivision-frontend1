import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  StatusBar,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import TopNav from "../../components/TopNav";
import StudentBottomNav from "../../components/StudentBottomNav";

const LessonItem = ({ title, duration, active, type, isMobile, isTablet }) => {
  const { width } = useWindowDimensions();
  const styles =
    width >= 1024 ? desktopStyles : width >= 768 ? tabletStyles : mobileStyles;

  const icon =
    type === "video"
      ? "play-outline"
      : type === "quiz"
        ? "help-circle-outline"
        : "document-text-outline";
  const iconColor = active ? "#ff7a00" : "#666";

  return (
    <TouchableOpacity
      style={[styles.lessonItem, active && styles.lessonActive]}
    >
      <View
        style={[styles.lessonIconContainer, active && styles.lessonIconActive]}
      >
        <Ionicons name={icon} size={isMobile ? 16 : 18} color={iconColor} />
      </View>
      <View style={styles.lessonContent}>
        <Text
          style={[styles.lessonTitle, active && styles.lessonTitleActive]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text style={styles.lessonTime}>{duration}</Text>
      </View>
      {active && (
        <View style={styles.activeIndicator}>
          <Ionicons name="play" size={12} color="#ff7a00" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function LessonPlayerScreen() {
  const { width } = useWindowDimensions();
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0); // For demo purposes

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const styles = isMobile
    ? mobileStyles
    : isTablet
      ? tabletStyles
      : desktopStyles;

  const modules = [
    {
      id: 1,
      title: "Module 1: Python Basics",
      expanded: true,
      lessons: [
        {
          id: 1,
          title: "Installing Python & VS Code",
          duration: "7 min",
          type: "video",
          active: true,
        },
        {
          id: 2,
          title: "Hello World & Basic Syntax",
          duration: "10 min",
          type: "video",
          active: false,
        },
        {
          id: 3,
          title: "Variables, Data Types, and Input",
          duration: "12 min",
          type: "video",
          active: false,
        },
        {
          id: 4,
          title: "Quiz: Python Basics",
          duration: "10 min",
          type: "quiz",
          active: false,
        },
      ],
    },
    {
      id: 2,
      title: "Module 2: Control Flow",
      expanded: false,
      lessons: [
        {
          id: 5,
          title: "Conditional Statements",
          duration: "15 min",
          type: "video",
          active: false,
        },
        {
          id: 6,
          title: "Loops: For & While",
          duration: "18 min",
          type: "video",
          active: false,
        },
        {
          id: 7,
          title: "Quiz: Control Flow",
          duration: "10 min",
          type: "quiz",
          active: false,
        },
      ],
    },
    {
      id: 3,
      title: "Module 3: Functions",
      expanded: false,
      lessons: [
        {
          id: 8,
          title: "Defining Functions",
          duration: "14 min",
          type: "video",
          active: false,
        },
        {
          id: 9,
          title: "Parameters & Return Values",
          duration: "16 min",
          type: "video",
          active: false,
        },
        {
          id: 10,
          title: "Quiz: Functions",
          duration: "10 min",
          type: "quiz",
          active: false,
        },
      ],
    },
  ];

  const SidebarContent = () => (
    <>
      <View style={styles.sidebarHeader}>
        <View style={styles.sidebarHeaderTop}>
          <Text style={styles.courseTitle} numberOfLines={2}>
            Introduction to Python Programming
          </Text>
          {isMobile && (
            <TouchableOpacity
              style={styles.closeSidebarBtn}
              onPress={() => setMobileSidebarVisible(false)}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.courseMeta}>
          <View style={styles.courseMetaItem}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.courseMetaText}>12h 30m</Text>
          </View>
          <View style={styles.courseMetaItem}>
            <Ionicons name="book-outline" size={14} color="#666" />
            <Text style={styles.courseMetaText}>3 Modules</Text>
          </View>
          <View style={styles.courseMetaItem}>
            <Ionicons name="people-outline" size={14} color="#666" />
            <Text style={styles.courseMetaText}>2.5k Students</Text>
          </View>
        </View>

        <View style={styles.progressSummary}>
          <View style={styles.progressSummaryHeader}>
            <Text style={styles.progressSummaryTitle}>Overall Progress</Text>
            <Text style={styles.progressSummaryPercentage}>45%</Text>
          </View>
          <View style={styles.progressSummaryBar}>
            <View style={[styles.progressSummaryFill, { width: "45%" }]} />
          </View>
        </View>
      </View>

      <View style={styles.modulesContainer}>
        {modules.map((module) => (
          <View key={module.id} style={styles.moduleSection}>
            <TouchableOpacity style={styles.moduleHeader}>
              <View style={styles.moduleHeaderLeft}>
                <View style={styles.moduleIconContainer}>
                  <Ionicons
                    name={module.expanded ? "chevron-down" : "chevron-forward"}
                    size={16}
                    color="#666"
                  />
                </View>
                <Text style={styles.moduleTitle}>{module.title}</Text>
              </View>
              <View style={styles.moduleStats}>
                <Text style={styles.moduleProgress}>
                  {module.lessons.filter((l) => l.active).length}/
                  {module.lessons.length}
                </Text>
              </View>
            </TouchableOpacity>

            {module.expanded && (
              <View style={styles.lessonsList}>
                {module.lessons.map((lesson) => (
                  <LessonItem
                    key={lesson.id}
                    title={lesson.title}
                    duration={lesson.duration}
                    active={lesson.active}
                    type={lesson.type}
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      <View style={styles.sidebarFooter}>
        <TouchableOpacity style={styles.downloadBtn}>
          <Ionicons name="cloud-download-outline" size={20} color="#666" />
          <Text style={styles.downloadText}>Download Resources</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gradesBtn}>
          <Ionicons name="ribbon-outline" size={20} color="#ff7a00" />
          <Text style={styles.gradesBtnText}>View Grades</Text>
          <Ionicons name="chevron-forward" size={16} color="#ff7a00" />
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {!isMobile && <TopNav activeNav={"My Courses"} />}
      <View style={!isMobile && styles.spacer} />

      {/* Mobile Sidebar Modal */}
      {isMobile && (
        <Modal
          visible={mobileSidebarVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setMobileSidebarVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalSidebar}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.modalSidebarContent}
              >
                <SidebarContent />
              </ScrollView>
            </View>
            <TouchableOpacity
              style={styles.modalBackdrop}
              onPress={() => setMobileSidebarVisible(false)}
              activeOpacity={1}
            />
          </View>
        </Modal>
      )}

      {/* Main Layout - SINGLE SCROLLVIEW */}
      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={styles.mainScrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.layout}>
          {/* Desktop/Tablet Sidebar - Integrated into scroll */}
          {!isMobile && (
            <View style={styles.sidebar}>
              <SidebarContent />
            </View>
          )}

          {/* Main Content */}
          <View style={styles.content}>
            {/* Mobile Header with Menu */}
            {isMobile && (
              <View style={styles.mobileHeader}>
                <TouchableOpacity
                  style={styles.menuBtn}
                  onPress={() => setMobileSidebarVisible(true)}
                >
                  <Ionicons name="menu-outline" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.mobileTitle} numberOfLines={1}>
                  Python Programming
                </Text>
                <TouchableOpacity style={styles.mobileOptionsBtn}>
                  <Ionicons name="ellipsis-vertical" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            )}

            {/* Video Player Section */}
            <View style={styles.videoSection}>
              <View style={styles.videoCard}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1584697964154-3bdf2a99b94d?w=1200",
                  }}
                  style={styles.videoImage}
                />

                <View style={styles.playOverlay}>
                  <TouchableOpacity style={styles.playButton}>
                    <Ionicons
                      name="play"
                      size={isMobile ? 24 : 32}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.videoControls}>
                  <View style={styles.videoInfo}>
                    <Text style={styles.currentLessonTitle}>
                      Installing Python & VS Code
                    </Text>
                    <Text style={styles.currentLessonMeta}>
                      Lesson 1 of 12 · 7 min remaining
                    </Text>
                  </View>
                  <View style={styles.videoActions}>
                    <TouchableOpacity style={styles.videoActionBtn}>
                      <Ionicons name="volume-high" size={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.videoActionBtn}>
                      <Ionicons
                        name="settings-outline"
                        size={20}
                        color="#fff"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.videoActionBtn}>
                      <Ionicons name="expand-outline" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Current Progress</Text>
                  <Text style={styles.progressPercentage}>45%</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: "45%" }]} />
                </View>
                <View style={styles.progressSteps}>
                  <Text style={styles.progressStep}>
                    Completed: 5/12 lessons
                  </Text>
                  <Text style={styles.progressStep}>
                    Next: Variables & Data Types
                  </Text>
                </View>
              </View>

              {/* Lesson Navigation for Mobile */}
              {isMobile && (
                <View style={styles.mobileNavigation}>
                  <TouchableOpacity style={styles.navPrevBtn}>
                    <Ionicons name="chevron-back" size={20} color="#666" />
                    <Text style={styles.navBtnText}>Previous</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.navNextBtn}>
                    <Text style={styles.navNextText}>Next Lesson</Text>
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              )}

              {/* Lesson Description */}
              <View style={styles.descriptionSection}>
                <View style={styles.descriptionHeader}>
                  <Text style={styles.descriptionTitle}>About this lesson</Text>
                  <TouchableOpacity style={styles.resourcesBtn}>
                    <Ionicons
                      name="document-attach-outline"
                      size={16}
                      color="#ff7a00"
                    />
                    <Text style={styles.resourcesBtnText}>Resources</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.descriptionText}>
                  In this lesson, you'll learn how to set up your Python
                  development environment by installing Python and Visual Studio
                  Code. We'll cover the installation process step by step and
                  ensure everything is configured correctly.
                </Text>

                <View style={styles.tags}>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>Beginner Friendly</Text>
                  </View>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>Hands-on</Text>
                  </View>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>Practical</Text>
                  </View>
                </View>
              </View>

              {/* Instructor Section */}
              <View style={styles.instructorSection}>
                <Text style={styles.instructorSectionTitle}>
                  Your Instructor
                </Text>
                <View style={styles.instructorCard}>
                  <Image
                    source={{ uri: "https://i.pravatar.cc/150?img=8" }}
                    style={styles.instructorAvatar}
                  />
                  <View style={styles.instructorInfo}>
                    <Text style={styles.instructorName}>Dr. Sarah Johnson</Text>
                    <Text style={styles.instructorTitle}>
                      Senior Python Developer, 12+ years experience
                    </Text>
                    <View style={styles.instructorStats}>
                      <View style={styles.instructorStat}>
                        <Ionicons name="star" size={14} color="#FFB800" />
                        <Text style={styles.instructorStatText}>4.8</Text>
                      </View>
                      <View style={styles.instructorStat}>
                        <Ionicons
                          name="people-outline"
                          size={14}
                          color="#666"
                        />
                        <Text style={styles.instructorStatText}>
                          15k+ students
                        </Text>
                      </View>
                      <View style={styles.instructorStat}>
                        <Ionicons
                          name="play-circle-outline"
                          size={14}
                          color="#666"
                        />
                        <Text style={styles.instructorStatText}>
                          24 courses
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Desktop/Tablet Navigation */}
              {!isMobile && (
                <View style={styles.desktopNavigation}>
                  <TouchableOpacity style={styles.desktopNavPrev}>
                    <Ionicons
                      name="chevron-back-circle-outline"
                      size={24}
                      color="#666"
                    />
                    <View style={styles.desktopNavText}>
                      <Text style={styles.desktopNavLabel}>Previous</Text>
                      <Text style={styles.desktopNavTitle}>
                        Hello World & Basic Syntax
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.desktopNavNext}>
                    <View style={styles.desktopNavTextRight}>
                      <Text style={styles.desktopNavLabel}>Next</Text>
                      <Text style={styles.desktopNavTitle}>
                        Variables, Data Types & Input
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward-circle-outline"
                      size={24}
                      color="#ff7a00"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.bottomSpacer} />
          </View>
        </View>
      </ScrollView>

      {isMobile && <StudentBottomNav />}
    </SafeAreaView>
  );
}

// DESKTOP STYLES (≥ 1024px)
const desktopStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  spacer: {
    height: 70,
  },
  mainScroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainScrollContent: {
    flexGrow: 1,
  },
  layout: {
    flexDirection: "row",
    minHeight: "100%",
  },
  sidebar: {
    width: 360,
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#f0f0f0",
    paddingVertical: 24,
  },
  sidebarHeader: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sidebarHeaderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 12,
    flex: 1,
  },
  courseMeta: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  courseMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  courseMetaText: {
    fontSize: 12,
    color: "#666",
  },
  progressSummary: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
  },
  progressSummaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressSummaryTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666",
  },
  progressSummaryPercentage: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ff7a00",
  },
  progressSummaryBar: {
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressSummaryFill: {
    height: "100%",
    backgroundColor: "#ff7a00",
    borderRadius: 2,
  },
  modulesContainer: {
    paddingVertical: 16,
  },
  moduleSection: {
    marginBottom: 8,
  },
  moduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  moduleHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  moduleIconContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  moduleTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  moduleStats: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  moduleProgress: {
    fontSize: 11,
    color: "#666",
  },
  lessonsList: {
    paddingLeft: 24,
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 10,
    marginBottom: 4,
    marginRight: 16,
  },
  lessonActive: {
    backgroundColor: "#FFF3E0",
  },
  lessonIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  lessonIconActive: {
    backgroundColor: "#fff",
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontWeight: "500",
    fontSize: 13,
    color: "#000",
    marginBottom: 2,
  },
  lessonTitleActive: {
    color: "#ff7a00",
    fontWeight: "600",
  },
  lessonTime: {
    fontSize: 11,
    color: "#999",
  },
  activeIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  sidebarFooter: {
    marginTop: "auto",
    paddingHorizontal: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: 12,
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#f8f9fa",
  },
  downloadText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  gradesBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#FFF3E0",
  },
  gradesBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ff7a00",
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 32,
    backgroundColor: "#fff",
  },
  videoSection: {
    maxWidth: 900,
    alignSelf: "center",
    width: "100%",
  },
  videoCard: {
    backgroundColor: "#000",
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  videoImage: {
    width: "100%",
    height: 400,
    opacity: 0.8,
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#ff7a00",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  videoControls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
  },
  videoInfo: {
    flex: 1,
  },
  currentLessonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  currentLessonMeta: {
    fontSize: 12,
    color: "#ccc",
  },
  videoActions: {
    flexDirection: "row",
    gap: 16,
  },
  videoActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  progressSection: {
    marginTop: 24,
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ff7a00",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#ff7a00",
    borderRadius: 3,
  },
  progressSteps: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressStep: {
    fontSize: 12,
    color: "#666",
  },
  descriptionSection: {
    marginTop: 32,
  },
  descriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  resourcesBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  resourcesBtnText: {
    fontSize: 13,
    color: "#ff7a00",
    fontWeight: "600",
  },
  descriptionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    marginBottom: 16,
  },
  tags: {
    flexDirection: "row",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
  },
  tagText: {
    fontSize: 11,
    color: "#666",
  },
  instructorSection: {
    marginTop: 32,
  },
  instructorSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
  },
  instructorCard: {
    flexDirection: "row",
    gap: 16,
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
  },
  instructorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  instructorTitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 12,
  },
  instructorStats: {
    flexDirection: "row",
    gap: 16,
  },
  instructorStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  instructorStatText: {
    fontSize: 12,
    color: "#666",
  },
  desktopNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  desktopNavPrev: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  desktopNavNext: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  desktopNavText: {
    alignItems: "flex-start",
  },
  desktopNavTextRight: {
    alignItems: "flex-end",
  },
  desktopNavLabel: {
    fontSize: 11,
    color: "#999",
    marginBottom: 2,
  },
  desktopNavTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
  },
  bottomSpacer: {
    height: 40,
  },
});

// TABLET STYLES (768px - 1023px)
const tabletStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  spacer: {
    height: 70,
  },
  mainScroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainScrollContent: {
    flexGrow: 1,
  },
  layout: {
    flexDirection: "row",
    minHeight: "100%",
  },
  sidebar: {
    width: 300,
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#f0f0f0",
    paddingVertical: 20,
  },
  sidebarHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sidebarHeaderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
    flex: 1,
  },
  courseMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 14,
  },
  courseMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  courseMetaText: {
    fontSize: 11,
    color: "#666",
  },
  progressSummary: {
    backgroundColor: "#f8f9fa",
    padding: 14,
    borderRadius: 10,
  },
  progressSummaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  progressSummaryTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
  },
  progressSummaryPercentage: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ff7a00",
  },
  progressSummaryBar: {
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressSummaryFill: {
    height: "100%",
    backgroundColor: "#ff7a00",
    borderRadius: 2,
  },
  modulesContainer: {
    paddingVertical: 14,
  },
  moduleSection: {
    marginBottom: 6,
  },
  moduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  moduleHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  moduleIconContainer: {
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  moduleTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
  },
  moduleStats: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  moduleProgress: {
    fontSize: 10,
    color: "#666",
  },
  lessonsList: {
    paddingLeft: 20,
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 8,
    marginBottom: 4,
    marginRight: 14,
  },
  lessonActive: {
    backgroundColor: "#FFF3E0",
  },
  lessonIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontWeight: "500",
    fontSize: 12,
    color: "#000",
    marginBottom: 2,
  },
  lessonTitleActive: {
    color: "#ff7a00",
    fontWeight: "600",
  },
  lessonTime: {
    fontSize: 10,
    color: "#999",
  },
  sidebarFooter: {
    marginTop: "auto",
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: 10,
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
  },
  downloadText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666",
  },
  gradesBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#FFF3E0",
  },
  gradesBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ff7a00",
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  videoSection: {
    maxWidth: 700,
    alignSelf: "center",
    width: "100%",
  },
  videoCard: {
    backgroundColor: "#000",
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
  },
  videoImage: {
    width: "100%",
    height: 300,
    opacity: 0.8,
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
    backgroundColor: "#ff7a00",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  videoControls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
  },
  videoInfo: {
    flex: 1,
  },
  currentLessonTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  currentLessonMeta: {
    fontSize: 11,
    color: "#ccc",
  },
  videoActions: {
    flexDirection: "row",
    gap: 12,
  },
  videoActionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  progressSection: {
    marginTop: 20,
    padding: 18,
    backgroundColor: "#f8f9fa",
    borderRadius: 14,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666",
  },
  progressPercentage: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ff7a00",
  },
  progressBar: {
    height: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 2.5,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#ff7a00",
    borderRadius: 2.5,
  },
  progressSteps: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressStep: {
    fontSize: 11,
    color: "#666",
  },
  descriptionSection: {
    marginTop: 28,
  },
  descriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  descriptionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  resourcesBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  resourcesBtnText: {
    fontSize: 12,
    color: "#ff7a00",
    fontWeight: "600",
  },
  descriptionText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
    marginBottom: 14,
  },
  tags: {
    flexDirection: "row",
    gap: 6,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 14,
  },
  tagText: {
    fontSize: 10,
    color: "#666",
  },
  instructorSection: {
    marginTop: 28,
  },
  instructorSectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 14,
  },
  instructorCard: {
    flexDirection: "row",
    gap: 14,
    padding: 18,
    backgroundColor: "#f8f9fa",
    borderRadius: 14,
  },
  instructorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  instructorTitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  instructorStats: {
    flexDirection: "row",
    gap: 14,
  },
  instructorStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  instructorStatText: {
    fontSize: 11,
    color: "#666",
  },
  desktopNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  desktopNavPrev: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  desktopNavNext: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  desktopNavText: {
    alignItems: "flex-start",
  },
  desktopNavTextRight: {
    alignItems: "flex-end",
  },
  desktopNavLabel: {
    fontSize: 10,
    color: "#999",
    marginBottom: 2,
  },
  desktopNavTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000",
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
  mainScroll: {
    // flex: 1,
    backgroundColor: "#fff",
    height: 1,
  },
  mainScrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  layout: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBackdrop: {
    flex: 1,
  },
  modalSidebar: {
    width: 300,
    backgroundColor: "#fff",
    height: "100%",
  },
  modalSidebarContent: {
    paddingVertical: 20,
  },
  sidebarHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sidebarHeaderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
    flex: 1,
  },
  closeSidebarBtn: {
    padding: 4,
  },
  courseMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 14,
  },
  courseMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  courseMetaText: {
    fontSize: 11,
    color: "#666",
  },
  progressSummary: {
    backgroundColor: "#f8f9fa",
    padding: 14,
    borderRadius: 10,
  },
  progressSummaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  progressSummaryTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
  },
  progressSummaryPercentage: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ff7a00",
  },
  progressSummaryBar: {
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressSummaryFill: {
    height: "100%",
    backgroundColor: "#ff7a00",
    borderRadius: 2,
  },
  modulesContainer: {
    paddingVertical: 14,
  },
  moduleSection: {
    marginBottom: 6,
  },
  moduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  moduleHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  moduleIconContainer: {
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  moduleTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
  },
  moduleStats: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  moduleProgress: {
    fontSize: 10,
    color: "#666",
  },
  lessonsList: {
    paddingLeft: 20,
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 8,
    marginBottom: 4,
    marginRight: 14,
  },
  lessonActive: {
    backgroundColor: "#FFF3E0",
  },
  lessonIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontWeight: "500",
    fontSize: 12,
    color: "#000",
    marginBottom: 2,
  },
  lessonTitleActive: {
    color: "#ff7a00",
    fontWeight: "600",
  },
  lessonTime: {
    fontSize: 10,
    color: "#999",
  },
  sidebarFooter: {
    marginTop: "auto",
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: 10,
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
  },
  downloadText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666",
  },
  gradesBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#FFF3E0",
  },
  gradesBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ff7a00",
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  mobileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  menuBtn: {
    padding: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  mobileTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
    textAlign: "center",
  },
  mobileOptionsBtn: {
    padding: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  videoSection: {
    width: "100%",
  },
  videoCard: {
    backgroundColor: "#000",
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  videoImage: {
    width: "100%",
    height: 200,
    opacity: 0.8,
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ff7a00",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  videoControls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
  },
  videoInfo: {
    flex: 1,
  },
  currentLessonTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  currentLessonMeta: {
    fontSize: 10,
    color: "#ccc",
  },
  videoActions: {
    flexDirection: "row",
    gap: 8,
  },
  videoActionBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  progressSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ff7a00",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#ff7a00",
    borderRadius: 2,
  },
  progressSteps: {
    flexDirection: "column",
    gap: 4,
  },
  progressStep: {
    fontSize: 10,
    color: "#666",
  },
  mobileNavigation: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  navPrevBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  navBtnText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  navNextBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    backgroundColor: "#ff7a00",
    borderRadius: 8,
  },
  navNextText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  descriptionSection: {
    marginTop: 24,
  },
  descriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  resourcesBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  resourcesBtnText: {
    fontSize: 11,
    color: "#ff7a00",
    fontWeight: "600",
  },
  descriptionText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
    marginBottom: 12,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
  },
  tagText: {
    fontSize: 9,
    color: "#666",
  },
  instructorSection: {
    marginTop: 24,
  },
  instructorSectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  instructorCard: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  instructorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  instructorTitle: {
    fontSize: 11,
    color: "#666",
    marginBottom: 8,
  },
  instructorStats: {
    flexDirection: "row",
    gap: 10,
  },
  instructorStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  instructorStatText: {
    fontSize: 10,
    color: "#666",
  },
  bottomSpacer: {
    height: 20,
  },
});
