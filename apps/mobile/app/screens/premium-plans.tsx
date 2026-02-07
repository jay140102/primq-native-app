import { ScreenBackground } from "@primq/ui";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

type BillingPeriod = "daily" | "monthly" | "yearly";
type PlanTier = "basic" | "pro" | "elite";

type Plan = {
    tier: PlanTier;
    name: string;
    tagline: string;
    features: string[];
    prices: {
        daily: number;
        monthly: number;
        yearly: number;
    };
    color: string;
    recommended?: boolean;
};

const PLANS: Plan[] = [
    {
        tier: "basic",
        name: "Basic",
        tagline: "Essential features for beginners",
        features: [
            "Real-time market data",
            "Up to 3 portfolios",
            "Basic analytics",
            "Email support",
        ],
        prices: {
            daily: 0.99,
            monthly: 9.99,
            yearly: 99.99,
        },
        color: "#4DA3FF",
    },
    {
        tier: "pro",
        name: "Pro",
        tagline: "Advanced tools for serious traders",
        features: [
            "Everything in Basic",
            "Unlimited portfolios",
            "Advanced analytics & charts",
            "Priority support",
            "Custom alerts",
            "Portfolio reports",
        ],
        prices: {
            daily: 2.99,
            monthly: 29.99,
            yearly: 299.99,
        },
        color: "#AB8BFF",
        recommended: true,
    },
    {
        tier: "elite",
        name: "Elite",
        tagline: "Premium experience for professionals",
        features: [
            "Everything in Pro",
            "AI-powered insights",
            "Real-time news alerts",
            "Dedicated account manager",
            "API access",
            "White-label reports",
            "Early feature access",
        ],
        prices: {
            daily: 4.99,
            monthly: 49.99,
            yearly: 499.99,
        },
        color: "#F2C94C",
    },
];

export default function PremiumPlansScreen() {
    const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

    const getSavingsText = (period: BillingPeriod) => {
        if (period === "yearly") return "Save 17%";
        if (period === "daily") return "Pay as you go";
        return "";
    };

    return (
        <ScreenBackground>
            <StatusBar style="light" />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="px-5 pt-12 pb-6">
                    <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-white text-[28px] font-semibold">
                            Premium Plans
                        </Text>
                        <Pressable
                            onPress={() => router.back()}
                            className="h-10 w-10 items-center justify-center"
                        >
                            <Text className="text-light-200 text-[24px]">✕</Text>
                        </Pressable>
                    </View>
                    <Text className="text-light-200 text-[16px]">
                        Choose the perfect plan for your trading journey
                    </Text>
                </View>

                {/* Billing Period Toggle */}
                <View className="px-5 mb-6">
                    <View className="bg-dark-200 rounded-2xl p-1 flex-row border border-white/10">
                        {(["daily", "monthly", "yearly"] as BillingPeriod[]).map(
                            (period) => {
                                const isActive = billingPeriod === period;
                                const savingsText = getSavingsText(period);
                                return (
                                    <Pressable
                                        key={period}
                                        onPress={() => setBillingPeriod(period)}
                                        className="flex-1"
                                    >
                                        <View
                                            className={[
                                                "py-3 rounded-xl items-center",
                                                isActive ? "bg-accent" : "",
                                            ].join(" ")}
                                        >
                                            <Text
                                                className={[
                                                    "text-[16px] font-semibold capitalize",
                                                    isActive ? "text-white" : "text-light-200",
                                                ].join(" ")}
                                            >
                                                {period}
                                            </Text>
                                            {savingsText && (
                                                <Text
                                                    className={[
                                                        "text-[10px] font-semibold mt-1",
                                                        isActive ? "text-white/80" : "text-light-300",
                                                    ].join(" ")}
                                                >
                                                    {savingsText}
                                                </Text>
                                            )}
                                        </View>
                                    </Pressable>
                                );
                            }
                        )}
                    </View>
                </View>

                {/* Plan Cards */}
                <View className="px-5 pb-32">
                    {PLANS.map((plan) => {
                        const price = plan.prices[billingPeriod];
                        return (
                            <View
                                key={plan.tier}
                                className="mb-4 rounded-3xl border-2 p-6"
                                style={{
                                    borderColor: plan.recommended ? plan.color : "#ffffff20",
                                    backgroundColor: plan.recommended
                                        ? `${plan.color}10`
                                        : "#1A1828",
                                }}
                            >
                                {plan.recommended && (
                                    <View className="absolute -top-3 left-6 px-4 py-1 rounded-full bg-accent">
                                        <Text className="text-white text-[12px] font-semibold">
                                            RECOMMENDED
                                        </Text>
                                    </View>
                                )}

                                <View className="flex-row items-start justify-between mb-4">
                                    <View className="flex-1">
                                        <Text
                                            className="text-[24px] font-semibold mb-1"
                                            style={{ color: plan.color }}
                                        >
                                            {plan.name}
                                        </Text>
                                        <Text className="text-light-200 text-[14px]">
                                            {plan.tagline}
                                        </Text>
                                    </View>
                                </View>

                                <View className="mb-6">
                                    <View className="flex-row items-baseline">
                                        <Text className="text-white text-[36px] font-semibold">
                                            ${price}
                                        </Text>
                                        <Text className="text-light-200 text-[16px] ml-2">
                                            /{billingPeriod === "daily" ? "day" : billingPeriod === "monthly" ? "month" : "year"}
                                        </Text>
                                    </View>
                                    {billingPeriod === "yearly" && (
                                        <Text className="text-light-300 text-[12px] mt-1">
                                            ${(price / 12).toFixed(2)}/month billed annually
                                        </Text>
                                    )}
                                </View>

                                <View className="mb-6">
                                    {plan.features.map((feature, index) => (
                                        <View
                                            key={index}
                                            className="flex-row items-start mb-3"
                                        >
                                            <Text
                                                className="text-[16px] mr-2"
                                                style={{ color: plan.color }}
                                            >
                                                ✓
                                            </Text>
                                            <Text className="text-white text-[14px] flex-1">
                                                {feature}
                                            </Text>
                                        </View>
                                    ))}
                                </View>

                                <Pressable
                                    className="py-4 rounded-xl"
                                    style={{ backgroundColor: plan.color }}
                                >
                                    <Text className="text-white text-[16px] font-semibold text-center">
                                        Get {plan.name}
                                    </Text>
                                </Pressable>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </ScreenBackground>
    );
}
