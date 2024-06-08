import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatItem from "@/components/ChatItem";

export default function Message() {
  return (
    <SafeAreaView className="flex-1">
      <ChatItem />
    </SafeAreaView>
  );
}