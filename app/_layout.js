
import React, { useEffect } from "react";
import { AppState } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "../context/AuthContext";
import { MarketProvider } from "../context/MarketContext";

function AppStateHandler() {
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (nextAppState === "active") {
          console.log("FinPulse AI is active again.");

          // Later:
          // Refresh market prices.
          // Check price alerts.
          // Update market intelligence.
        }

        if (nextAppState === "background") {
          console.log("FinPulse AI moved to background.");
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return null;
}

export default function RootLayout() {
  return (
    <MarketProvider>
      <AuthProvider>
        <StatusBar
          style="light"
          backgroundColor="#080D18"
        />

        <AppStateHandler />

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#080D18",
            },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </AuthProvider>
    </MarketProvider>
  );
}
