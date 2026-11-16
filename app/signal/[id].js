
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  background: "#080D18",
  surface: "#111B2B",
  white: "#F5F7FA",
  muted: "#8491A5",
  primary: "#20D6A1",
  border: "#203149",
};

const SIGNAL_DATA = {
  bitcoin: {
    name: "Bitcoin",
    symbol: "BTC",
    price: "$100,000.00",
    signal: "STRONG BUY",
    confidence: 92,
    change: "+4.25%",
    target: "$105,000.00",
    risk: "Medium",
    description:
      "Bitcoin is showing a positive demo market trend with strong illustrative signal confidence.",
  },
  ethereum: {
    name: "Ethereum",
    symbol: "ETH",
    price: "$3,500.00",
    signal: "BULLISH",
    confidence: 86,
    change: "+2.80%",
    target: "$3,700.00",
    risk: "Medium",
    description:
      "Ethereum is showing an illustrative bullish trend in the demo market data.",
  },
  solana: {
    name: "Solana",
    symbol: "SOL",
    price: "$180.00",
    signal: "HOLD",
    confidence: 78,
    change: "+1.20%",
    target: "$185.00",
    risk: "High",
    description:
      "Solana is showing a neutral demo signal. Monitor the market before making decisions.",
  },
  cardano: {
    name: "Cardano",
    symbol: "ADA",
    price: "$0.75",
    signal: "BEARISH",
    confidence: 72,
    change: "-1.50%",
    target: "$0.70",
    risk: "High",
    description:
      "Cardano is showing an illustrative bearish trend in the demo market data.",
  },
};

export default function SignalDetailsScreen() {
  const { id } = useLocalSearchParams();

  const asset = SIGNAL_DATA[String(id).toLowerCase()];

  if (!asset) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Signal not found</Text>
        <Text style={styles.subtitle}>
          We couldn't find the requested asset.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.symbol}>{asset.symbol}</Text>
        <Text style={styles.title}>{asset.name}</Text>
        <Text style={styles.price}>{asset.price}</Text>
        <Text style={styles.change}>{asset.change}</Text>
      </View>

      <View style={styles.signalCard}>
        <View style={styles.cardHeader}>
          <Ionicons
            name="analytics-outline"
            size={23}
            color={COLORS.primary}
          />
          <Text style={styles.cardTitle}>AI Market Signal</Text>
        </View>

        <Text style={styles.signal}>{asset.signal}</Text>

        <Text style={styles.label}>AI CONFIDENCE</Text>

        <Text style={styles.confidence}>
          {asset.confidence}%
        </Text>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${asset.confidence}%` },
            ]}
          />
        </View>
      </View>

      <View style={styles.metricsCard}>
        <Text style={styles.cardTitle}>Market Metrics</Text>

        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>24H Target</Text>
          <Text style={styles.metricValue}>{asset.target}</Text>
        </View>

        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Risk Level</Text>
          <Text style={styles.metricValue}>{asset.risk}</Text>
        </View>

        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Signal Type</Text>
          <Text style={styles.metricValue}>{asset.signal}</Text>
        </View>
      </View>

      <View style={styles.insightCard}>
        <Text style={styles.cardTitle}>AI Insight</Text>
        <Text style={styles.description}>
          {asset.description}
        </Text>
      </View>

      <Text style={styles.disclaimer}>
        Illustrative demo signals only. Not financial advice.
        Confidence values and targets are not live predictions.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  header: {
    paddingVertical: 20,
  },
  symbol: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
  },
  title: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 8,
  },
  subtitle: {
    color: COLORS.muted,
    marginTop: 8,
  },
  price: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: "900",
    marginTop: 15,
  },
  change: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 5,
  },
  signalCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 17,
    padding: 20,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 15,
  },
  signal: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "900",
    marginVertical: 15,
  },
  label: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  confidence: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "900",
    marginTop: 5,
  },
  progressBackground: {
    height: 8,
    backgroundColor: "#263449",
    borderRadius: 10,
    marginTop: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  metricsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 17,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 15,
  },
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  metricLabel: {
    color: COLORS.muted,
    fontSize: 13,
  },
  metricValue: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
  },
  insightCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 17,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  description: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 21,
  },
  disclaimer: {
    color: COLORS.muted,
    fontSize: 10,
    textAlign: "center",
    lineHeight: 17,
    marginVertical: 25,
  },
});
