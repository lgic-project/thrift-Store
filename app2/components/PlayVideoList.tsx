import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";
import PlayVideoListItem from "./PlayVideoListItem";

interface VideoData {
  id: number;
  title: string;
  username: string;
  url: string;
  profilePic: string;
  description: string;
  thumbnail: string;
}

const videos: VideoData[] = [
  {
    id: 1,
    title: "Video 1",
    username: "Joe Doe",
    url: "https://videos.pexels.com/video-files/15465878/15465878-sd_540_960_30fps.mp4",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    description: "#avicii #wflove",
    thumbnail:
      "https://images.pexels.com/photos/9136621/pexels-photo-9136621.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Video 2",
    username: "Joe Doe",
    url: "https://videos.pexels.com/video-files/17687288/17687288-sd_540_960_30fps.mp4",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    description: "#avicii #wflove",
    thumbnail:
      "https://images.pexels.com/photos/15831205/pexels-photo-15831205/free-photo-of-american-flag-at-the-9-11-memorial-in-new-york-city-new-york.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "Video 3",
    username: "Joe Doe",
    url: "https://videos.pexels.com/video-files/17169505/17169505-sd_540_960_30fps.mp4",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    description: "#avicii #wflove",
    thumbnail:
      "https://images.pexels.com/photos/18423763/pexels-photo-18423763/free-photo-of-handsome-gentleman-holding-crocodile-leather-iphone-15-case-by-gentcreate.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    title: "Video 4",
    username: "Joe Doe",
    url: "https://videos.pexels.com/video-files/17687289/17687289-sd_540_960_30fps.mp4",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    description: "#avicii #wflove",
    thumbnail:
      "https://images.pexels.com/photos/19153800/pexels-photo-19153800/free-photo-of-fashion-man-couple-love.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    title: "Video 5",
    username: "Joe Doe",
    url: "https://videos.pexels.com/video-files/14907580/14907580-sd_540_960_30fps.mp4",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    description: "#avicii #wflove",
    thumbnail:
      "https://images.pexels.com/photos/15831205/pexels-photo-15831205/free-photo-of-american-flag-at-the-9-11-memorial-in-new-york-city-new-york.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const PlayVideoList: React.FC<{ activeTab: string; screenTab: string }> = ({
  activeTab,
  screenTab,
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const windowHeight = Dimensions.get("window").height;
  const BottomTabHeight = useBottomTabBarHeight();
  const topTabBarHeight = 50; // Adjust this value according to your top tab bar height
  const isFocused = useIsFocused();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!isFocused || activeTab !== screenTab) {
      setCurrentVideoIndex(-1); // Set an invalid index to stop video playback
    }
  }, [isFocused, activeTab]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.y /
        (windowHeight - BottomTabHeight - topTabBarHeight)
    );
    setCurrentVideoIndex(index);
  };

  return (
    <View style={{ height: windowHeight }}>
      <FlatList
        ref={flatListRef}
        data={videos}
        pagingEnabled
        snapToInterval={windowHeight - BottomTabHeight - topTabBarHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        contentContainerStyle={{ paddingBottom: 134 }}
        renderItem={({ item, index }) => (
          <PlayVideoListItem
            video={item}
            key={index}
            index={index}
            activeIndex={currentVideoIndex}
            activeTab={activeTab}
            screenTab={screenTab}
          />
        )}
      />
    </View>
  );
};

export default PlayVideoList;
