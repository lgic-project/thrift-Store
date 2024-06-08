import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import ChatList from "../../components/ChatList";
import UserIconList from "../../components/UserIconList";

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

const Search: React.FC = () => {
  const { query } = useLocalSearchParams();
  const [filteredConversations, setFilteredConversations] = useState(conversations);
  const [filteredUsers, setFilteredUsers] = useState(otherUsers);

  useEffect(() => {
    const searchQuery = Array.isArray(query) ? query[0] : query;
    if (searchQuery) {
      const filteredConversations = conversations.filter((conversation) =>
        conversation.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredUsers = otherUsers.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredConversations(filteredConversations);
      setFilteredUsers(filteredUsers);
    } else {
      setFilteredConversations(conversations);
      setFilteredUsers(otherUsers);
    }
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredConversations}
        renderItem={({ item }) => <ChatList conversations={filteredConversations} />}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Search Results</Text>
            <Text style={styles.queryText}>{query}</Text>
            <View style={styles.searchInputContainer}>
              <SearchInput placeholder="Search for a user" initialQuery={query ? String(query) : ''} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No users found"
            subTitle="No users found for the search query. Please try again with a different query."
          />
        )}
      />
      <UserIconList allUserIconList={filteredUsers} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerText: {
    fontSize: 14,
    color: "#666",
  },
  queryText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  searchInputContainer: {
    marginTop: 10,
  },
});

export default Search;
