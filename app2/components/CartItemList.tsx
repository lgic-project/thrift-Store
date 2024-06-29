import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const CartItemList = () => {
  return (
    <View style={styles.cartItemContainer}>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        }}
        style={styles.cartItemImage}
      />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemTitle}>Roller Rabbit</Text>
        <Text style={styles.cartItemSubtitle}>Vado Odelle Dress</Text>
        <Text style={styles.cartItemPrice}>Rs 198.00</Text>
      </View>
      <View style={styles.cartItemQuantity}>
        <TouchableOpacity style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>1</Text>
        <TouchableOpacity style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItemSubtitle: {
    fontSize: 14,
    color: "#888",
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  cartItemQuantity: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 18,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
});

export default CartItemList;
