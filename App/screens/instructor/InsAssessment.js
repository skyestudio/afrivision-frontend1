import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  useWindowDimensions,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Feather, Ionicons } from "@expo/vector-icons";
import InsTopNav from "../../components/InsTopNav";
import { SafeAreaView } from "react-native-safe-area-context";
import InsBottomNav from "../../components/InsBottomNav";

// Updated data structure with unique student information
const studentsData = [
  {
    id: "1",
    name: "Chukwuemeka Rodney",
    email: "rodney@unigate.com.ng",
    enrolledCourse: "Introduction to Python Programming",
    progress: "76%",
    lastActivity: "June 15, 2025",
    status: "Active",
    courseProgress: {
      courseName: "Introduction to Python Programming",
      sections: [
        {
          title: "Python Fundamentals",
          completed: true,
          lessons: [
            { title: "Installing Python & VS Code", completed: true },
            { title: "Hello World & Basic Syntax", completed: true },
            { title: "Variables, Data Types, and Input", completed: true },
            { title: "Quiz: Python Basics", score: "5/5" },
          ],
        },
        {
          title: "Control Flow in Python",
          completed: true,
          lessons: [
            { title: "If/Else Statements", completed: true },
            { title: "Loops (For/While)", completed: true },
            { title: "Quiz: Control Flow", score: "4/5" },
          ],
        },
        {
          title: "Build a Simple App",
          completed: true,
          lessons: [
            { title: "Project Setup", completed: true },
            { title: "Building a Calculator", completed: true },
            { title: "Final Project Submission", completed: false },
          ],
        },
      ],
    },
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    enrolledCourse: "Web Development Basics",
    progress: "45%",
    lastActivity: "June 14, 2025",
    status: "Active",
    courseProgress: {
      courseName: "Web Development Basics",
      sections: [
        {
          title: "HTML Fundamentals",
          completed: true,
          lessons: [
            { title: "HTML Structure", completed: true },
            { title: "Forms and Inputs", completed: true },
          ],
        },
        {
          title: "CSS Styling",
          completed: false,
          lessons: [
            { title: "CSS Selectors", completed: true },
            { title: "Flexbox Layout", completed: false },
          ],
        },
      ],
    },
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "m.chen@example.com",
    enrolledCourse: "Data Science 101",
    progress: "90%",
    lastActivity: "June 16, 2025",
    status: "Active",
    courseProgress: {
      courseName: "Data Science 101",
      sections: [
        {
          title: "Data Analysis",
          completed: true,
          lessons: [
            { title: "Pandas Basics", completed: true },
            { title: "Data Visualization", completed: true },
          ],
        },
      ],
    },
  },
  // Add more unique students as needed
];

const quizSubmissions = [
  {
    name: "Saron Mekonnen",
    submitted: "8 days ago",
    score: 68,
    feedback: "",
  },
  {
    name: "Dawit Tadesse",
    submitted: "8 days ago",
    score: 72,
    feedback: "Good effort, improve on syntax",
  },
  {
    name: "Helen Yilma",
    submitted: "8 days ago",
    score: 80,
    feedback: "",
  },
  {
    name: "Abel Getachew",
    submitted: "2 days ago",
    score: 80,
    feedback: "",
  },
  {
    name: "Bethlehem Gashaw",
    submitted: "1 day ago",
    score: 90,
    feedback: "Excellent performance!",
  },
  {
    name: "Bethlehem Gashaw",
    submitted: "1 day ago",
    score: 90,
    feedback: "Excellent performance!",
  },
  {
    name: "Bethlehem Gashaw",
    submitted: "1 day ago",
    score: 90,
    feedback: "Excellent performance!",
  },
  {
    name: "Bethlehem Gashaw",
    submitted: "1 day ago",
    score: 90,
    feedback: "Excellent performance!",
  },
  {
    name: "Bethlehem Gashaw",
    submitted: "1 day ago",
    score: 90,
    feedback: "Excellent performance!",
  },
  {
    name: "Bethlehem Gashaw",
    submitted: "1 day ago",
    score: 90,
    feedback: "Excellent performance!",
  },
  {
    name: "Bethlehem Gashaw",
    submitted: "1 day ago",
    score: 90,
    feedback: "Excellent performance!",
  },
];

