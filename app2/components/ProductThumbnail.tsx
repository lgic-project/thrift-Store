import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { router, useNavigation, usePathname, useRouter } from "expo-router";
import { NavigationProp } from "@react-navigation/native";

interface ProductData {
  id: number;
  thumbnail: string;
}

interface ProductThumbnailProps {
  product: ProductData;
  hideViews?: boolean;
  containerStyles?: string;
  imageStyles?: string;
}

const ProductThumbnail = ({
  product,
  hideViews,
  containerStyles,
  imageStyles,
}: ProductThumbnailProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    if (pathname.startsWith("/product")) {
      router.push(`/product/${product.id}`);
    } else {
      router.push(`/product/${product.id}`);
    }
  };

  return (
    <View className={`flex-1 m-1 ${containerStyles}`}>
      <TouchableOpacity onPress={handleClick}>
        {!hideViews && (
          <View className="absolute z-10 bottom-1 left-1 flex-row items-center justify-center">
            <TabBarIcon name="eye-outline" color={"white"} size={20} />
            <Text className="text-white ml-1 mt-1 font-pRegular">11.2k</Text>
          </View>
        )}

        <Image
          source={{ uri: product.thumbnail }}
          className={`w-full h-[200px] rounded-md ${imageStyles}`}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProductThumbnail;
