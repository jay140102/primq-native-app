import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { PortfolioDropdown, type Portfolio } from "./PortfolioDropdown";

type MarketsTopBarProps = {
  title?: string;
  onPressTitle?: () => void;
  onPressMenu?: () => void;
  onPressAdd?: () => void;
  portfolios?: Portfolio[];
  selectedPortfolioId?: string;
  onSelectPortfolio?: (portfolioId: string) => void;
  onAddPortfolio?: () => void;
};

function TopIcon({ children }: { children: string }) {
  return (
    <Text
      style={{
        color: "#D6C7FF",
        fontSize: 18,
        fontWeight: "700",
        lineHeight: 18,
      }}
    >
      {children}
    </Text>
  );
}

export function MarketsTopBar({
  title = "My Portfolio",
  onPressTitle,
  onPressMenu,
  onPressAdd,
  portfolios = [],
  selectedPortfolioId = "",
  onSelectPortfolio,
  onAddPortfolio,
}: MarketsTopBarProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleTitlePress = () => {
    if (portfolios.length > 0 && onSelectPortfolio) {
      setDropdownVisible(true);
    } else if (onPressTitle) {
      onPressTitle();
    }
  };

  return (
    <>
      <View className="px-5 pt-2 pb-3">
        <View className="flex-row items-center justify-between">
          <Pressable
            accessibilityRole="button"
            hitSlop={10}
            onPress={onPressMenu}
            className="h-10 w-10 items-center justify-center"
          >
            <TopIcon>≡</TopIcon>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            hitSlop={10}
            onPress={handleTitlePress}
            className="flex-row items-center"
          >
            <Text className="text-[#FFFFFF] text-[18px] font-semibold">
              {title}
            </Text>
            {portfolios.length > 0 && (
              <Text style={{ color: "#A8B5DB", fontSize: 16, marginLeft: 6 }}>
                ˅
              </Text>
            )}
          </Pressable>

          <View className="flex-row items-center">
            <Pressable
              accessibilityRole="button"
              hitSlop={10}
              className="h-10 w-10 items-center justify-center"
            >
              <TopIcon>⟳</TopIcon>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              hitSlop={10}
              onPress={onPressAdd}
              className="h-10 w-10 items-center justify-center"
            >
              <TopIcon>＋</TopIcon>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              hitSlop={10}
              className="h-10 w-10 items-center justify-center"
            >
              <TopIcon>⋮</TopIcon>
            </Pressable>
          </View>
        </View>
      </View>

      {portfolios.length > 0 && onSelectPortfolio && onAddPortfolio && (
        <PortfolioDropdown
          visible={dropdownVisible}
          portfolios={portfolios}
          selectedPortfolioId={selectedPortfolioId}
          onClose={() => setDropdownVisible(false)}
          onSelectPortfolio={onSelectPortfolio}
          onAddPortfolio={onAddPortfolio}
        />
      )}
    </>
  );
}

