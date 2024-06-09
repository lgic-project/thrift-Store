import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabBarIcon } from "./navigation/TabBarIcon";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  { id: "1", text: "I'm hungry, let's eat", sender: "Jane", timestamp: "Yesterday 9:41" },
  { id: "2", text: "Ok, but what we eat?", sender: "You", timestamp: "Yesterday 9:42" },
  { id: "3", text: "Bun bo Hue, ok?", sender: "Jane", timestamp: "Yesterday 9:43" },
];

const ChatItem: React.FC = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: (messages.length + 1).toString(),
        text: inputText,
        sender: "You",
        timestamp: "Just now",
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isSender = item.sender === "You";
    return (
      <View
        style={[
          styles.messageContainer,
          isSender ? styles.senderMessage : styles.receiverMessage,
        ]}
      >
        <Text style={[styles.messageText, isSender ? styles.senderText : styles.receiverText]}>
          {item.text}
        </Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.chatContainer}
        />
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <TabBarIcon name="add-circle-outline" size={24} color="#5E5E5E" />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message"
            placeholderTextColor="#B3B3B3"
          />
          <TouchableOpacity style={styles.iconButton}>
            <TabBarIcon name="camera-outline" size={24} color="#5E5E5E" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <TabBarIcon name="location-outline" size={24} color="#5E5E5E" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <TabBarIcon name="cash-outline" size={24} color="#5E5E5E" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <TabBarIcon name="send" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    paddingVertical: 10,
  },
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
  },
  senderMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
    marginRight: 10,
  },
  receiverMessage: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  messageText: {
    fontSize: 16,
  },
  senderText: {
    color: "#000000",
  },
  receiverText: {
    color: "#000000",
  },
  timestamp: {
    fontSize: 12,
    color: "#808080",
    alignSelf: "flex-end",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  sendButton: {
    backgroundColor: "#f11a42",
    borderRadius: 20,
    padding: 10,
  },
  iconButton: {
    paddingHorizontal: 5,
  },
});

export default ChatItem;