export default function InsAssessment() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const styles = isMobile
    ? mobileStyles
    : isTablet
    ? tabletStyles
    : desktopStyles;
  const modalStyles = isMobile
    ? mobileModalStyles
    : isTablet
    ? tabletModalStyles
    : desktopModalStyles;

  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState([]);
  const [studentSpecModal, setStudentSpecModal] = useState(false);
  const [quizModalVisible, setQuizModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openSectionIndex, setOpenSectionIndex] = useState(null);

  const closeQuizModal = () => {
    setQuizModalVisible(false);
  };

  // Use studentsData instead of coursesData
  const filteredStudents = useMemo(() => {
    if (filter === "All") return studentsData;
    return studentsData.filter((s) => s.status === filter);
  }, [filter]);

  const allSelected =
    filteredStudents.length > 0 && selected.length === filteredStudents.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected([]);
    } else {
      setSelected(filteredStudents.map((s) => s.id));
    }
  };

  const toggleSelectRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Function to open modal with student data
  const openStudentModal = (student) => {
    setSelectedStudent(student);
    setQuizModalVisible(true);
    setStudentSpecModal(true);
  };

  const closeStudentModal = () => {
    setStudentSpecModal(false);
    setSelectedStudent(null);
  };

  const renderBadge = (status) => {
    const colors = {
      Active: "#22c55e5d",
      Inactive: "#facc15",
      Archived: "#ef4444",
    };

    return (
      <View
        style={[
          styles.badge,
          { backgroundColor: colors[status] || "#e5e7eb" },
        ]}>
        <Text style={styles.badgeText}>{status}</Text>
      </View>
    );
  };

  // Responsive table columns
  const renderTableHeader = () => {
    if (isMobile) {
      return (
        <View style={styles.tableHeader}>
          <View style={styles.checkboxCell}>
            <Checkbox value={allSelected} onValueChange={toggleSelectAll} />
          </View>
          <View style={[styles.headerCell, styles.nameCell]}>
            <Text style={styles.headerText}>Student</Text>
          </View>
          <View style={[styles.headerCell, styles.actionsCell]}>
            <Text style={styles.headerText}>Actions</Text>
          </View>
        </View>
      );
    }

    if (isTablet) {
      return (
        <View style={styles.tableHeader}>
          <View style={styles.checkboxCell}>
            <Checkbox value={allSelected} onValueChange={toggleSelectAll} />
          </View>
          <View style={[styles.headerCell, styles.nameCell]}>
            <Text style={styles.headerText}>Title</Text>
          </View>
          <View style={[styles.headerCell, styles.emailCell]}>
            <Text style={styles.headerText}>Course</Text>
          </View>
          <View style={[styles.headerCell, styles.progressCell]}>
            <Text style={styles.headerText}>Score</Text>
          </View>
          <View style={[styles.headerCell, styles.statusCell]}>
            <Text style={styles.headerText}>Status</Text>
          </View>
          <View style={[styles.headerCell, styles.actionsCell]}>
            <Text style={styles.headerText}>Actions</Text>
          </View>
        </View>
      );
    }

    // Desktop
    return (
      <View style={styles.tableHeader}>
        <View style={styles.checkboxCell}>
          <Checkbox value={allSelected} onValueChange={toggleSelectAll} />
        </View>
        <View style={[styles.headerCell, styles.nameCell]}>
          <Text style={styles.headerText}>Title</Text>
        </View>
        <View style={[styles.headerCell, styles.emailCell]}>
          <Text style={styles.headerText}>Course</Text>
        </View>
        <View style={[styles.headerCell, styles.courseCell]}>
          <Text style={styles.headerText}>Type</Text>
        </View>
        <View style={[styles.headerCell, styles.progressCell]}>
          <Text style={styles.headerText}>Submissions</Text>
        </View>
        <View style={[styles.headerCell, styles.activityCell]}>
          <Text style={styles.headerText}>Avg Score</Text>
        </View>
        <View style={[styles.headerCell, styles.statusCell]}>
          <Text style={styles.headerText}>Status</Text>
        </View>
        <View style={[styles.headerCell, styles.actionsCell]}>
          <Text style={styles.headerText}>Actions</Text>
        </View>
      </View>
    );
  };

  const renderTableRow = (student) => {
    if (isMobile) {
      return (
        <TouchableOpacity
          key={student.id}
          style={styles.row}
          onPress={() => openStudentModal(student)}>
          <View style={styles.checkboxCell}>
            <Checkbox
              value={selected.includes(student.id)}
              onValueChange={() => toggleSelectRow(student.id)}
              style={styles.checkbox}
            />
          </View>
          <View style={[styles.cell, styles.nameCell]}>
            <Text style={styles.nameText} numberOfLines={1}>
              {student.name}
            </Text>
            <Text style={styles.emailText} numberOfLines={1}>
              {student.enrolledCourse}
            </Text>
            <Text style={styles.progressText}>{student.progress}</Text>
          </View>
          <View style={[styles.cell, styles.statusCell]}>
            {renderBadge(student.status)}
          </View>
          <View style={[styles.cell, styles.actionsCell]}>
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => openStudentModal(student)}>
                <Feather name="eye" size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    if (isTablet) {
      return (
        <TouchableOpacity
          key={student.id}
          style={styles.row}
          onPress={() => openStudentModal(student)}>
          <View style={styles.checkboxCell}>
            <Checkbox
              value={selected.includes(student.id)}
              onValueChange={() => toggleSelectRow(student.id)}
              style={styles.checkbox}
            />
          </View>
          <View style={[styles.cell, styles.nameCell]}>
            <Text style={styles.nameText} numberOfLines={2}>
              {student.name}
            </Text>
          </View>
          <View style={[styles.cell, styles.emailCell]}>
            <Text style={styles.emailText} numberOfLines={1}>
              {student.enrolledCourse}
            </Text>
          </View>
          <View style={[styles.cell, styles.progressCell]}>
            <Text style={styles.progressText}>{student.progress}</Text>
          </View>
          <View style={[styles.cell, styles.statusCell]}>
            {renderBadge(student.status)}
          </View>
          <View style={[styles.cell, styles.actionsCell]}>
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => openStudentModal(student)}>
                <Feather name="eye" size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    // Desktop
    return (
      <TouchableOpacity
        key={student.id}
        style={styles.row}
        onPress={() => openStudentModal(student)}>
        <View style={styles.checkboxCell}>
          <Checkbox
            value={selected.includes(student.id)}
            onValueChange={() => toggleSelectRow(student.id)}
            style={styles.checkbox}
          />
        </View>
        <View style={[styles.cell, styles.nameCell]}>
          <Text style={styles.nameText} numberOfLines={2}>
            {student.name}
          </Text>
        </View>
        <View style={[styles.cell, styles.emailCell]}>
          <Text style={styles.emailText} numberOfLines={1}>
            {student.email}
          </Text>
        </View>
        <View style={[styles.cell, styles.courseCell]}>
          <Text style={styles.courseText} numberOfLines={2}>
            {student.enrolledCourse}
          </Text>
        </View>
        <View style={[styles.cell, styles.progressCell]}>
          <Text style={styles.progressText}>{student.progress}</Text>
        </View>
        <View style={[styles.cell, styles.activityCell]}>
          <Text style={styles.activityText}>{student.lastActivity}</Text>
        </View>
        <View style={[styles.cell, styles.statusCell]}>
          {renderBadge(student.status)}
        </View>
        <View style={[styles.cell, styles.actionsCell]}>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => openStudentModal(student)}>
              <Feather name="edit" size={16} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Feather name="trash" size={16} color="#ef4444" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => openStudentModal(student)}>
              <Feather name="eye" size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isMobile && (
        <>
          <InsTopNav activeNav={"IncMyStudentsScreen"} />
          <View style={styles.spacer} />
        </>
      )}

      <View style={styles.innerContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.heading}>Assessment</Text>
        </View>

        {/* Filters */}
        <View style={styles.filters}>
          {["All", "Active", "Inactive", "Archived"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.filterBtn, filter === item && styles.filterActive]}
              onPress={() => {
                setFilter(item);
                setSelected([]);
              }}>
              <Text
                style={[
                  styles.filterText,
                  filter === item && styles.filterTextActive,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Table Header */}
        {renderTableHeader()}

        {/* Table Body */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}>
          {filteredStudents.map((student) => renderTableRow(student))}
        </ScrollView>

        {/* Selection Info */}
        {selected.length > 0 && (
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionText}>
              {selected.length} student{selected.length !== 1 ? "s" : ""}{" "}
              selected
            </Text>
            <TouchableOpacity onPress={() => setSelected([])}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Pagination */}
        <View style={styles.pagination}>
          <TouchableOpacity style={styles.nextBtn}>
            <Text style={styles.nextText}>Next</Text>
            <Feather name="arrow-right" size={16} color="#111827" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Student Details Modal */}
      <Modal
        visible={quizModalVisible}
        animationType="fade"
        transparent
        onRequestClose={closeQuizModal}>
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.quizModalContent}>
            {/* Header */}
            <View style={modalStyles.quizHeader}>
              <View>
                <Text style={modalStyles.courseSubtitle}>
                  Introduction to Python
                </Text>
                <Text style={modalStyles.quizTitle}>Python Basics Quiz</Text>
              </View>

              <TouchableOpacity onPress={closeQuizModal}>
                <Ionicons name="close" size={22} color="#111" />
              </TouchableOpacity>
            </View>

            {/* Table Header */}
            <View style={modalStyles.tableHeaderRow}>
              <Text
                style={[
                  modalStyles.tableHeaderText,
                  { flex: isMobile ? 3 : 2 },
                ]}>
                Student Name
              </Text>
              {!isMobile && (
                <Text style={[modalStyles.tableHeaderText, { flex: 1.5 }]}>
                  Date Submitted
                </Text>
              )}
              <Text style={[modalStyles.tableHeaderText, { flex: 1 }]}>
                Score
              </Text>
              <Text
                style={[
                  modalStyles.tableHeaderText,
                  { flex: isMobile ? 2 : 2 },
                ]}>
                Feedback
              </Text>
            </View>

            {/* Table Body */}
            <ScrollView
              style={modalStyles.modalScroll}
              showsVerticalScrollIndicator={false}>
              {quizSubmissions.map((item, index) => (
                <View key={index} style={modalStyles.tableRow}>
                  <Text
                    style={[modalStyles.cellText, { flex: isMobile ? 3 : 2 }]}>
                    {item.name}
                  </Text>

                  {!isMobile && (
                    <Text style={[modalStyles.cellText, { flex: 1.5 }]}>
                      {item.submitted}
                    </Text>
                  )}

                  {/* Score Badge */}
                  <View style={[modalStyles.scoreBadge, { flex: 1 }]}>
                    <Text style={modalStyles.scoreText}>{item.score}</Text>
                  </View>

                  {/* Feedback */}
                  <View style={{ flex: isMobile ? 2 : 2 }}>
                    {item.feedback ? (
                      <Text style={modalStyles.feedbackText}>
                        {item.feedback}
                      </Text>
                    ) : (
                      <TouchableOpacity style={modalStyles.addFeedbackBtn}>
                        <Text style={modalStyles.addFeedbackText}>
                          Add Feedback
                        </Text>
                        {!isMobile && (
                          <Ionicons
                            name="arrow-forward-outline"
                            size={16}
                            color="#6b7280"
                          />
                        )}
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Footer */}
            <View style={modalStyles.quizFooter}>
              <TouchableOpacity style={modalStyles.paginationBtn}>
                <Ionicons name="arrow-back" size={18} color="#111" />
                {!isMobile && (
                  <Text style={modalStyles.paginationText}>Previous</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={modalStyles.paginationBtn}>
                {!isMobile && (
                  <Text style={modalStyles.paginationText}>Next</Text>
                )}
                <Ionicons name="arrow-forward" size={18} color="#111" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    width: "90%",
    alignSelf: "center",
  },
  header: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    gap: 12,
  },
  filterBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  filterActive: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  filterText: {
    color: "#374151",
    fontWeight: "500",
    fontSize: 14,
  },
  filterTextActive: {
    color: "#fff",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 4,
  },
  headerCell: {
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "600",
    fontSize: 12,
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  checkboxCell: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  // Column widths for desktop
  nameCell: { flex: 1.8 },
  emailCell: { flex: 1.8 },
  courseCell: { flex: 1.5 },
  progressCell: { flex: 1 },
  activityCell: { flex: 1.2 },
  statusCell: { flex: 1 },
  actionsCell: { flex: 1.2 },

  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 120,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    alignItems: "center",
    minHeight: 70,
  },
  cell: {
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  emailText: {
    fontSize: 13,
    color: "#374151",
  },
  courseText: {
    fontSize: 12,
    color: "#374151",
    lineHeight: 16,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#16a34a",
  },
  activityText: {
    fontSize: 12,
    color: "#374151",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#000",
    fontSize: 11,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  actionBtn: {
    padding: 6,
  },
  selectionInfo: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#dbeafe",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#93c5fd",
    zIndex: 10,
    width: "100%",
    alignSelf: "center",
  },
  selectionText: {
    color: "#1e40af",
    fontWeight: "600",
    fontSize: 14,
  },
  clearText: {
    color: "#dc2626",
    fontWeight: "600",
    fontSize: 14,
  },
  pagination: {
    position: "absolute",
    bottom: 24,
    right: 24,
    zIndex: 10,
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#afb2b8ff",
  },
  nextText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#111827",
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
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    width: "95%",
    alignSelf: "center",
  },
  header: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
    gap: 10,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  filterActive: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  filterText: {
    color: "#374151",
    fontWeight: "500",
    fontSize: 13,
  },
  filterTextActive: {
    color: "#fff",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 4,
  },
  headerCell: {
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "600",
    fontSize: 11,
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  checkboxCell: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  // Column widths for tablet
  nameCell: { flex: 2 },
  emailCell: { flex: 1.8 },
  progressCell: { flex: 0.8 },
  statusCell: { flex: 1 },
  actionsCell: { flex: 1 },

  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    alignItems: "center",
    minHeight: 65,
  },
  cell: {
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  nameText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#111827",
  },
  emailText: {
    fontSize: 12,
    color: "#374151",
  },
  progressText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#16a34a",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  actionBtn: {
    padding: 5,
  },
  selectionInfo: {
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#dbeafe",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#93c5fd",
    zIndex: 10,
    width: "100%",
    alignSelf: "center",
  },
  selectionText: {
    color: "#1e40af",
    fontWeight: "600",
    fontSize: 13,
  },
  clearText: {
    color: "#dc2626",
    fontWeight: "600",
    fontSize: 13,
  },
  pagination: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 10,
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#afb2b8ff",
  },
  nextText: {
    fontWeight: "600",
    fontSize: 13,
    color: "#111827",
  },
});

