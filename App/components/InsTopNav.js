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
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function InsTopNav({}) {
  const navigation = useNavigation();
  const route = useRoute();
  const { width } = useWindowDimensions();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

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

  // Navigation items for mobile menu
  const navItems = [
    { name: "Dashboard", screen: "InsDashboard" },
    {
      name: "My Courses",
      screen: "IncMyCoursesScreen",
      tabName: "IncMyCoursesScreen",
    },
    {
      name: "My Students",
      screen: "IncMyStudentsScreen",
      tabName: "IncMyStudentsScreen",
    },
    { name: "Assessment", screen: "Assessment" },
  ];

  // Helper function to navigate and set active tab
  const handleTabPress = (tabName, screenName) => {
    setActiveNav(tabName);
    navigation.navigate(screenName);
    setShowMobileMenu(false);
  };

  const handleMobileNavPress = (item) => {
    handleTabPress(item.tabName || item.name, item.screen);
  };

  return (
    <>
      <View
        style={[
          styles.topHeader,
          isMobile && styles.topHeaderMobile,
          isTablet && styles.topHeaderTablet,
        ]}>
        {/* Logo and Mobile Menu Toggle */}
        <View
          style={[styles.leftSection, isMobile && styles.leftSectionMobile]}>
          {isMobile && (
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setShowMobileMenu(!showMobileMenu)}>
              <Ionicons
                name={showMobileMenu ? "close" : "menu"}
                size={24}
                color="#333"
              />
            </TouchableOpacity>
          )}

          <Image
            source={require("../assets/logo.png")}
            style={[
              styles.logo,
              isMobile && styles.logoMobile,
              isTablet && styles.logoTablet,
            ]}
            resizeMode="contain"
          />
        </View>

        {/* Desktop Navigation Tabs */}
        {!isMobile ? (
          <View
            style={[
              styles.navContainer,
              isTablet && styles.navContainerTablet,
            ]}>
            {navItems.map((item) => (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.navItem,
                  activeNav === (item.tabName || item.name) &&
                    styles.activeNavItem,
                  isTablet && styles.navItemTablet,
                ]}
                onPress={() =>
                  handleTabPress(item.tabName || item.name, item.screen)
                }>
                <Text
                  style={[
                    styles.navText,
                    activeNav === (item.tabName || item.name) &&
                      styles.activeNavText,
                    isTablet && styles.navTextTablet,
                  ]}>
                  {item.name}
                </Text>
                {activeNav === (item.tabName || item.name) && (
                  <View style={styles.navIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          // Mobile search and profile on right
          <View style={styles.rightSectionMobile}>
            <TouchableOpacity style={styles.mobileSearchButton}>
              <Ionicons name="search-outline" size={20} color="#333" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.notificationBtnMobile}>
              <Ionicons name="notifications-outline" size={20} color="#333" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        )}

        {/* Desktop Right Icons */}
        {!isMobile && (
          <View
            style={[styles.rightIcons, isTablet && styles.rightIconsTablet]}>
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
        )}

        {/* Mobile Profile Icon */}
        {isMobile && (
          <TouchableOpacity
            style={styles.profileContainerMobile}
            onPress={() => setShowProfileDropdown(!showProfileDropdown)}>
            <View style={styles.profileImageMobile}>
              <Text style={styles.profileInitial}>J</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Mobile Navigation Menu */}
      {isMobile && showMobileMenu && (
        <View style={styles.mobileMenu}>
          <ScrollView style={styles.mobileMenuScroll}>
            {navItems.map((item) => (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.mobileMenuItem,
                  activeNav === (item.tabName || item.name) &&
                    styles.mobileMenuItemActive,
                ]}
                onPress={() => handleMobileNavPress(item)}>
                <Text
                  style={[
                    styles.mobileMenuText,
                    activeNav === (item.tabName || item.name) &&
                      styles.mobileMenuTextActive,
                  ]}>
                  {item.name}
                </Text>
                {activeNav === (item.tabName || item.name) && (
                  <Ionicons name="chevron-forward" size={16} color="#E7670C" />
                )}
              </TouchableOpacity>
            ))}

            {/* Profile options in mobile menu */}
            <View style={styles.mobileMenuDivider} />
            {profileDropdownItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.mobileMenuItem}
                onPress={() => {
                  setShowMobileMenu(false);
                  console.log(`${item.label} clicked`);
                }}>
                <Ionicons name={item.icon} size={20} color="#666" />
                <Text style={styles.mobileMenuText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

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
          <View
            style={[
              styles.dropdownContainer,
              isMobile && styles.dropdownContainerMobile,
              isTablet && styles.dropdownContainerTablet,
            ]}>
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
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  topHeaderMobile: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: "space-between",
    marginHorizontal: 0,
  },
  topHeaderTablet: {
    paddingHorizontal: 24,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftSectionMobile: {
    flex: 1,
  },
  menuButton: {
    padding: 8,
    marginRight: 12,
  },
  logo: {
    width: 40,
    height: 40,
  },
  logoMobile: {
    width: 36,
    height: 36,
  },
  logoTablet: {
    width: 38,
    height: 38,
  },
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navContainerTablet: {
    paddingHorizontal: 10,
  },
  navItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: "relative",
  },
  navItemTablet: {
    paddingHorizontal: 12,
  },
  activeNavItem: {
    // Active state styling
  },
  navText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  navTextTablet: {
    fontSize: 13,
  },
  activeNavText: {
    color: "#000",
    fontWeight: "600",
  },
  navIndicator: {
    position: "absolute",
    bottom: 0,
    left: 16,
    right: 16,
    height: 3,
    backgroundColor: "#E7670C",
    borderRadius: 1.5,
  },
  rightSectionMobile: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  mobileSearchButton: {
    padding: 8,
    marginRight: 8,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightIconsTablet: {
    marginLeft: 10,
  },
  notificationBtn: {
    position: "relative",
    padding: 8,
  },
  notificationBtnMobile: {
    position: "relative",
    padding: 6,
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
    marginLeft: 8,
  },
  profileContainerMobile: {
    padding: 4,
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
  profileImageMobile: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E7670C",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInitial: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Mobile Menu Styles
  mobileMenu: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    zIndex: 999,
    maxHeight: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  mobileMenuScroll: {
    paddingVertical: 8,
  },
  mobileMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  mobileMenuItemActive: {
    backgroundColor: "#fef6ef",
    borderLeftWidth: 3,
    borderLeftColor: "#E7670C",
  },
  mobileMenuText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  mobileMenuTextActive: {
    color: "#E7670C",
    fontWeight: "600",
  },
  mobileMenuDivider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
    marginHorizontal: 24,
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
  dropdownContainerMobile: {
    top: 70,
    right: 16,
    minWidth: 180,
  },
  dropdownContainerTablet: {
    top: 90,
    right: 24,
    minWidth: 180,
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
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
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
});
