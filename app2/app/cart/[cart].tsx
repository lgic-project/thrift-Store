import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItemList from "@/components/CartItemList";
import CustomButton from "@/components/CustomButton";

export default function Cart() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>My Cart</Text>
        </View>
        <CartItemList />
        <View style={styles.promoCodeContainer}>
          <TextInput
            style={styles.promoCodeInput}
            placeholder="Promo Code"
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total (3 items) :</Text>
          <Text style={styles.totalAmount}>$500</Text>
        </View>
        <CustomButton
          title="Swipe to Checkout"
          handlePress={() => {}}
          containerStyles={`${styles.checkoutButton}`}
          textStyles={`${styles.checkoutButtonText}`}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  promoCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  promoCodeInput: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  applyButton: {
    height: 40,
    backgroundColor: "#F11A42",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#F11A42",
    borderRadius: 30,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
