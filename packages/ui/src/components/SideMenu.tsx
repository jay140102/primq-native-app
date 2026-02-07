import React, { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { Portfolio } from "./PortfolioDropdown";

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
  onPressPremium?: () => void;
  onPressAcademy?: () => void;
  portfolios?: Portfolio[];
  selectedPortfolioId?: string;
  onSelectPortfolio?: (portfolioId: string) => void;
  onAddPortfolio?: () => void;
};

type MenuItem = {
  label: string;
  icon?: string;
};

const MENU_ITEMS: MenuItem[] = [
  { label: "Market News", icon: "📰" },
  { label: "Manage Alerts", icon: "🔔" },
  { label: "Generate Portfolio Report", icon: "📊" },
];

function MenuIcon({ children }: { children?: string }) {
  return (
    <View
      style={{
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: "rgba(214,199,255,0.12)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
      }}
    >
      <Text style={{ color: "#D6C7FF", fontSize: 14 }}>{children ?? "•"}</Text>
    </View>
  );
}

export function SideMenu({
  open,
  onClose,
  onPressPremium,
  onPressAcademy,
  portfolios = [],
  selectedPortfolioId = "",
  onSelectPortfolio,
  onAddPortfolio,
}: SideMenuProps) {
  const screenW = Dimensions.get("window").width;
  const drawerW = useMemo(() => Math.min(340, Math.round(screenW * 0.82)), [screenW]);

  const translateX = useRef(new Animated.Value(-drawerW)).current;
  const backdrop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: open ? 0 : -drawerW,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(backdrop, {
        toValue: open ? 1 : 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [open, drawerW, translateX, backdrop]);

  return (
    <View pointerEvents={open ? "auto" : "none"} style={[StyleSheet.absoluteFill, { zIndex: 1000 }]}>
      <Pressable onPress={onClose} style={StyleSheet.absoluteFill}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backdrop.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.55],
              }),
            },
          ]}
        />
      </Pressable>

      <Animated.View
        style={[
          styles.drawer,
          {
            width: drawerW,
            transform: [{ translateX }],
          },
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="flex-row items-start justify-between px-5 pt-6">
            <View className="flex-row items-center">
              <View className="h-14 w-14 rounded-full bg-[#3D84FF] items-center justify-center">
                <Text className="text-white text-[18px] font-semibold">JP</Text>
              </View>
              <View className="h-3 w-3 rounded-full bg-[#2EE5A2] -ml-3 mt-9 border-2 border-[#0F0D23]" />

              <View className="ml-4">
                <Text className="text-white text-[22px] font-semibold">
                  Jay Pratap Singh
                </Text>
                <View className="flex-row items-center mt-1">
                  <Text className="text-[#4DA3FF] text-[12px] font-semibold tracking-widest">
                    PRO MEMBER
                  </Text>
                  <Text style={{ color: "#4DA3FF", marginLeft: 6, fontSize: 12 }}>
                    ✓
                  </Text>
                </View>
              </View>
            </View>

            <Pressable
              accessibilityRole="button"
              hitSlop={10}
              onPress={onClose}
              className="h-10 w-10 items-center justify-center"
            >
              <Text style={{ color: "#A8B5DB", fontSize: 22, lineHeight: 22 }}>
                ×
              </Text>
            </Pressable>
          </View>

          <View className="mt-10">
            {/* Portfolio List */}
            <View className="px-5 mb-2">
              <Text className="text-light-200 text-[12px] font-semibold tracking-widest mb-3">
                PORTFOLIOS
              </Text>
            </View>

            {portfolios.map((portfolio) => {
              const isSelected = portfolio.id === selectedPortfolioId;
              return (
                <Pressable
                  key={portfolio.id}
                  accessibilityRole="button"
                  onPress={() => {
                    onSelectPortfolio?.(portfolio.id);
                    onClose();
                  }}
                  className="px-5 py-4"
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                      <MenuIcon>📊</MenuIcon>
                      <Text className={[
                        "text-[18px] ml-4",
                        isSelected ? "text-accent font-semibold" : "text-white"
                      ].join(" ")}>
                        {portfolio.name}
                      </Text>
                    </View>
                    {isSelected && (
                      <Text className="text-accent text-[18px]">✓</Text>
                    )}
                  </View>
                </Pressable>
              );
            })}

            {/* Add Portfolio Button */}
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                onAddPortfolio?.();
                onClose();
              }}
              className="px-5 py-4 mt-2"
            >
              <View className="flex-row items-center">
                <MenuIcon>➕</MenuIcon>
                <Text className="text-accent text-[18px] ml-4 font-semibold">
                  Add Portfolio
                </Text>
              </View>
            </Pressable>

            {/* Divider */}
            <View className="mx-5 my-4 h-[1px] bg-white/10" />

            {/* Academy Menu Item */}
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                onPressAcademy?.();
                onClose();
              }}
              className="px-5 py-4"
            >
              <View className="flex-row items-center">
                <MenuIcon>🎓</MenuIcon>
                <Text className="text-white text-[18px] ml-4">
                  Academy
                </Text>
              </View>
            </Pressable>

            {/* Other Menu Items */}
            {MENU_ITEMS.filter(item => item.label !== "Add Portfolio").map((item) => (
              <Pressable
                key={item.label}
                accessibilityRole="button"
                className="px-5 py-4"
              >
                <View className="flex-row items-center">
                  <MenuIcon>{item.icon}</MenuIcon>
                  <Text className="text-white text-[18px] ml-4">
                    {item.label}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={onPressPremium}
            className="px-5 mt-6"
          >
            <View className="rounded-2xl border border-[#6F5B1A] bg-[#2A2316] px-5 py-4">
              <View className="flex-row items-center">
                <Text style={{ color: "#F2C94C", fontSize: 18, marginRight: 10 }}>
                  ★
                </Text>
                <Text className="text-[#F2C94C] text-[20px] font-semibold ml-3">
                  Premium Membership
                </Text>
              </View>
              <Text className="text-[#F2C94C] opacity-80 text-[12px] mt-1 tracking-widest">
                EXCLUSIVE FEATURES
              </Text>
            </View>
          </Pressable>

          <Pressable accessibilityRole="button" className="px-5 py-5 mt-3">
            <View className="flex-row items-center">
              <MenuIcon>⚙</MenuIcon>
              <Text className="text-white text-[18px] ml-4">Settings</Text>
            </View>
          </Pressable>

          <View style={{ flex: 1 }} />

          <View className="px-5 pb-8 pt-4">
            <Pressable
              accessibilityRole="button"
              className="rounded-2xl bg-[#2A1E2E] px-5 py-5"
            >
              <View className="flex-row items-center justify-center">
                <Text style={{ color: "#FF6B8B", fontSize: 18, marginRight: 10 }}>
                  ↩
                </Text>
                <Text className="text-[#FF6B8B] text-[18px] font-semibold ml-3">
                  Logout
                </Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "#000000",
  },
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#0F0D23",
  },
});

