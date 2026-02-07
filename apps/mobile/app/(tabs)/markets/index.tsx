import {
  AddPortfolioModal,
  MarketsSegmentTabs,
  MarketsTopBar,
  QuoteCard,
  ScreenBackground,
  SideMenu,
  type Portfolio,
  type Quote,
} from "@primq/ui";
import { useStocks } from "@/contexts/StocksContext";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

type SortKey = "symbol" | "lastPrice" | "change";
type SortDir = "asc" | "desc";

const DUMMY_QUOTES: Quote[] = [
  {
    symbol: "GOOG",
    name: "Alphabet Inc.",
    lastPrice: 336.65,
    time: "02:25",
    change: 1.64,
    changePercent: 0.49,
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    lastPrice: 256.83,
    time: "02:25",
    change: -1.44,
    changePercent: -0.56,
  },
  {
    symbol: "BTC-USD",
    name: "Bitcoin",
    tag: "CRYPTO",
    lastPrice: 88994.0,
    time: "02:25",
    change: -325.68,
    changePercent: -0.36,
  },
  {
    symbol: "^DJI",
    name: "Dow Jones Industrial",
    lastPrice: 49035.59,
    time: "02:25",
    change: 32.18,
    changePercent: 0.07,
  },
  {
    symbol: "^IXIC",
    name: "NASDAQ Composite",
    lastPrice: 23879.18,
    time: "02:25",
    change: 62.08,
    changePercent: 0.26,
  },
  {
    symbol: "^GSPC",
    name: "S&P 500",
    lastPrice: 6982.66,
    time: "02:25",
    change: 4.06,
    changePercent: 0.06,
  },
  {
    symbol: "SPY",
    name: "SPDR S&P 500",
    lastPrice: 695.92,
    time: "02:25",
    change: 0.21,
    changePercent: 0.03,
  },
];

function getSortValue(q: Quote, key: SortKey) {
  switch (key) {
    case "symbol":
      return q.symbol;
    case "lastPrice":
      return q.lastPrice;
    case "change":
      return q.change;
  }
}

export default function MarketsQuotesScreen() {
  const { getStocksByPortfolio } = useStocks();
  const [sortKey, setSortKey] = useState<SortKey>("symbol");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [menuOpen, setMenuOpen] = useState(false);
  const [addPortfolioModalOpen, setAddPortfolioModalOpen] = useState(false);

  // Portfolio state management
  const [portfolios, setPortfolios] = useState<Portfolio[]>([
    { id: "1", name: "My Portfolio" },
    { id: "2", name: "Tech Stocks" },
    { id: "3", name: "Crypto" },
  ]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState("1");

  const selectedPortfolio = portfolios.find((p) => p.id === selectedPortfolioId);

  // Get stocks for selected portfolio and convert to Quote format
  const portfolioStocks = useMemo(() => {
    const stocks = getStocksByPortfolio(selectedPortfolioId);
    return stocks.map((stock): Quote => {
      // Check if it's a crypto asset (symbols ending with -USD or common crypto symbols)
      const isCrypto = stock.symbol.includes('-USD') ||
        ['BTC', 'ETH', 'USDT', 'BNB', 'SOL', 'XRP', 'ADA', 'DOGE'].includes(stock.symbol);

      return {
        symbol: stock.symbol,
        name: stock.name,
        lastPrice: stock.price,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        change: 0,
        changePercent: 0,
        tag: isCrypto ? 'CRYPTO' : undefined,
      };
    });
  }, [selectedPortfolioId, getStocksByPortfolio]);

  const sorted = useMemo(() => {
    // Combine dummy quotes with portfolio stocks
    const allQuotes = [...DUMMY_QUOTES, ...portfolioStocks];
    const dir = sortDir === "asc" ? 1 : -1;
    return allQuotes.sort((a, b) => {
      const av = getSortValue(a, sortKey);
      const bv = getSortValue(b, sortKey);

      if (typeof av === "string" && typeof bv === "string") {
        return av.localeCompare(bv) * dir;
      }
      return (Number(av) - Number(bv)) * dir;
    });
  }, [sortKey, sortDir, portfolioStocks]);

  function onPressSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDir("asc");
  }

  const handleAddPortfolio = (portfolioName: string) => {
    const newPortfolio: Portfolio = {
      id: Date.now().toString(),
      name: portfolioName,
    };
    setPortfolios([...portfolios, newPortfolio]);
    setSelectedPortfolioId(newPortfolio.id);
  };

  const sortArrow = sortDir === "asc" ? "▲" : "▼";

  return (
    <ScreenBackground>
      <StatusBar style="light" />

      <MarketsTopBar
        title={selectedPortfolio?.name || "My Portfolio"}
        onPressMenu={() => setMenuOpen(true)}
        onPressAdd={() => router.push(`/screens/add-stock?portfolioId=${selectedPortfolioId}`)}
        portfolios={portfolios}
        selectedPortfolioId={selectedPortfolioId}
        onSelectPortfolio={setSelectedPortfolioId}
        onAddPortfolio={() => setAddPortfolioModalOpen(true)}
      />

      <MarketsSegmentTabs
        active="quotes"
        onChange={(k) => {
          if (k === "quotes") return;
          router.replace(`/(tabs)/markets/${k}`);
        }}
      />

      <View className="px-5 pt-4 pb-2">
        <View className="flex-row items-center">
          <Pressable
            accessibilityRole="button"
            onPress={() => onPressSort("symbol")}
            className="flex-1 flex-row items-center"
          >
            <Text className="text-light-200 text-[12px] font-semibold tracking-[3px]">
              TICKER
            </Text>
            {sortKey === "symbol" ? (
              <Text style={{ color: "#A8B5DB", marginLeft: 6, fontSize: 10 }}>
                {sortArrow}
              </Text>
            ) : null}
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => onPressSort("lastPrice")}
            className="w-32 flex-row items-center justify-end"
          >
            <Text className="text-light-200 text-[12px] font-semibold tracking-[3px]">
              LAST PRICE
            </Text>
            {sortKey === "lastPrice" ? (
              <Text style={{ color: "#A8B5DB", marginLeft: 6, fontSize: 10 }}>
                {sortArrow}
              </Text>
            ) : null}
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => onPressSort("change")}
            className="w-24 flex-row items-center justify-end"
          >
            <Text className="text-light-200 text-[12px] font-semibold tracking-[3px]">
              CHANGE
            </Text>
            {sortKey === "change" ? (
              <Text style={{ color: "#A8B5DB", marginLeft: 6, fontSize: 10 }}>
                {sortArrow}
              </Text>
            ) : null}
          </Pressable>
        </View>
      </View>

      <FlatList
        data={sorted}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => <QuoteCard quote={item} />}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 6,
          paddingBottom: 140,
        }}
        showsVerticalScrollIndicator={false}
      />

      <SideMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onPressPremium={() => {
          setMenuOpen(false);
          router.push("/screens/premium-plans");
        }}
        onPressAcademy={() => {
          setMenuOpen(false);
          router.push("/(tabs)/academy");
        }}
        onPressProfile={() => {
          setMenuOpen(false);
          router.push("/(tabs)/profile");
        }}
        portfolios={portfolios}
        selectedPortfolioId={selectedPortfolioId}
        onSelectPortfolio={setSelectedPortfolioId}
        onAddPortfolio={() => {
          setMenuOpen(false);
          setAddPortfolioModalOpen(true);
        }}
      />

      <AddPortfolioModal
        visible={addPortfolioModalOpen}
        onClose={() => setAddPortfolioModalOpen(false)}
        onSave={handleAddPortfolio}
      />
    </ScreenBackground>
  );
}

