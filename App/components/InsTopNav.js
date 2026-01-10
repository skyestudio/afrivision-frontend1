import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  TextInput,
  Modal,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function InsTopNav({}) {
  const navigation = useNavigation();
  const route = useRoute(); // Get current route info
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeNav, setActiveNav] = useState("Dashboard");

  // Map route names to tab names
  const routeToTabMap = {
    InsDashboard: "Dashboard",
    IncMyCoursesScreen: "IncMyCoursesScreen",
    IncMyStudentsScreen: "IncMyStudentsScreen",
    Assessment: "Assessment",
  };

  // Update active tab based on current route
  useEffect(() => {
    const currentRouteName = route.name;
    if (routeToTabMap[currentRouteName]) {
      setActiveNav(routeToTabMap[currentRouteName]);
    }
  }, [route.name]);

  // Profile dropdown items
  const profileDropdownItems = [
    { id: 1, label: "Profile", icon: "person" },
    { id: 2, label: "My Plan", icon: "card" },
    { id: 3, label: "Settings", icon: "settings" },
    { id: 4, label: "Logout", icon: "log-out" },
  ];

  // Helper function to navigate and set active tab
  const handleTabPress = (tabName, screenName) => {
    setActiveNav(tabName);
    navigation.navigate(screenName);
  };

  return (
    <>
      <View style={styles.topHeader}>
        {/* Logo */}
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Navigation Tabs */}
        <View style={styles.navContainer}>
          <TouchableOpacity
            style={[
              styles.navItem,
              activeNav === "Dashboard" && styles.activeNavItem,
            ]}
            onPress={() => handleTabPress("Dashboard", "InsDashboard")}>
            <Text
              style={[
                styles.navText,
                activeNav === "Dashboard" && styles.activeNavText,
              ]}>
              Dashboard
            </Text>
            {activeNav === "Dashboard" && <View style={styles.navIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navItem,
              activeNav === "IncMyCoursesScreen" && styles.activeNavItem,
            ]}
            onPress={() =>
              handleTabPress("IncMyCoursesScreen", "IncMyCoursesScreen")
            }>
            <Text
              style={[
                styles.navText,
                activeNav === "IncMyCoursesScreen" && styles.activeNavText,
              ]}>
              My Courses
            </Text>
            {activeNav === "IncMyCoursesScreen" && (
              <View style={styles.navIndicator} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navItem,
              activeNav === "IncMyStudentsScreen" && styles.activeNavItem,
            ]}
            onPress={() =>
              handleTabPress("IncMyStudentsScreen", "IncMyStudentsScreen")
            }>
            <Text
              style={[
                styles.navText,
                activeNav === "IncMyStudentsScreen" && styles.activeNavText,
              ]}>
              My Students
            </Text>
            {activeNav === "IncMyStudentsScreen" && (
              <View style={styles.navIndicator} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navItem,
              activeNav === "Assessment" && styles.activeNavItem,
            ]}
            onPress={() => handleTabPress("Assessment", "Assessment")}>
            <Text
              style={[
                styles.navText,
                activeNav === "Assessment" && styles.activeNavText,
              ]}>
              Assessment
            </Text>
            {activeNav === "Assessment" && <View style={styles.navIndicator} />}
          </TouchableOpacity>
        </View>

        {/* Notification and Profile */}
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileContainer}
            onPress={() => setShowProfileDropdown(!showProfileDropdown)}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitial}>J</Text>
            </View>
            <Ionicons
              name={showProfileDropdown ? "chevron-up" : "chevron-down"}
              size={16}
              color="#666"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Dropdown Modal */}
      <Modal
        visible={showProfileDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowProfileDropdown(false)}>
        <TouchableOpacity
          style={styles.dropdownOverlay}
          activeOpacity={1}
          onPress={() => setShowProfileDropdown(false)}>
          <View style={styles.dropdownContainer}>
            {profileDropdownItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.dropdownItem}
                onPress={() => {
                  setShowProfileDropdown(false);
                  console.log(`${item.label} clicked`);
                }}>
                <Ionicons name={item.icon} size={20} color="#666" />
                <Text style={styles.dropdownText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",

    justifyContent: "space-around",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 8888,
    marginHorizontal: 50,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  searchContainer: {
    // flex: 1,
    flexDirection: "row",
    backgroundColor: "transaparent",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: "center",
    width: "30%",
    borderWidth: 1,
    borderColor: "#E7670C",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    paddingVertical: 4,
    outlineWidth: 0,
  },
  searchButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E7670C",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  notificationBtn: {
    position: "relative",
    padding: 8,
  },
  notificationDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF6B6B",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E7670C",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  profileInitial: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Navigation Styles
  navContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 0,
    // backgroundColor: "red",
    width: "80%",
    justifyContent: "flex-end",
    //  backgroundColor: "red",
  },
  navItem: {
    marginRight: 30,
    paddingBottom: 8,
    position: "relative",
  },
  activeNavItem: {
    // Active state styling
  },
  navText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  activeNavText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 14,
  },
  navIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: 1.5,
  },
  // Profile Dropdown Styles
  dropdownOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-start",
    paddingTop: 100,
    paddingRight: 20,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 8,
    position: "absolute",
    top: 100,
    right: 20,
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 12,
    fontWeight: "500",
  },
});
