import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";

export const registerProduct = async (
  formData: any,
  images: any[],
  thumbnail: any,
  video: any
) => {
  try {
    const token = await AsyncStorage.getItem("AccessToken");
    if (!token) throw new Error("No auth token found");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("tags",formData.tags)
    data.append("price", formData.price.toString()); // Ensure numeric fields are strings
    data.append("stock", formData.stock.toString()); // Ensure numeric fields are strings

    // Convert comma-separated strings to arrays
    const colorsArray = formData.colors
      .split(",")
      .map((color: any) => color.trim());
    const sizesArray = formData.sizes
      .split(",")
      .map((size: any) => size.trim());

    colorsArray.forEach((color: any) => data.append("colors", color));
    sizesArray.forEach((size: any) => data.append("sizes", size));

    // data.append('categoryId', formData.categoryId); // Ensure string fields

    images.forEach((image, index) => {
      data.append("images", {
        uri: image.uri,
        name: `image${index}.jpg`,
        type: "image/jpeg",
      } as any);
    });

    if (thumbnail) {
      data.append("thumbnail", {
        uri: thumbnail.uri,
        name: "thumbnail.jpg",
        type: "image/jpeg",
      } as any);
    }

    if (video) {
      data.append("video", {
        uri: video.uri,
        name: "video.mp4",
        type: "video/mp4",
      } as any);
    }


    const result = await ApiManager.post("/product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return result.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

export const getMyProducts = async () => {
    try {
      const token = await AsyncStorage.getItem("AccessToken");
      if (!token) throw new Error("No auth token found");
      const result = await ApiManager.get("/product/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
