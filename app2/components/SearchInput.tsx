import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { router, usePathname } from "expo-router";
import { icons } from "@/constants/Icons";
import { TabBarIcon } from "./navigation/TabBarIcon";

interface SearchInputProps {
  placeholder: string;
  initialQuery?: string;
}

const SearchInput = ({ placeholder, initialQuery }: SearchInputProps) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className=" bg-[#fff] w-full h-10 px-4 rounded-3xl items-center flex-row space-x-4">
      <TextInput
        className="text-base dark:text-white mt-0.5 flex-1 font-pregular"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            Alert.alert(
              "Missing query",
              "Please input something to search results across database"
            );
            return;
          }
          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <TabBarIcon name="search" color="grey" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
