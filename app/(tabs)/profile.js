
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext";

const COLORS = {
  background: "#080D18",
  surface: "#111B2B",
  card: "#152235",
  primary: "#20D6A1",
  white: "#F5F7FA",
  muted: "#8491A5",
  border: "#203149",
};

function ProfileOption({ icon, title, description, onPress }) {
  return (
    <Pressable style={styles.option} onPress={onPress}>
      <View style={styles.optionIcon}>
        <Ionicons name={icon} size={21} color={COLORS.primary} />
      </View>

      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionDescription}>{description}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={19}
        color={COLORS.muted}
      />
    </Pressable>
  );
}

export default function ProfileScreen() {
  const { user, isAuthenticated, logout } = useAuth();

  const openLogin = () => {
    router.push("/(auth)/login");
  };

  const openRegister = () => {
    router.push("/(auth)/register");
  };

  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: () => {
            logout();
            Alert.alert("Signed Out", "You are now using guest mode.");
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>FINPULSE AI</Text>
          <Text style={styles.subtitle}>Your account</Text>
        </View>

        <Ionicons
          name="settings-outline"
          size={25}
          color={COLORS.muted}
        />
      </View>

      {/* User Profile */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={38}
            color={COLORS.primary}
          />
        </View>

        <Text style={styles.userName}>
          {isAuthenticated ? user.name : "Guest User"}
        </Text>

        <Text style={styles.userEmail}>
          {isAuthenticated
            ? user.email
            : "You are currently exploring FinPulse AI as a guest."}
        </Text>

        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>
            {isAuthenticated ? "SIGNED IN" : "GUEST MODE"}
          </Text>
        </View>
      </View>

      {/* Guest or Signed-in Actions */}
      {!isAuthenticated ? (
        <View style={styles.authCard}>
          <Text style={styles.authTitle}>
            Unlock your market experience
          </Text>

          <Text style={styles.authDescription}>
            Create an account to personalize your watchlist,
            manage market alerts and access your preferences.
          </Text>

          <View style={styles.featureRow}>
            <Ionicons name="bookmark" size={19} color={COLORS.primary} />
            <Text style={styles.featureText}>
              Save your favourite assets
            </Text>
          </View>

          <View style={styles.featureRow}>
            <Ionicons
              name="notifications"
              size={19}
              color={COLORS.primary}
            />
            <Text style={styles.featureText}>
              Manage personalized alerts
            </Text>
          </View>

          <View style={styles.featureRow}>
            <Ionicons name="person" size={19} color={COLORS.primary} />
            <Text style={styles.featureText}>
              Access your account preferences
            </Text>
          </View>

          <Pressable
            style={styles.registerButton}
            onPress={openRegister}
          >
            <Text style={styles.registerButtonText}>
              Create Account
            </Text>
            <Ionicons
              name="arrow-forward"
              size={19}
              color="#080D18"
            />
          </Pressable>

          <Pressable
            style={styles.loginButton}
            onPress={openLogin}
          >
            <Text style={styles.loginButtonText}>
              Already have an account? Sign In
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.accountCard}>
          <Text style={styles.accountTitle}>ACCOUNT STATUS</Text>

          <View style={styles.accountRow}>
            <Ionicons
              name="checkmark-circle"
              size={22}
              color={COLORS.primary}
            />
            <Text style={styles.accountText}>
              Your demo account is active.
            </Text>
          </View>

          <Pressable
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Ionicons
              name="log-out-outline"
              size={20}
              color="#FF7185"
            />
            <Text style={styles.logoutText}>Sign Out</Text>
          </Pressable>
        </View>
      )}

      {/* Account Options */}
      <Text style={styles.sectionTitle}>ACCOUNT</Text>

      <View style={styles.optionsCard}>
        <ProfileOption
          icon="shield-checkmark-outline"
          title="Privacy & Security"
          description="Account protection and privacy"
          onPress={() =>
            Alert.alert("Privacy & Security", "Coming soon.")
          }
        />

        <View style={styles.divider} />

        <ProfileOption
          icon="help-circle-outline"
          title="Help & Support"
          description="Get assistance with FinPulse AI"
          onPress={() =>
            Alert.alert("Help & Support", "Coming soon.")
          }
        />

        <View style={styles.divider} />

        <ProfileOption
          icon="information-circle-outline"
          title="About FinPulse AI"
          description="Application information"
          onPress={() =>
            Alert.alert(
              "About FinPulse AI",
              "Predictive Crypto & Stock Market Intelligence."
            )
          }
        />
      </View>

      <Text style={styles.footer}>
        FINPULSE AI · Predictive Market Intelligence
      </Text>

      <View style={{ height: 25 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 55,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  brand: {
    color: COLORS.primary,
    fontSize: 21,
    fontWeight: "900",
    letterSpacing: 2,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 5,
  },
  profileCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 25,
    alignItems: "center",
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 45,
    backgroundColor: "#193B3A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  userName: {
    color: COLORS.white,
    fontSize: 23,
    fontWeight: "800",
    textAlign: "center",
  },
  userEmail: {
    color: COLORS.muted,
    fontSize: 12,
    textAlign: "center",
    marginTop: 9,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#17342F",
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 20,
    marginTop: 17,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginRight: 7,
  },
  statusText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: "800",
  },
  authCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 20,
    marginTop: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  authTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "800",
  },
  authDescription: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 9,
    marginBottom: 18,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  featureText: {
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 11,
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 12,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  registerButtonText: {
    color: "#080D18",
    fontSize: 14,
    fontWeight: "900",
  },
  loginButton: {
    alignItems: "center",
    paddingVertical: 17,
  },
  loginButtonText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "700",
  },
  accountCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 20,
    marginTop: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  accountTitle: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    gap: 10,
  },
  accountText: {
    color: COLORS.white,
    fontSize: 13,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#61303D",
    borderRadius: 12,
    padding: 14,
    marginTop: 22,
    gap: 9,
  },
  logoutText: {
    color: "#FF7185",
    fontWeight: "800",
    fontSize: 13,
  },
  sectionTitle: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginTop: 28,
    marginBottom: 12,
  },
  optionsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#19312F",
    justifyContent: "center",
    alignItems: "center",
  },
  optionContent: {
    flex: 1,
    marginLeft: 12,
  },
  optionTitle: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "700",
  },
  optionDescription: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  footer: {
    color: COLORS.muted,
    fontSize: 10,
    textAlign: "center",
    marginTop: 25,
  },
});
