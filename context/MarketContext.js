
import React, {
  createContext,
  useContext,
  useState,
} from "react";

const MarketContext = createContext(null);

const initialAssets = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 95420.50,
    change: 2.45,
    signal: "STRONG BUY",
    confidence: 92,
    target: 98200,
    risk: "Medium",
    color: "#F7931A",
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 3245.80,
    change: 1.82,
    signal: "BULLISH",
    confidence: 85,
    target: 3380,
    risk: "Medium",
    color: "#627EEA",
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    price: 185.25,
    change: -1.24,
    signal: "HOLD",
    confidence: 78,
    target: 190,
    risk: "High",
    color: "#9945FF",
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    price: 0.72,
    change: -2.15,
    signal: "BEARISH",
    confidence: 81,
    target: 0.68,
    risk: "High",
    color: "#0033AD",
  },
];

export function MarketProvider({ children }) {
  const [assets] = useState(initialAssets);

  const [watchlist, setWatchlist] = useState([
    "bitcoin",
    "ethereum",
  ]);

  const [alerts, setAlerts] = useState([]);

  const toggleWatchlist = (assetId) => {
    setWatchlist((previous) =>
      previous.includes(assetId)
        ? previous.filter((id) => id !== assetId)
        : [...previous, assetId]
    );
  };

  const isInWatchlist = (assetId) =>
    watchlist.includes(assetId);

  const addAlert = ({ assetId, targetPrice, condition }) => {
    const asset = assets.find(
      (item) => item.id === assetId
    );

    if (!asset || !Number.isFinite(targetPrice) || targetPrice <= 0) {
      return {
        success: false,
        error: "Please select an asset and enter a valid target price.",
      };
    }

    const newAlert = {
      id: `${Date.now()}-${Math.random()}`,
      assetId,
      symbol: asset.symbol,
      name: asset.name,
      targetPrice,
      condition,
      createdAt: new Date().toISOString(),
      active: true,
    };

    setAlerts((previous) => [newAlert, ...previous]);

    return { success: true };
  };

  const removeAlert = (alertId) => {
    setAlerts((previous) =>
      previous.filter((alert) => alert.id !== alertId)
    );
  };

  return (
    <MarketContext.Provider
      value={{
        assets,
        watchlist,
        toggleWatchlist,
        isInWatchlist,
        alerts,
        addAlert,
        removeAlert,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);

  if (!context) {
    throw new Error(
      "useMarket must be used inside MarketProvider"
    );
  }

  return context;
}
