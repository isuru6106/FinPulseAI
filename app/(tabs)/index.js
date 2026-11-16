
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
};

const marketData = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: "$96,420.50",
    change: "+2.45%",
    signal: "STRONG BUY",
    confidence: 92,
    positive: true,
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: "$3,245.80",
    change: "+1.82%",
    signal: "BULLISH",
    confidence: 85,
    positive: true,
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    price: "$186.25",
    change: "-0.95%",
    signal: "HOLD",
    confidence: 74,
    positive: false,
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    price: "$0.72",
    change: "-2.10%",
    signal: "BEARISH",
    confidence: 81,
    positive: false,
  },
];

function MarketCard({
  item,
  isSaved,
  onToggle,
  onPress,
}) {
  const signalColor =
    item.signal === "STRONG BUY" || item.signal === "BULLISH"
      ? COLORS.green
      : item.signal === "BEARISH"
      ? COLORS.red
      : COLORS.yellow;

  return (
    <View style={styles.marketCard}>
      {/* Main asset information */}
      <View style={styles.marketTop}>
        <Pressable
          style={styles.marketInfo}
          onPress={onPress}
        >
          <Text style={styles.symbol}>
            {item.symbol}
          </Text>

          <Text style={styles.assetName}>
            {item.name}
          </Text>
        </Pressable>

        <Pressable
          style={styles.priceSection}
          onPress={onPress}
        >
          <Text style={styles.price}>
            {item.price}
          </Text>

          <Text
            style={{
              color: item.positive
                ? COLORS.green
                : COLORS.red,
              fontSize: 12,
              marginTop: 5,
            }}
          >
            {item.change}
          </Text>
        </Pressable>

        {/* Bookmark button */}
        <Pressable
          onPress={onToggle}
          style={styles.bookmarkButton}
          hitSlop={8}
        >
          <Ionicons
            name={
              isSaved
                ? "bookmark"
                : "bookmark-outline"
            }
            size={23}
            color={
              isSaved
                ? COLORS.primary
                : COLORS.muted
            }
          />
        </Pressable>
      </View>

      <View style={styles.cardDivider} />

      {/* Signal information - also opens details */}
      <Pressable onPress={onPress}>
        <View style={styles.signalRow}>
          <View>
            <Text style={styles.smallLabel}>
              AI SIGNAL
            </Text>

            <Text
              style={[
                styles.signalText,
                { color: signalColor },
              ]}
            >
              {item.signal}
            </Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.smallLabel}>
              CONFIDENCE
            </Text>

            <Text style={styles.confidence}>
              {item.confidence}%
            </Text>
          </View>
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${item.confidence}%`,
                backgroundColor: signalColor,
              },
            ]}
          />
        </View>

        <View style={styles.detailsHint}>
          <Text style={styles.detailsHintText}>
            View Signal Details
          </Text>

          <Ionicons
            name="chevron-forward"
            size={15}
            color={COLORS.primary}
          />
        </View>
      </Pressable>
    </View>
  );
}

export default function RadarScreen() {
  const router = useRouter();

  const {
    watchlist,
    toggleWatchlist,
  } = useMarket();

  const openSignalDetails = (assetId) => {
    router.push({
      pathname: "/signal/[id]",
      params: {
        id: assetId,
      },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>
            FINPULSE AI
          </Text>

          <Text style={styles.subtitle}>
            Predictive Market Intelligence
          </Text>
        </View>

        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />

          <Text style={styles.statusText}>
            DEMO DATA
          </Text>
        </View>
      </View>

      {/* Welcome */}
      <View style={styles.welcomeSection}>
        <Text style={styles.greeting}>
          MARKET OVERVIEW
        </Text>

        <Text style={styles.heading}>
          Your AI Market Radar
        </Text>

        <Text style={styles.description}>
          Discover market opportunities through
          intelligent signal analysis.
        </Text>
      </View>

      {/* Market sentiment */}
      <View style={styles.marketSummary}>
        <View>
          <Text style={styles.smallLabel}>
            MARKET SENTIMENT
          </Text>

          <Text style={styles.sentiment}>
            Bullish
          </Text>

          <Text style={styles.summaryCaption}>
            Demo market indicator
          </Text>
        </View>

        <View style={styles.sentimentCircle}>
          <Text style={styles.sentimentScore}>
            78
          </Text>

          <Text style={styles.scoreLabel}>
            SCORE
          </Text>
        </View>
      </View>

      {/* Trading signals */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          AI Trading Signals
        </Text>

        <Text style={styles.sectionSubtitle}>
          TOP ASSETS
        </Text>
      </View>

      <FlatList
        data={marketData}
        renderItem={({ item }) => (
          <MarketCard
            item={item}
            isSaved={watchlist.includes(item.id)}
            onToggle={() => toggleWatchlist(item.id)}
            onPress={() => openSignalDetails(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={{ gap: 12 }}
      />

      {/* Risk disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerTitle}>
          Risk Disclaimer
        </Text>

        <Text style={styles.disclaimerText}>
          These are illustrative demo signals, not
          live financial advice. Market prices and
          trading indicators can change rapidly.
          Always conduct your own research before
          investing.
        </Text>
      </View>

      <View style={{ height: 25 }} />
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
    marginTop: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  brand: {
    color: COLORS.primary,
    fontSize: 21,
    fontWeight: "900",
    letterSpacing: 2,
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#142B2B",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: COLORS.yellow,
    marginRight: 6,
  },

  statusText: {
    color: COLORS.yellow,
    fontSize: 9,
    fontWeight: "800",
  },

  welcomeSection: {
    marginTop: 35,
    marginBottom: 20,
  },

  greeting: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  heading: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: "800",
    marginTop: 9,
  },

  description: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },

  marketSummary: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#203149",
    marginBottom: 30,
  },

  smallLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },

  sentiment: {
    color: COLORS.green,
    fontSize: 23,
    fontWeight: "800",
    marginTop: 8,
  },

  summaryCaption: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 5,
  },

  sentimentCircle: {
    width: 75,
    height: 75,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
  },

  sentimentScore: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "900",
  },

  scoreLabel: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: "700",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "800",
  },

  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: "700",
  },

  marketCard: {
    backgroundColor: COLORS.surface,
    padding: 17,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#203149",
  },

  marketTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  marketInfo: {
    flex: 1,
  },

  priceSection: {
    alignItems: "flex-end",
    marginLeft: 8,
  },

  bookmarkButton: {
    marginLeft: 15,
    padding: 5,
  },

  symbol: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
  },

  assetName: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 4,
  },

  price: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
  },

  cardDivider: {
    height: 1,
    backgroundColor: "#26364A",
    marginVertical: 15,
  },

  signalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  signalText: {
    fontSize: 12,
    fontWeight: "900",
    marginTop: 6,
  },

  confidence: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 6,
  },

  progressBackground: {
    height: 5,
    backgroundColor: "#26364A",
    borderRadius: 5,
    marginTop: 12,
    overflow: "hidden",
  },

  progressFill: {
    height: 5,
    borderRadius: 5,
  },

  detailsHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 4,
  },

  detailsHintText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: "700",
  },

  disclaimer: {
    backgroundColor: "#171F2D",
    borderRadius: 12,
    padding: 15,
    marginTop: 25,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.yellow,
  },

  disclaimerTitle: {
    color: COLORS.yellow,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 6,
  },

  disclaimerText: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 17,
  },
});
