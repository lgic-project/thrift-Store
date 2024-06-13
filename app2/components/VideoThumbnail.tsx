import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { router, useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";

interface VideoData {
  id: number;
  title: string;
  username: string;
  url: string;
  profilePic: string;
  description: string;
  thumbnail: string;
}

interface VideoThumbnailProps {
  video: VideoData;
  hideViews?: boolean;
  containerStyles?: string;
  imageStyles?: string;
}

const VideoThumbnail = ({
  video,
  hideViews,
  containerStyles,
  imageStyles,
}: VideoThumbnailProps) => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View className={`flex-1 m-1 ${containerStyles}`}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("[selectedVideo]", {
            selectedVideo: video,
            productName: video.title,
          });
        }}
      >
        {!hideViews && (
          <View className="absolute z-10 bottom-1 left-1 flex-row items-center justify-center">
            <TabBarIcon name="eye-outline" color={"white"} size={20} />
            <Text className="text-white ml-1 mt-1 font-pRegular">11.2k</Text>
          </View>
        )}

        <Image
          source={{ uri: video.thumbnail }}
          className={`w-full h-[200px] rounded-md ${imageStyles}`}
        />
      </TouchableOpacity>
    </View>
  );
};

export default VideoThumbnail;
