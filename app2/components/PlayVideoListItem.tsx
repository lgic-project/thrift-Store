import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Video as ExpoVideo, AVPlaybackStatus, ResizeMode } from "expo-av";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "./CustomButton";
import ProductPopover from "./ProductPopover";
import { usePathname, useRouter } from "expo-router";

interface VideoData {
  id: number;
  title: string;
  username: string;
  url: string;
  profilePic: string;
  description: string;
  thumbnail: string;
}

interface PlayVideoListItemProps {
  video: VideoData;
  index: number;
  activeIndex: number;
  activeTab: string;
  screenTab: string;
}

const PlayVideoListItem: React.FC<PlayVideoListItemProps> = ({
  video,
  index,
  activeIndex,
  activeTab,
  screenTab,
}) => {
  const videoRef = useRef<ExpoVideo>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | {}>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const BottomTabHeight = useBottomTabBarHeight();
  const topTabBarHeight = 50; // Adjust this value according to your top tab bar height
  const screenHeight =
    Dimensions.get("window").height - BottomTabHeight - topTabBarHeight;

  const [liked, setLiked] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    if (pathname.startsWith("/cart")) {
      router.push(`/cart/${1}`);
    } else {
      router.push(`/cart/${2}`);
    }
  };

  useEffect(() => {
    if (activeIndex === index && activeTab === screenTab && !isPaused) {
      videoRef.current?.playAsync().catch((error) => {
        console.error("Error playing video:", error);
      });
    } else {
      videoRef.current?.pauseAsync().catch((error) => {
        console.error("Error pausing video:", error);
      });
    }
  }, [activeIndex, activeTab, screenTab, isPaused]);

  const togglePlayPause = () => {
    if (isPaused) {
      videoRef.current?.playAsync().catch((error) => {
        console.error("Error playing video:", error);
      });
    } else {
      videoRef.current?.pauseAsync().catch((error) => {
        console.error("Error pausing video:", error);
      });
    }
    setIsPaused(!isPaused);
  };

  return (
    <View style={{ height: screenHeight }}>
      <ProductPopover
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        video={video}
      />
      <View className="absolute bottom-2 left-3 right-3 flex-row justify-between items-end z-[1]">
        <View className="flex-col">
          <TouchableOpacity
            className="bg-white flex-row h-28 rounded-2xl p-2 mb-5"
            onPress={() => setModalVisible(true)}
          >
            <Image
              source={{ uri: video.profilePic }}
              className="w-[100px] h-full rounded-2xl"
              resizeMode="contain"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            />
            <View className="flex justify-between">
              <View>
                <Text className="font-pBold text-[14px]">Roller Rabbit</Text>
                <Text className="font-pRegular text-[14px]">
                  Vado Odelle Dress
                </Text>
              </View>
              <Text className="font-pBold text-[14px]">Rs 198.00</Text>
            </View>
          </TouchableOpacity>
          <View className="flex-row items-center gap-5">
            <View className="flex-row">
              <LinearGradient
                colors={["#FF7A51", "#FFDB5C"]}
                className="rounded-full p-1 flex justify-center items-center"
              >
                <Image
                  source={{ uri: video.profilePic }}
                  className="w-[45px] h-[45px] rounded-full bg-white"
                  resizeMode="contain"
                />
              </LinearGradient>
              <View className="flex-col ml-3">
                <Text className="text-white text-[16px] font-pSemibold">
                  {video.username}
                </Text>
                <Text className="text-white text-[12px] font-pLight">
                  19 hour ago
                </Text>
              </View>
            </View>
            <View
              className="flex-row p-2  rounded-full"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            >
              <View className="flex-row justify-center items-center gap-2 mr-2">
                <TabBarIcon name="eye-outline" color="white" size={20} />
                <Text className="text-white font-pSemibold text-[12px]">
                  1.2K
                </Text>
              </View>
              <CustomButton
                title="Follow"
                handlePress={() => {}}
                containerStyles="w-[90px] bg-[#F11A42]"
                textStyles="text-white font-pSemibold text-[14px]"
              />
            </View>
          </View>
          <Text className="text-white text-[14px] mt-2">
            {video.description}
          </Text>
        </View>
        <View className="items-center justify-center gap-6">
          <View className="flex justify-center items-center">
            <TouchableOpacity onPress={handleClick}>
              <TabBarIcon name="cart-sharp" color="white" size={38} />
            </TouchableOpacity>
            <Text className="text-white mt-1">3</Text>
          </View>
          <View className="flex justify-center items-center">
            <TouchableOpacity onPress={() => setLiked(!liked)}>
              <TabBarIcon
                name="heart"
                color={`${liked ? "#F11A42" : "white"}`}
                size={38}
              />
            </TouchableOpacity>
            <Text className="text-white mt-1">4445</Text>
          </View>
          <View className="flex justify-center items-center">
            <TabBarIcon name="chatbubble-ellipses" color={"white"} size={35} />
            <Text className="text-white mt-1">64</Text>
          </View>
          <View className="flex justify-center items-center">
            <TabBarIcon name="paper-plane-sharp" color={"white"} size={35} />
            <Text className="text-white mt-1">Share</Text>
          </View>
          <LinearGradient
            colors={["#171717", "#373736", "#171717", "#373736"]}
            locations={[0.13, 0.38, 0.63, 0.88]}
            className="rounded-full p-2"
          >
            <Image
              source={{ uri: video?.profilePic }}
              className="w-9 h-9 rounded-full bg-white "
              resizeMode="cover"
            />
          </LinearGradient>
        </View>
      </View>
      <TouchableOpacity
        style={{ height: screenHeight, justifyContent: "center" }}
        onPress={togglePlayPause}
      >
        {isPaused && (
          <View style={styles.pauseOverlay}>
            <TabBarIcon name="play-circle" size={64} color="white" />
          </View>
        )}
        <ExpoVideo
          ref={videoRef}
          style={[styles.video, { height: screenHeight }]}
          source={{
            uri: video.url,
          }}
          useNativeControls={false}
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay={activeIndex === index && activeTab === screenTab}
          onPlaybackStatusUpdate={(status) => setStatus(status)}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    alignSelf: "center",
    width: Dimensions.get("window").width,
  },
  pauseOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -32 }, { translateY: -32 }],
    zIndex: 10,
  },
});

export default PlayVideoListItem;
