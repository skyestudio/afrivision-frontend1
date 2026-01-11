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
import InsBottomNav from "../../components/InsBottomNav";

export default function InsAccountSettingsScreen() {
  const [activeTab, setActiveTab] = useState("account");
  const { width, height } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  // Choose appropriate styles based on screen size
  const styles = isMobile
    ? mobileStyles
    : isTablet
    ? tabletStyles
    : desktopStyles;

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.scrollContent}>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Profile Information</Text>

              <View style={styles.rowContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <TextInput placeholder="John Doe" style={styles.input} />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    placeholder="john@example.com"
                    style={styles.input}
                    keyboardType="email-address"
                  />
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Location</Text>
                  <TextInput placeholder="City, Country" style={styles.input} />
                </View>

                <View style={styles.inputGroup}>
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

              <TouchableOpacity style={styles.saveBtn}>
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
      {!isMobile && (
        <>
          <InsTopNav activeNav="IncMyStudentsScreen" />
          <View style={styles.spacer} />
        </>
      )}
      {/* Main Content */}
      <View style={styles.layout}>
        {/* Sidebar - Hidden on mobile, shown as bottom tab or drawer */}
        {!isMobile ? (
          <View style={styles.sidebar}>
            <SidebarItem
              icon="person-outline"
              label="Account Settings"
              active={activeTab === "account"}
              onPress={() => setActiveTab("account")}
              isMobile={false}
            />
            <SidebarItem
              icon="notifications-outline"
              label="Notification Settings"
              active={activeTab === "notifications"}
              onPress={() => setActiveTab("notifications")}
              isMobile={false}
            />
            <SidebarItem
              icon="lock-closed-outline"
              label="Security & Privacy"
              active={activeTab === "security"}
              onPress={() => setActiveTab("security")}
              isMobile={false}
            />
            <SidebarItem
              icon="school-outline"
              label="Teaching Settings"
              active={activeTab === "teaching"}
              onPress={() => setActiveTab("teaching")}
              isMobile={false}
            />

            <View style={styles.divider} />

            <SidebarItem
              icon="log-out-outline"
              label="Logout"
              danger
              onPress={() => console.log("Logout pressed")}
              isMobile={false}
            />
          </View>
        ) : (
          // Mobile sidebar as horizontal tab bar
          <View style={styles.mobileTabBarContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.mobileTabBar}
              contentContainerStyle={styles.mobileTabBarContent}>
              <SidebarItem
                icon="person-outline"
                label="Account"
                active={activeTab === "account"}
                onPress={() => setActiveTab("account")}
                isMobile={true}
              />
              <SidebarItem
                icon="notifications-outline"
                label="Notifications"
                active={activeTab === "notifications"}
                onPress={() => setActiveTab("notifications")}
                isMobile={true}
              />
              <SidebarItem
                icon="lock-closed-outline"
                label="Security"
                active={activeTab === "security"}
                onPress={() => setActiveTab("security")}
                isMobile={true}
              />
              <SidebarItem
                icon="school-outline"
                label="Teaching"
                active={activeTab === "teaching"}
                onPress={() => setActiveTab("teaching")}
                isMobile={true}
              />
              <SidebarItem
                icon="log-out-outline"
                label="Logout"
                danger
                onPress={() => console.log("Logout pressed")}
                isMobile={true}
              />
            </ScrollView>
          </View>
        )}

        {/* Content */}
        <View style={styles.content}>{renderContent()}</View>
      </View>
      {isMobile && (
        <>
          <InsBottomNav activeNav="Dashboard" />
        </>
      )}
    </SafeAreaView>
  );
}

function SidebarItem({ icon, label, active, danger, onPress, isMobile }) {
  const styles = isMobile ? mobileStyles : desktopStyles;

  if (isMobile) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.mobileTabItem,
          active && styles.mobileTabItemActive,
          danger && styles.mobileTabItemDanger,
        ]}>
        <Ionicons
          name={icon}
          size={20}
          color={danger ? "#ef4444" : active ? "#fff" : "#6b7280"}
        />
        <Text
          style={[
            styles.mobileTabText,
            active && styles.mobileTabTextActive,
            danger && styles.mobileTabTextDanger,
          ]}
          numberOfLines={1}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

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

// DESKTOP STYLES (≥ 1024px)
const desktopStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  spacer: {
    height: 70,
  },
  layout: {
    flex: 1,
    flexDirection: "row",
    maxWidth: 1400,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  sidebar: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    height: "100%",
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
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
    marginVertical: 16,
  },
  content: {
    flex: 1,
    marginLeft: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 24,
    minHeight: 500,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 24,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 20,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 16,
  },
  fullWidthInput: {
    flex: 2,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#fff",
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  saveBtn: {
    backgroundColor: "#f97316",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  comingSoon: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 40,
  },
});

// TABLET STYLES (768px - 1023px)
const tabletStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  spacer: {
    height: 70,
  },
  layout: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sidebar: {
    width: 240,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 4,
  },
  sidebarItemActive: {
    backgroundColor: "#f97316",
  },
  sidebarItemDanger: {
    marginTop: 8,
  },
  sidebarText: {
    fontSize: 14,
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
    marginVertical: 14,
  },
  content: {
    flex: 1,
    marginLeft: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 20,
    minHeight: 400,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 14,
  },
  fullWidthInput: {
    flex: 2,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    fontSize: 13,
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  saveBtn: {
    backgroundColor: "#f97316",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  comingSoon: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 36,
  },
});

// MOBILE STYLES (< 768px)
const mobileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  layout: {
    // flex: 1,
    flexDirection: "column",
    //  backgroundColor: "red",
    paddingTop: 0,
  },
  mobileTabBarContainer: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 8,
  },
  mobileTabBar: {
    height: 48,
  },
  mobileTabBarContent: {
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  mobileTabItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
    minWidth: 90,
    justifyContent: "center",
  },
  mobileTabItemActive: {
    backgroundColor: "#f97316",
    borderColor: "#f97316",
  },
  mobileTabItemDanger: {
    borderColor: "#ef4444",
    backgroundColor: "#fff",
  },
  mobileTabText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#374151",
  },
  mobileTabTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  mobileTabTextDanger: {
    color: "#ef4444",
  },
  content: {
    // flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingBottom: 10,
    height: "100%",
  },
  scrollContent: {
    paddingBottom: 16,
    flex: 0.9,
    // height: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "column",
    gap: 2,
    marginBottom: 12,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 12,
  },
  fullWidthInput: {
    width: "100%",
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    fontSize: 13,
  },
  textArea: {
    height: 50,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  saveBtn: {
    backgroundColor: "#f97316",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: "stretch",
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  comingSoon: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 32,
  },
});
