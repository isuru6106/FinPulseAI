
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

export default function LoginScreen() {
  const { login, continueAsGuest } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password) {
      Alert.alert(
        "Missing information",
        "Please enter your email and password."
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const result = login({
      email,
      password,
    });

    setLoading(false);

    if (!result.success) {
      Alert.alert("Login failed", result.error);
      return;
    }

    Alert.alert(
      "Welcome back!",
      "You have successfully signed in to FinPulse AI.",
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
          <Ionicons name="pulse" size={38} color={COLORS.primary} />
        </View>

        <Text style={styles.brand}>FINPULSE AI</Text>

        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subtitle}>
          Sign in to access your personalized market intelligence.
        </Text>

        <View style={styles.form}>
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
              placeholder="Enter your password"
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

          <Pressable
            style={[
              styles.primaryButton,
              loading && { opacity: 0.6 },
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? "Signing In..." : "Sign In"}
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color="#080D18"
            />
          </Pressable>

          <View style={styles.registerRow}>
            <Text style={styles.mutedText}>
              Don't have an account?{" "}
            </Text>

            <Pressable
              onPress={() => router.replace("/(auth)/register")}
            >
              <Text style={styles.link}>Register</Text>
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
    justifyContent: "center",
  },
  backButton: {
    marginBottom: 35,
    alignSelf: "flex-start",
  },
  logo: {
    width: 75,
    height: 75,
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
    marginTop: 18,
  },
  title: {
    color: COLORS.white,
    fontSize: 29,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 35,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 21,
    marginTop: 10,
  },
  form: {
    marginTop: 35,
  },
  label: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 20,
  },
  inputContainer: {
    height: 57,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: COLORS.white,
    fontSize: 13,
    marginLeft: 12,
  },
  primaryButton: {
    height: 57,
    backgroundColor: COLORS.primary,
    borderRadius: 13,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  primaryButtonText: {
    color: "#080D18",
    fontSize: 15,
    fontWeight: "900",
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
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
    padding: 20,
    marginTop: 10,
  },
  guestText: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "700",
  },
});
