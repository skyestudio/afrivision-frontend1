import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useWindowDimensions,
  StatusBar,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import InsTopNav from "../../components/InsTopNav";
import InsBottomNav from "../../components/InsBottomNav";

export default function InsAccountSettingsScreen() {
  const [activeTab, setActiveTab] = useState("account");
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const styles = isMobile
    ? mobileStyles
    : isTablet
      ? tabletStyles
      : desktopStyles;

  const sidebarItems = [
    { id: "account", icon: "person-outline", label: "Account Settings" },
    {
      id: "notifications",
      icon: "notifications-outline",
      label: "Notification Settings",
    },
    {
      id: "security",
      icon: "lock-closed-outline",
      label: "Security & Privacy",
    },
    { id: "teaching", icon: "school-outline", label: "Teaching Settings" },
    { id: "payment", icon: "card-outline", label: "Payment Methods" },
    { id: "analytics", icon: "bar-chart-outline", label: "Analytics" },
  ];

  const SidebarContent = () => (
    <>
      <View style={styles.sidebarHeader}>
        <View style={styles.sidebarHeaderTop}>
          <Text style={styles.sidebarHeaderTitle}>Settings</Text>
          {isMobile && (
            <TouchableOpacity
              style={styles.closeSidebarBtn}
              onPress={() => setMobileSidebarVisible(false)}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.sidebarHeaderSubtitle}>
          Manage your account and preferences
        </Text>
      </View>

      <View style={styles.sidebarItems}>
        {sidebarItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.sidebarItem,
              activeTab === item.id && styles.sidebarItemActive,
            ]}
            onPress={() => {
              setActiveTab(item.id);
              if (isMobile) setMobileSidebarVisible(false);
            }}
          >
            <View
              style={[
                styles.sidebarIconContainer,
                activeTab === item.id && styles.sidebarIconContainerActive,
              ]}
            >
              <Ionicons
                name={item.icon}
                size={isDesktop ? 20 : 18}
                color={activeTab === item.id ? "#fff" : "#666"}
              />
            </View>
            <Text
              style={[
                styles.sidebarText,
                activeTab === item.id && styles.sidebarTextActive,
              ]}
              numberOfLines={1}
            >
              {item.label}
            </Text>
            {activeTab === item.id && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sidebarFooter}>
        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <View style={styles.contentCard}>
            <View style={styles.contentHeader}>
              <Text style={styles.contentTitle}>Profile Information</Text>
              <TouchableOpacity style={styles.previewBtn}>
                <Ionicons name="eye-outline" size={18} color="#ff7a00" />
                <Text style={styles.previewText}>Preview Profile</Text>
              </TouchableOpacity>
            </View>

            {/* Profile Picture Section */}
            <View style={styles.profileSection}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={{ uri: "https://i.pravatar.cc/150?img=8" }}
                  style={styles.avatar}
                />
                <TouchableOpacity style={styles.editAvatarBtn}>
                  <Ionicons name="camera" size={14} color="#fff" />
                </TouchableOpacity>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Dr. Sarah Johnson</Text>
                <Text style={styles.profileRole}>
                  Senior Instructor · 5 years
                </Text>
                <View style={styles.profileStats}>
                  <View style={styles.profileStat}>
                    <Ionicons name="people-outline" size={14} color="#666" />
                    <Text style={styles.profileStatText}>2.5k students</Text>
                  </View>
                  <View style={styles.profileStatDivider} />
                  <View style={styles.profileStat}>
                    <Ionicons name="star" size={14} color="#FFB800" />
                    <Text style={styles.profileStatText}>4.8 rating</Text>
                  </View>
                  <View style={styles.profileStatDivider} />
                  <View style={styles.profileStat}>
                    <Ionicons name="book-outline" size={14} color="#666" />
                    <Text style={styles.profileStatText}>8 courses</Text>
                  </View>
                </View>
              </View>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.formScroll}
              contentContainerStyle={styles.formContent}
            >
              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>
                  Personal Information
                </Text>

                <View style={styles.rowContainer}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>First Name</Text>
                    <TextInput
                      placeholder="John"
                      style={styles.input}
                      placeholderTextColor="#999"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Last Name</Text>
                    <TextInput
                      placeholder="Doe"
                      style={styles.input}
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>

                <View style={styles.rowContainer}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Email Address</Text>
                    <TextInput
                      placeholder="john.doe@example.com"
                      style={styles.input}
                      keyboardType="email-address"
                      placeholderTextColor="#999"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <TextInput
                      placeholder="+1 234 567 8900"
                      style={styles.input}
                      keyboardType="phone-pad"
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>

                <View style={styles.rowContainer}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Location</Text>
                    <TextInput
                      placeholder="New York, USA"
                      style={styles.input}
                      placeholderTextColor="#999"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Timezone</Text>
                    <TouchableOpacity style={styles.selectInput}>
                      <Text style={styles.selectText}>Eastern Time (ET)</Text>
                      <Ionicons name="chevron-down" size={16} color="#666" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Bio / About</Text>
                  <TextInput
                    placeholder="Tell us about yourself, your teaching experience, and expertise..."
                    multiline
                    numberOfLines={4}
                    style={[styles.input, styles.textArea]}
                    placeholderTextColor="#999"
                    textAlignVertical="top"
                  />
                </View>
              </View>

              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>Expertise & Skills</Text>

                <View style={styles.tagsContainer}>
                  {[
                    "Python",
                    "JavaScript",
                    "React",
                    "Node.js",
                    "Machine Learning",
                    "Data Science",
                  ].map((tag, index) => (
                    <TouchableOpacity key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                      <Ionicons name="close" size={14} color="#666" />
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity style={styles.addTagBtn}>
                    <Ionicons name="add" size={18} color="#ff7a00" />
                    <Text style={styles.addTagText}>Add Skill</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>Social Links</Text>

                <View style={styles.socialInput}>
                  <View style={styles.socialIcon}>
                    <Ionicons name="logo-linkedin" size={20} color="#0077B5" />
                  </View>
                  <TextInput
                    placeholder="linkedin.com/in/johndoe"
                    style={styles.socialTextField}
                    placeholderTextColor="#999"
                  />
                </View>

                <View style={styles.socialInput}>
                  <View style={styles.socialIcon}>
                    <Ionicons name="logo-twitter" size={20} color="#1DA1F2" />
                  </View>
                  <TextInput
                    placeholder="twitter.com/johndoe"
                    style={styles.socialTextField}
                    placeholderTextColor="#999"
                  />
                </View>

                <View style={styles.socialInput}>
                  <View style={styles.socialIcon}>
                    <Ionicons name="logo-github" size={20} color="#333" />
                  </View>
                  <TextInput
                    placeholder="github.com/johndoe"
                    style={styles.socialTextField}
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.saveBtn}>
                  <Text style={styles.saveText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelBtn}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        );

      case "notifications":
        return (
          <View style={styles.contentCard}>
            <Text style={styles.contentTitle}>Notification Settings</Text>
            <View style={styles.comingSoonCard}>
              <Ionicons
                name="notifications-outline"
                size={48}
                color="#ff7a00"
              />
              <Text style={styles.comingSoonTitle}>Coming Soon!</Text>
              <Text style={styles.comingSoonText}>
                We're working on bringing you customizable notification
                preferences. You'll be able to control email, push, and in-app
                notifications.
              </Text>
            </View>
          </View>
        );

      case "security":
        return (
          <View style={styles.contentCard}>
            <Text style={styles.contentTitle}>Security & Privacy</Text>
            <View style={styles.comingSoonCard}>
              <Ionicons name="lock-closed-outline" size={48} color="#ff7a00" />
              <Text style={styles.comingSoonTitle}>Coming Soon!</Text>
              <Text style={styles.comingSoonText}>
                Advanced security features including two-factor authentication,
                login history, and privacy controls are on their way.
              </Text>
            </View>
          </View>
        );

      case "teaching":
        return (
          <View style={styles.contentCard}>
            <Text style={styles.contentTitle}>Teaching Settings</Text>
            <View style={styles.comingSoonCard}>
              <Ionicons name="school-outline" size={48} color="#ff7a00" />
              <Text style={styles.comingSoonTitle}>Coming Soon!</Text>
              <Text style={styles.comingSoonText}>
                Customize your teaching preferences, course defaults, and
                student communication settings.
              </Text>
            </View>
          </View>
        );

      case "payment":
        return (
          <View style={styles.contentCard}>
            <Text style={styles.contentTitle}>Payment Methods</Text>
            <View style={styles.comingSoonCard}>
              <Ionicons name="card-outline" size={48} color="#ff7a00" />
              <Text style={styles.comingSoonTitle}>Coming Soon!</Text>
              <Text style={styles.comingSoonText}>
                Manage your payout methods, tax information, and view earnings.
              </Text>
            </View>
          </View>
        );

      case "analytics":
        return (
          <View style={styles.contentCard}>
            <Text style={styles.contentTitle}>Analytics</Text>
            <View style={styles.comingSoonCard}>
              <Ionicons name="bar-chart-outline" size={48} color="#ff7a00" />
              <Text style={styles.comingSoonTitle}>Coming Soon!</Text>
              <Text style={styles.comingSoonText}>
                Detailed insights about your courses, student engagement, and
                revenue analytics.
              </Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {!isMobile && <InsTopNav activeNav="InsAccountSettingsScreen" />}
      <View style={!isMobile && styles.spacer} />

      {/* Mobile Sidebar Modal */}
      {isMobile && (
        <Modal
          visible={mobileSidebarVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setMobileSidebarVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalSidebar}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.modalSidebarContent}
              >
                <SidebarContent />
              </ScrollView>
            </View>
            <TouchableOpacity
              style={styles.modalBackdrop}
              onPress={() => setMobileSidebarVisible(false)}
              activeOpacity={1}
            />
          </View>
        </Modal>
      )}

      <View style={styles.layout}>
        {/* Desktop/Tablet Sidebar */}
        {!isMobile && (
          <View style={styles.sidebar}>
            <SidebarContent />
          </View>
        )}

        {/* Main Content */}
        <View style={styles.content}>
          {/* Mobile Header */}
          {isMobile && (
            <View style={styles.mobileHeader}>
              <TouchableOpacity
                style={styles.menuBtn}
                onPress={() => setMobileSidebarVisible(true)}
              >
                <Ionicons name="menu-outline" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.mobileTitle}>Settings</Text>
              <TouchableOpacity style={styles.mobileProfileBtn}>
                <Image
                  source={{ uri: "https://i.pravatar.cc/150?img=8" }}
                  style={styles.mobileProfileImage}
                />
              </TouchableOpacity>
            </View>
          )}

          {renderContent()}
        </View>
      </View>

      {isMobile && <InsBottomNav activeNav="Dashboard" />}
    </SafeAreaView>
  );
}

