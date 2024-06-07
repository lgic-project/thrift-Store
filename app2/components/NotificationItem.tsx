import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { TabBarIcon } from "./navigation/TabBarIcon";

interface NotificationItemProps {
  type: string;
  username: string;
  profilePic: string;
  message: string;
  timestamp: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  type,
  username,
  profilePic,
  message,
  timestamp,
}) => {
  const getIconName = () => {
    switch (type) {
      case "follow":
        return "person-add-outline";
      case "message":
        return "chatbubble-outline";
      case "like":
        return "heart-outline";
      case "comment":
        return "chatbubble-ellipses-outline";
      default:
        return "notifications-outline";
    }
  };

  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{ uri: profilePic }}
        style={styles.profilePic}
      />
      <View style={styles.textContainer}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
      <TabBarIcon name={getIconName()} color="gray" size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
    elevation: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {
    fontSize: 14,
    color: "gray",
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
  },
});

export default NotificationItem;
