import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "@/components/CustomButton";
import { registerProduct } from "@/api/productApi";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Create() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    colors: "",
    sizes: "",
    // categoryId: "",
  });
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [thumbnail, setThumbnail] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const [video, setVideo] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImages([...images, ...result.assets]);
    }
  };

  const pickThumbnail = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setThumbnail(result.assets[0]);
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setVideo(result.assets[0]);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.stock ||
      images.length === 0
    ) {
      Alert.alert(
        "Error",
        "Please fill all required fields and select at least one image"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await registerProduct(formData, images, thumbnail, video);
      Alert.alert("Success", "Product uploaded successfully");
      router.replace("/profile");
    } catch (error) {
      Alert.alert("Error", "Failed to upload product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={formData.name}
          onChangeText={(text) => handleInputChange("name", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={formData.description}
          onChangeText={(text) => handleInputChange("description", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={formData.price}
          onChangeText={(text) => handleInputChange("price", text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Stock"
          value={formData.stock}
          onChangeText={(text) => handleInputChange("stock", text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Colors (comma separated)"
          value={formData.colors}
          onChangeText={(text) => handleInputChange("colors", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Sizes (comma separated)"
          value={formData.sizes}
          onChangeText={(text) => handleInputChange("sizes", text)}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Category ID"
          value={formData.categoryId}
          onChangeText={(text) => handleInputChange("categoryId", text)}
        /> */}
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick Images</Text>
        </TouchableOpacity>
        {images.length > 0 && (
          <View style={styles.imagePreviewContainer}>
            {images.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img.uri }}
                style={styles.imagePreview}
              />
            ))}
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={pickThumbnail}>
          <Text style={styles.buttonText}>Pick Thumbnail</Text>
        </TouchableOpacity>
        {thumbnail && (
          <Image source={{ uri: thumbnail.uri }} style={styles.imagePreview} />
        )}
        <TouchableOpacity style={styles.button} onPress={pickVideo}>
          <Text style={styles.buttonText}>Pick Video</Text>
        </TouchableOpacity>
        {video && (
          <Text style={styles.videoPreview}>{video.uri.split("/").pop()}</Text>
        )}
        <CustomButton
          title="Upload Product"
          handlePress={handleSubmit}
          containerStyles={`${styles.submitButton}`}
          textStyles={`${styles.submitButtonText}`}
          isLoading={isSubmitting}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#b8cdd8",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#F11A42",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#F11A42",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
  videoPreview: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
});
