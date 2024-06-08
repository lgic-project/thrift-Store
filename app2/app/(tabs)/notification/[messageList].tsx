import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import SearchInput from "@/components/SearchInput";
import UserIconList from "@/components/UserIconList";
import ChatList from "@/components/ChatList";

const conversations = [
  {
    id: "1",
    username: "Sienna Cardoso",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    lastMessage: "is writing...",
    timestamp: "1:30 PM",
  },
  {
    id: "2",
    username: "Todd Christien",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    lastMessage: "This looks good! You could try ...",
    timestamp: "1:27 PM",
  },
  {
    id: "3",
    username: "John Sharpe",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    lastMessage: "Will let you know sometime...",
    timestamp: "1:25 PM",
  },
];

const otherUsers = [
  {
    id: "1",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    username: "Niraj",
  },
  {
    id: "2",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    username: "Nabbin",
  },
  {
    id: "3",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    username: "Niren",
  },
  {
    id: "4",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    username: "Abishek",
  },
  {
    id: "5",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    username: "Vetrie",
  },
  {
    id: "6",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    username: "Vetrie",
  },
  {
    id: "7",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    username: "Vetrie",
  },
  {
    id: "8",
    profilePic:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    username: "Vetrie",
  },
];

const MessageList: React.FC = () => {
  return (
    <>
      <View style={styles.header}>
        <View className="pt-4 pb-4">
          <SearchInput placeholder="Search" />
        </View>
      </View>
      <View>
        <UserIconList allUserIconList={otherUsers} />
      </View>
      <View>
        <ChatList conversations={conversations} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default MessageList;
