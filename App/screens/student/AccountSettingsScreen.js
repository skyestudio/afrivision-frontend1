import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
  StatusBar,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import TopNav from "../../components/TopNav";
import StudentBottomNav from "../../components/StudentBottomNav";

const InfoItem = ({ label, value, isMobile, isTablet }) => {
  const { width } = useWindowDimensions();
  const styles =
    width >= 1024 ? desktopStyles : width >= 768 ? tabletStyles : mobileStyles;

  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.infoValue} numberOfLines={1}>
          {value}
        </Text>
        <TouchableOpacity style={styles.changeBtn}>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function AccountSettingsScreen() {
  const { width } = useWindowDimensions();
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const styles = isMobile
    ? mobileStyles
    : isTablet
      ? tabletStyles
      : desktopStyles;

  const sidebarItems = [
    { id: 1, icon: "person-outline", label: "Account", active: true },
    {
      id: 2,
      icon: "notifications-outline",
      label: "Notifications",
      active: false,
    },
    { id: 3, icon: "lock-closed-outline", label: "Privacy", active: false },
    { id: 4, icon: "card-outline", label: "Billing", active: false },
    { id: 5, icon: "help-circle-outline", label: "Help", active: false },
  ];

  const SidebarContent = () => (
    <>
      <View style={styles.sidebarHeader}>
        <Text style={styles.sidebarTitle}>Settings</Text>
        {isMobile && (
          <TouchableOpacity
            style={styles.closeSidebarBtn}
            onPress={() => setMobileSidebarVisible(false)}
          >
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {sidebarItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.sidebarItem, item.active && styles.sidebarItemActive]}
        >
          <Ionicons
            name={item.icon}
            size={isDesktop ? 20 : 18}
            color={item.active ? "#ff7a00" : "#666"}
          />
          <Text
            style={[
              styles.sidebarText,
              item.active && styles.sidebarTextActive,
            ]}
          >
            {item.label}
          </Text>
          {item.active && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      ))}

      <View style={styles.sidebarFooter}>
        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {!isMobile && <TopNav activeNav={"Dashboard"} />}
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
      <View style={[styles.contdent, { padding: 10 }]}>
        {isMobile && (
          <View style={styles.mobileHeader}>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => setMobileSidebarVisible(true)}
            >
              <Ionicons name="menu-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.mobileTitle}>Account Settings</Text>
            <View style={styles.menuBtnPlaceholder} />
          </View>
        )}
      </View>

      {/* Main Layout - SINGLE SCROLLVIEW for everything */}
      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={styles.mainScrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.layout}>
          {/* Desktop/Tablet Sidebar - Integrated into scroll */}
          {!isMobile && (
            <View style={styles.sidebar}>
              <SidebarContent />
            </View>
          )}

          {/* Main Content */}
          <View style={styles.content}>
            {/* Mobile Header with Menu */}

            {/* Header with Avatar */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                {!isMobile && (
                  <Text style={styles.title}>Account Settings</Text>
                )}
                {!isMobile && (
                  <Text style={styles.subtitle}>
                    Manage your personal information and preferences
                  </Text>
                )}
              </View>

              <View style={styles.avatarWrapper}>
                <Image
                  source={{
                    uri: "https://i.pravatar.cc/150?img=7",
                  }}
                  style={styles.avatar}
                />
                <TouchableOpacity style={styles.editAvatar}>
                  <Ionicons
                    name="camera"
                    size={isMobile ? 12 : 14}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Personal Information Section */}
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <Text style={styles.sectionSubtitle}>
                  Update your personal details and contact information
                </Text>
              </View>
              <TouchableOpacity style={styles.editAllBtn}>
                <Text style={styles.editAllText}>Edit All</Text>
                <Ionicons name="chevron-forward" size={14} color="#ff7a00" />
              </TouchableOpacity>
            </View>

            {/* Info Grid */}
            <View style={styles.infoGrid}>
              <InfoItem
                label="Full Name"
                value="Warren Buffet"
                isMobile={isMobile}
                isTablet={isTablet}
              />
              <InfoItem
                label="Date of Signup"
                value="08 November 2021"
                isMobile={isMobile}
                isTablet={isTablet}
              />
              <InfoItem
                label="Phone Number"
                value="+234 808 766 664"
                isMobile={isMobile}
                isTablet={isTablet}
              />
              <InfoItem
                label="Country"
                value="Nigeria"
                isMobile={isMobile}
                isTablet={isTablet}
              />
              <InfoItem
                label="Email Address"
                value="buffetwarren@gmail.com"
                isMobile={isMobile}
                isTablet={isTablet}
              />
              <InfoItem
                label="Study Method"
                value="Online Class"
                isMobile={isMobile}
                isTablet={isTablet}
              />
              <InfoItem
                label="Occupation"
                value="Business & Finance"
                isMobile={isMobile}
                isTablet={isTablet}
              />
              <InfoItem
                label="Language"
                value="English (UK)"
                isMobile={isMobile}
                isTablet={isTablet}
              />
              <InfoItem
                label="Timezone"
                value="WAT (UTC+1)"
                isMobile={isMobile}
                isTablet={isTablet}
              />
            </View>

            {/* Account Management Section */}
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Account Management</Text>
                <Text style={styles.sectionSubtitle}>
                  Manage your account settings and preferences
                </Text>
              </View>
            </View>

            {/* Password Change Card */}
            <View style={styles.passwordCard}>
              <View style={styles.passwordContent}>
                <View style={styles.passwordIconContainer}>
                  <Ionicons name="key-outline" size={24} color="#ff7a00" />
                </View>
                <View style={styles.passwordTextContainer}>
                  <Text style={styles.passwordTitle}>Change Password</Text>
                  <Text style={styles.passwordDesc}>
                    Update your password to keep your account secure
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.passwordBtn}>
                <Text style={styles.passwordBtnText}>Update</Text>
              </TouchableOpacity>
            </View>

            {/* Two Factor Auth Card */}
            <View style={styles.securityCard}>
              <View style={styles.securityContent}>
                <View style={styles.securityIconContainer}>
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={24}
                    color="#22c55e"
                  />
                </View>
                <View style={styles.securityTextContainer}>
                  <Text style={styles.securityTitle}>
                    Two-Factor Authentication
                  </Text>
                  <Text style={styles.securityDesc}>
                    Add an extra layer of security to your account
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.securityBtn}>
                <Text style={styles.securityBtnText}>Enable</Text>
              </TouchableOpacity>
            </View>

            {/* Delete Account Section */}
            <View style={styles.deleteCard}>
              <View style={styles.deleteContent}>
                <View style={styles.deleteIconContainer}>
                  <Ionicons name="warning-outline" size={24} color="#ef4444" />
                </View>
                <View style={styles.deleteTextContainer}>
                  <Text style={styles.deleteTitle}>Delete My Account</Text>
                  <Text style={styles.deleteDesc}>
                    Permanently remove your account and all associated data.
                    This action cannot be undone.
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.deleteBtn}>
                <Text style={styles.deleteText}>Delete Account</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomSpacer} />
          </View>
        </View>
      </ScrollView>

      {isMobile && <StudentBottomNav />}
    </SafeAreaView>
  );
}

