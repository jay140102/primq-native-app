import React from "react";
import { Pressable, Text, View } from "react-native";

export type MarketsSegmentKey = "quotes" | "holdings" | "details";

type Segment = { key: MarketsSegmentKey; label: string };

const SEGMENTS: Segment[] = [
  { key: "quotes", label: "QUOTES" },
  { key: "holdings", label: "HOLDINGS" },
  { key: "details", label: "DETAILS" },
];

type MarketsSegmentTabsProps = {
  active: MarketsSegmentKey;
  onChange: (key: MarketsSegmentKey) => void;
};

export function MarketsSegmentTabs({ active, onChange }: MarketsSegmentTabsProps) {
  return (
    <View className="px-5">
      <View className="flex-row items-center justify-between">
        {SEGMENTS.map((s) => {
          const isActive = s.key === active;
          return (
            <Pressable
              key={s.key}
              accessibilityRole="button"
              onPress={() => onChange(s.key)}
              className="flex-1"
            >
              <View className="items-center">
                <Text
                  className={[
                    "text-[14px] tracking-widest py-2",
                    isActive ? "text-accent font-semibold" : "text-light-200",
                  ].join(" ")}
                >
                  {s.label}
                </Text>
                <View
                  className={[
                    "h-[2px] w-full",
                    isActive ? "bg-accent" : "bg-transparent",
                  ].join(" ")}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
      <View className="h-px bg-white/10" />
    </View>
  );
}

