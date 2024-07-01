import { View, Text, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileInfo from "@/components/ProfileInfo";
import VideoThumbnail from "@/components/VideoThumbnail";
import EmptyState from "@/components/EmptyState";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMe } from "@/api/userApi";
import { getMyProducts } from "@/api/productApi";

interface VideoData {
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
  };
  Like: any[];
  Comment: any[];
  ProductReview: any[];
}

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [myProducts, setMyProducts] = useState<VideoData[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        try {
          const response = await getMe();
          setUser(response.data);

          const productsResponse = await getMyProducts();
          setMyProducts(
            productsResponse.data.filter(
              (product: any) => product.ProductVideo?.video
            )
          );
        } catch (error) {
          console.error("Error fetching data:", error);
          await AsyncStorage.removeItem("AccessToken");
          router.push("/(auth)/signIn");
        }
      };
      fetchUserData();
    }, [router])
  );

  const filledProducts =
    myProducts.length % 3 === 0
      ? myProducts
      : [
          ...myProducts,
          ...Array(3 - (myProducts.length % 3)).fill({
            id: -1,
            name: "",
            description: "",
            price: 0,
            stock: 0,
            ProductImages: [],
            ProductVideo: {
              thumbnail: "",
              video: "",
              views: 0,
            },
            Like: [],
            Comment: [],
            ProductReview: [],
          }),
        ];

  return (
    <SafeAreaView className={`h-full`}>
      <FlatList
        data={filledProducts}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) =>
          item.id !== -1 ? (
            <VideoThumbnail product={item} key={index} />
          ) : (
            <View key={index} style={{ flex: 1, margin: 6, height: 180 }} />
          )
        }
        ListHeaderComponent={<ProfileInfo user={user} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No products found"
            subTitle="No product videos found."
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
