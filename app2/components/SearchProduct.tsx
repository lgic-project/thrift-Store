import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { TabBarIcon } from "./navigation/TabBarIcon";

interface SearchProductProps {
  placeholder: string;
  initialQuery?: string;
  additionStyle?: string;
  onSearch: (query: string) => void;
}

const SearchProduct = ({
  placeholder,
  initialQuery,
  additionStyle,
  onSearch,
}: SearchProductProps) => {
  const [query, setQuery] = useState(initialQuery || "");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <View
      className={`bg-[#fff] w-full h-10 px-4 rounded-3xl items-center flex-row space-x-4 ${additionStyle}`}
    >
      <TextInput
        className="text-base mt-0.5 flex-1 font-pregular"
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

export default SearchProduct;
