// ProductPopover.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";
import CustomButton from "./CustomButton";

interface VideoData {
  id: number;
  title: string;
  username: string;
  url: string;
  profilePic: string;
  description: string;
  thumbnail: string;
  views: number;
  likeCount: number;
  commentCount: number;
  price: number;
  comments: any[];
  images: string[];
  reviews: any[];
  stock: number;
}

interface ProductPopoverProps {
  visible: boolean;
  onClose: () => void;
  video: VideoData;
}
const ProductPopover: React.FC<ProductPopoverProps> = ({
  visible,
  onClose,
  video,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        className="flex-1 justify-end"
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          className="flex-1 justify-end"
        >
          <View
            style={{
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
            className="w-full bg-white rounded-t-3xl p-5
        shadow-black "
          >
            <View className="items-center">
              <View className="flex-row">
                <Image
                  source={{ uri: video.profilePic }}
                  className="w-[200px] h-[200px] rounded-2xl"
                  resizeMode="contain"
                />
              </View>
              <View className="flex-row pt-4 justify-between w-full ">
                <View className="flex-col">
                  <Text className="text-[18px] font-pSemibold">
                    {video.title}
                  </Text>
                  <Text className="text-[14px] text-gray-500 mt-[-6px] font-pRegular">
                    {video.description}
                  </Text>
                  <View className="ml-[-8px] flex-col items-start">
                    <StarRatingDisplay
                      rating={
                        video.reviews && video.reviews.length > 0
                          ? video.reviews.reduce(
                              (acc, review) => acc + review.rating,
                              0
                            ) / video.reviews.length
                          : 0
                      }
                    />
                    <Text className="text-[14px] font-pSemibold ml-[8px]">
                      {video.reviews
                        ? `${video.reviews.length} Reviews`
                        : "No Reviews"}
                    </Text>
                  </View>
                </View>
                {video.stock > 0 ? (
                  <Text className={`font-pSemibold text-[12px] text-green-500`}>
                    Available in stock
                  </Text>
                ) : (
                  <Text className={`font-pSemibold text-[12px] text-red-500`}>
                    Out of stock
                  </Text>
                )}
              </View>
              <View className="pt-5 flex items-start">
                <Text className="text-[18px] font-pSemibold">Description</Text>
                <Text className="text-[14px] text-gray-500 font-pRegular">
                  Get a little lift from these Sam Edelman sandals featuring
                  ruched straps and leather toe-up ties, while a braided jute
                  sole makes a fresh statement for summer....
                </Text>
              </View>
            </View>
            <View className="flex-row pt-5 items-center justify-evenly">
              <Text className="text-[16px] font-pSemibold">
                Rs {video.price}
              </Text>
              <CustomButton
                title="Contact"
                handlePress={() => {}}
                containerStyles="w-[100px] bg-[#F11A42] h-[38px]"
                textStyles="text-white font-pSemibold text-[14px]"
              />
              <CustomButton
                title="Message"
                handlePress={() => {}}
                containerStyles="w-[100px] bg-[#F1EAEA] h-[38px]"
                textStyles="text-black font-pSemibold text-[14px]"
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProductPopover;