// DESKTOP STYLES (≥ 1024px)
const desktopStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
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
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  sidebar: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginRight: 24,
    height: "100%",
  },
  sidebarHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sidebarHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  sidebarHeaderSubtitle: {
    fontSize: 13,
    color: "#666",
  },
  sidebarItems: {
    padding: 16,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 4,
    position: "relative",
  },
  sidebarItemActive: {
    backgroundColor: "#FFF3E0",
  },
  sidebarIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  sidebarIconContainerActive: {
    backgroundColor: "#ff7a00",
  },
  sidebarText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    flex: 1,
  },
  sidebarTextActive: {
    color: "#ff7a00",
    fontWeight: "600",
  },
  activeIndicator: {
    width: 4,
    height: 24,
    backgroundColor: "#ff7a00",
    position: "absolute",
    right: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  sidebarFooter: {
    marginTop: "auto",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ef4444",
    marginLeft: 12,
  },
  content: {
    flex: 1,
  },
  contentCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 24,
    height: "100%",
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  previewBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 8,
  },
  previewText: {
    fontSize: 13,
    color: "#ff7a00",
    fontWeight: "600",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  avatarWrapper: {
    position: "relative",
    marginRight: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#fff",
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ff7a00",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },
  profileStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  profileStatText: {
    fontSize: 12,
    color: "#666",
  },
  profileStatDivider: {
    width: 1,
    height: 12,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 8,
  },
  formScroll: {
    maxHeight: 600,
  },
  formContent: {
    paddingBottom: 24,
  },
  formSection: {
    marginBottom: 32,
  },
  formSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#000",
  },
  selectInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  selectText: {
    fontSize: 14,
    color: "#000",
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 13,
    color: "#666",
  },
  addTagBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#ff7a00",
    borderRadius: 20,
  },
  addTagText: {
    fontSize: 13,
    color: "#ff7a00",
    fontWeight: "500",
  },
  socialInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 12,
  },
  socialIcon: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
  },
  socialTextField: {
    flex: 1,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#ff7a00",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelText: {
    color: "#666",
    fontSize: 15,
    fontWeight: "500",
  },
  comingSoonCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 48,
  },
  comingSoonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 16,
    marginBottom: 8,
  },
  comingSoonText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    maxWidth: 400,
    lineHeight: 20,
  },
});