// DESKTOP STYLES (≥ 1024px)
const desktopStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  spacer: {
    height: 70,
  },
  mainScroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainScrollContent: {
    flexGrow: 1,
  },
  layout: {
    flexDirection: "row",
    minHeight: "100%",
  },
  sidebar: {
    width: 280,
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#f0f0f0",
    paddingVertical: 24,
  },
  sidebarHeader: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginBottom: 16,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginHorizontal: 16,
    borderRadius: 12,
    position: "relative",
  },
  sidebarItemActive: {
    backgroundColor: "#FFF3E0",
  },
  sidebarText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#666",
    marginLeft: 12,
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
    marginTop: 32,
    paddingTop: 24,
    marginHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#ef4444",
    marginLeft: 12,
  },
  content: {
    flex: 1,
    padding: 32,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
  },
  avatarWrapper: {
    position: "relative",
    marginLeft: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  editAvatar: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ff7a00",
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  editAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  editAllText: {
    fontSize: 14,
    color: "#ff7a00",
    fontWeight: "600",
    marginRight: 4,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    marginBottom: 48,
  },
  infoItem: {
    width: "30%",
    backgroundColor: "#fafafa",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  infoLabel: {
    color: "#999",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    flex: 1,
  },
  changeBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ff7a00",
    marginLeft: 12,
  },
  changeText: {
    color: "#ff7a00",
    fontWeight: "600",
    fontSize: 11,
  },
  passwordCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 16,
  },
  passwordContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  passwordIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FFF3E0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  passwordTextContainer: {
    flex: 1,
  },
  passwordTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  passwordDesc: {
    fontSize: 13,
    color: "#666",
  },
  passwordBtn: {
    backgroundColor: "#ff7a00",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  passwordBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  securityCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 32,
  },
  securityContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  securityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  securityTextContainer: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  securityDesc: {
    fontSize: 13,
    color: "#666",
  },
  securityBtn: {
    backgroundColor: "#22c55e",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  securityBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  deleteCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FEF2F2",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  deleteContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  deleteIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  deleteTextContainer: {
    flex: 1,
  },
  deleteTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#991B1B",
    marginBottom: 4,
  },
  deleteDesc: {
    fontSize: 13,
    color: "#B91C1C",
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  bottomSpacer: {
    height: 40,
  },
});

