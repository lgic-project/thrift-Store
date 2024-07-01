import { register } from "@/api/userApi";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants/Icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp({ navigation }: any) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    permanentAddress: "",
    temporaryAddress: "",
    dob: "",
    occupation: "",
    voterId: "",
    referralCode: "",
    province: "",
    district: "",
    municipality: "",
    ward: "",
  });

  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckEmail = (text: string) => {
    let re = /\S+@\S+\.\S+/;
    setFormData({ ...formData, email: text });
    if (re.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSignUp = () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Password and confirm password do not match");
      return;
    }
    if (isNaN(Number(formData.province))) {
      Alert.alert("Error", "Province must be a number");
      return;
    }
    setIsSubmitting(true);
    register({ ...formData, province: Number(formData.province) })
      .then((result) => {
        if (result.status == 201) {
          AsyncStorage.setItem("AccessToken", result.data.access_token);
          router.push("/(tabs)");
        }
      })
      .catch((error) => {
        let errorMessage;
        if (Array.isArray(error.response.data.message)) {
          errorMessage = error.response.data.message.join("\n");
        } else {
          errorMessage = error.response.data.message;
        }
        Alert.alert("Error", errorMessage);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <Image
            source={require("@/assets/images/logo.webp")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.inputContainer}>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={formData.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />
            </View>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={formData.username}
                onChangeText={(text) => handleInputChange("username", text)}
              />
            </View>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => handleCheckEmail(text)}
              />
            </View>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={formData.phone}
                onChangeText={(text) => handleInputChange("phone", text)}
              />
            </View>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={formData.password}
                secureTextEntry={seePassword}
                onChangeText={(text) => handleInputChange("password", text)}
              />
              <TouchableOpacity
                style={styles.wrapperIcon}
                onPress={() => setSeePassword(!seePassword)}
              >
                <Image
                  source={seePassword ? icons.eye : icons.eyeHide}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                secureTextEntry={seePassword}
                onChangeText={(text) =>
                  handleInputChange("confirmPassword", text)
                }
              />
            </View>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="Permanent Address"
                value={formData.permanentAddress}
                onChangeText={(text) =>
                  handleInputChange("permanentAddress", text)
                }
              />
            </View>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="Temporary Address"
                value={formData.temporaryAddress}
                onChangeText={(text) =>
                  handleInputChange("temporaryAddress", text)
                }
              />
            </View>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="Date of Birth"
                value={formData.dob}
                onChangeText={(text) => handleInputChange("dob", text)}
              />
            </View>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="Occupation"
                value={formData.occupation}
                onChangeText={(text) => handleInputChange("occupation", text)}
              />
            </View>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="Voter ID (optional)"
                value={formData.voterId}
                onChangeText={(text) => handleInputChange("voterId", text)}
              />
            </View>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="Referral Code (optional)"
                value={formData.referralCode}
                onChangeText={(text) => handleInputChange("referralCode", text)}
              />
            </View>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="Province (must be a number)"
                value={formData.province}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange("province", text)}
              />
            </View>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="District"
                value={formData.district}
                onChangeText={(text) => handleInputChange("district", text)}
              />
            </View>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="Municipality"
                value={formData.municipality}
                onChangeText={(text) => handleInputChange("municipality", text)}
              />
            </View>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="Ward"
                value={formData.ward}
                onChangeText={(text) => handleInputChange("ward", text)}
              />
            </View>
            <CustomButton
              title="Sign Up"
              handlePress={handleSignUp}
              containerStyles="mt-7 bg-[#F11A42] h-12 rounded-[10px]"
              textStyles="text-white"
              isLoading={isSubmitting}
            />
          </View>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                router.replace("/signIn");
              }}
            >
              <Text style={styles.registerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#b8cdd8",
  },
  scrollContainer: {
    justifyContent: "center",
    paddingBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  wrapperInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  input: {
    paddingVertical: 10,
    flex: 1,
  },
  wrapperIcon: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  textFailed: {
    alignSelf: "flex-end",
    color: "red",
    display: "none",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    color: "#000",
  },
  registerLink: {
    color: "#F11A42",
    fontWeight: "bold",
  },
});
