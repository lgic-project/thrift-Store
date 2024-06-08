import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import CustomButton from "@/components/CustomButton";
import VideoThumbnail from "@/components/VideoThumbnail";
import EmptyState from "@/components/EmptyState";
import SearchProduct from "@/components/SearchProduct";

interface VideoData {
  id: number;
  title: string;
  username: string;
  url: string;
  profilePic: string;
  description: string;
  thumbnail: string;
  category: string;
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
    category: "Explore",
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
    category: "Popular",
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
    category: "Sports",
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
    category: "Music",
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
    category: "Anime",
  },
  {
    id: 6,
    title: "Product Title 5",
    username: "soul",
    url: "https://videos.pexels.com/video-files/14907580/14907580-sd_540_960_30fps.mp4",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    description: "#avicii #wflove",
    thumbnail:
      "https://images.pexels.com/photos/15831205/pexels-photo-15831205/free-photo-of-american-flag-at-the-9-11-memorial-in-new-york-city-new-york.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Anime",
  },
  // Add more videos as needed
];

const filterList = [
  {
    id: 1,
    name: "Explore",
  },
  {
    id: 2,
    name: "Popular",
  },
  {
    id: 3,
    name: "Sports",
  },
  {
    id: 4,
    name: "Music",
  },
  {
    id: 5,
    name: "Anime",
  },
  {
    id: 6,
    name: "Rare",
  },
  {
    id: 7,
    name: "Trending",
  },
];

const Discover = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Explore");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredVideos = videos.filter(
    (video) =>
      (selectedCategory === "Explore" || video.category === selectedCategory) &&
      (video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filledVideos =
    filteredVideos.length % 3 === 0
      ? filteredVideos
      : [
          ...filteredVideos,
          ...Array(3 - (filteredVideos.length % 3)).fill({
            id: -1,
            title: "",
            username: "",
            url: "",
            profilePic: "",
            description: "",
            thumbnail: "",
            category: "",
          }),
        ];

  return (
    <SafeAreaView style={styles.container} className={`h-full`}>
      <View className="pt-5 pb-5">
        <SearchProduct
          placeholder="Search"
          additionStyle="h-14"
          onSearch={(query) => {
            setSearchQuery(query);
          }}
        />
      </View>
      <View>
        <FlatList
          horizontal
          data={filterList}
          showsHorizontalScrollIndicator={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CustomButton
              title={item.name}
              handlePress={() => setSelectedCategory(item.name)}
              containerStyles={`w-[70px] mr-[6px] ml-[6px] mb-[10px] ${
                selectedCategory === item.name ? "bg-[#F11A42]" : "bg-[#4E5358]"
              }`}
              textStyles="text-[12px] font-pRegular text-white "
            />
          )}
        />
      </View>
      <FlatList
        data={filledVideos}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) =>
          item.id !== -1 ? (
            <VideoThumbnail
              video={item}
              key={index}
              hideViews={true}
              containerStyles="mt-6 mr-[6px] ml-[6px]"
              imageStyles="h-[200px] rounded-3xl"
            />
          ) : (
            <View key={index} style={{ flex: 1, margin: 6, height: 200 }} />
          )
        }
        ListEmptyComponent={() => (
          <EmptyState
            title="No products found"
            subTitle="No products found."
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 10,
    },
});

export default Discover;