// TABLET STYLES (768px - 1023px)
const tabletStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  spacer: {
    height: 70,
  },
  mainScroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainScrollContent: {
    flexGrow: 1,
  },
  layout: {
    flexDirection: "row",
    minHeight: "100%",
  },
  sidebar: {
    width: 240,
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#f0f0f0",
    paddingVertical: 20,
  },
  sidebarHeader: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginBottom: 12,
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 12,
    borderRadius: 10,
    position: "relative",
  },
  sidebarItemActive: {
    backgroundColor: "#FFF3E0",
  },
  sidebarText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginLeft: 10,
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
    marginTop: 32,
    paddingTop: 20,
    marginHorizontal: 12,
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
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  avatarWrapper: {
    position: "relative",
    marginLeft: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  editAvatar: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ff7a00",
    borderRadius: 16,
    padding: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#666",
  },
  editAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
  },
  editAllText: {
    fontSize: 13,
    color: "#ff7a00",
    fontWeight: "600",
    marginRight: 4,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 40,
  },
  infoItem: {
    width: "47%",
    backgroundColor: "#fafafa",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  infoLabel: {
    color: "#999",
    fontSize: 11,
    fontWeight: "500",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    flex: 1,
  },
  changeBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ff7a00",
    marginLeft: 10,
  },
  changeText: {
    color: "#ff7a00",
    fontWeight: "600",
    fontSize: 10,
  },
  passwordCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 14,
  },
  passwordContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  passwordIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#FFF3E0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  passwordTextContainer: {
    flex: 1,
  },
  passwordTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  passwordDesc: {
    fontSize: 12,
    color: "#666",
  },
  passwordBtn: {
    backgroundColor: "#ff7a00",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  passwordBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  securityCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 28,
  },
  securityContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  securityIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  securityTextContainer: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  securityDesc: {
    fontSize: 12,
    color: "#666",
  },
  securityBtn: {
    backgroundColor: "#22c55e",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  securityBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  deleteCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FEF2F2",
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  deleteContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  deleteIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  deleteTextContainer: {
    flex: 1,
  },
  deleteTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#991B1B",
    marginBottom: 4,
  },
  deleteDesc: {
    fontSize: 12,
    color: "#B91C1C",
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  bottomSpacer: {
    height: 40,
  },
});

// MOBILE STYLES (< 768px)
const mobileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainScroll: {
    // flex: 1,
    backgroundColor: "#fff",
    height: 1,
  },
  mainScrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  layout: {
    flex: 1,
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
    paddingVertical: 24,
  },
  sidebarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginBottom: 16,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  closeSidebarBtn: {
    padding: 4,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginHorizontal: 16,
    borderRadius: 12,
    position: "relative",
  },
  sidebarItemActive: {
    backgroundColor: "#FFF3E0",
  },
  sidebarText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#666",
    marginLeft: 12,
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
    marginTop: 32,
    paddingTop: 24,
    marginHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#ef4444",
    marginLeft: 12,
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  mobileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  menuBtn: {
    padding: 8,
  },
  mobileTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  menuBtnPlaceholder: {
    width: 40,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 32,
  },
  headerLeft: {
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
    textAlign: "center",
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editAvatar: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ff7a00",
    borderRadius: 16,
    padding: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  editAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
  },
  editAllText: {
    fontSize: 12,
    color: "#ff7a00",
    fontWeight: "600",
    marginRight: 2,
  },
  infoGrid: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 32,
  },
  infoItem: {
    backgroundColor: "#fafafa",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  infoLabel: {
    color: "#999",
    fontSize: 11,
    fontWeight: "500",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    flex: 1,
  },
  changeBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ff7a00",
    marginLeft: 12,
  },
  changeText: {
    color: "#ff7a00",
    fontWeight: "600",
    fontSize: 11,
  },
  passwordCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 12,
  },
  passwordContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  passwordIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#FFF3E0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  passwordTextContainer: {
    flex: 1,
  },
  passwordTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  passwordDesc: {
    fontSize: 12,
    color: "#666",
  },
  passwordBtn: {
    backgroundColor: "#ff7a00",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  passwordBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  securityCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 24,
  },
  securityContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  securityIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  securityTextContainer: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  securityDesc: {
    fontSize: 12,
    color: "#666",
  },
  securityBtn: {
    backgroundColor: "#22c55e",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  securityBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  deleteCard: {
    backgroundColor: "#FEF2F2",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  deleteContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  deleteIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  deleteTextContainer: {
    flex: 1,
  },
  deleteTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#991B1B",
    marginBottom: 2,
  },
  deleteDesc: {
    fontSize: 12,
    color: "#B91C1C",
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  bottomSpacer: {
    height: 20,
  },
});
