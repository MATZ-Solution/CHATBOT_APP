import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { useMessages } from '@/utilities/useMessege';
import { useGetMessages } from '@/apis/client/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Message = {
  parts?: string; // parts is optional
  message?: string; // message is optional
  role: 'user' | 'ai' | 'model';
};

const MessagesList: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const { data: oldMessages, isSuccess } = useGetMessages(userId, '1');
  const bottomRef = useRef<FlatList<Message>>(null);
  const { messages: contextMessages, isLoadingAnswer } = useMessages();

  // Retrieve the userId from async storage
  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        setUserId(storedUserId);
      } catch (error) {
        console.error('Error initializing chat: ', error);
      }
    };
    getUserId();
  }, []);

  // Scroll to the end when new messages are added
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollToEnd({ animated: true });
    }
  }, [contextMessages]);

  // Normalize old messages and context messages
  const normalizedOldMessages = (oldMessages?.data || []).map((message: any) => ({
    message: message.message, // Use `message` field from database
    role: message.role,
  }));

  const normalizedContextMessages = contextMessages.map((message: any) => ({
    message: message.parts, // Use `parts` field from context messages
    role: message.role,
  }));

  // Merge both messages
  const combinedMessages = [...normalizedOldMessages, ...normalizedContextMessages];

  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.role === 'user';
    return (
      <View style={[styles.messageWrapper, isUser ? styles.userMessageWrapper : styles.aiMessageWrapper]}>
        {!isUser && <Image source={require('../assets/images/ai.png')} style={styles.avatar} />}
        <View style={[styles.messageBubble, isUser ? styles.userMessageBubble : styles.aiMessageBubble]}>
          <Text style={isUser ? styles.userMessageText : styles.aiMessageText}>
            {item.message} {/* Display the message */}
          </Text>
        </View>
        {isUser && <Image source={require('../assets/images/user.png')} style={styles.avatar} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={bottomRef}
        data={combinedMessages}
        renderItem={renderItem}
        keyExtractor={(item, index) => `message-${index}`}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() => bottomRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => bottomRef.current?.scrollToEnd({ animated: true })}
      />
      {isLoadingAnswer && (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="small" color="#000" />
          <Text style={styles.loadingText}>David is thinking...</Text>
        </View>
      )}
    </View>
  );
};

export default MessagesList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  messageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  aiMessageWrapper: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
    maxWidth: '70%',
  },
  userMessageBubble: {
    backgroundColor: '#4A90E2',
    alignSelf: 'flex-end',
  },
  aiMessageBubble: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  userMessageText: {
    color: '#fff',
    fontSize: 16,
  },
  aiMessageText: {
    color: '#333',
    fontSize: 16,
  },
  loadingWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 10,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#555',
  },
});
