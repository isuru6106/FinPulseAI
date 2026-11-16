
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMarket } from "../../context/MarketContext";
import {
  sendLocalNotification,
} from "../../services/notificationService";

const COLORS = {
  background: "#080D18",
  surface: "#111B2B",
  white: "#F5F7FA",
  muted: "#8491A5",
  primary: "#20D6A1",
  red: "#FF647C",
  border: "#203149",
};

export default function AlertsScreen() {
  const {
    assets,
    alerts,
    addAlert,
    removeAlert,
  } = useMarket();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("bitcoin");
  const [condition, setCondition] = useState("above");
  const [targetPrice, setTargetPrice] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const selectedAssetData = assets.find(
    (asset) => asset.id === selectedAsset
  );

  const formatPrice = (price) =>
    price < 1
      ? `$${price.toFixed(4)}`
      : `$${price.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;

  // Create a price alert and schedule a local notification.
  const handleCreateAlert = async () => {
    if (isCreating) return;

    const price = Number(targetPrice);

    if (!Number.isFinite(price) || price <= 0) {
      Alert.alert("Invalid price", "Enter a valid target price.");
      return;
    }

    setIsCreating(true);

    try {
      const result = addAlert({
        assetId: selectedAsset,
        targetPrice: price,
        condition,
      });

      if (!result.success) {
        Alert.alert("Unable to create alert", result.error);
        return;
      }

      const asset = assets.find(
        (item) => item.id === selectedAsset
      );

      const notificationScheduled =
        await sendLocalNotification(
          "FinPulse AI - Price Alert",
          `${asset?.symbol || selectedAsset.toUpperCase()} alert created: Price ${condition} ${formatPrice(price)}.`
        );

      setTargetPrice("");
      setModalVisible(false);

      if (notificationScheduled) {
        Alert.alert(
          "Alert created",
          "Your price alert has been saved. A test notification has been scheduled."
        );
      } else {
        Alert.alert(
          "Alert created",
          "Your price alert has been saved, but notification permission is unavailable."
        );
      }
    } catch (error) {
      console.error("Alert creation error:", error);

      Alert.alert(
        "Notification error",
        "The alert operation encountered an error. Please check the console."
      );
    } finally {
      setIsCreating(false);
    }
  };

  // Delete an existing alert.
  const handleDelete = (alertId) => {
    Alert.alert(
      "Delete alert",
      "Are you sure you want to delete this alert?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => removeAlert(alertId),
        },
      ]
    );
  };

  // Render each alert card.
  const renderAlert = ({ item }) => (
    <View style={styles.alertCard}>
      <View style={styles.alertIcon}>
        <Ionicons
          name="notifications"
          size={21}
          color={COLORS.primary}
        />
      </View>

      <View style={styles.alertDetails}>
        <Text style={styles.assetName}>
          {item.name} ({item.symbol})
        </Text>

        <Text style={styles.condition}>
          Price goes {item.condition}
        </Text>

        <Text style={styles.targetPrice}>
          {formatPrice(item.targetPrice)}
        </Text>

        <Text style={styles.activeLabel}>
          <Ionicons
            name="ellipse"
            size={7}
            color={COLORS.primary}
          />
          {" "}Active · Demo alert
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => handleDelete(item.id)}
        style={styles.deleteButton}
      >
        <Ionicons
          name="trash-outline"
          size={19}
          color={COLORS.red}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>FINPULSE AI</Text>

        <Text style={styles.heading}>Price Alerts</Text>

        <Text style={styles.subtitle}>
          Monitor your favourite market prices
        </Text>
      </View>

      {/* Summary */}
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>
            TOTAL ALERTS
          </Text>

          <Text style={styles.summaryValue}>
            {alerts.length}
          </Text>

          <Text style={styles.summaryCaption}>
            Alerts created on this device session
          </Text>
        </View>

        <View style={styles.summaryIcon}>
          <Ionicons
            name="notifications-outline"
            size={27}
            color={COLORS.primary}
          />
        </View>
      </View>

      {/* Create alert button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons
          name="add-circle-outline"
          size={21}
          color="#080D18"
        />

        <Text style={styles.createButtonText}>
          Create Price Alert
        </Text>
      </TouchableOpacity>

      {/* Alert list heading */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Your Alerts
        </Text>

        <Text style={styles.countLabel}>
          {alerts.length} TOTAL
        </Text>
      </View>

      {/* Alert list */}
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={renderAlert}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons
              name="notifications-off-outline"
              size={48}
              color={COLORS.muted}
            />

            <Text style={styles.emptyTitle}>
              No price alerts yet
            </Text>

            <Text style={styles.emptyDescription}>
              Create your first alert to keep track of important
              cryptocurrency price levels.
            </Text>
          </View>
        }
      />

      {/* Create alert modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Create Price Alert
              </Text>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                disabled={isCreating}
              >
                <Ionicons
                  name="close"
                  size={25}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>

            {/* Asset selection */}
            <Text style={styles.inputLabel}>
              SELECT ASSET
            </Text>

            <View style={styles.assetOptions}>
              {assets.map((asset) => (
                <Pressable
                  key={asset.id}
                  onPress={() => setSelectedAsset(asset.id)}
                  style={[
                    styles.assetOption,
                    selectedAsset === asset.id &&
                      styles.selectedAssetOption,
                  ]}
                >
                  <Text
                    style={[
                      styles.assetOptionText,
                      selectedAsset === asset.id &&
                        styles.selectedAssetText,
                    ]}
                  >
                    {asset.symbol}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Alert condition */}
            <Text style={styles.inputLabel}>
              ALERT CONDITION
            </Text>

            <View style={styles.conditionOptions}>
              <TouchableOpacity
                onPress={() => setCondition("above")}
                style={[
                  styles.conditionButton,
                  condition === "above" &&
                    styles.selectedCondition,
                ]}
              >
                <Ionicons
                  name="trending-up"
                  size={17}
                  color={
                    condition === "above"
                      ? COLORS.primary
                      : COLORS.muted
                  }
                />

                <Text
                  style={[
                    styles.conditionText,
                    condition === "above" &&
                      styles.selectedConditionText,
                  ]}
                >
                  Price Above
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setCondition("below")}
                style={[
                  styles.conditionButton,
                  condition === "below" &&
                    styles.selectedCondition,
                ]}
              >
                <Ionicons
                  name="trending-down"
                  size={17}
                  color={
                    condition === "below"
                      ? COLORS.primary
                      : COLORS.muted
                  }
                />

                <Text
                  style={[
                    styles.conditionText,
                    condition === "below" &&
                      styles.selectedConditionText,
                  ]}
                >
                  Price Below
                </Text>
              </TouchableOpacity>
            </View>

            {/* Target price */}
            <Text style={styles.inputLabel}>
              TARGET PRICE (USD)
            </Text>

            <TextInput
              style={styles.priceInput}
              placeholder="Enter target price"
              placeholderTextColor={COLORS.muted}
              keyboardType="decimal-pad"
              value={targetPrice}
              onChangeText={setTargetPrice}
              editable={!isCreating}
            />

            {selectedAssetData && (
              <Text style={styles.currentPrice}>
                Current demo price:{" "}
                {formatPrice(selectedAssetData.price)}
              </Text>
            )}

            {/* Save alert */}
            <TouchableOpacity
              style={[
                styles.saveButton,
                isCreating && styles.disabledButton,
              ]}
              onPress={handleCreateAlert}
              disabled={isCreating}
            >
              <Text style={styles.saveButtonText}>
                {isCreating
                  ? "Creating Alert..."
                  : "Save Price Alert"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.modalDisclaimer}>
              Demo mode. Notifications are used to test local
              delivery. Automatic market-price monitoring
              is not enabled yet.
            </Text>
          </View>
        </View>
      </Modal>

      {/* Footer */}
      <Text style={styles.footer}>
        FinPulse AI · Illustrative demo data
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  header: {
    marginBottom: 22,
  },

  brand: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
  },

  heading: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: "800",
    marginTop: 12,
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 6,
  },

  summaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 17,
    padding: 19,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 17,
  },

  summaryLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  summaryValue: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: "900",
    marginTop: 6,
  },

  summaryCaption: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 4,
  },

  summaryIcon: {
    backgroundColor: "#142B2B",
    width: 53,
    height: 53,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  createButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 13,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    marginBottom: 25,
  },

  createButtonText: {
    color: "#080D18",
    fontSize: 14,
    fontWeight: "900",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
  },

  countLabel: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: "800",
  },

  list: {
    paddingBottom: 20,
    flexGrow: 1,
  },

  alertCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },

  alertIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#142B2B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  alertDetails: {
    flex: 1,
  },

  assetName: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },

  condition: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
  },

  targetPrice: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 5,
  },

  activeLabel: {
    color: COLORS.primary,
    fontSize: 10,
    marginTop: 6,
  },

  deleteButton: {
    padding: 10,
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 45,
  },

  emptyTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
    marginTop: 15,
  },

  emptyDescription: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 8,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 22,
    paddingBottom: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  modalTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "900",
  },

  inputLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 17,
  },

  assetOptions: {
    flexDirection: "row",
    gap: 9,
  },

  assetOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#152235",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  selectedAssetOption: {
    borderColor: COLORS.primary,
    backgroundColor: "#142B2B",
  },

  assetOptionText: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "800",
  },

  selectedAssetText: {
    color: COLORS.primary,
  },

  conditionOptions: {
    flexDirection: "row",
    gap: 10,
  },

  conditionButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#152235",
  },

  selectedCondition: {
    borderColor: COLORS.primary,
    backgroundColor: "#142B2B",
  },

  conditionText: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "700",
  },

  selectedConditionText: {
    color: COLORS.primary,
  },

  priceInput: {
    backgroundColor: "#152235",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 11,
    padding: 15,
    color: COLORS.white,
    fontSize: 16,
  },

  currentPrice: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 9,
  },

  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 23,
  },

  disabledButton: {
    opacity: 0.6,
  },

  saveButtonText: {
    color: "#080D18",
    fontSize: 14,
    fontWeight: "900",
  },

  modalDisclaimer: {
    color: COLORS.muted,
    fontSize: 9,
    lineHeight: 15,
    textAlign: "center",
    marginTop: 13,
  },

  footer: {
    color: "#65738A",
    fontSize: 10,
    textAlign: "center",
    paddingVertical: 12,
  },
});
