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
    id: "4",
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
    id: "5",
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
    id: "6",
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
    id: "7",
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
    id: "8",
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
    id: "9",
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
];

export default function IncMyStudentsScreen() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState([]);
  const [studentSpecModal, setStudentSpecModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openSectionIndex, setOpenSectionIndex] = useState(null);

  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  // Choose the appropriate styles based on screen size
  const styles = isMobile
    ? mobileStyles
    : isTablet
    ? tabletStyles
    : desktopStyles;

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

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        {!isMobile && (
          <>
            <InsTopNav activeNav={"IncMyStudentsScreen"} />
            <View style={styles.spacer} />
          </>
        )}

        <View style={styles.innerContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.heading}>My Students</Text>
          </View>

          {/* Filters - Horizontal scroll on mobile */}
          <View style={styles.filtersContainer}>
            <ScrollView
              horizontal={isMobile}
              showsHorizontalScrollIndicator={false}
              style={styles.filtersScroll}
              contentContainerStyle={styles.filtersScrollContent}>
              <View style={styles.filters}>
                {["All", "Active", "Inactive", "Archived"].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.filterBtn,
                      filter === item && styles.filterActive,
                    ]}
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
            </ScrollView>
          </View>

          {/* Table Header - Different layout for mobile */}
          {!isMobile ? (
            <View style={styles.tableHeader}>
              <View style={styles.checkboxCell}>
                <Checkbox value={allSelected} onValueChange={toggleSelectAll} />
              </View>
              <View style={[styles.headerCell, styles.nameCell]}>
                <Text style={styles.headerText}>Student Name</Text>
              </View>
              <View style={[styles.headerCell, styles.emailCell]}>
                <Text style={styles.headerText}>Email</Text>
              </View>
              <View style={[styles.headerCell, styles.courseCell]}>
                <Text style={styles.headerText}>Enrolled Course</Text>
              </View>
              <View style={[styles.headerCell, styles.progressCell]}>
                <Text style={styles.headerText}>Progress</Text>
              </View>
              <View style={[styles.headerCell, styles.activityCell]}>
                <Text style={styles.headerText}>Last Activity</Text>
              </View>
              <View style={[styles.headerCell, styles.statusCell]}>
                <Text style={styles.headerText}>Status</Text>
              </View>
              <View style={[styles.headerCell, styles.actionsCell]}>
                <Text style={styles.headerText}>Actions</Text>
              </View>
            </View>
          ) : (
            <View style={styles.tableHeaderMobile}>
              <View style={styles.checkboxCellMobile}>
                <Checkbox value={allSelected} onValueChange={toggleSelectAll} />
              </View>
              <View style={styles.nameCellMobile}>
                <Text style={styles.headerText}>Student Details</Text>
              </View>
              <View style={styles.actionsCellMobile}>
                <Text style={styles.headerText}>Actions</Text>
              </View>
            </View>
          )}

          {/* Table Body */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={true}>
            {filteredStudents.map((student) =>
              !isMobile ? (
                // Desktop/Tablet Row
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
                    <Text style={styles.activityText}>
                      {student.lastActivity}
                    </Text>
                  </View>
                  <View style={[styles.cell, styles.statusCell]}>
                    {renderBadge(student.status)}
                  </View>
                  <View style={[styles.cell, styles.actionsCell]}>
                    <View style={styles.actionsContainer}>
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
              ) : (
                // Mobile Row
                <TouchableOpacity
                  key={student.id}
                  style={styles.rowMobile}
                  onPress={() => openStudentModal(student)}>
                  <View style={styles.checkboxCellMobile}>
                    <Checkbox
                      value={selected.includes(student.id)}
                      onValueChange={() => toggleSelectRow(student.id)}
                      style={styles.checkbox}
                    />
                  </View>
                  <View style={styles.nameCellMobile}>
                    <Text style={styles.nameText} numberOfLines={1}>
                      {student.name}
                    </Text>
                    <Text style={styles.emailTextMobile} numberOfLines={1}>
                      {student.email}
                    </Text>
                    <View style={styles.mobileRowDetails}>
                      <Text style={styles.courseTextMobile} numberOfLines={1}>
                        {student.enrolledCourse}
                      </Text>
                      <View style={styles.mobileProgressRow}>
                        {renderBadge(student.status)}
                        <Text style={styles.progressTextMobile}>
                          {student.progress}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.actionsCellMobile}>
                    <View style={styles.actionsContainerMobile}>
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
              )
            )}
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
          {!isMobile && (
            <View style={styles.pagination}>
              <TouchableOpacity style={styles.nextBtn}>
                <Text style={styles.nextText}>Next</Text>
                <Feather name="arrow-right" size={16} color="#111827" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {isMobile && (
          <>
            <InsBottomNav activeNav="Dashboard" />
          </>
        )}
      </SafeAreaView>

      {/* Student Details Modal */}
      <Modal
        visible={studentSpecModal}
        animationType="slide"
        transparent
        onRequestClose={closeStudentModal}>
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              isMobile && styles.modalContentMobile,
              isTablet && styles.modalContentTablet,
            ]}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderContent}>
                <Text style={styles.studentName}>
                  {selectedStudent?.name || "Student Name"}
                </Text>
                <Text style={styles.courseTitle} numberOfLines={2}>
                  {selectedStudent?.courseProgress?.courseName || "Course Name"}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={closeStudentModal}>
                <Feather name="x" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.modalScrollView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScrollContent}>
              {selectedStudent?.courseProgress?.sections?.map(
                (section, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.sectionCard}
                    onPress={() =>
                      setOpenSectionIndex(
                        openSectionIndex === index ? null : index
                      )
                    }>
                    <View style={styles.sectionHeader}>
                      <View style={styles.sectionTitleContainer}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <View style={styles.statusRow}>
                          <View
                            style={[
                              styles.iconBadge,
                              {
                                backgroundColor: section.completed
                                  ? "#e7f7ee"
                                  : "#fef3c7",
                              },
                            ]}>
                            <Ionicons
                              name={
                                section.completed ? "checkmark" : "time-outline"
                              }
                              size={14}
                              color={section.completed ? "#16a34a" : "#d97706"}
                              style={{ fontWeight: "bold" }}
                            />
                          </View>
                          <Text
                            style={[
                              styles.statusText,
                              {
                                color: section.completed
                                  ? "#16a34a"
                                  : "#d97706",
                              },
                            ]}>
                            {section.completed ? "Complete" : "In Progress"}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.sectionChevron}>
                        <Ionicons
                          name={
                            openSectionIndex === index
                              ? "chevron-up"
                              : "chevron-down"
                          }
                          size={24}
                          color="#111827"
                        />
                      </View>
                    </View>

                    {openSectionIndex === index &&
                      section.lessons?.map((lesson, lessonIndex) => (
                        <View key={lessonIndex} style={styles.lessonItem}>
                          {lesson.completed ? (
                            <Ionicons
                              name="checkmark-circle"
                              color={"#16a34a"}
                              size={20}
                            />
                          ) : lesson.score ? (
                            <View style={styles.scoreBadge}>
                              <Text style={styles.scoreText}>
                                {lesson.score}
                              </Text>
                            </View>
                          ) : (
                            <Ionicons
                              name="ellipse-outline"
                              color="#d1d5db"
                              size={20}
                            />
                          )}
                          <Text style={styles.lessonText}>{lesson.title}</Text>
                        </View>
                      ))}
                  </TouchableOpacity>
                )
              )}
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={closeStudentModal}>
                <Text style={styles.cancelText}>Close</Text>
                <Ionicons name="chevron-forward" size={20} color="#111827" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  spacer: {
    height: 70,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersScroll: {
    // Empty - let content define size
  },
  filtersScrollContent: {
    // Empty - let content define size
  },
  filters: {
    flexDirection: "row",
    gap: 8,
  },
  filterBtn: {
    paddingHorizontal: 16,
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
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    alignItems: "center",
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
  // Column widths
  nameCell: { flex: 1.8 },
  emailCell: { flex: 1.8 },
  courseCell: { flex: 1.5 },
  progressCell: { flex: 0.8 },
  activityCell: { flex: 1.2 },
  statusCell: { flex: 1 },
  actionsCell: { flex: 1 },
  scrollView: {
    //flex: 1,
    height: 1,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 12,
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
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    lineHeight: 20,
  },
  emailText: {
    fontSize: 13,
    color: "#374151",
    lineHeight: 18,
  },
  courseText: {
    fontSize: 12,
    color: "#374151",
    lineHeight: 16,
  },
  progressText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#16a34a",
  },
  activityText: {
    fontSize: 12,
    color: "#374151",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
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
    gap: 12,
    alignItems: "center",
  },
  actionBtn: {
    padding: 6,
  },
  selectionInfo: {
    position: "absolute",
    bottom: 60,
    left: 20,
    right: 20,
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
  },
  selectionText: {
    color: "#1e40af",
    fontWeight: "600",
    fontSize: 15,
  },
  clearText: {
    color: "#dc2626",
    fontWeight: "600",
    fontSize: 15,
  },
  pagination: {
    position: "absolute",
    bottom: 16,
    right: 20,
    zIndex: 10,
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 20,
    width: "60%",
    maxHeight: "85%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  modalHeaderContent: {
    flex: 1,
    paddingRight: 16,
  },
  studentName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalScrollView: {
    flex: 1,
  },
  modalScrollContent: {
    paddingBottom: 20,
  },
  sectionCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#f9fafb",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginRight: 12,
  },
  sectionChevron: {
    paddingLeft: 8,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  iconBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    gap: 12,
  },
  lessonText: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
  },
  scoreBadge: {
    backgroundColor: "#e7f7ee",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 40,
    alignItems: "center",
  },
  scoreText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#16a34a",
  },
  footer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  cancelBtn: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    minWidth: 120,
  },
  cancelText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
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
  spacer: {
    height: 70,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersScroll: {
    // Empty
  },
  filtersScrollContent: {
    // Empty
  },
  filters: {
    flexDirection: "row",
    gap: 8,
  },
  filterBtn: {
    paddingHorizontal: 14,
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
    fontSize: 13,
  },
  filterTextActive: {
    color: "#fff",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    alignItems: "center",
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
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  // Adjusted column widths for tablet
  nameCell: { flex: 1.6 },
  emailCell: { flex: 1.6 },
  courseCell: { flex: 1.4 },
  progressCell: { flex: 0.7 },
  activityCell: { flex: 1 },
  statusCell: { flex: 0.9 },
  actionsCell: { flex: 0.9 },
  scrollView: {
    // flex: 1,
    height: 1,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    alignItems: "center",
    minHeight: 60,
  },
  cell: {
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  nameText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#111827",
    lineHeight: 18,
  },
  emailText: {
    fontSize: 12,
    color: "#374151",
    lineHeight: 16,
  },
  courseText: {
    fontSize: 11,
    color: "#374151",
    lineHeight: 15,
  },
  progressText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#16a34a",
  },
  activityText: {
    fontSize: 11,
    color: "#374151",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  actionBtn: {
    padding: 4,
  },
  selectionInfo: {
    position: "absolute",
    bottom: 60,
    left: 24,
    right: 24,
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
    bottom: 16,
    right: 24,
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
    fontSize: 14,
    color: "#111827",
  },
  // Modal Styles for Tablet
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    width: "75%",
    maxHeight: "85%",
  },
  // ... rest of modal styles same as desktop
});

