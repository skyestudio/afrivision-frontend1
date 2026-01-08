import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import TopNav from "../../components/TopNav";

const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <View style={styles.infoRow}>
      <Text style={styles.infoValue}>{value}</Text>
      <TouchableOpacity>
        <Text style={styles.changeText}>Change</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function AccountSettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TopNav activeNav={"Dashboard"} />
      <View style={{ width: "100%", height: 100 }}></View>

      <View style={styles.layout}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarItemActive}>
            <Ionicons name="person-outline" size={20} />
            <Text style={styles.sidebarText}>Account</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Account Setting</Text>

            <View style={styles.avatarWrapper}>
              <Image
                source={{
                  uri: "https://i.pravatar.cc/150",
                }}
                style={styles.avatar}
              />
              <View style={styles.editAvatar}>
                <Ionicons name="pencil" size={14} color="#fff" />
              </View>
            </View>
          </View>

          {/* Info Grid */}
          <View style={styles.infoGrid}>
            <InfoItem label="Name" value="Warren Buffet" />
            <InfoItem label="Date of Signup" value="08 November 2021" />
            <InfoItem label="Phone Number" value="+23480876664" />
            <InfoItem label="Country" value="Nigeria" />
            <InfoItem label="Email" value="buffetwarren@gmail.com" />
            <InfoItem label="Study Method" value="Online Class" />
            <InfoItem label="Occupation" value="Business" />
          </View>

          {/* Delete Section */}
          <View style={styles.deleteCard}>
            <View>
              <Text style={styles.deleteTitle}>Delete My Account</Text>
              <Text style={styles.deleteDesc}>
                Permanently remove your account and all data.
              </Text>
            </View>

            <TouchableOpacity style={styles.deleteBtn}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
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
  layout: {
    flex: 1,
    flexDirection: "row",
  },

  /* Sidebar */
  sidebar: {
    width: 240,
    backgroundColor: "#fff",
    padding: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  sidebarItemActive: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 10,
  },
  sidebarText: {
    fontWeight: "600",
  },

  /* Content */
  content: {
    flex: 1,
    padding: 24,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e3a8a",
  },

  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editAvatar: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 6,
  },

  /* Info */
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
  },
  infoItem: {
    width: "30%",
  },
  infoLabel: {
    color: "#777",
    marginBottom: 4,
    fontSize: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoValue: {
    fontWeight: "600",
  },
  changeText: {
    color: "#22c55e",
    fontWeight: "600",
    fontSize: 12,
  },

  /* Delete */
  deleteCard: {
    marginTop: 40,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteTitle: {
    fontWeight: "700",
    marginBottom: 4,
  },
  deleteDesc: {
    color: "#777",
    fontSize: 12,
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "700",
  },
});
