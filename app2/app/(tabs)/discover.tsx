import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Discover = () => {
  return (
    <SafeAreaView className={`h-full`}>
      <View className="flex-1 justify-center items-center">
        <Text className="text-black dark:text-white">Discover Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default Discover;
