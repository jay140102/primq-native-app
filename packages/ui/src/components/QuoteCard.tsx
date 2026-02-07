import React from "react";
import { Text, View } from "react-native";

export type Quote = {
    symbol: string;
    name: string;
    tag?: string;
    lastPrice: number;
    time: string;
    change: number;
    changePercent: number;
};

function formatNumber(n: number) {
    return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function formatSigned(n: number) {
    const abs = Math.abs(n);
    const sign = n >= 0 ? "+" : "-";
    return `${sign} ${formatNumber(abs)}`;
}

function formatSignedPercent(n: number) {
    const abs = Math.abs(n);
    const sign = n >= 0 ? "+" : "-";
    return `${sign} ${abs.toFixed(2)}%`;
}

export function QuoteCard({ quote }: { quote: Quote }) {
    const isUp = quote.change >= 0;
    const changeColor = isUp ? "#2EE5A2" : "#FF5A7A";

    return (
        <View className="rounded-3xl border border-white/10 bg-dark-200 px-5 py-4 mb-4">
            <View className="flex-row items-center">
                <View className="flex-1">
                    <View className="flex-row items-center">
                        <Text className="text-white text-[16px] font-semibold">
                            {quote.symbol}
                        </Text>
                        {quote.tag ? (
                            <View className="ml-3 rounded-full bg-[#0B2E5E] px-3 py-1">
                                <Text className="text-[#7EB7FF] text-[11px] font-semibold tracking-widest">
                                    {quote.tag}
                                </Text>
                            </View>
                        ) : null}
                    </View>
                    <Text className="text-light-200 text-[14px] mt-1">{quote.name}</Text>
                </View>

                <View className="w-32 items-end justify-center">
                    <Text className="text-white text-[16px] font-semibold">
                        {formatNumber(quote.lastPrice)}
                    </Text>
                    <Text className="text-light-300 text-[12px] mt-1">{quote.time}</Text>
                </View>

                <View className="w-24 items-end justify-center ml-4">
                    <Text className="text-[16px] font-semibold" style={{ color: changeColor }}>
                        {formatSigned(quote.change)}
                    </Text>
                    <Text className="text-[14px] mt-1" style={{ color: changeColor }}>
                        {formatSignedPercent(quote.changePercent)}
                    </Text>
                </View>
            </View>
        </View>
    );
}
