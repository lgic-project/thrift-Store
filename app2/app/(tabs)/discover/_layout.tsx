import { View, Text } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { useNavigationState } from "@react-navigation/native";

interface RouteParams {
  productName?: string;
}

export default function _layout() {
  const route = useRouter();
  const state = useNavigationState((state) => state);

  const currentRoute = state.routes[state.index];
  const params = (currentRoute?.state?.routes[1]?.params || {}) as RouteParams;
  const productName = params.productName || "Product Video";

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[selectedVideo]" options={{ title: productName }} />
    </Stack>
  );
}
