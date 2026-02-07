import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="markets" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="academy" />
    </Stack>
  );
};

export default _layout;
