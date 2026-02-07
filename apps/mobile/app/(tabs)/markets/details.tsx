import {
  MarketsSegmentTabs,
  MarketsTopBar,
  ScreenBackground,
  SideMenu,
} from "@primq/ui";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function MarketsDetailsScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <ScreenBackground>
      <StatusBar style="light" />

      <MarketsTopBar title="My Portfolio" onPressMenu={() => setMenuOpen(true)} />

      <MarketsSegmentTabs
        active="details"
        onChange={(k) => {
          if (k === "quotes") router.replace("/(tabs)/markets");
          else router.replace(`/(tabs)/markets/${k}`);
        }}
      />

      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-white text-[18px] font-semibold">
          Details (coming soon)
        </Text>
        <Text className="text-light-200 text-[13px] mt-2 text-center">
          This is a placeholder screen for now.
        </Text>
      </View>

      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </ScreenBackground>
  );
}