// MOBILE STYLES (< 768px)
const mobileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
    width: "100%",
  },
  header: {
    marginBottom: 16,
    marginTop: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
    gap: 8,
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
    minWidth: 70,
  },
  filterActive: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  filterText: {
    color: "#374151",
    fontWeight: "500",
    fontSize: 12,
    textAlign: "center",
  },
  filterTextActive: {
    color: "#fff",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 4,
  },
  headerCell: {
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "600",
    fontSize: 10,
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  checkboxCell: {
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  // Column widths for mobile
  nameCell: { flex: 3 },
  statusCell: { flex: 1 },
  actionsCell: { flex: 0.8 },

  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    alignItems: "center",
    minHeight: 60,
  },
  cell: {
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  nameText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 2,
  },
  emailText: {
    fontSize: 11,
    color: "#6b7280",
    marginBottom: 2,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#16a34a",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#000",
    fontSize: 9,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    padding: 4,
  },
  selectionInfo: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#dbeafe",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#93c5fd",
    zIndex: 10,
    width: "100%",
    marginHorizontal: 16,
  },
  selectionText: {
    color: "#1e40af",
    fontWeight: "600",
    fontSize: 12,
  },
  clearText: {
    color: "#dc2626",
    fontWeight: "600",
    fontSize: 12,
  },
  pagination: {
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 10,
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#afb2b8ff",
  },
  nextText: {
    fontWeight: "600",
    fontSize: 12,
    color: "#111827",
  },
});

