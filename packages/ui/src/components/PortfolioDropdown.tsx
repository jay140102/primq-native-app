import React from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

export type Portfolio = {
    id: string;
    name: string;
};

type PortfolioDropdownProps = {
    visible: boolean;
    portfolios: Portfolio[];
    selectedPortfolioId: string;
    onClose: () => void;
    onSelectPortfolio: (portfolioId: string) => void;
    onAddPortfolio: () => void;
};

export function PortfolioDropdown({
    visible,
    portfolios,
    selectedPortfolioId,
    onClose,
    onSelectPortfolio,
    onAddPortfolio,
}: PortfolioDropdownProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable
                className="flex-1"
                onPress={onClose}
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
                <View className="mt-16 mx-5">
                    <Pressable onPress={(e) => e.stopPropagation()}>
                        <View className="bg-dark-200 rounded-2xl border border-white/10 overflow-hidden">
                            <ScrollView className="max-h-80">
                                {portfolios.map((portfolio) => {
                                    const isSelected = portfolio.id === selectedPortfolioId;
                                    return (
                                        <Pressable
                                            key={portfolio.id}
                                            onPress={() => {
                                                onSelectPortfolio(portfolio.id);
                                                onClose();
                                            }}
                                            className="px-5 py-4 border-b border-white/5"
                                        >
                                            <View className="flex-row items-center justify-between">
                                                <Text
                                                    className={[
                                                        "text-[16px]",
                                                        isSelected
                                                            ? "text-accent font-semibold"
                                                            : "text-white font-normal",
                                                    ].join(" ")}
                                                >
                                                    {portfolio.name}
                                                </Text>
                                                {isSelected && (
                                                    <Text className="text-accent text-[18px]">✓</Text>
                                                )}
                                            </View>
                                        </Pressable>
                                    );
                                })}

                                <Pressable
                                    onPress={() => {
                                        onAddPortfolio();
                                        onClose();
                                    }}
                                    className="px-5 py-4 bg-dark-300/50"
                                >
                                    <View className="flex-row items-center">
                                        <Text className="text-accent text-[18px] mr-2">+</Text>
                                        <Text className="text-accent text-[16px] font-semibold">
                                            Add Portfolio
                                        </Text>
                                    </View>
                                </Pressable>
                            </ScrollView>
                        </View>
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    );
}
