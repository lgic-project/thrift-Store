import PlayVideoList from "@/components/PlayVideoList";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const ForYouScreen = ({ activeTab }: { activeTab: string }) => {
  return (
    <View style={{ flex: 1 }}>
      <PlayVideoList activeTab={activeTab} screenTab="forYou" />
    </View>
  );
};

const FollowingScreen = ({ activeTab }: { activeTab: string }) => {
  return (
    <View style={{ flex: 1 }}>
      <PlayVideoList activeTab={activeTab} screenTab="following" />
    </View>
  );
};

export default function Home() {
  const [index, setIndex] = useState(1); // Set initial index to 1 for "For You"
  const [activeTab, setActiveTab] = useState<string>("forYou");

  const handleIndexChange = (index: number) => {
    setIndex(index);
    setActiveTab(index === 0 ? "following" : "forYou");
  };

  const renderScene = ({ route }: { route: any }) => {
    switch (route.key) {
      case "forYou":
        return <ForYouScreen activeTab={activeTab} />;
      case "following":
        return <FollowingScreen activeTab={activeTab} />;
      default:
        return null;
    }
  };
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        navigationState={{
          index,
          routes: [
            { key: "following", title: "Following" },
            { key: "forYou", title: "For You" },
          ],
        }}
        renderScene={renderScene}
        onIndexChange={handleIndexChange}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            labelStyle={{
              color: `${colorScheme === "dark" ? "rgb(229, 229, 231)" : "rgb(28, 28, 30)"}`,
            }}
            activeColor={`${
              colorScheme === "dark" ? "white" : Colors.light.tint
            }`}
            indicatorStyle={{
              backgroundColor: `${
                colorScheme === "dark" ? "white" : "#0a7ea4"
              }`,
            }}
            style={{
              height: 50,
              backgroundColor: "transparent",
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}