// MODAL STYLES
// Desktop Modal
const desktopModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  quizModalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    width: "70%",
    maxHeight: "85%",
  },
  modalScroll: {
    maxHeight: 350,
  },
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  courseSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  cellText: {
    fontSize: 14,
    color: "#111827",
  },
  scoreBadge: {
    backgroundColor: "#f97316",
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 48,
  },
  scoreText: {
    color: "#fff",
    fontWeight: "700",
  },
  addFeedbackBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  addFeedbackText: {
    fontSize: 13,
    color: "#6b7280",
  },
  feedbackText: {
    fontSize: 14,
    color: "#111827",
  },
  quizFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  paginationBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  paginationText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },
});

// Tablet Modal
const tabletModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  quizModalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "85%",
    maxHeight: "80%",
  },
  modalScroll: {
    maxHeight: 350,
  },
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  courseSubtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 4,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  cellText: {
    fontSize: 13,
    color: "#111827",
  },
  scoreBadge: {
    backgroundColor: "#f97316",
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 44,
  },
  scoreText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  addFeedbackBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  addFeedbackText: {
    fontSize: 12,
    color: "#6b7280",
  },
  feedbackText: {
    fontSize: 13,
    color: "#111827",
  },
  quizFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  paginationBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  paginationText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111",
  },
});

// Mobile Modal
const mobileModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  quizModalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    width: "100%",
    maxHeight: "90%",
  },
  modalScroll: {
    maxHeight: 400,
  },
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  courseSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 6,
  },
  tableHeaderText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#374151",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  cellText: {
    fontSize: 12,
    color: "#111827",
  },
  scoreBadge: {
    backgroundColor: "#f97316",
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 40,
  },
  scoreText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 11,
  },
  addFeedbackBtn: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  addFeedbackText: {
    fontSize: 11,
    color: "#6b7280",
  },
  feedbackText: {
    fontSize: 12,
    color: "#111827",
  },
  quizFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  paginationBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  paginationText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111",
  },
});
