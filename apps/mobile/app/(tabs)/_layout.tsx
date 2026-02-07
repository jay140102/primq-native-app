import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

type TabIconProps = {
  focused: boolean;
  icon: number;
  title: string;
};

function TabIcon({ focused, icon, title }: TabIconProps) {
  return (
    <View className="items-center justify-center gap-1" style={{ flexShrink: 0 }}>
      <Image
        source={icon}
        tintColor={focused ? "#AB8BFF" : "#A8B5DB"}
        resizeMode="contain"
        style={{ width: 20, height: 20 }}
      />
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={{ flexShrink: 0 }}
        className={[
          "text-[10px]",
          focused ? "text-accent font-semibold" : "text-light-200",
        ].join(" ")}
      >
        {title}
      </Text>
    </View>
  );
}

const _layout = () => {
  return (
    <Tabs
      initialRouteName="markets"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderTopWidth: 0,
          height: 76,
        },
      }}
    >
      <Tabs.Screen
        name="markets"
        options={{
          headerShown: false,
          title: "Markets",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Markets" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
      <Tabs.Screen
        name="academy"
        options={{
          href: null, // Hide from tab bar
          headerShown: false,
          title: "Academy",
        }}
      />
    </Tabs>
  );
};

export default _layout;
