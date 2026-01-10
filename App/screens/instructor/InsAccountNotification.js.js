import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import InsTopNav from "../../components/InsTopNav";

export default function InsAccountSettingsScreen() {
  const [activeTab, setActiveTab] = useState("account");

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Profile Information</Text>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}>
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

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}>
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

              <View
                style={[
                  styles.inputGroup,
                  { width: "97%", alignSelf: "center" },
                ]}>
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
      {/* Header */}

      <InsTopNav activeNav={"IncMyStudentsScreen"} />
      <View style={{ width: "100%", height: 90 }}></View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
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

        {/* Content */}
        <View style={styles.content}>{renderContent()}</View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backBtn: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  mainContent: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
  },
  sidebar: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginRight: 20,
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
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    minHeight: 400,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
    //  backgroundColor: "red",
    width: "48%",
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
