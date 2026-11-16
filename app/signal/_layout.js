
import React from "react";
import { Stack } from "expo-router";

export default function SignalLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#080D18",
        },
        headerTintColor: "#F5F7FA",
        headerTitleStyle: {
          fontWeight: "800",
        },
        contentStyle: {
          backgroundColor: "#080D18",
        },
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: "Signal Details",
        }}
      />
    </Stack>
  );
}
