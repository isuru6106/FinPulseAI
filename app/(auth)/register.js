
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext";

const COLORS = {
  background: "#080D18",
  surface: "#111B2B",
  primary: "#20D6A1",
  white: "#F5F7FA",
  muted: "#8491A5",
  border: "#203149",
};

export default function RegisterScreen() {
  const { register, continueAsGuest } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Missing information", "Please complete all fields.");
      return;
    }

    if (name.trim().length < 2) {
      Alert.alert("Invalid name", "Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Weak password",
        "Your password must contain at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Your passwords do not match.");
      return;
    }

    setLoading(true);

    const result = register({
      name,
      email,
      password,
    });

    setLoading(false);

    if (!result.success) {
      Alert.alert("Registration failed", result.error);
      return;
    }

    Alert.alert(
      "Welcome to FinPulse AI!",
      "Your demo account has been created successfully.",
      [
        {
          text: "Continue",
          onPress: () => router.replace("/(tabs)"),
        },
      ]
    );
  };

  const handleGuest = () => {
    continueAsGuest();
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={styles.backButton}
          onPress={() => router.replace("/(tabs)")}
        >
          <Ionicons name="arrow-back" size={23} color={COLORS.white} />
        </Pressable>

        <View style={styles.logo}>
          <Ionicons name="person-add" size={34} color={COLORS.primary} />
        </View>

        <Text style={styles.brand}>FINPULSE AI</Text>

        <Text style={styles.title}>Create Account</Text>

        <Text style={styles.subtitle}>
          Join FinPulse AI and personalize your market experience.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>FULL NAME</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color={COLORS.muted}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor={COLORS.muted}
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
            />
          </View>

          <Text style={styles.label}>EMAIL ADDRESS</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={COLORS.muted}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={COLORS.muted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={styles.label}>PASSWORD</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={COLORS.muted}
            />
            <TextInput
              style={styles.input}
              placeholder="Minimum 8 characters"
              placeholderTextColor={COLORS.muted}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />

            <Pressable
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={21}
                color={COLORS.muted}
              />
            </Pressable>
          </View>

          <Text style={styles.label}>CONFIRM PASSWORD</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color={COLORS.muted}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor={COLORS.muted}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <Pressable
            style={[
              styles.primaryButton,
              loading && { opacity: 0.6 },
            ]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? "Creating Account..." : "Create Account"}
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color="#080D18"
            />
          </Pressable>

          <View style={styles.loginRow}>
            <Text style={styles.mutedText}>
              Already have an account?{" "}
            </Text>

            <Pressable
              onPress={() => router.replace("/(auth)/login")}
            >
              <Text style={styles.link}>Sign In</Text>
            </Pressable>
          </View>
        </View>

        <Pressable
          style={styles.guestButton}
          onPress={handleGuest}
        >
          <Text style={styles.guestText}>Continue as Guest</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    padding: 25,
    paddingTop: 55,
  },
  backButton: {
    marginBottom: 25,
    alignSelf: "flex-start",
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 22,
    backgroundColor: "#193B3A",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  brand: {
    color: COLORS.primary,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 2,
    marginTop: 15,
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 25,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 8,
  },
  form: {
    marginTop: 20,
  },
  label: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 9,
    marginTop: 17,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: COLORS.white,
    fontSize: 13,
    marginLeft: 11,
  },
  primaryButton: {
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 13,
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  primaryButtonText: {
    color: "#080D18",
    fontSize: 14,
    fontWeight: "900",
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 22,
  },
  mutedText: {
    color: COLORS.muted,
    fontSize: 12,
  },
  link: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "800",
  },
  guestButton: {
    alignItems: "center",
    padding: 18,
  },
  guestText: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "700",
  },
});
