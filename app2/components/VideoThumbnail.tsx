import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  ProductImages: string[];
  ProductVideo: {
    thumbnail: string;
    video: string;
    views: number;
  } | null;
  Like: any[];
  Comment: any[];
  ProductReview: any[];
  user: {
    Profile: {
      avatar: string;
      name: string;
      username: string;
    }
  }
}

interface VideoThumbnailProps {
  product: ProductData;
  hideViews?: boolean;
  containerStyles?: string;
  imageStyles?: string;
}

const VideoThumbnail = ({
  product,
  hideViews,
  containerStyles,
  imageStyles,
}: VideoThumbnailProps) => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View className={`flex-1 m-1 ${containerStyles}`}>
      {product.ProductVideo && product.ProductVideo.video && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("[selectedVideo]", {
              selectedVideo: product.ProductVideo?.video,
              productName: product.name,
              productDescription: product.description,
              productPrice: product.price,
              productStock: product.stock,
              productImages: product.ProductImages,
              productVideoThumbnail: product.ProductVideo?.thumbnail,
              productVideoViews: product.ProductVideo?.views,
              profile: product.user.Profile,
              likeCount: product.Like.length,
              commentCount: product.Comment.length,
              comments: product.Comment,
              reviews: product.ProductReview,
            });
          }}
        >
          {!hideViews && (
            <View className="absolute z-10 bottom-1 left-1 flex-row items-center justify-center">
              <TabBarIcon name="eye-outline" color={"white"} size={20} />
              <Text className="text-white ml-1 mt-1 font-pRegular">
                {product.ProductVideo.views}
              </Text>
            </View>
          )}

          <Image
            source={{ uri: product.ProductVideo.thumbnail }}
            className={`w-full h-[200px] rounded-md ${imageStyles}`}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoThumbnail;
