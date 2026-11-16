
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Display notifications when the app is in the foreground.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Request notification permission.
export async function requestNotificationPermission() {
  try {
    // Configure Android notification channel.
    if (Platform.OS === "android") {
      try {
        await Notifications.setNotificationChannelAsync(
          "price-alerts",
          {
            name: "Price Alerts",
            importance: Notifications.AndroidImportance.HIGH,
          }
        );
      } catch (channelError) {
        console.warn(
          "Notification channel setup failed:",
          channelError
        );
      }
    }

    // Check existing permission.
    const permission =
      await Notifications.getPermissionsAsync();

    if (permission.granted) {
      return true;
    }

    // Request permission from the user.
    const requested =
      await Notifications.requestPermissionsAsync();

    const hasPermission =
      requested.granted || requested.status === "granted";

    if (!hasPermission) {
      console.log("Notification permission not granted.");
    }

    return hasPermission;

  } catch (error) {
    console.error(
      "Notification permission error:",
      error
    );

    return false;
  }
}

// Schedule a local notification after two seconds.
export async function sendLocalNotification(title, body) {
  try {
    const hasPermission =
      await requestNotificationPermission();

    if (!hasPermission) {
      console.log("Notification permission not granted.");
      return false;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: "default",
        data: {
          source: "FinPulse AI",
        },
      },
      trigger: {
        seconds: 2,
        channelId: "price-alerts",
      },
    });

    console.log(
      "Local notification scheduled successfully."
    );

    return true;

  } catch (error) {
    console.error(
      "Failed to schedule notification:",
      error
    );

    return false;
  }
}
