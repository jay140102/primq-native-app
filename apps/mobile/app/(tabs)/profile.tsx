import { ScreenBackground } from "@primq/ui";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";

export default function ProfileScreen() {
  return (
    <ScreenBackground>
      <StatusBar style="light" />
      <View className="flex-1" />
    </ScreenBackground>
  );
}
