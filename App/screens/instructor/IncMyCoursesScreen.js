import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import InsTopNav from "../../components/InsTopNav";
import { SafeAreaView } from "react-native-safe-area-context";
import InsBottomNav from "../../components/InsBottomNav";

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
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const navigation = useNavigation();

  // Choose the appropriate styles based on screen size
  const styles = isMobile
    ? mobileStyles
    : isTablet
    ? tabletStyles
    : desktopStyles;

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
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        {!isMobile && (
          <>
            <InsTopNav activeNav="IncMyCoursesScreen" />
            <View style={styles.spacer} />
          </>
        )}

        <View style={styles.innerContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.heading}>My Courses</Text>

            <View style={styles.headerButtons}>
              {!isMobile && (
                <TouchableOpacity style={styles.sortBtn}>
                  <Text style={styles.sortText}>Sort By</Text>
                  <Feather name="chevron-down" size={16} color="#374151" />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.createBtn}
                onPress={() => {
                  navigation.navigate("CreateCourseScreen");
                }}>
                <Text style={styles.createText}>
                  {isMobile ? "+ Create" : "+ Create New Course"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Filters - Horizontal scroll on mobile */}
          <View style={styles.filtersContainer}>
            <ScrollView
              horizontal={isMobile}
              showsHorizontalScrollIndicator={false}
              style={styles.filtersScroll}
              contentContainerStyle={styles.filtersScrollContent}>
              <View style={styles.filters}>
                {["All", "Published", "Draft", "Archived"].map((item) => (
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

          {/* Table Header - Hide some columns on mobile */}
          {!isMobile ? (
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
                <Text style={styles.headerText}>Completion</Text>
              </View>
              <View style={[styles.headerCell, styles.dateCell]}>
                <Text style={styles.headerText}>Last Updated</Text>
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
              <View style={styles.titleCellMobile}>
                <Text style={styles.headerText}>Course Title</Text>
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
            {filteredCourses.map((item) =>
              !isMobile ? (
                // Desktop/Tablet Row
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
                    <Text style={styles.cellText}>
                      {item.enrollments ?? "-"}
                    </Text>
                  </View>

                  <View style={[styles.cell, styles.numberCell]}>
                    <Text style={styles.cellText}>
                      {item.completion ?? "-"}
                    </Text>
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
                        <Feather
                          name="external-link"
                          size={16}
                          color="#6b7280"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                // Mobile Row
                <View key={item.id} style={styles.rowMobile}>
                  <View style={styles.checkboxCellMobile}>
                    <Checkbox
                      value={selected.includes(item.id)}
                      onValueChange={() => toggleSelectRow(item.id)}
                      style={styles.checkbox}
                    />
                  </View>

                  <View style={styles.titleCellMobile}>
                    <Text style={styles.titleText} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <View style={styles.mobileRowDetails}>
                      {renderBadge(item.status)}
                      <Text style={styles.mobileDetailText}>
                        {item.enrollments
                          ? `${item.enrollments} enrolled`
                          : "Not published"}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.actionsCellMobile}>
                    <View style={styles.actionsContainer}>
                      <TouchableOpacity style={styles.actionBtn}>
                        <Feather name="edit" size={16} color="#2563eb" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionBtn}>
                        <Feather name="trash" size={16} color="#ef4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )
            )}
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
    width: "90%",
    alignSelf: "center",
  },
  spacer: {
    height: 90,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
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
    gap: 12,
    alignItems: "center",
  },
  createBtn: {
    backgroundColor: "#f97316",
    paddingHorizontal: 20,
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
    paddingHorizontal: 16,
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
    height: 1,
    // backgroundColor: "red",
  },
  scrollViewContent: {
    // backgroundColor: "red",

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
    left: 20,
    right: 20,
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
    right: 20,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 26,
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
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sortText: {
    fontWeight: "500",
    fontSize: 13,
    color: "#374151",
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
    fontSize: 13,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
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
    flex: 1.2,
    alignItems: "center",
  },
  cellText: {
    fontSize: 13,
    color: "#374151",
    lineHeight: 20,
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
    height: 75,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  headerButtons: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  createBtn: {
    backgroundColor: "#f97316",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  sortBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sortText: {
    fontWeight: "500",
    fontSize: 11,
    color: "#374151",
  },
  // FIXED: Filters section with fixed height container
  filtersContainer: {
    height: 48,
    marginBottom: 16,
  },
  filtersScroll: {
    height: 48,
  },
  filtersScrollContent: {
    alignItems: "center",
    paddingVertical: 4,
  },
  filters: {
    flexDirection: "row",
    gap: 8,
    height: 40,
    alignItems: "center",
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
  },
  filterActive: {
    backgroundColor: "#111827",
  },
  filterText: {
    color: "#6b7280",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 18,
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
    fontSize: 12,
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: 0.5,
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
  checkboxCellMobile: {
    width: 40,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 4,
  },
  checkbox: {
    margin: 0,
  },
  titleCellMobile: {
    flex: 1,
    paddingHorizontal: 8,
  },
  titleText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 22,
    marginBottom: 8,
  },
  mobileRowDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  mobileDetailText: {
    fontSize: 11,
    color: "#6b7280",
  },
  actionsCellMobile: {
    width: 60,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingTop: 4,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "column",
    gap: 12,
    alignItems: "center",
  },
  actionBtn: {
    padding: 4,
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
  // No pagination on mobile
});
