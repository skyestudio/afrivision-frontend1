import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Feather, Ionicons } from "@expo/vector-icons";
import InsTopNav from "../../components/InsTopNav";
import { SafeAreaView } from "react-native-safe-area-context";

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

export default function IncMyStudentsScreen() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState([]);
  const [studentSpecModal, setStudentSpecModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openSectionIndex, setOpenSectionIndex] = useState(null);

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
    <SafeAreaView style={styles.container}>
      <InsTopNav activeNav={"IncMyStudentsScreen"} />
      <View style={{ width: "100%", height: 90 }}></View>
      <View style={styles.innerContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.heading}>My Students</Text>
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

        {/* Table Body */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}>
          {filteredStudents.map((student) => (
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
          ))}
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
        visible={studentSpecModal}
        animationType="slide"
        transparent
        onRequestClose={closeStudentModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.studentName}>
                  {selectedStudent?.name || "Student Name"}
                </Text>
                <Text style={styles.courseTitle}>
                  {selectedStudent?.courseProgress?.courseName || "Course Name"}
                </Text>
              </View>
              <TouchableOpacity onPress={closeStudentModal}>
                <Feather name="x" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.modalScrollView}
              showsVerticalScrollIndicator={false}>
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
                      <Text style={styles.sectionTitle}>
                        {section.title}

                        <View style={styles.statusRow}>
                          {/* Icon badge ONLY */}
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

                          {/* Text ONLY (no background) */}
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
                      </Text>
                      <View style={{ alignSelf: "center" }}>
                        <Ionicons
                          name="chevron-down"
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
                              name="checkmark"
                              color={"green"}
                              size={20}
                            />
                          ) : lesson.score ? (
                            <Text style={styles.score}>{lesson.score}</Text>
                          ) : (
                            <Text style={styles.pending}>○</Text>
                          )}
                          <Text style={styles.lessonText}>{lesson.title}</Text>
                        </View>
                      ))}
                  </TouchableOpacity>
                )
              )}

              {/* Student Info Card
              
                   <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Student Information</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Email:</Text>
                  <Text style={styles.infoValue}>{selectedStudent?.email}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Enrollment Date:</Text>
                  <Text style={styles.infoValue}>June 10, 2025</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Overall Progress:</Text>
                  <Text style={styles.infoValue}>
                    {selectedStudent?.progress}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Status:</Text>
                  <Text style={styles.infoValue}>
                    {selectedStudent?.status}
                  </Text>
                </View>
              </View>
              */}
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={closeStudentModal}>
                <Text style={styles.cancelText}>Cancel</Text>
                <Ionicons name="chevron-forward" size={20} color="#111827" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
    width: "90%",
    alignSelf: "center",
  },
  header: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
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
    paddingHorizontal: 8,
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
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100,
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
  },
  emailText: {
    fontSize: 12,
    color: "#374151",
  },
  courseText: {
    fontSize: 11,
    color: "#374151",
    lineHeight: 16,
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
    bottom: 16,
    right: 1,
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
    fontSize: 14,
    color: "#111827",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#fff",

    padding: 20,
    //  maxHeight: "85%",
    alignContent: "center",
    width: "60%",
    borderRadius: 20,
    alignSelf: "center",
    //  height: 200,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  studentName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
  modalScrollView: {
    maxHeight: "75%",
  },
  sectionCard: {
    borderWidth: 1,
    borderColor: "whitesmoke",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    paddingBottom: 0,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    flex: 1,
  },
  completeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  completeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  lessonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    //  backgroundColor: "red",
    alignItems: "center",
  },
  lessonText: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
  },
  check: {
    color: "#16a34a",
    fontWeight: "700",
    fontSize: 16,
  },
  score: {
    fontSize: 14,
    fontWeight: "600",
    color: "#16a34a",
  },
  pending: {
    color: "#d1d5db",
    fontSize: 16,
  },
  infoCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
  },
  footer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 16,
  },
  cancelBtn: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "20%",
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "whitesmoke",
  },
  cancelText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginLeft: 8,
  },

  iconBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  statusText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
