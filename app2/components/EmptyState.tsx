import { View, Text, Image } from "react-native";
import React from "react";

import CustomButton from "./CustomButton";
import { router } from "expo-router";
import Images from "@/constants/Images";

interface EmptyStateProps {
  title: string;
  subTitle: string;
}

const EmptyState = ({ title, subTitle }: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={Images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-sm text-gray-100">{subTitle}</Text>
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {title}
      </Text>
    </View>
  );
};

export default EmptyState;
