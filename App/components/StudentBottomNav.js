import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function StudentBottomNav({}) {
  const navigation = useNavigation();
  const route = useRoute();
  const { width } = useWindowDimensions();

  const [activeNav, setActiveNav] = useState("Home");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const isMobile = width < 768;

  // Map route names to tab names
  const routeToTabMap = {
    DashboardScreen: "Home",
    MyCourses: "My Courses",
    AccountSettingsScreen: "Profile",
  };

  // Update active tab based on current route
  useEffect(() => {
    const currentRouteName = route.name;
    if (routeToTabMap[currentRouteName]) {
      setActiveNav(routeToTabMap[currentRouteName]);
    }
  }, [route.name]);

  // Navigation items for bottom tabs
  const navItems = [
    {
      name: "Home",
      screen: "DashboardScreen",
      icon: (active) => (
        <Ionicons
          name={active ? "home" : "home-outline"}
          size={22}
          color={active ? "#ff7a00" : "#666"}
        />
      ),
    },
    {
      name: "My Courses",
      screen: "MyCourses",
      icon: (active) => (
        <Ionicons
          name={active ? "library" : "library-outline"}
          size={22}
          color={active ? "#ff7a00" : "#666"}
        />
      ),
    },
    {
      name: "Explore",
      screen: "ExploreScreen",
      icon: (active) => (
        <Ionicons
          name={active ? "compass" : "compass-outline"}
          size={22}
          color={active ? "#ff7a00" : "#666"}
        />
      ),
    },
    {
      name: "Profile",
      screen: "AccountSettingsScreen",
      icon: (active) => (
        <View style={styles.profileImage}>
          <Text style={styles.profileInitial}>S</Text>
        </View>
      ),
      isProfile: true,
    },
  ];

  // Helper function to navigate and set active tab
  const handleTabPress = (tabName, screenName) => {
    setActiveNav(tabName);
    if (screenName) {
      navigation.navigate(screenName);
    }
  };

  return (
    <View style={[styles.container, isMobile && styles.containerMobile]}>
      {navItems.map((item) => {
        const isActive = activeNav === item.name;

        return (
          <TouchableOpacity
            key={item.name}
            style={[styles.tabButton, isActive && styles.activeTabButton]}
            onPress={() => handleTabPress(item.name, item.screen)}
          >
            <View style={styles.iconContainer}>
              {typeof item.icon === "function"
                ? item.icon(isActive)
                : item.icon}

              {item.name === "Profile" && (
                <View
                  style={[
                    styles.profileIndicator,
                    !isActive && styles.profileIndicatorInactive,
                  ]}
                />
              )}
            </View>

            <Text
              style={[
                styles.tabText,
                isActive && styles.activeTabText,
                item.isProfile && styles.profileTabText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 9999,
    height: 80,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  containerMobile: {
    height: 70,
    paddingBottom: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    position: "relative",
  },
  activeTabButton: {
    backgroundColor: "#ff7a0020",
    borderRadius: 7,
  },
  iconContainer: {
    position: "relative",
    marginBottom: 4,
  },
  tabText: {
    fontSize: 10,
    color: "#666",
    fontWeight: "500",
    textAlign: "center",
    marginTop: 2,
  },
  activeTabText: {
    color: "#ff7a00",
    fontWeight: "600",
  },
  profileTabText: {
    fontSize: 10,
  },
  profileImage: {
    width: 28,
    height: 28,
    borderRadius: 16,
    backgroundColor: "#ff7a00",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInitial: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  profileIndicator: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B6B",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  profileIndicatorInactive: {
    backgroundColor: "#999",
  },
});