// TABLET STYLES (768px - 1023px)
const tabletStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  spacer: {
    height: 70,
  },
  layout: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  sidebar: {
    width: 260,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginRight: 20,
  },
  sidebarHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sidebarHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  sidebarHeaderSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  sidebarItems: {
    padding: 12,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginBottom: 2,
    position: "relative",
  },
  sidebarItemActive: {
    backgroundColor: "#FFF3E0",
  },
  sidebarIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  sidebarIconContainerActive: {
    backgroundColor: "#ff7a00",
  },
  sidebarText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
    flex: 1,
  },
  sidebarTextActive: {
    color: "#ff7a00",
    fontWeight: "600",
  },
  activeIndicator: {
    width: 3,
    height: 20,
    backgroundColor: "#ff7a00",
    position: "absolute",
    right: 0,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  sidebarFooter: {
    marginTop: "auto",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#ef4444",
    marginLeft: 10,
  },
  content: {
    flex: 1,
  },
  contentCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 20,
    height: "100%",
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  previewBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 6,
  },
  previewText: {
    fontSize: 12,
    color: "#ff7a00",
    fontWeight: "600",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
  },
  avatarWrapper: {
    position: "relative",
    marginRight: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#fff",
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ff7a00",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
  },
  profileStats: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  profileStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  profileStatText: {
    fontSize: 11,
    color: "#666",
  },
  profileStatDivider: {
    width: 1,
    height: 10,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 6,
  },
  formScroll: {
    maxHeight: 500,
  },
  formContent: {
    paddingBottom: 20,
  },
  formSection: {
    marginBottom: 28,
  },
  formSectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 14,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: "#000",
  },
  selectInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  selectText: {
    fontSize: 13,
    color: "#000",
  },
  textArea: {
    minHeight: 80,
    paddingTop: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: "#666",
  },
  addTagBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#ff7a00",
    borderRadius: 16,
  },
  addTagText: {
    fontSize: 12,
    color: "#ff7a00",
    fontWeight: "500",
  },
  socialInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 6,
    marginBottom: 10,
  },
  socialIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
  },
  socialTextField: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 13,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#ff7a00",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  comingSoonCard: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  comingSoonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 14,
    marginBottom: 6,
  },
  comingSoonText: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    maxWidth: 350,
    lineHeight: 18,
  },
});

