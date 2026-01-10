import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import InsTopNav from "../../components/InsTopNav";

export default function InsAccountSettingsScreen() {
  const [activeTab, setActiveTab] = useState("account");

  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Profile Information</Text>

              <View
                style={[
                  styles.rowContainer,
                  isMobile && styles.columnContainer,
                ]}>
                <View
                  style={[
                    styles.inputGroup,
                    isMobile && styles.fullWidthInput,
                    !isMobile && styles.halfWidthInput,
                  ]}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <TextInput placeholder="John Doe" style={styles.input} />
                </View>

                <View
                  style={[
                    styles.inputGroup,
                    isMobile && styles.fullWidthInput,
                    !isMobile && styles.halfWidthInput,
                  ]}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    placeholder="john@example.com"
                    style={styles.input}
                    keyboardType="email-address"
                  />
                </View>
              </View>

              <View
                style={[
                  styles.rowContainer,
                  isMobile && styles.columnContainer,
                ]}>
                <View
                  style={[
                    styles.inputGroup,
                    isMobile && styles.fullWidthInput,
                    !isMobile && styles.halfWidthInput,
                  ]}>
                  <Text style={styles.inputLabel}>Location</Text>
                  <TextInput placeholder="City, Country" style={styles.input} />
                </View>

                <View
                  style={[
                    styles.inputGroup,
                    isMobile && styles.fullWidthInput,
                    !isMobile && styles.halfWidthInput,
                  ]}>
                  <Text style={styles.inputLabel}>Phone Number</Text>
                  <TextInput
                    placeholder="+1 234 567 8900"
                    style={styles.input}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              <View style={[styles.inputGroup, styles.fullWidthInput]}>
                <Text style={styles.inputLabel}>Bio / About</Text>
                <TextInput
                  placeholder="Tell us about yourself..."
                  multiline
                  numberOfLines={4}
                  style={[styles.input, styles.textArea]}
                />
              </View>

              <TouchableOpacity
                style={[styles.saveBtn, isMobile && styles.saveBtnMobile]}>
                <Text style={styles.saveText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        );

      case "notifications":
        return (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Notification Preferences</Text>
            <Text style={styles.comingSoon}>
              Notification settings coming soon...
            </Text>
          </View>
        );

      case "security":
        return (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Security & Privacy</Text>
            <Text style={styles.comingSoon}>
              Security settings coming soon...
            </Text>
          </View>
        );

      case "teaching":
        return (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Teaching Settings</Text>
            <Text style={styles.comingSoon}>
              Teaching settings coming soon...
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <InsTopNav activeNav={"IncMyStudentsScreen"} />
      <View style={styles.headerSpacer} />

      {/* Main Content */}
      <View style={[styles.mainContent, isMobile && styles.mainContentMobile]}>
        {/* Sidebar - Hidden on mobile, shown as bottom tab or drawer */}
        {!isMobile ? (
          <View
            style={[
              styles.sidebar,
              isTablet && styles.sidebarTablet,
              isDesktop && styles.sidebarDesktop,
            ]}>
            <SidebarItem
              icon="person-outline"
              label="Account Settings"
              active={activeTab === "account"}
              onPress={() => setActiveTab("account")}
            />
            <SidebarItem
              icon="notifications-outline"
              label="Notification Settings"
              active={activeTab === "notifications"}
              onPress={() => setActiveTab("notifications")}
            />
            <SidebarItem
              icon="lock-closed-outline"
              label="Security & Privacy"
              active={activeTab === "security"}
              onPress={() => setActiveTab("security")}
            />
            <SidebarItem
              icon="school-outline"
              label="Teaching Settings"
              active={activeTab === "teaching"}
              onPress={() => setActiveTab("teaching")}
            />

            <View style={styles.divider} />

            <SidebarItem
              icon="log-out-outline"
              label="Logout"
              danger
              onPress={() => console.log("Logout pressed")}
            />
          </View>
        ) : (
          // Mobile sidebar as horizontal tab bar
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.mobileTabBar}
            contentContainerStyle={styles.mobileTabBarContent}>
            <TouchableOpacity
              onPress={() => setActiveTab("account")}
              style={[
                styles.mobileTabItem,
                activeTab === "account" && styles.mobileTabItemActive,
              ]}>
              <Ionicons
                name="person-outline"
                size={20}
                color={activeTab === "account" ? "#fff" : "#6b7280"}
              />
              <Text
                style={[
                  styles.mobileTabText,
                  activeTab === "account" && styles.mobileTabTextActive,
                ]}>
                Account
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("notifications")}
              style={[
                styles.mobileTabItem,
                activeTab === "notifications" && styles.mobileTabItemActive,
              ]}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color={activeTab === "notifications" ? "#fff" : "#6b7280"}
              />
              <Text
                style={[
                  styles.mobileTabText,
                  activeTab === "notifications" && styles.mobileTabTextActive,
                ]}>
                Notifications
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("security")}
              style={[
                styles.mobileTabItem,
                activeTab === "security" && styles.mobileTabItemActive,
              ]}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={activeTab === "security" ? "#fff" : "#6b7280"}
              />
              <Text
                style={[
                  styles.mobileTabText,
                  activeTab === "security" && styles.mobileTabTextActive,
                ]}>
                Security
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("teaching")}
              style={[
                styles.mobileTabItem,
                activeTab === "teaching" && styles.mobileTabItemActive,
              ]}>
              <Ionicons
                name="school-outline"
                size={20}
                color={activeTab === "teaching" ? "#fff" : "#6b7280"}
              />
              <Text
                style={[
                  styles.mobileTabText,
                  activeTab === "teaching" && styles.mobileTabTextActive,
                ]}>
                Teaching
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log("Logout pressed")}
              style={styles.mobileTabItemDanger}>
              <Ionicons name="log-out-outline" size={20} color="#ef4444" />
              <Text style={styles.mobileTabTextDanger}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {/* Content */}
        <View style={[styles.content, isMobile && styles.contentMobile]}>
          {renderContent()}
        </View>
      </View>
    </SafeAreaView>
  );
}

