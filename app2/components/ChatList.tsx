import React from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

interface ChatListProps {
  conversations: {
    id: string;
    username: string;
    profilePic: string;
    lastMessage: string;
    timestamp: string;
  }[];
}

const ChatList: React.FC<ChatListProps> = ({ conversations }) => {
  const router = useRouter();

  const renderItem = ({
    item,
  }: {
    item: ChatListProps["conversations"][0];
  }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => router.push("chat/[message]")}
    >
      <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
      <View style={styles.textContainer}>
        <View style={styles.messageHeader}>
          <Text style={styles.username} className="text-black dark:text-white">
            {item.username}
          </Text>
          <Text
            style={styles.timestamp}
            className="text-black dark:text-gray-200"
          >
            {item.timestamp}
          </Text>
        </View>
        <Text
          style={styles.lastMessage}
          numberOfLines={1}
          className="text-black dark:text-gray-200"
        >
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={conversations}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContentContainer}
    />
  );
};

const styles = StyleSheet.create({
  conversationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 14,
    marginTop: 5,
  },
  timestamp: {
    fontSize: 12,
  },
  listContentContainer: {
    height: "auto",
  },
});

export default ChatList;
