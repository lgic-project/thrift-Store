import NotificationItem from "@/components/NotificationItem";
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { Swipeable } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

const notificationsData = [
  {
    id: "1",
    type: "follow",
    username: "Jane Doe",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    message: "started following you.",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "message",
    username: "John Smith",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    message: "sent you a message.",
    timestamp: "4 hours ago",
  },
  {
    id: "3",
    type: "like",
    username: "Alice Johnson",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    message: "liked your product.",
    timestamp: "1 day ago",
  },
  {
    id: "4",
    type: "comment",
    username: "Bob Brown",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    message: "commented on your post.",
    timestamp: "2 days ago",
  },
];

const Notification: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [notifications, setNotifications] = useState(notificationsData);
  const [filteredNotifications, setFilteredNotifications] =
    useState(notificationsData);
  const router = useRouter();

  useEffect(() => {
    filterNotifications(selectedFilter);
  }, [selectedFilter, notifications]);

  const filterNotifications = (filter: string) => {
    if (filter === "all") {
      setFilteredNotifications(notifications);
    } else {
      setFilteredNotifications(
        notifications.filter((notification) => notification.type === filter)
      );
    }
  };

  const clearAllNotifications = () => {
    Alert.alert(
      "Clear All Notifications",
      "Are you sure you want to clear all notifications?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear All",
          onPress: () => setNotifications([]),
        },
      ]
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const renderNotification = ({ item }: { item: any }) => {
    return (
      <Swipeable
        onSwipeableWillOpen={() => handleDeleteNotification(item.id)}
        renderRightActions={() => (
          <View
            style={{ flex: 1, backgroundColor: "transparent" }}
            className="justify-center items-end w-full h-full p-[10px]"
          >
            <Text className="text-black underline font-pRegular">
              Swipe left to delete
            </Text>
          </View>
        )}
        rightThreshold={Dimensions.get("window").width * 0.7}
      >
        <NotificationItem
          type={item.type}
          username={item.username}
          profilePic={item.profilePic}
          message={item.message}
          timestamp={item.timestamp}
        />
      </Swipeable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedFilter}
            onValueChange={(itemValue) => setSelectedFilter(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="All activity" value="all" />
            <Picker.Item label="Follow Activity" value="follow" />
            <Picker.Item label="Message Activity" value="message" />
            <Picker.Item label="Like Activity" value="like" />
            <Picker.Item label="Comment Activity" value="comment" />
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push("notification/[messageList]")} // Navigate to MessageList
        >
          <TabBarIcon name="chatbubble-outline" color="gray" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={clearAllNotifications}
        >
          <TabBarIcon name="trash-outline" color="red" size={24} />
        </TouchableOpacity>
      </View>
      {filteredNotifications.length === 0 ? (
        <View style={styles.noNotificationsContainer}>
          <Text style={styles.noNotificationsText}>
            Notifications aren't available
          </Text>
          <Text style={styles.noNotificationsSubText}>
            Notifications about your account will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
          contentContainerStyle={styles.listContentContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  pickerContainer: {
    flex: 1,
  },
  picker: {
    width: "100%",
    borderRadius: 5,
  },
  iconButton: {
    marginLeft: 15,
  },
  noNotificationsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noNotificationsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
  },
  noNotificationsSubText: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  listContentContainer: {
    paddingBottom: 20,
  },
  deleteButton: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Notification;
