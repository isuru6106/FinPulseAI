
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMarket } from "../../context/MarketContext";

const COLORS = {
  background: "#080D18",
  surface: "#111B2B",
  card: "#152235",
  primary: "#20D6A1",
  white: "#F5F7FA",
  muted: "#8491A5",
  green: "#20D6A1",
  red: "#FF647C",
  yellow: "#F5C76B",
  border: "#203149",
};

export default function IntelligenceScreen() {
  const { assets } = useMarket();

  const bullishCount = assets.filter(
    (asset) =>
      asset.signal === "STRONG BUY" ||
      asset.signal === "BULLISH"
  ).length;

  const bearishCount = assets.filter(
    (asset) => asset.signal === "BEARISH"
  ).length;

  const neutralCount = assets.length - bullishCount - bearishCount;

  const averageConfidence =
    assets.length > 0
      ? Math.round(
          assets.reduce(
            (total, asset) => total + asset.confidence,
            0
          ) / assets.length
        )
      : 0;

  const topSignal = [...assets].sort(
    (a, b) => b.confidence - a.confidence
  )[0];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>FINPULSE AI</Text>
        <Text style={styles.heading}>Market Intelligence</Text>
        <Text style={styles.subtitle}>
          AI-powered market analysis and insights
        </Text>
      </View>

      {/* Overall Sentiment */}
      <View style={styles.sentimentCard}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.label}>OVERALL MARKET SENTIMENT</Text>
            <Text style={styles.sentimentTitle}>Bullish Market</Text>
            <Text style={styles.mutedText}>
              Based on illustrative demo signals
            </Text>
          </View>

          <View style={styles.sentimentIcon}>
            <Ionicons
              name="trending-up"
              size={25}
              color={COLORS.green}
            />
          </View>
        </View>

        <View style={styles.scoreRow}>
          <Text style={styles.score}>78</Text>
          <Text style={styles.scoreOutOf}>/ 100</Text>
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: "78%" },
            ]}
          />
        </View>

        <Text style={styles.scoreCaption}>
          Market sentiment score
        </Text>
      </View>

      {/* Signal Distribution */}
      <Text style={styles.sectionTitle}>
        Signal Distribution
      </Text>

      <View style={styles.distributionCard}>
        <View style={styles.distributionRow}>
          <View style={styles.distributionItem}>
            <View style={styles.dotGreen} />
            <Text style={styles.distributionLabel}>Bullish</Text>
            <Text style={styles.distributionValue}>
              {bullishCount}
            </Text>
          </View>

          <View style={styles.distributionItem}>
            <View style={styles.dotYellow} />
            <Text style={styles.distributionLabel}>Neutral</Text>
            <Text style={styles.distributionValue}>
              {neutralCount}
            </Text>
          </View>

          <View style={styles.distributionItem}>
            <View style={styles.dotRed} />
            <Text style={styles.distributionLabel}>Bearish</Text>
            <Text style={styles.distributionValue}>
              {bearishCount}
            </Text>
          </View>
        </View>

        <View style={styles.distributionBar}>
          {assets.length > 0 && (
            <>
              <View
                style={[
                  styles.barGreen,
                  { flex: bullishCount },
                ]}
              />
              <View
                style={[
                  styles.barYellow,
                  { flex: neutralCount },
                ]}
              />
              <View
                style={[
                  styles.barRed,
                  { flex: bearishCount },
                ]}
              />
            </>
          )}
        </View>
      </View>

      {/* AI Performance */}
      <Text style={styles.sectionTitle}>
        AI Signal Performance
      </Text>

      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Ionicons
            name="analytics-outline"
            size={23}
            color={COLORS.primary}
          />
          <Text style={styles.metricValue}>
            {averageConfidence}%
          </Text>
          <Text style={styles.metricLabel}>
            Avg. Confidence
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Ionicons
            name="layers-outline"
            size={23}
            color={COLORS.yellow}
          />
          <Text style={styles.metricValue}>
            {assets.length}
          </Text>
          <Text style={styles.metricLabel}>
            Assets Analysed
          </Text>
        </View>
      </View>

      {/* Top Signal */}
      <Text style={styles.sectionTitle}>
        Strongest AI Signal
      </Text>

      {topSignal ? (
        <View style={styles.topSignalCard}>
          <View style={styles.topSignalHeader}>
            <View>
              <Text style={styles.label}>TOP CONFIDENCE ASSET</Text>
              <Text style={styles.topSignalName}>
                {topSignal.name}
              </Text>
              <Text style={styles.mutedText}>
                {topSignal.symbol}
              </Text>
            </View>

            <View style={styles.confidenceBadge}>
              <Text style={styles.confidenceValue}>
                {topSignal.confidence}%
              </Text>
              <Text style={styles.confidenceLabel}>
                CONFIDENCE
              </Text>
            </View>
          </View>

          <View style={styles.topSignalFooter}>
            <Text style={styles.label}>AI SIGNAL</Text>
            <Text style={styles.topSignalType}>
              {topSignal.signal}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.mutedText}>
          No assets available for analysis.
        </Text>
      )}

      {/* AI Insights */}
      <Text style={styles.sectionTitle}>
        AI Market Insights
      </Text>

      <View style={styles.insightCard}>
        <View style={styles.insightIcon}>
          <Ionicons
            name="trending-up"
            size={20}
            color={COLORS.green}
          />
        </View>

        <View style={styles.insightContent}>
          <Text style={styles.insightTitle}>
            Positive Market Momentum
          </Text>
          <Text style={styles.insightDescription}>
            The demo signals show positive momentum in Bitcoin
            and Ethereum. Monitor price movements before making
            investment decisions.
          </Text>
        </View>
      </View>

      <View style={styles.insightCard}>
        <View style={styles.insightIconWarning}>
          <Ionicons
            name="warning-outline"
            size={20}
            color={COLORS.yellow}
          />
        </View>

        <View style={styles.insightContent}>
          <Text style={styles.insightTitle}>
            Risk Awareness
          </Text>
          <Text style={styles.insightDescription}>
            Digital assets can experience significant volatility.
            Consider your risk tolerance and avoid relying on a
            single indicator.
          </Text>
        </View>
      </View>

      <View style={styles.disclaimer}>
        <Ionicons
          name="information-circle-outline"
          size={18}
          color={COLORS.yellow}
        />
        <Text style={styles.disclaimerText}>
          Intelligence is currently based on illustrative demo
          data. These insights are not generated by a trained
          AI prediction model.
        </Text>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 35,
    marginBottom: 25,
  },
  brand: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
  },
  heading: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: "800",
    marginTop: 12,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 6,
  },
  sentimentCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 19,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 27,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },
  sentimentTitle: {
    color: COLORS.green,
    fontSize: 20,
    fontWeight: "800",
    marginTop: 9,
  },
  mutedText: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
    lineHeight: 17,
  },
  sentimentIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#142B2B",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 20,
  },
  score: {
    color: COLORS.white,
    fontSize: 35,
    fontWeight: "900",
  },
  scoreOutOf: {
    color: COLORS.muted,
    fontSize: 14,
    marginLeft: 5,
  },
  progressBackground: {
    height: 7,
    backgroundColor: "#26364A",
    borderRadius: 10,
    marginTop: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: 7,
    backgroundColor: COLORS.green,
    borderRadius: 10,
  },
  scoreCaption: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 8,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 14,
  },
  distributionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 27,
  },
  distributionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  distributionItem: {
    alignItems: "center",
    flex: 1,
  },
  dotGreen: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: COLORS.green,
  },
  dotYellow: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: COLORS.yellow,
  },
  dotRed: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: COLORS.red,
  },
  distributionLabel: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 8,
  },
  distributionValue: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: "800",
    marginTop: 4,
  },
  distributionBar: {
    height: 9,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#26364A",
    marginTop: 20,
  },
  barGreen: {
    backgroundColor: COLORS.green,
  },
  barYellow: {
    backgroundColor: COLORS.yellow,
  },
  barRed: {
    backgroundColor: COLORS.red,
  },
  metricsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 27,
  },
  metricCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metricValue: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: "900",
    marginTop: 13,
  },
  metricLabel: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 5,
  },
  topSignalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 27,
  },
  topSignalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topSignalName: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "800",
    marginTop: 9,
  },
  confidenceBadge: {
    backgroundColor: "#142B2B",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  confidenceValue: {
    color: COLORS.green,
    fontSize: 22,
    fontWeight: "900",
  },
  confidenceLabel: {
    color: COLORS.muted,
    fontSize: 8,
    marginTop: 3,
  },
  topSignalFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 17,
    paddingTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topSignalType: {
    color: COLORS.green,
    fontSize: 12,
    fontWeight: "900",
  },
  insightCard: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  insightIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#142B2B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  insightIconWarning: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#30291B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
  },
  insightDescription: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 18,
    marginTop: 7,
  },
  disclaimer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#171F2D",
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
    gap: 9,
  },
  disclaimerText: {
    flex: 1,
    color: COLORS.muted,
    fontSize: 10,
    lineHeight: 16,
  },
});
