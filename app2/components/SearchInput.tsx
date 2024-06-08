import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { usePathname, useRouter } from "expo-router";
import { TabBarIcon } from "./navigation/TabBarIcon";

interface SearchInputProps {
  placeholder: string;
  initialQuery?: string;
  additionStyle?: string;
  onSearch: (query: string) => void;
}

const SearchInput = ({
  placeholder,
  initialQuery,
  additionStyle,
  onSearch,
}: SearchInputProps) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  const router = useRouter();

  const handleSearch = () => {
    if (!query) {
      Alert.alert(
        "Missing query",
        "Please input something to search results across database"
      );
      return;
    }
    if (pathname.startsWith("/search")) {
      // Update the search query without navigating to a new page
      onSearch(query);
      router.setParams({ query });
    } else {
      onSearch(query);
      router.push(`/search/${query}`);
    }
  };

  return (
    <View
      className={`bg-[#fff] w-full h-10 px-4 rounded-3xl items-center flex-row space-x-4 ${additionStyle}`}
    >
      <TextInput
        className="text-base dark:text-white mt-0.5 flex-1 font-pregular"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />

      <TouchableOpacity onPress={handleSearch}>
        <TabBarIcon name="search" color="grey" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
