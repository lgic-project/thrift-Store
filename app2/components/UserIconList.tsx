import React from "react";
import { View, FlatList, Text, Image, StyleSheet } from "react-native";

interface UserIconListProps {
  allUserIconList: { id: string; profilePic: string; username: string }[];
}

const UserIconList: React.FC<UserIconListProps> = ({ allUserIconList }) => {
  const renderAllUserIcon = ({
    item,
  }: {
    item: { profilePic: string; username: string };
  }) => (
    <View style={styles.allUserIconContainer}>
      <Image source={{ uri: item.profilePic }} style={styles.allUserIconPic} />
      <Text style={styles.allUserIconName}>{item.username}</Text>
    </View>
  );

  return (
    <FlatList
      horizontal
      data={allUserIconList}
      keyExtractor={(item) => item.id}
      renderItem={renderAllUserIcon}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.allUserIconList}
    />
  );
};

const styles = StyleSheet.create({
  allUserIconList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: "auto",
  },
  allUserIconContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  allUserIconPic: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  allUserIconName: {
    marginTop: 5,
    fontSize: 12,
    color: "#333",
  },
});

export default UserIconList;
