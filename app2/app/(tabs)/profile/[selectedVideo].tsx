import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Text,
} from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import PlayProfileVideo from "@/components/PlayProfileVideo";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

interface RouteParams {
  selectedVideo: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productStock: number;
  productImages: string[];
  productVideoThumbnail: string;
  productVideoViews: number;
  profile: {
    avatar: string;
    name: string;
    username: string;
  };
  likeCount: number;
  commentCount: number;
  comments: any[];
  reviews: any[];
}

export default function SelectedVideo() {
  const route = useRoute();
  const params = route.params as RouteParams;
  const [videoList, setVideoList] = useState<string[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const windowHeight = Dimensions.get("window").height;
  const BottomTabHeight = useBottomTabBarHeight();
  const topTabBarHeight = 50;
  const isFocused = useIsFocused();
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.y /
        (windowHeight - BottomTabHeight - topTabBarHeight)
    );
    setCurrentVideoIndex(index);
  };

  useEffect(() => {
    setVideoList([params.selectedVideo]);
  }, [params.selectedVideo]);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: windowHeight }}>
        <FlatList
          ref={flatListRef}
          data={videoList}
          pagingEnabled
          snapToInterval={windowHeight - BottomTabHeight - topTabBarHeight}
          snapToAlignment="start"
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          contentContainerStyle={{ paddingBottom: 134 }}
          renderItem={({ item, index }) => (
            <PlayProfileVideo
              video={{
                id: index,
                title: params.productName,
                username: params.profile.username,
                url: item,
                profilePic: params.profile.avatar,
                description: params.productDescription,
                thumbnail: params.productVideoThumbnail,
                views: params.productVideoViews,
                likeCount: params.likeCount,
                commentCount: params.commentCount,
                comments:params.comments,
                price:params.productPrice,
                images:params.productImages,
                reviews:params.reviews,
                stock:params.productStock
              }}
              index={index}
              activeIndex={currentVideoIndex}
              isFocused={isFocused}
            />
          )}
        />
      </View>
    </View>
  );
}
