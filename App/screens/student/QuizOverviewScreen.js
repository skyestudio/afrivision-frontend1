import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import TopNav from "../../components/TopNav";
import StudentBottomNav from "../../components/StudentBottomNav";

const LessonItem = ({
  title,
  duration,
  completed,
  active,
  type,
  isMobile,
  isTablet,
}) => {
  const { width } = useWindowDimensions();
  const styles =
    width >= 1024 ? desktopStyles : width >= 768 ? tabletStyles : mobileStyles;

  const icon = type === "quiz" ? "help-circle-outline" : "play-outline";
  const iconColor = active ? "#ff7a00" : completed ? "#16a34a" : "#666";

  return (
    <TouchableOpacity
      style={[styles.lessonItem, active && styles.lessonActive]}
    >
      <View
        style={[styles.lessonIconContainer, active && styles.lessonIconActive]}
      >
        {completed ? (
          <Ionicons
            name="checkmark-circle"
            size={isMobile ? 16 : 18}
            color={iconColor}
          />
        ) : (
          <Ionicons name={icon} size={isMobile ? 16 : 18} color={iconColor} />
        )}
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

export default function QuizOverviewScreen() {
  const { width } = useWindowDimensions();
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);

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
          completed: true,
        },
        {
          id: 2,
          title: "Hello World & Basic Syntax",
          duration: "10 min",
          type: "video",
          completed: true,
        },
        {
          id: 3,
          title: "Variables, Data Types, and Input",
          duration: "12 min",
          type: "video",
          completed: true,
        },
        {
          id: 4,
          title: "Quiz: Python Basics",
          duration: "10 min",
          type: "quiz",
          active: true,
          completed: false,
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
          completed: false,
        },
        {
          id: 6,
          title: "Loops: For & While",
          duration: "18 min",
          type: "video",
          completed: false,
        },
        {
          id: 7,
          title: "Quiz: Control Flow",
          duration: "10 min",
          type: "quiz",
          completed: false,
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
          completed: false,
        },
        {
          id: 9,
          title: "Parameters & Return Values",
          duration: "16 min",
          type: "video",
          completed: false,
        },
        {
          id: 10,
          title: "Quiz: Functions",
          duration: "10 min",
          type: "quiz",
          completed: false,
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
            <Ionicons name="book-outline" size={14} color="#666" />
            <Text style={styles.courseMetaText}>3 Modules</Text>
          </View>
          <View style={styles.courseMetaItem}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.courseMetaText}>12h 30m</Text>
          </View>
          <View style={styles.courseMetaItem}>
            <Ionicons name="pencil-outline" size={14} color="#666" />
            <Text style={styles.courseMetaText}>3 Quizzes</Text>
          </View>
        </View>

        <View style={styles.progressSummary}>
          <View style={styles.progressSummaryHeader}>
            <Text style={styles.progressSummaryTitle}>Course Progress</Text>
            <Text style={styles.progressSummaryPercentage}>30%</Text>
          </View>
          <View style={styles.progressSummaryBar}>
            <View style={[styles.progressSummaryFill, { width: "30%" }]} />
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
                  {module.lessons.filter((l) => l.completed).length}/
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
                    completed={lesson.completed}
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
          <Text style={styles.downloadText}>Course Resources</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gradesBtn}>
          <Ionicons name="ribbon-outline" size={20} color="#ff7a00" />
          <Text style={styles.gradesBtnText}>View All Grades</Text>
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

      {/* Navigation Arrows - Desktop/Tablet */}
      {!isMobile && (
        <View style={styles.topNav}>
          <TouchableOpacity style={styles.navArrow}>
            <Ionicons name="arrow-back" size={22} color="#ff7a00" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navArrow}>
            <Ionicons name="arrow-forward" size={22} color="#ff7a00" />
          </TouchableOpacity>
        </View>
      )}

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
            {/* Mobile Header */}
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
                <View style={styles.mobileNav}>
                  <TouchableOpacity style={styles.mobileNavBtn}>
                    <Ionicons name="arrow-back" size={20} color="#ff7a00" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.mobileNavBtn}>
                    <Ionicons name="arrow-forward" size={20} color="#ff7a00" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Quiz Header */}
            <View style={styles.quizHeader}>
              <View>
                <Text style={styles.quizBreadcrumb}>
                  Module 1 · Python Basics
                </Text>
                <Text style={styles.quizTitle}>Quiz: Python Basics</Text>
                <View style={styles.quizMetaContainer}>
                  <View style={styles.quizMetaItem}>
                    <Ionicons
                      name="help-circle-outline"
                      size={14}
                      color="#666"
                    />
                    <Text style={styles.quizMetaText}>10 Questions</Text>
                  </View>
                  <View style={styles.quizMetaItem}>
                    <Ionicons name="time-outline" size={14} color="#666" />
                    <Text style={styles.quizMetaText}>20 minutes</Text>
                  </View>
                  <View style={styles.quizMetaItem}>
                    <Ionicons name="star-outline" size={14} color="#666" />
                    <Text style={styles.quizMetaText}>10 points</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.startBtn}>
                <Text style={styles.startBtnText}>Start Quiz</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Grade Card */}
            <View style={styles.gradeCard}>
              <View style={styles.gradeHeader}>
                <View style={styles.gradeIconContainer}>
                  <Ionicons name="ribbon-outline" size={24} color="#ff7a00" />
                </View>
                <View style={styles.gradeInfo}>
                  <Text style={styles.gradeTitle}>Your Grade</Text>
                  <Text style={styles.gradeStatus}>Not submitted yet</Text>
                </View>
              </View>

              <Text style={styles.gradeDescription}>
                You haven't submitted this quiz yet. We keep your highest score.
                You need at least 70% to pass this module.
              </Text>

              <View style={styles.gradeStats}>
                <View style={styles.gradeStat}>
                  <Text style={styles.gradeStatValue}>0</Text>
                  <Text style={styles.gradeStatLabel}>Attempts</Text>
                </View>
                <View style={styles.gradeStatDivider} />
                <View style={styles.gradeStat}>
                  <Text style={styles.gradeStatValue}>70%</Text>
                  <Text style={styles.gradeStatLabel}>Passing score</Text>
                </View>
                <View style={styles.gradeStatDivider} />
                <View style={styles.gradeStat}>
                  <Text style={styles.gradeStatValue}>∞</Text>
                  <Text style={styles.gradeStatLabel}>Attempts left</Text>
                </View>
              </View>
            </View>

            {/* Quiz Instructions */}
            <View style={styles.instructionsCard}>
              <View style={styles.instructionsHeader}>
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color="#ff7a00"
                />
                <Text style={styles.instructionsTitle}>Quiz Instructions</Text>
              </View>

              <View style={styles.instructionsList}>
                <View style={styles.instructionItem}>
                  <View style={styles.instructionBullet} />
                  <Text style={styles.instructionText}>
                    This quiz consists of 10 multiple-choice questions
                  </Text>
                </View>
                <View style={styles.instructionItem}>
                  <View style={styles.instructionBullet} />
                  <Text style={styles.instructionText}>
                    You have 20 minutes to complete the quiz
                  </Text>
                </View>
                <View style={styles.instructionItem}>
                  <View style={styles.instructionBullet} />
                  <Text style={styles.instructionText}>
                    Each question is worth 1 point
                  </Text>
                </View>
                <View style={styles.instructionItem}>
                  <View style={styles.instructionBullet} />
                  <Text style={styles.instructionText}>
                    You can flag questions for review
                  </Text>
                </View>
                <View style={styles.instructionItem}>
                  <View style={styles.instructionBullet} />
                  <Text style={styles.instructionText}>
                    Your progress is automatically saved
                  </Text>
                </View>
              </View>
            </View>

            {/* Previous Attempts (if any) */}
            <View style={styles.attemptsCard}>
              <Text style={styles.attemptsTitle}>Previous Attempts</Text>
              <Text style={styles.attemptsEmpty}>
                No previous attempts found. Start the quiz to begin.
              </Text>
            </View>

            {/* Related Quizzes */}
            <View style={styles.relatedCard}>
              <Text style={styles.relatedTitle}>Upcoming Quizzes</Text>

              <TouchableOpacity style={styles.relatedItem}>
                <View style={styles.relatedItemLeft}>
                  <View style={styles.relatedIconContainer}>
                    <Ionicons
                      name="help-circle-outline"
                      size={18}
                      color="#666"
                    />
                  </View>
                  <View>
                    <Text style={styles.relatedItemTitle}>
                      Quiz: Control Flow
                    </Text>
                    <Text style={styles.relatedItemMeta}>
                      Module 2 · 8 questions
                    </Text>
                  </View>
                </View>
                <Ionicons name="lock-closed" size={16} color="#ccc" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.relatedItem}>
                <View style={styles.relatedItemLeft}>
                  <View style={styles.relatedIconContainer}>
                    <Ionicons
                      name="help-circle-outline"
                      size={18}
                      color="#666"
                    />
                  </View>
                  <View>
                    <Text style={styles.relatedItemTitle}>Quiz: Functions</Text>
                    <Text style={styles.relatedItemMeta}>
                      Module 3 · 10 questions
                    </Text>
                  </View>
                </View>
                <Ionicons name="lock-closed" size={16} color="#ccc" />
              </TouchableOpacity>
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
  topNav: {
    position: "absolute",
    top: 100,
    right: 90,
    flexDirection: "row",
    gap: 12,
    zIndex: 10,
  },
  navArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  quizBreadcrumb: {
    fontSize: 13,
    color: "#ff7a00",
    fontWeight: "500",
    marginBottom: 8,
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  quizMetaContainer: {
    flexDirection: "row",
    gap: 16,
  },
  quizMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  quizMetaText: {
    fontSize: 13,
    color: "#666",
  },
  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#ff7a00",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  startBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  gradeCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  gradeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  gradeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF3E0",
    alignItems: "center",
    justifyContent: "center",
  },
  gradeInfo: {
    flex: 1,
  },
  gradeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  gradeStatus: {
    fontSize: 14,
    color: "#f97316",
    fontWeight: "500",
  },
  gradeDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 20,
  },
  gradeStats: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
  },
  gradeStat: {
    flex: 1,
    alignItems: "center",
  },
  gradeStatValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  gradeStatLabel: {
    fontSize: 12,
    color: "#666",
  },
  gradeStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#e0e0e0",
  },
  instructionsCard: {
    backgroundColor: "#F8FAFF",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  instructionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  instructionsList: {
    gap: 12,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  instructionBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ff7a00",
  },
  instructionText: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  attemptsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  attemptsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  attemptsEmpty: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  },
  relatedCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  relatedTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
  },
  relatedItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  relatedItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  relatedIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  relatedItemTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 2,
  },
  relatedItemMeta: {
    fontSize: 11,
    color: "#999",
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
  topNav: {
    position: "absolute",
    top: 100,
    right: 32,
    flexDirection: "row",
    gap: 10,
    zIndex: 10,
  },
  navArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  quizBreadcrumb: {
    fontSize: 12,
    color: "#ff7a00",
    fontWeight: "500",
    marginBottom: 6,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  quizMetaContainer: {
    flexDirection: "row",
    gap: 12,
  },
  quizMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  quizMetaText: {
    fontSize: 12,
    color: "#666",
  },
  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#ff7a00",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  startBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  gradeCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  gradeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
  },
  gradeIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFF3E0",
    alignItems: "center",
    justifyContent: "center",
  },
  gradeInfo: {
    flex: 1,
  },
  gradeTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  gradeStatus: {
    fontSize: 13,
    color: "#f97316",
    fontWeight: "500",
  },
  gradeDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 16,
  },
  gradeStats: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 14,
    borderRadius: 10,
  },
  gradeStat: {
    flex: 1,
    alignItems: "center",
  },
  gradeStatValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  gradeStatLabel: {
    fontSize: 11,
    color: "#666",
  },
  gradeStatDivider: {
    width: 1,
    height: 25,
    backgroundColor: "#e0e0e0",
  },
  instructionsCard: {
    backgroundColor: "#F8FAFF",
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  instructionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 14,
  },
  instructionsTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  instructionsList: {
    gap: 10,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  instructionBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ff7a00",
  },
  instructionText: {
    fontSize: 13,
    color: "#666",
    flex: 1,
  },
  attemptsCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  attemptsTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
  attemptsEmpty: {
    fontSize: 13,
    color: "#999",
    fontStyle: "italic",
  },
  relatedCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  relatedTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 14,
  },
  relatedItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  relatedItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  relatedIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  relatedItemTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
    marginBottom: 2,
  },
  relatedItemMeta: {
    fontSize: 10,
    color: "#999",
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
    flex: 1,
    backgroundColor: "#fff",
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
  mobileNav: {
    flexDirection: "row",
    gap: 8,
  },
  mobileNavBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  quizHeader: {
    flexDirection: "column",
    gap: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  quizBreadcrumb: {
    fontSize: 11,
    color: "#ff7a00",
    fontWeight: "500",
    marginBottom: 4,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  quizMetaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  quizMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  quizMetaText: {
    fontSize: 11,
    color: "#666",
  },
  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#ff7a00",
    paddingVertical: 12,
    borderRadius: 8,
  },
  startBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  gradeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  gradeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  gradeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF3E0",
    alignItems: "center",
    justifyContent: "center",
  },
  gradeInfo: {
    flex: 1,
  },
  gradeTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  gradeStatus: {
    fontSize: 12,
    color: "#f97316",
    fontWeight: "500",
  },
  gradeDescription: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
    marginBottom: 14,
  },
  gradeStats: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
  },
  gradeStat: {
    flex: 1,
    alignItems: "center",
  },
  gradeStatValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  gradeStatLabel: {
    fontSize: 10,
    color: "#666",
  },
  gradeStatDivider: {
    width: 1,
    height: 20,
    backgroundColor: "#e0e0e0",
  },
  instructionsCard: {
    backgroundColor: "#F8FAFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  instructionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  instructionsList: {
    gap: 8,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  instructionBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ff7a00",
  },
  instructionText: {
    fontSize: 12,
    color: "#666",
    flex: 1,
  },
  attemptsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  attemptsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  attemptsEmpty: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
  relatedCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  relatedTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  relatedItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  relatedItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  relatedIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  relatedItemTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000",
    marginBottom: 2,
  },
  relatedItemMeta: {
    fontSize: 9,
    color: "#999",
  },
  bottomSpacer: {
    height: 80,
  },
});
