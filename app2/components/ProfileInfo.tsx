import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React from "react";
import { TabBarIcon } from "./navigation/TabBarIcon";
import InfoBox from "./InfoBox";
import CustomButton from "./CustomButton";

const ProfileInfo = () => {
  const colorScheme = useColorScheme();
  return (
    <View className="w-full justify-center items-center mt-6 mb-12 px-4">
      <View className="w-full flex-row justify-between mb-10">
        <TouchableOpacity onPress={() => {}}>
          <TabBarIcon name="swap-horizontal-outline" color={"gray"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <TabBarIcon name="log-out-outline" size={24} color={"red"} />
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        }}
        className="w-[80px] h-[80px] rounded-full"
        resizeMode="cover"
      />
      <InfoBox
        title="John Doe"
        subtitle="@XxJohnDoeXx"
        containerStyles="mt-5"
        titleStyles="text-lg font-pSemibold"
      />
      <Text className="mt-6 font-pRegular text-sm dark:text-white">
        Best For Gorals Alawi's the none One
      </Text>
      <View className="mt-5 flex-row justify-around w-full ml-6">
        <InfoBox
          title={"950"}
          subtitle="Posts"
          titleStyles="text-xl font-pSemibold"
        />
        <InfoBox
          title={"879"}
          subtitle="Following"
          titleStyles="text-xl font-pSemibold"
        />
        <InfoBox
          title={"159K"}
          subtitle="Followers"
          titleStyles="text-xl font-pSemibold"
        />
      </View>
      <View className="flex-row mt-5 justify-evenly w-full">
        <CustomButton
          title="Follow"
          handlePress={() => {}}
          containerStyles="w-[90px] bg-[#F11A42] h-[38px]"
          textStyles="text-white font-pSemibold text-[14px]"
        />
        <CustomButton
          title="Shop"
          handlePress={() => {}}
          containerStyles="w-[100px] bg-[#F1EAEA] h-[38px]"
          textStyles="text-black font-pSemibold text-[14px]"
        />
        <CustomButton
          title="Message"
          handlePress={() => {}}
          containerStyles="w-[100px] bg-[#F1EAEA] h-[38px]"
          textStyles="text-black font-pSemibold text-[14px]"
        />
      </View>
    </View>
  );
};

export default ProfileInfo;
