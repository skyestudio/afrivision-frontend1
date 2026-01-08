import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";
import InsTopNav from "../../components/InsTopNav";
import { SafeAreaView } from "react-native-safe-area-context";

const coursesData = [
  {
    id: "1",
    title: "UI Design Basics",
    status: "Published",
    enrollments: 520,
    completion: "76%",
    updated: "June 15, 2025",
  },
  {
    id: "2",
    title: "Figma for Beginners",
    status: "Published",
    enrollments: 410,
    completion: "78%",
    updated: "June 12, 2025",
  },
  {
    id: "3",
    title: "Responsive Web Design",
    status: "Published",
    enrollments: 390,
    completion: "70%",
    updated: "June 10, 2025",
  },
  { id: "4", title: "Typography Fundamentals", status: "Draft" },
  { id: "5", title: "Advanced UX Research", status: "Draft" },
  {
    id: "6",
    title: "HTML & CSS for Designers",
    status: "Published",
    enrollments: 680,
    completion: "82%",
    updated: "June 19, 2025",
  },
  {
    id: "7",
    title: "Designing for Mobile Apps",
    status: "Published",
    enrollments: 310,
    completion: "68%",
    updated: "June 14, 2025",
  },
  { id: "8", title: "Accessibility in Design", status: "Draft" },
  {
    id: "9",
    title: "Microinteractions",
    status: "Archived",
    enrollments: 93,
    completion: "59%",
    updated: "April 18, 2025",
  },
  {
    id: "10",
    title: "Design Systems 101",
    status: "Published",
    enrollments: 232,
    completion: "73%",
    updated: "June 7, 2025",
  },
  { id: "11", title: "Accessibility in Design", status: "Draft" },
  { id: "12", title: "Accessibility in Design", status: "Draft" },
  { id: "13", title: "Accessibility in Design", status: "Draft" },
  { id: "14", title: "Accessibility in Design", status: "Draft" },
  { id: "15", title: "Accessibility in Design", status: "Draft" },
  { id: "16", title: "Accessibility in Design", status: "Draft" },
  { id: "17", title: "Accessibility in Design", status: "Draft" },
  { id: "18", title: "Accessibility in Design", status: "Draft" },
  { id: "19", title: "Accessibility in Design", status: "Draft" },
  { id: "20", title: "Accessibility in Design", status: "Draft" },
];

export default function IncMyCoursesScreen() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState([]);

  const filteredCourses = useMemo(() => {
    if (filter === "All") return coursesData;
    return coursesData.filter((c) => c.status === filter);
  }, [filter]);

  const allSelected =
    filteredCourses.length > 0 && selected.length === filteredCourses.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected([]);
    } else {
      setSelected(filteredCourses.map((c) => c.id));
    }
  };

  const toggleSelectRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const renderBadge = (status) => {
    const colors = {
      Published: "#22c55e",
      Draft: "#facc15",
      Archived: "#ef4444",
    };

    return (
      <View style={[styles.badge, { backgroundColor: colors[status] }]}>
        <Text style={styles.badgeText}>{status}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <InsTopNav activeNav={"Dashboard"} />
      <View style={{ width: "100%", height: 70 }}></View>

      <View style={styles.innerContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.heading}>My Courses</Text>

          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.sortBtn}>
              <Text style={styles.sortText}>Sort By</Text>
              <Feather name="chevron-down" size={16} color="#374151" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.createBtn}>
              <Text style={styles.createText}>+ Create New Course</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filters}>
          {["All", "Published", "Draft", "Archived"].map((item) => (
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
          <View style={[styles.headerCell, styles.titleCell]}>
            <Text style={styles.headerText}>Course Title</Text>
          </View>
          <View style={[styles.headerCell, styles.statusCell]}>
            <Text style={styles.headerText}>Status</Text>
          </View>
          <View style={[styles.headerCell, styles.numberCell]}>
            <Text style={styles.headerText}>Enrollments</Text>
          </View>
          <View style={[styles.headerCell, styles.numberCell]}>
            <Text style={styles.headerText}>Completion Rate</Text>
          </View>
          <View style={[styles.headerCell, styles.dateCell]}>
            <Text style={styles.headerText}>Last Updated</Text>
          </View>
          <View style={[styles.headerCell, styles.actionsCell]}>
            <Text style={styles.headerText}>Actions</Text>
          </View>
        </View>

        {/* Table Body - Using ScrollView */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}>
          {filteredCourses.map((item) => (
            <View key={item.id} style={styles.row}>
              <View style={styles.checkboxCell}>
                <Checkbox
                  value={selected.includes(item.id)}
                  onValueChange={() => toggleSelectRow(item.id)}
                  style={styles.checkbox}
                />
              </View>

              <View style={[styles.cell, styles.titleCell]}>
                <Text style={styles.titleText} numberOfLines={2}>
                  {item.title}
                </Text>
              </View>

              <View style={[styles.cell, styles.statusCell]}>
                {renderBadge(item.status)}
              </View>

              <View style={[styles.cell, styles.numberCell]}>
                <Text style={styles.cellText}>{item.enrollments ?? "-"}</Text>
              </View>

              <View style={[styles.cell, styles.numberCell]}>
                <Text style={styles.cellText}>{item.completion ?? "-"}</Text>
              </View>

              <View style={[styles.cell, styles.dateCell]}>
                <Text style={styles.cellText}>{item.updated ?? "-"}</Text>
              </View>

              <View style={[styles.cell, styles.actionsCell]}>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Feather name="edit" size={16} color="#2563eb" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Feather name="trash" size={16} color="#ef4444" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Feather name="external-link" size={16} color="#6b7280" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Selection Info */}
        {selected.length > 0 && (
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionText}>
              {selected.length} course{selected.length !== 1 ? "s" : ""}{" "}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  headerButtons: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  createBtn: {
    backgroundColor: "#f97316",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  createText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  sortBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sortText: {
    fontWeight: "500",
    fontSize: 14,
    color: "#374151",
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
    gap: 8,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
  },
  filterActive: {
    backgroundColor: "#111827",
  },
  filterText: {
    color: "#6b7280",
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
    fontSize: 12,
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  scrollView: {
    // flex: 1,
    width: "100%",
    height: 1,
    // backgroundColor: "red",
  },
  scrollViewContent: {
    paddingBottom: 100, // Extra padding for selection info and pagination
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
  checkboxCell: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    margin: 0,
  },
  titleCell: {
    flex: 2.5,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    lineHeight: 20,
  },
  statusCell: {
    flex: 1.2,
    alignItems: "flex-start",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  numberCell: {
    flex: 1,
    alignItems: "center",
  },
  dateCell: {
    flex: 1.5,
    alignItems: "flex-start",
  },
  actionsCell: {
    flex: 1.5,
    alignItems: "center",
  },
  cellText: {
    fontSize: 13,
    color: "#374151",
    lineHeight: 20,
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
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  nextText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#111827",
  },
});