// MOBILE STYLES (< 768px)
const mobileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  modalOverlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBackdrop: {
    flex: 1,
  },
  modalSidebar: {
    width: 280,
    backgroundColor: "#fff",
    height: "100%",
  },
  modalSidebarContent: {
    flexGrow: 1,
  },
  sidebarHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sidebarHeaderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  sidebarHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  closeSidebarBtn: {
    padding: 4,
  },
  sidebarHeaderSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  sidebarItems: {
    padding: 16,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 2,
    position: "relative",
  },
  sidebarItemActive: {
    backgroundColor: "#FFF3E0",
  },
  sidebarIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  sidebarIconContainerActive: {
    backgroundColor: "#ff7a00",
  },
  sidebarText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    flex: 1,
  },
  sidebarTextActive: {
    color: "#ff7a00",
    fontWeight: "600",
  },
  activeIndicator: {
    width: 4,
    height: 24,
    backgroundColor: "#ff7a00",
    position: "absolute",
    right: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  sidebarFooter: {
    marginTop: "auto",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ef4444",
    marginLeft: 12,
  },
  layout: {
    flex: 1,
  },
  mobileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuBtn: {
    padding: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  mobileTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  mobileProfileBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
  },
  mobileProfileImage: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
  },
  contentCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    margin: 16,
    padding: 16,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  previewBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  previewText: {
    fontSize: 11,
    color: "#ff7a00",
    fontWeight: "600",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  avatarWrapper: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ff7a00",
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 11,
    color: "#666",
    marginBottom: 4,
  },
  profileStats: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  profileStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  profileStatText: {
    fontSize: 10,
    color: "#666",
  },
  profileStatDivider: {
    width: 1,
    height: 8,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 4,
  },
  formSection: {
    marginBottom: 24,
  },
  formSectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  rowContainer: {
    gap: 8,
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 12,
    color: "#000",
  },
  selectInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  selectText: {
    fontSize: 12,
    color: "#000",
  },
  textArea: {
    minHeight: 80,
    paddingTop: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 11,
    color: "#666",
  },
  addTagBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#ff7a00",
    borderRadius: 16,
  },
  addTagText: {
    fontSize: 11,
    color: "#ff7a00",
    fontWeight: "500",
  },
  socialInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 6,
    marginBottom: 8,
  },
  socialIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
  },
  socialTextField: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 12,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#ff7a00",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    color: "#666",
    fontSize: 13,
    fontWeight: "500",
  },
  comingSoonCard: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  comingSoonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 12,
    marginBottom: 4,
  },
  comingSoonText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    lineHeight: 16,
  },
});