// MOBILE STYLES (< 768px)
const mobileStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  safeArea: {
    flex: 1,
  },
  spacer: {
    height: 60,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  // FIXED: Filters section - wrapped in a container with fixed height
  filtersContainer: {
    height: 48, // Fixed height container
    marginBottom: 16,
  },
  filtersScroll: {
    height: 48, // Fixed height for scroll view
  },
  filtersScrollContent: {
    alignItems: "center", // Center buttons vertically
    paddingVertical: 4,
  },
  filters: {
    flexDirection: "row",
    gap: 8,
    height: 40, // Fixed height for filter buttons
    alignItems: "center", // Center buttons vertically
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
    justifyContent: "center", // Center text vertically
  },
  filterActive: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  filterText: {
    color: "#374151",
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 18, // Control text height
  },
  filterTextActive: {
    color: "#fff",
  },
  tableHeaderMobile: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    alignItems: "center",
    marginBottom: 8,
  },
  headerText: {
    fontWeight: "600",
    fontSize: 11,
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  checkboxCellMobile: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  nameCellMobile: {
    flex: 1,
    paddingHorizontal: 8,
  },
  actionsCellMobile: {
    width: 60,
    alignItems: "center",
  },
  scrollView: {
    // flex: 1,
    height: 1,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  rowMobile: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    alignItems: "flex-start",
  },
  checkbox: {
    margin: 0,
  },
  nameText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  emailTextMobile: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 8,
  },
  mobileRowDetails: {
    gap: 8,
  },
  courseTextMobile: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "500",
  },
  mobileProgressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },
  progressTextMobile: {
    fontSize: 13,
    fontWeight: "600",
    color: "#16a34a",
  },
  actionsContainerMobile: {
    flexDirection: "column",
    gap: 12,
    alignItems: "center",
  },
  actionBtn: {
    padding: 4,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#000",
    fontSize: 11,
    fontWeight: "600",
  },
  selectionInfo: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
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
  // Modal Styles for Mobile
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContentMobile: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    width: "100%",
    height: "100%",
    marginTop: "auto",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalHeaderContent: {
    flex: 1,
    paddingRight: 16,
  },
  studentName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalScrollView: {
    flex: 1,
  },
  modalScrollContent: {
    paddingBottom: 20,
  },
  sectionCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#f9fafb",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    marginBottom: 8,
  },
  sectionChevron: {
    paddingLeft: 8,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  iconBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    gap: 10,
  },
  lessonText: {
    fontSize: 13,
    color: "#374151",
    flex: 1,
    lineHeight: 18,
  },
  scoreBadge: {
    backgroundColor: "#e7f7ee",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    minWidth: 36,
    alignItems: "center",
  },
  scoreText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#16a34a",
  },
  footer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  cancelBtn: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cancelText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },
});
