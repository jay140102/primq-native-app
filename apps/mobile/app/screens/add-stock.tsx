import { ScreenBackground } from "@primq/ui";
import { useStocks } from "@/contexts/StocksContext";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

type Stock = {
    symbol: string;
    name: string;
    price: number;
};

// Dummy stock data for search
const AVAILABLE_STOCKS: Stock[] = [
    { symbol: "AAPL", name: "Apple Inc.", price: 256.83 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 336.65 },
    { symbol: "MSFT", name: "Microsoft Corporation", price: 425.32 },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.25 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 242.84 },
    { symbol: "META", name: "Meta Platforms Inc.", price: 512.42 },
    { symbol: "NVDA", name: "NVIDIA Corporation", price: 875.28 },
    { symbol: "BTC-USD", name: "Bitcoin", price: 88994.0 },
    { symbol: "ETH-USD", name: "Ethereum", price: 3245.67 },
];

export default function AddStockScreen() {
    const { addStock } = useStocks();
    const params = useLocalSearchParams<{ portfolioId?: string }>();
    const portfolioId = params.portfolioId || "1";

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
    const [quantity, setQuantity] = useState("");

    const filteredStocks = AVAILABLE_STOCKS.filter(
        (stock) =>
            stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddStock = () => {
        if (selectedStock && quantity) {
            addStock({
                symbol: selectedStock.symbol,
                name: selectedStock.name,
                price: selectedStock.price,
                quantity: Number(quantity),
                portfolioId,
            });

            // Navigate back to markets
            router.back();
        }
    };

    return (
        <ScreenBackground>
            <StatusBar style="light" />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                {/* Header */}
                <View className="px-5 pt-12 pb-4">
                    <View className="flex-row items-center justify-between mb-6">
                        <Text className="text-white text-[24px] font-semibold">
                            Add Stock
                        </Text>
                        <Pressable
                            onPress={() => router.back()}
                            className="h-10 w-10 items-center justify-center"
                        >
                            <Text className="text-light-200 text-[24px]">✕</Text>
                        </Pressable>
                    </View>

                    {/* Search Input */}
                    <View className="mb-4">
                        <Text className="text-light-200 text-[14px] mb-2">
                            Search Stock
                        </Text>
                        <TextInput
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Enter symbol or company name"
                            placeholderTextColor="#A8B5DB"
                            className="bg-dark-200 text-white text-[16px] px-4 py-3 rounded-xl border border-white/10"
                        />
                    </View>
                </View>

                {/* Stock List */}
                {!selectedStock ? (
                    <FlatList
                        data={filteredStocks}
                        keyExtractor={(item) => item.symbol}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => setSelectedStock(item)}
                                className="mx-5 mb-3 bg-dark-200 rounded-2xl border border-white/10 px-5 py-4"
                            >
                                <View className="flex-row items-center justify-between">
                                    <View className="flex-1">
                                        <Text className="text-white text-[16px] font-semibold">
                                            {item.symbol}
                                        </Text>
                                        <Text className="text-light-200 text-[14px] mt-1">
                                            {item.name}
                                        </Text>
                                    </View>
                                    <Text className="text-white text-[16px] font-semibold">
                                        ${item.price.toLocaleString()}
                                    </Text>
                                </View>
                            </Pressable>
                        )}
                        contentContainerStyle={{
                            paddingBottom: 140,
                        }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View className="items-center justify-center py-10">
                                <Text className="text-light-200 text-[16px]">
                                    No stocks found
                                </Text>
                            </View>
                        }
                    />
                ) : (
                    /* Selected Stock Details */
                    <View className="flex-1 px-5">
                        <View className="bg-dark-200 rounded-2xl border border-white/10 p-5 mb-4">
                            <View className="flex-row items-center justify-between mb-4">
                                <View className="flex-1">
                                    <Text className="text-white text-[20px] font-semibold">
                                        {selectedStock.symbol}
                                    </Text>
                                    <Text className="text-light-200 text-[14px] mt-1">
                                        {selectedStock.name}
                                    </Text>
                                </View>
                                <Pressable
                                    onPress={() => setSelectedStock(null)}
                                    className="h-8 w-8 items-center justify-center"
                                >
                                    <Text className="text-light-200 text-[20px]">✕</Text>
                                </Pressable>
                            </View>
                            <Text className="text-white text-[24px] font-semibold">
                                ${selectedStock.price.toLocaleString()}
                            </Text>
                        </View>

                        {/* Quantity Input */}
                        <View className="mb-6">
                            <Text className="text-light-200 text-[14px] mb-2">
                                Number of Shares
                            </Text>
                            <TextInput
                                value={quantity}
                                onChangeText={setQuantity}
                                placeholder="Enter quantity"
                                placeholderTextColor="#A8B5DB"
                                keyboardType="numeric"
                                className="bg-dark-200 text-white text-[16px] px-4 py-3 rounded-xl border border-white/10"
                            />
                        </View>

                        {/* Total Value */}
                        {quantity && !isNaN(Number(quantity)) && (
                            <View className="bg-dark-300/50 rounded-2xl p-4 mb-6">
                                <Text className="text-light-200 text-[14px] mb-1">
                                    Total Value
                                </Text>
                                <Text className="text-white text-[28px] font-semibold">
                                    $
                                    {(selectedStock.price * Number(quantity)).toLocaleString(
                                        undefined,
                                        { maximumFractionDigits: 2 }
                                    )}
                                </Text>
                            </View>
                        )}

                        {/* Add Button */}
                        <Pressable
                            onPress={handleAddStock}
                            disabled={!quantity || isNaN(Number(quantity))}
                            className={[
                                "py-4 rounded-xl",
                                quantity && !isNaN(Number(quantity))
                                    ? "bg-accent"
                                    : "bg-dark-300",
                            ].join(" ")}
                        >
                            <Text className="text-white text-[16px] font-semibold text-center">
                                Add to Portfolio
                            </Text>
                        </Pressable>
                    </View>
                )}
            </KeyboardAvoidingView>
        </ScreenBackground>
    );
}
