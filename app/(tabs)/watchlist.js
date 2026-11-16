
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMarket } from "../../context/MarketContext";

export default function WatchlistScreen() {
  const {
    assets,
    watchlist,
    toggleWatchlist,
  } = useMarket();

  const savedAssets = assets.filter((asset) =>
    watchlist.includes(asset.id)
  );

  const formatPrice = (price) => {
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const renderAsset = ({ item }) => {
    const positive = item.change >= 0;

    return (
      <View style={styles.assetCard}>
        <View style={styles.assetLeft}>
          <View
            style={[
              styles.coinIcon,
              { backgroundColor: item.color },
            ]}
          >
            <Text style={styles.coinInitial}>
              {item.symbol.charAt(0)}
            </Text>
          </View>

          <View>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text style={styles.assetName}>{item.name}</Text>
          </View>
        </View>

        <View style={styles.assetRight}>
          <Text style={styles.price}>
            {formatPrice(item.price)}
          </Text>

          <Text
            style={[
              styles.change,
              {
                color: positive ? "#20D6A1" : "#FF647C",
              },
            ]}
          >
            {positive ? "+" : ""}
            {item.change.toFixed(2)}%
          </Text>
        </View>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => toggleWatchlist(item.id)}
        >
          <Ionicons
            name="bookmark"
            size={19}
            color="#20D6A1"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Watchlist</Text>
      <Text style={styles.subtitle}>
        Keep track of your favourite assets
      </Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>
          SAVED ASSETS
        </Text>
        <Text style={styles.summaryValue}>
          {savedAssets.length}
        </Text>
      </View>

      <FlatList
        data={savedAssets}
        keyExtractor={(item) => item.id}
        renderItem={renderAsset}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="bookmark-outline"
              size={42}
              color="#8491A5"
            />
            <Text style={styles.emptyTitle}>
              Your watchlist is empty
            </Text>
            <Text style={styles.emptyText}>
              Add assets from AI Radar to track them here.
            </Text>
          </View>
        }
      />

      <Text style={styles.footer}>
        Demo market data · Not live prices
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080D18",
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  heading: {
    color: "#F5F7FA",
    fontSize: 27,
    fontWeight: "800",
  },
  subtitle: {
    color: "#8491A5",
    fontSize: 13,
    marginTop: 6,
    marginBottom: 22,
  },
  summaryCard: {
    backgroundColor: "#111B2B",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#203149",
  },
  summaryLabel: {
    color: "#8491A5",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  summaryValue: {
    color: "#20D6A1",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 5,
  },
  list: {
    paddingBottom: 20,
  },
  assetCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111B2B",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#203149",
  },
  assetLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  coinIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },
  coinInitial: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
  symbol: {
    color: "#F5F7FA",
    fontSize: 15,
    fontWeight: "700",
  },
  assetName: {
    color: "#8491A5",
    fontSize: 12,
    marginTop: 3,
  },
  assetRight: {
    alignItems: "flex-end",
    marginRight: 14,
  },
  price: {
    color: "#F5F7FA",
    fontSize: 14,
    fontWeight: "700",
  },
  change: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 5,
  },
  removeButton: {
    padding: 7,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 55,
  },
  emptyTitle: {
    color: "#F5F7FA",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 15,
  },
  emptyText: {
    color: "#8491A5",
    fontSize: 12,
    textAlign: "center",
    marginTop: 7,
  },
  footer: {
    color: "#65738A",
    fontSize: 10,
    textAlign: "center",
    paddingVertical: 12,
  },
});
