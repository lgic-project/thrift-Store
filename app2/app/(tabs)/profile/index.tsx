import { View, Text, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileInfo from "@/components/ProfileInfo";
import VideoThumbnail from "@/components/VideoThumbnail";
import EmptyState from "@/components/EmptyState";
import { useNavigation, useRouter } from "expo-router";
import { isAuthenticated } from "@/utils/auth";
import { useFocusEffect } from "@react-navigation/native";

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
    title: "Product Title 1",
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
    title: "Product Title 2",
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
    title: "Product Title 3",
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
    title: "Product Title 4",
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
    title: "Product Title 5",
    username: "Joe Doe",
    url: "https://videos.pexels.com/video-files/14907580/14907580-sd_540_960_30fps.mp4",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    description: "#avicii #wflove",
    thumbnail:
      "https://images.pexels.com/photos/15831205/pexels-photo-15831205/free-photo-of-american-flag-at-the-9-11-memorial-in-new-york-city-new-york.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    title: "Product Title 6",
    username: "Joe Doe",
    url: "https://videos.pexels.com/video-files/15465878/15465878-sd_540_960_30fps.mp4",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    description: "#avicii #wflove",
    thumbnail:
      "https://images.pexels.com/photos/9136621/pexels-photo-9136621.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 7,
    title: "Product Title 7",
    username: "Joe Doe",
    url: "https://videos.pexels.com/video-files/17687288/17687288-sd_540_960_30fps.mp4",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    description: "#avicii #wflove",
    thumbnail:
      "https://images.pexels.com/photos/15831205/pexels-photo-15831205/free-photo-of-american-flag-at-the-9-11-memorial-in-new-york-city-new-york.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 8,
    title: "Product Title 8",
    username: "Joe Doe",
    url: "https://videos.pexels.com/video-files/17169505/17169505-sd_540_960_30fps.mp4",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    description: "#avicii #wflove",
    thumbnail:
      "https://images.pexels.com/photos/18423763/pexels-photo-18423763/free-photo-of-handsome-gentleman-holding-crocodile-leather-iphone-15-case-by-gentcreate.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const Profile = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkAuth = async () => {
        const loggedIn = await isAuthenticated();
        if (!loggedIn) {
          router.push("/(auth)/signIn");
        }
      };
      checkAuth();
    }, [])
  );


  const filledVideos =
    videos.length % 3 === 0
      ? videos
      : [
          ...videos,
          ...Array(3 - (videos.length % 3)).fill({
            id: -1,
            title: "",
            username: "",
            url: "",
            profilePic: "",
            description: "",
            thumbnail: "",
          }),
        ];

  return (
    <SafeAreaView className={`h-full`}>
      <FlatList
        data={filledVideos}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) =>
          item.id !== -1 ? (
            <VideoThumbnail video={item} key={index} />
          ) : (
            <View key={index} style={{ flex: 1, margin: 6, height: 180 }} />
          )
        }
        ListHeaderComponent={<ProfileInfo />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subTitle="No product videos found."
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
