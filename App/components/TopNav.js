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
  Platform,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function InsTopNav({}) {
  const navigation = useNavigation();
  const route = useRoute();
  const { width, height } = useWindowDimensions();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isLargeTablet = width >= 1024 && width < 1280;
  const isDesktop = width >= 1280;

  // Map route names to tab names
  const routeToTabMap = {
    InsDashboard: "Dashboard",
    IncMyCoursesScreen: "MyCourses",
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
    {
      id: 1,
      label: "Profile",
      icon: "person",
      action: () => navigation.navigate("Profile"),
    },
    {
      id: 2,
      label: "My Plan",
      icon: "card",
      action: () => navigation.navigate("MyPlan"),
    },
    {
      id: 3,
      label: "Settings",
      icon: "settings",
      action: () => navigation.navigate("Settings"),
    },
    {
      id: 4,
      label: "Logout",
      icon: "log-out",
      action: () => console.log("Logout"),
    },
  ];

  // Navigation items
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

  const handleTabPress = (tabName, screenName) => {
    setActiveNav(tabName);
    navigation.navigate(screenName);
    setShowMobileMenu(false);
    setShowSearchBar(false);
  };

  const handleProfileAction = (action) => {
    setShowProfileDropdown(false);
    action();
  };

  const toggleSearchBar = () => {
    if (isMobile) {
      setShowSearchBar(!showSearchBar);
    }
  };

  const renderSearchBar = () => {
    if (isMobile && !showSearchBar) return null;

    return (
      <View
        style={[
          styles.searchContainer,
          isMobile && styles.searchContainerMobile,
          showSearchBar && styles.searchContainerExpanded,
        ]}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => console.log("Search:", searchText)}>
          <Ionicons name="search" size={18} color="#fff" />
        </TouchableOpacity>
        {isMobile && showSearchBar && (
          <TouchableOpacity
            style={styles.searchCloseButton}
            onPress={() => setShowSearchBar(false)}>
            <Ionicons name="close" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View
          style={[
            styles.topHeader,
            isMobile && styles.topHeaderMobile,
            isTablet && styles.topHeaderTablet,
            isLargeTablet && styles.topHeaderLargeTablet,
          ]}>
          {/* Left Section - Logo & Menu */}
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
                isLargeTablet && styles.logoLargeTablet,
              ]}
              resizeMode="contain"
            />
          </View>

          {/* Desktop Navigation or Search Bar */}
          {!isMobile ? (
            <>
              <View
                style={[
                  styles.navContainer,
                  isTablet && styles.navContainerTablet,
                  isLargeTablet && styles.navContainerLargeTablet,
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

              {/* Search Bar for Desktop/Tablet */}
              {!isMobile && (
                <View
                  style={[
                    styles.searchWrapper,
                    isTablet && styles.searchWrapperTablet,
                  ]}>
                  {renderSearchBar()}
                </View>
              )}
            </>
          ) : (
            // Mobile - Right icons (search toggle, notifications)
            <View style={styles.rightSectionMobile}>
              {!showSearchBar && (
                <>
                  <TouchableOpacity
                    style={styles.mobileSearchButton}
                    onPress={toggleSearchBar}>
                    <Ionicons name="search-outline" size={20} color="#333" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.notificationBtnMobile}>
                    <Ionicons
                      name="notifications-outline"
                      size={20}
                      color="#333"
                    />
                    <View style={styles.notificationDot} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}

          {/* Desktop Right Icons */}
          {!isMobile && (
            <View
              style={[styles.rightIcons, isTablet && styles.rightIconsTablet]}>
              <TouchableOpacity style={styles.notificationBtn}>
                <Ionicons name="notifications-outline" size={22} color="#333" />
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
          {isMobile && !showSearchBar && (
            <TouchableOpacity
              style={styles.profileContainerMobile}
              onPress={() => setShowProfileDropdown(!showProfileDropdown)}>
              <View style={styles.profileImageMobile}>
                <Text style={styles.profileInitial}>J</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Mobile Search Bar (full width when expanded) */}
        {isMobile && showSearchBar && (
          <View style={styles.mobileSearchBarContainer}>
            {renderSearchBar()}
          </View>
        )}

        {/* Mobile Navigation Menu */}
        {isMobile && showMobileMenu && (
          <View style={styles.mobileMenu}>
            <ScrollView
              style={styles.mobileMenuScroll}
              showsVerticalScrollIndicator={false}>
              <View style={styles.mobileMenuHeader}>
                <Text style={styles.mobileMenuTitle}>Navigation</Text>
              </View>

              {navItems.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  style={[
                    styles.mobileMenuItem,
                    activeNav === (item.tabName || item.name) &&
                      styles.mobileMenuItemActive,
                  ]}
                  onPress={() =>
                    handleTabPress(item.tabName || item.name, item.screen)
                  }>
                  <Text
                    style={[
                      styles.mobileMenuText,
                      activeNav === (item.tabName || item.name) &&
                        styles.mobileMenuTextActive,
                    ]}>
                    {item.name}
                  </Text>
                  {activeNav === (item.tabName || item.name) && (
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color="#E7670C"
                    />
                  )}
                </TouchableOpacity>
              ))}

              <View style={styles.mobileMenuDivider} />

              <View style={styles.mobileMenuHeader}>
                <Text style={styles.mobileMenuTitle}>Account</Text>
              </View>

              {profileDropdownItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.mobileMenuItem}
                  onPress={() => {
                    setShowMobileMenu(false);
                    item.action();
                  }}>
                  <Ionicons name={item.icon} size={20} color="#666" />
                  <Text style={styles.mobileMenuText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </SafeAreaView>

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
              isLargeTablet && styles.dropdownContainerLargeTablet,
            ]}>
            {profileDropdownItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.dropdownItem}
                onPress={() => handleProfileAction(item.action)}>
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
  safeArea: {
    backgroundColor: "#fff",
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  topHeaderMobile: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 60,
  },
  topHeaderTablet: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  topHeaderLargeTablet: {
    paddingHorizontal: 32,
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
    marginRight: 8,
  },
  logo: {
    width: 45,
    height: 45,
  },
  logoMobile: {
    width: 38,
    height: 38,
  },
  logoTablet: {
    width: 40,
    height: 40,
  },
  logoLargeTablet: {
    width: 42,
    height: 42,
  },
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 20,
  },
  navContainerTablet: {
    marginHorizontal: 10,
  },
  navContainerLargeTablet: {
    marginHorizontal: 30,
  },
  navItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: "relative",
    marginHorizontal: 4,
  },
  navItemTablet: {
    paddingHorizontal: 12,
  },
  activeNavItem: {},
  navText: {
    fontSize: 15,
    color: "#666",
    fontWeight: "500",
  },
  navTextTablet: {
    fontSize: 14,
  },
  activeNavText: {
    color: "#E7670C",
    fontWeight: "600",
  },
  navIndicator: {
    position: "absolute",
    bottom: 0,
    left: "25%",
    right: "25%",
    height: 3,
    backgroundColor: "#E7670C",
    borderRadius: 1.5,
  },
  searchWrapper: {
    flex: 1,
    maxWidth: 300,
    marginRight: 20,
  },
  searchWrapperTablet: {
    maxWidth: 250,
    marginRight: 15,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E7670C",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchContainerMobile: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  searchContainerExpanded: {
    marginHorizontal: 0,
  },
  mobileSearchBarContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  searchButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E7670C",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  searchCloseButton: {
    padding: 8,
    marginLeft: 8,
  },
  rightSectionMobile: {
    flexDirection: "row",
    alignItems: "center",
  },
  mobileSearchButton: {
    padding: 10,
    marginRight: 4,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightIconsTablet: {
    marginLeft: 8,
  },
  notificationBtn: {
    position: "relative",
    padding: 8,
    marginRight: 12,
  },
  notificationBtnMobile: {
    position: "relative",
    padding: 8,
  },
  notificationDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B6B",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileContainerMobile: {
    padding: 6,
    marginLeft: 4,
  },
  profileImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#E7670C",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  profileImageMobile: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E7670C",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInitial: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  mobileMenu: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    zIndex: 999,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  mobileMenuScroll: {
    paddingVertical: 8,
  },
  mobileMenuHeader: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  mobileMenuTitle: {
    fontSize: 12,
    color: "#999",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
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
    borderLeftWidth: 4,
    borderLeftColor: "#E7670C",
  },
  mobileMenuText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    flex: 1,
    marginLeft: 12,
  },
  mobileMenuTextActive: {
    color: "#E7670C",
    fontWeight: "600",
  },
  mobileMenuDivider: {
    height: 8,
    backgroundColor: "#f8f8f8",
    marginVertical: 4,
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: Platform.OS === "ios" ? 100 : 80,
    paddingRight: 20,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 220,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  dropdownContainerMobile: {
    minWidth: 200,
    marginRight: 16,
  },
  dropdownContainerTablet: {
    minWidth: 200,
    marginRight: 20,
  },
  dropdownContainerLargeTablet: {
    minWidth: 220,
    marginRight: 32,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  dropdownText: {
    fontSize: 15,
    color: "#333",
    marginLeft: 16,
    fontWeight: "500",
  },
});
