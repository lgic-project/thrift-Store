import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import CustomButton from "./CustomButton";
import PagerView from "react-native-pager-view";

const { width: viewportWidth } = Dimensions.get("window");

const ImageList = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
];

const ProductDetail: React.FC = () => {
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const colors = ["#000000", "#D4E157", "#FBC02D", "#FF5722"];
  const [activePage, setActivePage] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePage((prevPage) => (prevPage + 1) % ImageList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (pagerRef.current) {
        pagerRef.current.setPage(activePage);
      }
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [activePage]);

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {ImageList.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activePage === index && styles.activeDot]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cartIconContainer}>
        <TouchableOpacity>
          <TabBarIcon name="cart-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.imageContainer}>
          <PagerView
            ref={pagerRef}
            style={styles.pagerView}
            initialPage={0}
            onPageSelected={(e) => setActivePage(e.nativeEvent.position)}
          >
            {ImageList.map((item) => (
              <Animated.View
                key={item.id.toString()}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              </Animated.View>
            ))}
          </PagerView>
          {renderDots()}
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.productTitle}>Roller Rabbit</Text>
              <Text style={styles.productSubtitle} className="font-pRegular">
                Vado Odelle Dress
              </Text>
              <View style={styles.ratingContainer}>
                <StarRatingDisplay rating={4.5} starSize={16} />
                <TouchableOpacity>
                  <Text style={styles.reviewText} className="font-pRegular">
                    (320 Reviews)
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.stockContainer}>
              <Text style={styles.stockItem}>20</Text>
              <Text style={styles.availability} className="font-pRegular">
                Available in stock
              </Text>
              <TouchableOpacity>
                <Text style={styles.demoVideoText} className="font-pSemibold">
                  Demo Video
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row justify-between items-center">
            <View>
              <Text style={styles.sectionTitle} className="font-pSemibold">
                Size
              </Text>
              <View>
                <FlatList
                  data={sizes}
                  horizontal
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.sizeOption}>
                      <Text
                        style={styles.sizeOptionText}
                        className="font-pRegular"
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
            <View className="flex-col">
              <View style={styles.colorOptionsContainer}>
                {colors.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.colorOption, { backgroundColor: color }]}
                  >
                    {index === 0 && (
                      <View style={styles.checkmarkContainer}>
                        <Ionicons name="checkmark" size={12} color="black" />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          <Text style={styles.sectionTitle} className="font-pSemibold">
            Description
          </Text>
          <Text style={styles.descriptionText} className="font-pLight">
            Get a little lift from these Sam Edelman sandals featuring ruched
            straps and leather lace-up ties, while a braided jute sole makes a
            fresh statement for summer.
          </Text>
          <View style={styles.footerContainer}>
            <View>
              <Text className="font-pLight">Total price</Text>
              <Text style={styles.productPrice}>Rs 198.00</Text>
            </View>
            <CustomButton
              title="Add to Cart"
              handlePress={() => {}}
              containerStyles="w-[200px] h-[50px] rounded-[30px] bg-[#F11A42]"
              textStyles="text-[16px] font-bold text-white"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cartIconContainer: {
    position: "absolute",
    top: 44,
    right: 16,
    zIndex: 10,
  },
  imageContainer: {
    height: 335,
    position: "relative",
  },
  pagerView: {
    flex: 1,
  },
  productImage: {
    width: viewportWidth,
    height: 335,
  },
  dotsContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#888",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#F11A42",
  },
  detailsContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  productSubtitle: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewText: {
    fontSize: 14,
    color: "#888",
    marginLeft: 5,
    textDecorationLine: "underline",
  },
  stockContainer: {
    alignItems: "flex-end",
  },
  stockItem: {
    backgroundColor: "#fff",
    padding: 5,
    width: "100%",
    textAlign: "center",
    borderRadius: 10,
    fontWeight: "600",
    marginBottom: 5,
    elevation: 10,
  },
  availability: {
    fontSize: 14,
    color: "#4caf50",
  },
  demoVideoText: {
    color: "#F11A42",
    fontWeight: "600",
    textDecorationLine: "underline",
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
  },
  sizeOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
  },
  sizeOptionText: {
    fontSize: 14,
  },
  colorOptionsContainer: {
    flexDirection: "column",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  checkmarkContainer: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 24,
  },
});

export default ProductDetail;
