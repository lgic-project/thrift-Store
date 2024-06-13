import { View, Text, Image } from "react-native";
import React from "react";

import Images from "@/constants/Images";

const HomeCard = () => {
  return (
    <Image
      source={Images.redSuit}
      className="w-full h-full rounded-lg"
      resizeMode="cover"
    />
  );
};

export default HomeCard;
