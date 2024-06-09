import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import ChatList from "../../components/ChatList";

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

const Search: React.FC = () => {
  const { query } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState(query ? String(query) : "");
  const [filteredConversations, setFilteredConversations] = useState(conversations);

  useEffect(() => {
    const filteredConversations = searchQuery
      ? conversations.filter((conversation) =>
          conversation.username.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : conversations;
    setFilteredConversations(filteredConversations);
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredConversations}
        renderItem={({ item }) => (
          <ChatList conversations={filteredConversations} />
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <View style={styles.searchInputContainer}>
              <SearchInput
                placeholder="Search for a user"
                initialQuery={searchQuery}
                onSearch={(query) => {
                  setSearchQuery(query);
                }}
              />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
