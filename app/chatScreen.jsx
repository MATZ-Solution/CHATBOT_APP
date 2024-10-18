import React, { useState,useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, Alert, BackHandler, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import MessageFrom from '../components/MessageFrom';
import MessagesList from '../components/MessageList';
import { useIsFocused } from "@react-navigation/native";
const ChatScreen = () => {
  const isFocused = useIsFocused();
  // Sample messages (you can replace this with your actual message data)
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello, how can I help you?' },
    { id: 2, text: 'I have a question about my order.' },
    { id: 3, text: 'Sure, please go ahead!' }
  ]);
  useEffect(() => {
    if (isFocused) {
      const backAction = () => {
        Alert.alert("Are you sure?", "Do you want to close the app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with logo */}
      <View style={styles.header}>
        <Image 
          source={require('../assets/images/logo.png')} // Replace with your logo file
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <MessagesList />

      {/* Message form */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
      >
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>
            Disclaimer: The responses provided by this chatbot may not always be accurate. Please verify any important information independently.
          </Text>
        </View>
        <MessageFrom />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 40,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 220,
    height: 50,
  },
  formContainer: {
    justifyContent: 'flex-end', 
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  disclaimerContainer: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
});
