import { login } from "@/api/userApi";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleCheckEmail = (text: string) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
    }
    setIsSubmitting(true);
    login({
      email: email,
      password: password,
    })
      .then((result) => {
        if (result.status == 200) {
          AsyncStorage.setItem("AccessToken", result.data.access_token);
          router.push("/(tabs)");
        }
      })
      .catch((error) => {
        let errorMessage;
        // Check if the message is an array and join, otherwise use as is
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
        <Image
          source={require("@/assets/images/logo.webp")} // Replace with your logo image path
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.wrapperInput}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => handleCheckEmail(text)}
          />
        </View>
        {checkValidEmail ? (
          <Text style={styles.textFailed}>Invalid email format</Text>
        ) : (
          <Text style={styles.textFailed}> </Text>
        )}
        <View style={styles.wrapperInput}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry={seePassword}
            onChangeText={(text) => setPassword(text)}
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
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => {
            // Handle forgot password
          }}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        {email == "" || password == "" || checkValidEmail == true ? (
          <CustomButton
            title="Sign In"
            handlePress={handleLogin}
            containerStyles={`mt-7 bg-[#F11A42] h-12 rounded-[10px]`}
            textStyles="text-white"
            isLoading={true}
          />
        ) : (
          <CustomButton
            title="Sign In"
            handlePress={handleLogin}
            containerStyles="mt-7 bg-[#F11A42] h-12 rounded-[10px]"
            textStyles="text-white"
            isLoading={isSubmitting}
          />
        )}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              router.replace("/signUp");
            }}
          >
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#b8cdd8",
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
  },
  wrapperInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    padding: 10,
    flex: 1,
  },
  wrapperIcon: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  button: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F11A42",
    borderRadius: 10,
    marginTop: 25,
  },
  buttonDisable: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginTop: 25,
  },
  text: {
    color: "#fff",
    fontWeight: "700",
  },
  textFailed: {
    alignSelf: "flex-end",
    color: "red",
    marginTop: 5,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "#F11A42",
    textDecorationLine: "underline",
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