function SidebarItem({ icon, label, active, danger, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.sidebarItem,
        active && styles.sidebarItemActive,
        danger && styles.sidebarItemDanger,
      ]}>
      <Ionicons
        name={icon}
        size={20}
        color={danger ? "#ef4444" : active ? "#fff" : "#6b7280"}
      />
      <Text
        style={[
          styles.sidebarText,
          active && styles.sidebarTextActive,
          danger && styles.sidebarTextDanger,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerSpacer: {
    width: "100%",
    height: 90,
  },
  mainContent: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
  },
  mainContentMobile: {
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 16,
  },
  sidebar: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginRight: 20,
  },
  sidebarDesktop: {
    width: 280,
  },
  sidebarTablet: {
    width: 240,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
    paddingLeft: 8,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 4,
  },
  sidebarItemActive: {
    backgroundColor: "#f97316",
  },
  sidebarItemDanger: {
    marginTop: 8,
  },
  sidebarText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#374151",
  },
  sidebarTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  sidebarTextDanger: {
    color: "#ef4444",
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 12,
  },
  mobileTabBar: {
    flexGrow: 0,
    marginBottom: 16,
    backgroundColor: "#fff",
    paddingVertical: 8,
  },
  mobileTabBarContent: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
  mobileTabItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  mobileTabItemActive: {
    backgroundColor: "#f97316",
    borderColor: "#f97316",
  },
  mobileTabItemDanger: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  mobileTabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  mobileTabTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  mobileTabTextDanger: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ef4444",
  },
  content: {
    flex: 1,
  },
  contentMobile: {
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    minHeight: 400,
  },
  scrollContent: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 24,
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  columnContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  inputGroup: {
    marginBottom: 16,
  },
  halfWidthInput: {
    width: "48%",
  },
  fullWidthInput: {
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#f9fafb",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveBtn: {
    backgroundColor: "#f97316",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 8,
    alignItems: "center",
    width: "15%",
    alignSelf: "flex-start",
  },
  saveBtnMobile: {
    width: "100%",
    alignSelf: "stretch",
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
  },
  comingSoon: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 20,
  },
});
